package com.hona.android.interfaces

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast

//Web和App交互接口，可以调用Android原生方法
class WebInterface(private val context: Context) {
  //高级版本打特性，才能在Window的Android对象中访问到这个方法
  @JavascriptInterface
  fun showToast(toast: String) {
    Toast.makeText(context, toast, Toast.LENGTH_LONG).show()
  }
}