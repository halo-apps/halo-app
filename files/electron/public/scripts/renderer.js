// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//是否会产生内存泄漏？？
// const {ipcRenderer, remote} = require('electron')

let minBtn = document.querySelector('.min')
minBtn.onclick = function () {
  ipcRenderer.send('min', "执行最小化")
}

//恢复
let restoreBtn = document.querySelector('.restore')
restoreBtn.onclick = function () {
  ipcRenderer.send('restore')
  maxBtn.style.display = 'block'
  restoreBtn.style.display = 'none'
}

//最大化
let maxBtn = document.querySelector('.max')
maxBtn.onclick = function () {
  ipcRenderer.send('max')
  maxBtn.style.display = 'none'
  restore.style.display = 'block'
}

let closeBtn = document.querySelector('.close')
closeBtn.onclick = function () {
  ipcRenderer.send('close', "执行关闭")
}

//设置内部应用页面样式
let iframe = document.querySelector('iframe')
iframe.onload = e => {
  let head = iframe.contentDocument.head
  let style = document.createElement('style')
  style.innerHTML = '.header-right{padding-right:144px;}'
  head.appendChild(style);
}