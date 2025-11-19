const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,            // mais larguinho pra foto+texto
    height: 680,           // altura maior pra caber tudo sem cortar
    resizable: false,
    fullscreenable: false,
    backgroundColor: "#0c1020",
    frame: false,          // sem moldura do sistema, usamos a rosa
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, "index.html"));

  // IPC pros botões _ e X
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });

  ipcMain.on("close-window", () => {
    win.close();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
