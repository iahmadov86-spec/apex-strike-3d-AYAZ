# Microsoft Store Gönderimi — Adım Adım

## 1. Partner Center Hesabı Aç
- https://partner.microsoft.com/
- Kayıt ücreti: **$19 USD** (bireysel) / **$99 USD** (şirket)
- Microsoft hesabı + kimlik doğrulama gerekli

## 2. Yeni Uygulama Oluştur
- Sol menü: **Windows & Xbox** → **Apps and Games** → **+ New Product**
- Uygulama adı rezerve et: **Apex Strike 3D**

## 3. MSIX Paketi Oluştur
```bash
# Önce npm install:
npm install

# Sonra MSIX build:
npm run build:store
# → dist/Apex Strike 3D-1.0.0.appx dosyası oluşur
```

### Gerekli sertifika (test için):
```powershell
# Windows'ta PowerShell (Admin):
New-SelfSignedCertificate -Type Custom -Subject "CN=iahmadov86-spec" `
  -KeyUsage DigitalSignature -FriendlyName "ApexStrike3D" `
  -CertStoreLocation "Cert:\CurrentUser\My" `
  -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}")
```

## 4. Store Listeleme Sayfası

### Gerekli Görseller:
| Görsel                  | Boyut        |
|------------------------|-------------|
| Store logo             | 300×300 px  |
| Hero image             | 1920×1080 px|
| Screenshot (min 4)     | 1366×768 px+|
| Feature image          | 1584×396 px |

### Gerekli Bilgiler:
- **Kategori:** Games → Action & Adventure
- **Yaş Derecelendirmesi:** IARC (ücretsiz, otomatik anket)
- **Fiyat:** Ücretsiz (veya ücretli)
- **Dil:** Türkçe, İngilizce
- **Kısa açıklama:** (200 karakter max)
- **Uzun açıklama:** `store/microsoft/description_tr.txt` dosyasından al

## 5. Gönderim & İnceleme
- Paketi yükle: Partner Center → Submissions → Upload packages
- Mağaza listesini doldur
- Yaş derecelendirmesini tamamla
- **"Submit to the Store"** tıkla
- Microsoft **3–7 iş günü** içinde inceler

## 6. Güncelleme Göndermek
```bash
# Yeni sürüm için package.json'da version'ı artır
# Sonra:
npm run build:store
# Yeni .appx'i Partner Center'a yükle
```

## Notlar
- Electron + MSIX, Microsoft Store'da desteklenmektedir (Electron 9+)
- `electron-builder.json` içindeki `appx` bölümü zaten yapılandırılmış
- `publisher` değerini sertifikanızla eşleştirmeyi unutmayın
