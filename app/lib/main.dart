import 'package:flutter/material.dart';
import 'browser.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hona框架', //最近打开应用的标题
      theme: ThemeData(primarySwatch: Colors.blue),
      home: MyHomePage(title: 'Hona'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Widget broswer;

  @override
  Widget build(BuildContext context) {
    if (broswer == null)
      broswer = new Browser(url: 'http://47.105.68.25/mobile');
    return broswer;
  }

  @override
  void dispose() {
    super.dispose();
  }
}
