const {BrowserWindow, Menu, ipcMain, ipcRenderer} = require('electron')

//设置窗口菜单
function initMenu() {
  //隐藏工具栏
  let menu = new Menu()
  // menu.append(new MenuItem({
  //     label: 'Electron', type: 'checkbox', checked: true, click: function () {
  //         console.log('click')
  //     },
  // }))
  // Menu.setApplicationMenu(null)
  initContextMenu()
}

//初始化上下文菜单
function initContextMenu() {
  // 右键菜单
  let contextMenuTemplate = [
    {label: '复制', role: 'copy',},
    {label: '粘贴', role: 'paste',},
    {type: 'separator',},  // 分隔线
    {label: '全选', role: 'selectall',},
  ];
  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

  // 监听右键事件
  ipcMain.on('contextMenu', () => {
    contextMenu.popup(BrowserWindow.getFocusedWindow());
  });
}

//右键事件触发
function triggerContextMenu() {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    ipcRenderer.send('contextMenu')
  })
}

//菜单功能
module.exports = {
  initMenu,
  triggerContextMenu,
}