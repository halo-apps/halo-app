package com.hona.android.clients

import android.content.Context
import android.util.Log
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.webkit.WebViewAssetLoader

//框架WebView客户端
class ViewClient : WebViewClient {
  private var context: Context
  private var assetLoader: WebViewAssetLoader

  constructor(applicationContext: Context) {
    context = applicationContext

    assetLoader =
      WebViewAssetLoader.Builder().setHttpAllowed(true).setDomain("appassets.androidplatform.net")
        .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context)).build();
  }

  //加载远程资源时触发
  override fun onLoadResource(view: WebView?, url: String?) {
    super.onLoadResource(view, url)
  }

  //拦截请求
  override fun shouldInterceptRequest(
    view: WebView?, request: WebResourceRequest?
  ): WebResourceResponse? {
    if (request == null) throw Exception("shouldInterceptRequest的request为空")

    // 会自动使用WebViewAssetLoader加载资源文件
    var response = assetLoader.shouldInterceptRequest(request.url)
    //如果WebViewAssetLoader没有找到资源，那么WebView会回退到从互联网加载内容
    return response
  }

  override fun onReceivedError(
    view: WebView?, request: WebResourceRequest?, error: WebResourceError?
  ) {
    if (request == null) throw Exception("shouldInterceptRequest的request为空")

    val msg =
      "onReceivedError:" + request?.url + " " + error?.errorCode.toString() + " " + error?.description.toString()
    Toast.makeText(context, msg, Toast.LENGTH_LONG).show()
    Log.d("onReceivedError", msg)
//    AlertDialog.Builder(context).setTitle("onReceivedError")
//      .setMessage(request.url.toString()).show()
    super.onReceivedError(view, request, error)
  }
}