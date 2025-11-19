const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 680,
    resizable: false,
    fullscreenable: false,
    backgroundColor: "#0c1020",
    frame: false,                     // usamos nossa janela rosa
    titleBarStyle: "hiddenInset",     // evita glitches no Mac
    roundedCorners: false,            // evita bordas brancas
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Remove menu (Windows/Linux) e previne interferência no Mac
  win.setMenuBarVisibility(false);

  // Carrega o app
  win.loadFile(path.join(__dirname, "index.html"));

  // Eventos IPC do preload → janela
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });

  ipcMain.on("close-window", () => {
    win.close();
  });
}

// App pronto
app.whenReady().then(() => {
  createWindow();

  // Comportamento de ativação no macOS (abre janela ao clicar no ícone)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Garante que o app aparece no Dock e abre focado (resolve bug do FocusLove)
app.on("ready", () => {
  if (app.dock) app.dock.show();
});

// Fechar no Windows, mas manter no Dock do Mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
