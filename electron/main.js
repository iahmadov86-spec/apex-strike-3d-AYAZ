/**
 * APEX STRIKE 3D — Electron Main Process
 * Masaüstü uygulama sarmalayıcı (Steam & Microsoft Store)
 */
const { app, BrowserWindow, shell, Menu, ipcMain } = require('electron');
const path = require('path');
const http = require('http');
const fs   = require('fs');

// Tek örnek kilidi (aynı anda iki pencere açılmasın)
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); process.exit(0); }

let mainWindow = null;

// ── Basit dosya sunucusu (index.html + assets) ──────────────────
let httpServer = null;
const PORT = 57321; // rastgele dahili port

function startFileServer(cb) {
  httpServer = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    // Güvenlik: path traversal engelle
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(__dirname, '..', safePath);
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      const ext  = path.extname(filePath).toLowerCase();
      const mime = {
        '.html': 'text/html', '.js': 'application/javascript',
        '.css': 'text/css',   '.png': 'image/png',
        '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon', '.json': 'application/json',
      }[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });
  httpServer.listen(PORT, '127.0.0.1', cb);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width:  1280,
    height: 720,
    minWidth:  854,
    minHeight: 480,
    title: 'APEX STRIKE 3D',
    icon: path.join(__dirname, '..', 'assets', 'icons', 'icon.png'),
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    show: false, // splash bitince göster
  });

  // Menüyü gizle (oyun arayüzü kendi menüsünü kullanır)
  Menu.setApplicationMenu(null);

  mainWindow.loadURL(`http://127.0.0.1:${PORT}/`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // İsteğe bağlı: tam ekran başlat
    // mainWindow.setFullScreen(true);
  });

  // Dış linkleri tarayıcıda aç
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
  startFileServer(() => {
    console.log(`[Electron] Dahili sunucu: http://127.0.0.1:${PORT}`);
    createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (httpServer) httpServer.close();
  if (process.platform !== 'darwin') app.quit();
});

// F11 → tam ekran toggle
ipcMain.on('toggle-fullscreen', () => {
  if (mainWindow) mainWindow.setFullScreen(!mainWindow.isFullScreen());
});
