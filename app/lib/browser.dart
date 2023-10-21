import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class Browser extends StatelessWidget {
  const Browser({Key key, this.url}) : super(key: key);

  final String url;

  @override
  Widget build(BuildContext context) {
    WebViewController _webViewController;

    return WillPopScope(
        child: Scaffold(
          appBar: PreferredSize(
            preferredSize:
                Size.fromHeight(MediaQuery.of(context).size.height * 0.07),
            child: SafeArea(
              top: true,
              child: Offstage(),
            ),
          ), //预留出状态栏的高度
          body: WebView(
            initialUrl: url,
            javascriptMode: JavascriptMode.unrestricted,
            onWebViewCreated: (WebViewController webViewController) {
              _webViewController = webViewController;
            },
          ),
        ),
        //监听返回事件，并调用WebView的返回
        onWillPop: () {
          Future<bool> result;
          _webViewController.canGoBack().then((s) {
            print('可以返回');
            _webViewController.goBack();
            result = Future.value(false); //返回false表示阻止返回
          }).catchError((error) {
            print('不可以返回');
            result = Future.value(true);
          });
          return result;
        });
  }
}
