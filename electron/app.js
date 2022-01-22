const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth : 1400,
    minHeight:1000,
    icon: __dirname + '/coffee.ico'
    
  })
  mainWindow.maximize()
  // mainWindow.webContents.openDevTools();
  // mainWindow.removeMenu();
  // and load the index.html of the app.
//   mainWindow.loadFile(__dirname + '/static/index.html')
  mainWindow.loadURL('http://localhost:8000/')
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const { exec } = require('child_process');
const mypath = __dirname + '/manage/manage.exe'
exec(`"${mypath}" migrate`)
exec(`"${mypath}" runserver`)



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
  if (process.platform !== 'darwin'){
    // db.close((err)=>{
    //   if(err){
    //     console.log(err)
    //   }
    // });
    app.quit();
    
    exec('taskkill /f /t /im manage.exe', (err, stdout, stderr) => {
      if (err) {
       console.log(err)
      return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
     });
  } 
  
})