const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
function createWindow() {
  const win = new BrowserWindow({
    //width: 225,
    //height: 150,
    icon: __dirname + '/icon/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  Store.initRenderer();
  win.loadFile('index.html');
  //win.removeMenu();
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => app.quit());
