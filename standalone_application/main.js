// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = !app.isPackaged;

//=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=xx=x=x=x=xWhen server is compltedx=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=xx=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x=x
// const backend = path.join(process.cwd(), './backend/dist/server.exe')  // when electron is completed and building package  change its path to server .exe


// var execfile = require('child_process').execFile;
// execfile(
//   backend,
//   {
//     windowsHide: true,
//   },
//   (err, stdout, stderr) => {
//     if (err) {
//       console.log(err);
//     }
//     if (stdout) {
//       console.log(stdout);
//     }
//     if (stderr) {
//       console.log(stderr);
//     }
//   }
// )

var python = require('child_process').spawn('py', ['./server/app.py']);
python.stdout.on('data', function (data) {
  console.log("data: ", data.toString('utf8'));
});
python.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`); // when error
});

function createWindow() {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#2b2e3b",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    const { exec } = require('child_process');
    exec('taskkill /f /t /im server.exe', (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//reloading electron app
if (isDev)
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron")
  })


