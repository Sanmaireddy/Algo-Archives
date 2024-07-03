const { ipcMain } = require("electron");
const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const { names } = require("./models/dbmgr");

const isDev = 1;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenu(null);

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./test/build/index.html")}`
  );

  let wc = win.webContents;
  wc.openDevTools(); //in dev mood used to debug
}

app.whenReady().then(() => {
  ipcMain.handle("get-names", async () => {
    return await names();
  });
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
