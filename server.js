/**
 * APEX STRIKE 3D — Multiplayer Server (7v7 Team Mode)
 * Run: node server.js
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

// ─── Static file server ──────────────────────────────
const httpServer = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css'}[ext]||'text/plain';
    res.writeHead(200,{'Content-Type':mime});
    res.end(data);
  });
});
httpServer.listen(8765, () => console.log('🌐 Game:   http://localhost:8765'));

// ─── Game State ──────────────────────────────────────
const MAX_ROUNDS  = 5;
const MAX_PER_TEAM = 7;

let players   = {};
let hostId    = null;
let round     = 1;
let roundActive = false;
let roundTimer  = null;

// Score tracking per round
let roundScores = { A: 0, B: 0 };

// ─── WebSocket Server ────────────────────────────────
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  const id = Math.random().toString(36).substr(2, 8);

  // Assign team (balance teams)
  const countA = Object.values(players).filter(p=>p.team==='A').length;
  const countB = Object.values(players).filter(p=>p.team==='B').length;
  const team = countA <= countB ? 'A' : 'B';
  const teamColor = team === 'A' ? 0x00BFFF : 0xFF4444;

  players[id] = {
    id, ws, team, teamColor,
    x:0, z:0, y:1.72, yaw:0, pitch:0,
    hp:100, shield:60, weapon:'pistol',
    score:0, kills:0, alive:true,
    spawnX: team==='A' ? -30 : 30,
    spawnZ: team==='A' ? -30 : 30,
  };

  if (!hostId) { hostId = id; console.log(`👑 Host: ${id}`); }

  send(ws, {
    type: 'welcome', id, team, teamColor,
    isHost: hostId===id,
    round, roundActive,
    players: Object.values(players).filter(p=>p.id!==id).map(pState)
  });

  broadcast({ type:'playerJoin', player: pState(players[id]) }, id);
  console.log(`✅ +${id} [Takım ${team}] [${Object.keys(players).length} oyuncu]`);

  ws.on('message', raw => {
    let data; try { data = JSON.parse(raw); } catch { return; }
    const p = players[id]; if (!p) return;

    switch (data.type) {
      case 'playerUpdate':
        Object.assign(p, {x:data.x,z:data.z,y:data.y,yaw:data.yaw,pitch:data.pitch,
          hp:data.hp,shield:data.shield,weapon:data.weapon,score:data.score,alive:data.alive!==false});
        broadcast({type:'playerUpdate',id,x:data.x,z:data.z,y:data.y,yaw:data.yaw,pitch:data.pitch,
          hp:data.hp,shield:data.shield,weapon:data.weapon,score:data.score,alive:p.alive,team:p.team,teamColor:p.teamColor},id);
        // Check round end on player death
        if(roundActive && data.alive===false) checkRoundEnd();
        break;

      case 'hitPlayer': {
        // id hit targetId
        const target = players[data.targetId];
        if(target && target.alive && target.team !== p.team){
          target.hp = Math.max(0, target.hp - data.damage);
          send(target.ws, {type:'takeDamage', damage:data.damage, fromId:id, fromTeam:p.team});
          if(target.hp <= 0){
            target.alive = false;
            target.hp = 0;
            p.kills++;
            p.score += 200; // kill bonus
            broadcast({type:'playerKilled', killerId:id, victimId:data.targetId});
            if(roundActive) checkRoundEnd();
          }
        }
        break;
      }

      case 'enemyUpdate':
        if(id===hostId) broadcast({type:'enemyUpdate',enemies:data.enemies},id);
        break;

      case 'hitEnemy':
        broadcast({type:'hitEnemy',enemyId:data.enemyId,damage:data.damage,killerId:id});
        break;

      case 'grenadeExplode':
        broadcast({type:'grenadeExplode',x:data.x,y:data.y,z:data.z,fromTeam:p.team},id);
        break;

      case 'startRound':
        if(id===hostId && !roundActive) startRound();
        break;

      case 'chat':
        const txt=String(data.text||'').slice(0,120);
        broadcast({type:'chat',id,text:txt,team:p.team});
        break;
    }
  });

  ws.on('close', () => {
    delete players[id];
    broadcast({type:'playerLeave',id});
    console.log(`❌ -${id}  [${Object.keys(players).length} oyuncu]`);
    if(hostId===id){
      const ids=Object.keys(players);
      hostId=ids[0]||null;
      if(hostId){ send(players[hostId].ws,{type:'becomeHost'}); console.log(`👑 Yeni host: ${hostId}`); }
    }
  });
});

// ─── Round Logic ─────────────────────────────────────
function startRound() {
  roundActive = true;
  roundScores = { A: 0, B: 0 };
  // Respawn all
  Object.values(players).forEach(p => {
    p.alive = true; p.hp = 100; p.shield = 60;
  });
  broadcast({ type:'roundStart', round });
  console.log(`🏁 Tur ${round} başladı`);
}

function checkRoundEnd() {
  const alive = Object.values(players).filter(p=>p.alive);
  const aliveA = alive.filter(p=>p.team==='A').length;
  const aliveB = alive.filter(p=>p.team==='B').length;

  // If one side has no players left (or all dead)
  if (aliveA === 0 && aliveB >= 0) endRound('B');
  else if (aliveB === 0 && aliveA >= 0) endRound('A');
}

function endRound(winnerTeam) {
  if(!roundActive) return;
  roundActive = false;
  console.log(`🏆 Tur ${round} bitti — Kazanan: Takım ${winnerTeam}`);

  // Score penalties & bonuses
  Object.values(players).forEach(p => {
    if(p.team === winnerTeam) {
      p.score += 10;  // Kazanan takım +10
    } else {
      p.score = Math.max(0, p.score - 200); // Kaybeden takım -200
    }
  });

  const playerScores = {};
  Object.values(players).forEach(p => { playerScores[p.id] = p.score; });

  broadcast({ type:'roundEnd', winner:winnerTeam, round, playerScores,
    winBonus:10, lossPenalty:200 });

  if(round >= MAX_ROUNDS){
    // Match over
    const totA = Object.values(players).filter(p=>p.team==='A').reduce((s,p)=>s+p.score,0);
    const totB = Object.values(players).filter(p=>p.team==='B').reduce((s,p)=>s+p.score,0);
    const matchWinner = totA >= totB ? 'A' : 'B';
    setTimeout(()=>broadcast({type:'matchOver', winner:matchWinner, scoreA:totA, scoreB:totB}), 2000);
    round = 1;
  } else {
    round++;
    // Auto-start next round after 5s
    if(roundTimer) clearTimeout(roundTimer);
    roundTimer = setTimeout(()=>{ if(Object.keys(players).length>0) startRound(); }, 5000);
  }
}

// ─── Helpers ─────────────────────────────────────────
function pState(p) {
  return { id:p.id, x:p.x, z:p.z, y:p.y, yaw:p.yaw, pitch:p.pitch,
    hp:p.hp, shield:p.shield, weapon:p.weapon, score:p.score,
    alive:p.alive, team:p.team, teamColor:p.teamColor };
}
function send(ws, data) { if(ws.readyState===1) ws.send(JSON.stringify(data)); }
function broadcast(data, excludeId=null) {
  const msg=JSON.stringify(data);
  Object.values(players).forEach(p=>{ if(p.id!==excludeId&&p.ws.readyState===1) p.ws.send(msg); });
}

console.log('🎮 APEX STRIKE 3D — 7v7 Takım Sunucusu');
console.log('🔌 WS:     ws://localhost:8080');
console.log(`🏆 Mod:    ${MAX_ROUNDS} tur | Kazanan +10 | Kaybeden -200`);
console.log('─────────────────────────────────────');
