# APEX STRIKE 3D 🔫 — BETA v1.0

A browser-based 3D FPS game built with Three.js. No install required — just open `index.html`.

## ✨ Features

### 🎮 Gameplay
- **8 Weapons:** Pistol, SMG, AR, Shotgun, Sniper, Tactical Knife, AK-47, M416
- **5 Enemy Types:** Grunt, Soldier, Heavy, Sniper, Elite — with cover/flank AI
- **Infinite Wave System** — 5 rounds, gets harder each wave
- **Headshot System** — 2.2× damage, special sound & effect
- **Damage Falloff** — range-based per weapon
- **Crouch** (C key) — reduced spread, quieter movement

### 🎨 Graphics
- **Morning Skybox** — gradient sky, sun disk + halo
- **ACESFilmic Tone Mapping** — cinematic color grading
- **Outdoor Map** — grass, trees, sandbags, stone walls
- **UnrealBloom** post-processing
- **Atmospheric dust particles**

### 🔫 Weapon System
- **8 Fully modeled weapons** — each with unique geometry (serrations, rails, scopes, stocks)
- **Draw/Holster animations** — smooth weapon switching with spring settle
- **Per-weapon recoil patterns** — AK pulls left, sniper goes straight
- **Shell casings** — physics-based brass ejection with bounce + clink sound
- **Muzzle smoke** — puff particles after firing
- **Bullet tracers** — all weapons

### 💥 Realism
- **Breathing camera** — speed/HP-based amplitude
- **Weapon inertia** — lags behind camera movement
- **Blood decals** — ground stains on enemy hits
- **Ricochet sparks** — wall impacts
- **Landing impact** — camera dip on fall
- **Bullet whiz-by** — near-miss sound
- **Enemy stagger** — knockback on hit
- **Enemy death animation** — fall & fade

### 👤 Social
- **Username system** — random-generated or custom, persisted
- **#XXXX tag** — unique per player
- **Friend list** — add by username, stored locally
- **Name tags** — visible above players in multiplayer (WebSocket)

### 🌐 Multiplayer
- WebSocket 7v7 Team Mode
- Real-time player positions & name tags
- Team A vs Team B with round system

## 🕹️ Controls

| Key | Action |
|-----|--------|
| `WASD` | Move |
| `Mouse` | Look |
| `Left Click` | Shoot |
| `Right Click` | ADS |
| `R` | Reload |
| `Space` | Jump |
| `Shift` | Sprint |
| `C` | Crouch |
| `Q` | Grenade |
| `F` | Pick up weapon |
| `I` | Inspect weapon |
| `1-8` | Switch weapon |
| `B` | Shop |
| `T` | Chat (MP) |

## 🚀 Play

Open `index.html` directly in browser — no build step.

Or run multiplayer server:
```bash
npm install
node server.js
```
Then open `http://localhost:3000`

## 🛠️ Tech Stack
- [Three.js r134](https://threejs.org/)
- Web Audio API (procedural sounds)
- EffectComposer + UnrealBloomPass
- WebSocket (Node.js server)
