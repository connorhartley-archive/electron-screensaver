const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const GlobalShortcut = electron.globalShortcut

const path = require('path')
const url = require('url')

let hidden = true;

function createWindow () {
  let windows = [];

  const closeCommand = GlobalShortcut.register('Function+F5', () => {
    if (hidden) {
      windows.forEach((window) => {
          window.show();
      })
      hidden = false;
    } else {
      windows.forEach((window) => {
          window.hide();
      })
      hidden = true;
    }
  })

  let displays = electron.screen.getAllDisplays()

  displays.forEach((display) => {
    // Create the browser window.
    let window = new BrowserWindow({
      x: display.bounds.x + 50,
      y: display.bounds.y + 50,

      fullscreen: true,
      alwaysOnTop: true,
      autoHideMenuBar: true})

    window.setMenu(null);

    // and load the index.html of the app.
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    windows.push(window);

    window.hide();

    // Emitted when the window is closed.
    window.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window = null
    })
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
