let windowStore = {
  bounds: null,
  isMaximized: false,
  initWindow() {
    if (!windowStore.bounds) {
      //默认大小
      windowStore.bounds = {width: 1000, height: 800};
      //未全屏
      windowStore.isMaximized = false
    }
  },
  setBounds(bounds) {
    windowStore.bounds = bounds
  },
  bindEvents(win) {
    //最大化窗口
    if (windowStore.isMaximized) {
      win.maximize()
    }
    win.show() //防止窗口黑框闪现

    //保存窗口大小
    win.on('close', (event) => {
      if (win.isMaximized()) {
        windowStore.isMaximized = true
      } else {
        windowStore.isMaximized = false
        let bounds = win.getBounds()
        windowStore.setBounds(bounds)
      }
    })
  },
}

module.exports = windowStore