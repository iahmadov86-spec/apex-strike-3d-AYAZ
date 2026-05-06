# Steam Mağaza Gönderimi — Adım Adım

## 1. Steamworks Hesabı Aç
- https://partner.steamgames.com/
- Kayıt ücreti: **$100 USD** (Steam Direct)
- Kimlik doğrulama ve banka hesabı gerekli

## 2. Yeni Uygulama Oluştur
- Partner sayfasından **"Create New App"** tıkla
- Uygulama adı: **Apex Strike 3D**
- Kategori: **Game**
- Fiyatlandırma: Ücretsiz veya ücretli belirle

## 3. Mağaza Sayfasını Doldur
Gerekli içerikler:
- **Başlık görseli:** 460×215 px (capsule image)
- **Büyük kapsül:** 616×353 px
- **Ekran görüntüleri:** en az 5 adet (1280×720 veya üstü)
- **Oyun açıklaması** (kısa + uzun)
- **Etiketler:** FPS, Action, Indie, Shooter
- **Sistem gereksinimleri:**

```
Minimum:
  OS: Windows 10 64-bit
  CPU: Intel Core i3 / AMD Ryzen 3
  RAM: 4 GB
  GPU: DirectX 11 destekli
  Depolama: 200 MB

Önerilen:
  OS: Windows 11 64-bit
  CPU: Intel Core i5 / AMD Ryzen 5
  RAM: 8 GB
  GPU: GTX 1060 / RX 580
  Depolama: 500 MB
```

## 4. Build Yükle (Steamworks SDK)
```bash
# Steamworks SDK indir: https://partner.steamgames.com/downloads/list
# SteamCMD ile yükle:
steamcmd +login <kullanıcı> +app_build steam/scripts/app_build.vdf +quit
```

### app_build.vdf içeriği:
```vdf
"AppBuild"
{
  "AppID"       "SENIN_APP_ID"
  "Desc"        "Apex Strike 3D v1.0"
  "BuildOutput" "../../output/"
  "ContentRoot" "../../dist/"
  "SetLive"     "default"
  "Depots"
  {
    "DEPOT_ID"
    {
      "FileMapping"
      {
        "LocalPath" "*"
        "DepotPath" "."
        "recursive" "1"
      }
    }
  }
}
```

## 5. İnceleme Süreci
- Steam 3–5 iş günü inceleme yapar
- İlk yayında **"Coming Soon"** sayfası açılır
- Hazır olunca **"Release"** butonu ile yayınla

## Notlar
- Steam Oyun Açıklaması için `store/steam/description_tr.txt` dosyasını kullan
- Yaş derecelendirmesi: IARC anketi doldur (steam'de ücretsiz)
