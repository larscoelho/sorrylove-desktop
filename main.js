const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 640,
    resizable: false,
    fullscreenable: false,
    backgroundColor: "#0c1020",
    title: "SorryLove",
    titleBarStyle: "hiddenInset",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, "index.html"));
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
