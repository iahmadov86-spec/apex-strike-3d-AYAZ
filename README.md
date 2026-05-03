# APEX STRIKE 3D 🔫

A browser-based 3D FPS game built with Three.js.

## Features

- **6 Weapons:** Pistol, SMG, Rifle, Shotgun, Sniper, Tactical Knife
- **5 Enemy Types:** Grunt, Soldier, Heavy, Sniper, Elite
- **Infinite Wave System** — gets harder each wave
- **Realistic Audio** — Web Audio API procedural sound effects (fire, footsteps, reload, explosion, knife)
- **Visual Effects** — UnrealBloom post-processing, hex floor, glowing grid, ceiling lights, exponential fog
- **ADS** (right-click aim down sights), headbob, stamina bar, bullet holes, screen shake
- **Minimap**, HUD (HP, shield, ammo, wave, score, streak)
- **Weapon Inspect Animation** — press `I` to inspect your weapon

## Controls

| Key | Action |
|-----|--------|
| `WASD` | Move |
| `Mouse` | Look |
| `Left Click` | Shoot |
| `Right Click` | ADS |
| `R` | Reload |
| `Space` | Jump |
| `Shift` | Sprint |
| `Q` | Grenade |
| `F` | Pick up weapon |
| `I` | Inspect weapon |
| `1-6` | Switch weapon |

## Play

Just open `index.html` in your browser — no build step required.

Or run the local server:

```bash
npm install
node server.js
```

Then open `http://localhost:3000`

## Tech Stack

- [Three.js r134](https://threejs.org/)
- Web Audio API
- EffectComposer + UnrealBloomPass
