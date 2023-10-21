// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {menuStore} = require('./store')

menuStore.triggerContextMenu()

const {contextBridge, ipcRenderer, remote} = require('electron')

//暴露ipcRenderer给渲染进程
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);