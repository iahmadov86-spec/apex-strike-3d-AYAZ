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

## 🚀 Oyna

`index.html` dosyasını tarayıcıda aç — build gerekmez.

Ya da çok oyunculu sunucu:
```bash
npm install
node server.js
```
Sonra `http://localhost:8765` adresini aç.

---

## 🖥️ Masaüstü Uygulama (Electron)

```bash
npm install
npm start          # Electron ile çalıştır
```

### Build
```bash
npm run build:win    # Windows installer (.exe) + Microsoft Store (.appx)
npm run build:mac    # macOS (.dmg)
npm run build:linux  # Linux (.AppImage)
npm run build:store  # Yalnızca Microsoft Store (.appx)
npm run build:steam  # Yalnızca Steam installer (.exe)
```
Build çıktısı `dist/` klasörüne gelir.

---

## 🏪 Mağaza Gönderimi

### 🏠 Microsoft Store
1. [Partner Center](https://partner.microsoft.com/) hesabı aç ($19 bireysel)
2. `npm run build:store` → `dist/*.appx` oluştur
3. Partner Center'a yükle ve mağaza bilgilerini doldur
4. Detaylı rehber: [`store/microsoft/README.md`](store/microsoft/README.md)

### 🎮 Steam
1. [Steamworks](https://partner.steamgames.com/) hesabı aç ($100 Steam Direct)
2. `npm run build:steam` → `dist/*.exe` oluştur
3. SteamCMD ile depoya yükle
4. Detaylı rehber: [`store/steam/README.md`](store/steam/README.md)

> ⚠️ İkon dosyalarını build öncesinde `assets/icons/` klasörüne ekle.
> Detay: [`assets/icons/README.md`](assets/icons/README.md)

---

## 🛠️ Teknoloji
- [Three.js r134](https://threejs.org/)
- Web Audio API (procedural sounds)
- EffectComposer + UnrealBloomPass
- WebSocket (Node.js server)
- Electron 29 (masaüstü sarmalayıcı)
- electron-builder (Steam / Microsoft Store build)
