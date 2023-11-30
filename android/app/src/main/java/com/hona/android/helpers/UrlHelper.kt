package com.hona.android.helpers

//Url帮助类
class UrlHelper {
  //同伴对象，用于写静态方法
  companion object {
    //判断指定地址是否是http或https
    fun isHttpOrHttps(url: String): Boolean {
      var result = url.startsWith("http://") || url.startsWith("https://")
      return result
    }
  }
}