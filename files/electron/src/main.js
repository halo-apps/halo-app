const env = require('../env/index')
const {app, ipcMain, BrowserWindow} = require('electron')
const proc = require('child_process')
const path = require('path')
const {menuStore, windowStore} = require('./store')

//创建窗体
function createWindow() {
  //使用__dirname和path.resolve时，不会以静态目录形式包含被引用的文件夹
  //使用extraResources配置额外不需要打包的文件，并且直接拷贝到resources目录的指定位置
  //切换.net5执行exe时的目录，防止.net5的默认目录变为cmd当前目录

  proc.spawn(env.exe, {cwd: env.directory})//后台启动api，并指定子进程的当前工作目录
  // exec(`start ${config.api}`)//前台启动API

  windowStore.initWindow()
  menuStore.initMenu()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: windowStore.bounds.width,
    height: windowStore.bounds.height,
    show: false, //窗口创建的时候不显示，创建完毕才显示
    frame: false,
    icon: path.resolve(__dirname, '../public/favicon.ico'),
    backgroundColor: '#ededf3',
    webPreferences: {
      // nodeIntegration: true,//启用nodejs集成，防止render 进程中提示：require is undefined
      // contextIsolation: true,//不进行上下文隔离
      // enableRemoteModule: true,//启用remote模块，否则remote is undefined
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('public/index.html')
  windowStore.bindEvents(mainWindow)

  // 打开开发者工具
  if (env.env == 'dev') {
    mainWindow.webContents.openDevTools()
  }
}

//忽略自签名证书错误
app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//最小化
ipcMain.on('min', function (res) {
  let win = BrowserWindow.getFocusedWindow()
  win.minimize()
})
//最大化
ipcMain.on('max', function (res) {
  let win = BrowserWindow.getFocusedWindow()
  win.maximize();//最大化窗口
})
//恢复
ipcMain.on('restore', function (res) {
  let win = BrowserWindow.getFocusedWindow()
  win.restore();//恢复原窗口大小
})
//关闭
ipcMain.on('close', function (res) {
  app.quit()
})