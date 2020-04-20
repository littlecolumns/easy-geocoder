const { app, BrowserWindow } = require("electron");
const path = require("path");

// https://www.electronjs.org/docs/all
app.allowRendererProcessReuse = true;

function setAbout() {
  if (app.setAboutPanelOptions)
    app.setAboutPanelOptions({
      applicationName: "Easy Geocoder",
      copyright: "(c) 2020 Little Columns LLC",
      credits: "Jonathan Soma",
      authors: ["Jonathan Soma"],
      website: "https://littlecolumns.com",
    });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let watcher;
if (process.env.NODE_ENV === "development") {
  watcher = require("chokidar").watch(path.join(__dirname, "../public/build"), {
    ignoreInitial: true,
  });
  watcher.on("change", () => {
    mainWindow.reload();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    backgroundColor: "#39375b",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  //   mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${path.join(__dirname, "../public/index.html")}`);
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (watcher) {
      watcher.close();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (require("electron-squirrel-startup")) return app.quit();

  createWindow();
  setAbout();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  // if (process.platform !== "darwin") {
  app.quit();
  // }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
