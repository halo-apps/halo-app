package com.hona.android.clients

import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient

//ChromeClient，拦截并输出控制台日志
class ChromeClient : WebChromeClient() {
  //安卓2.1（API7）及以上版本，必须重写WebChromeClient的onConsoleMessage方法，才能在logcat中显示网页console消息
  override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
    consoleMessage?.apply {
      Log.d("onConsoleMessage", "${message()} -- From line ${lineNumber()} of ${sourceId()}")
    }
    return true
  }
}
