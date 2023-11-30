import android.content.Context
import android.graphics.Color
import android.webkit.WebSettings
import android.webkit.WebView
import com.hona.android.clients.ChromeClient
import com.hona.android.clients.ViewClient
import com.hona.android.interfaces.WebInterface

//WebView帮助类
class WebHelper {
  companion object {
    //初始化WebView
    fun initWebView(webView: WebView, context: Context) {
      WebView.setWebContentsDebuggingEnabled(true)

      //更改WebView配置
      var settings = webView.settings
      settings.javaScriptEnabled = true
      settings.databaseEnabled = true
      settings.blockNetworkLoads = false
      settings.domStorageEnabled = true

      settings.allowFileAccess = false
      settings.allowContentAccess = false
      settings.setSupportZoom(true)
      //settings.allowFileAccessFromFileURLs = true
      //settings.allowUniversalAccessFromFileURLs = true
      settings.userAgentString = "chrome"
      settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

      //TODO Google教程文档：https://developer.android.google.cn/guide/webapps?hl=zh-cn

      //注册js调用安卓原生方法入口，第二个参数是注册到Window上的对象名称
      webView.addJavascriptInterface(WebInterface(context), "Android")

      //创建WebViewClient
      webView.webViewClient = ViewClient(context)

      //安卓2.1（API7）及以上版本，必须重写WebChromeClient的onConsoleMessage方法，才能在logcat中显示网页console消息
      webView.webChromeClient = ChromeClient()

      //设置WebView背景色，防止网页加载前WebView区域出现白屏
      webView.setBackgroundColor(Color.parseColor("#121212"))

      //此时，已可以加载首页html文件，但是内部js脚本无法加载
      //  mapOf<String, String>("host" to "https://tool-dev.honastar.com")
      //表示整个站点实际运行在/assets/目录中
      webView.loadUrl("https://appassets.androidplatform.net/assets/index.html")
      // webView.loadUrl("file:///android_asset/index.html")
    }
  }
}