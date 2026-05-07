const { app, BrowserWindow } = require('electron')
const path = require('path')

let win

function createWindow() {
  const indexPath = path.join(__dirname, 'dist', 'index.html')

  win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile(indexPath)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
