import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/colors/colors_widget.dart';

class TestView extends StatefulWidget {
  const TestView({ super.key });

  @override
  TestViewState createState() => TestViewState();
}

class TestViewState extends State<TestView> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
        decoration: ColorsWidget.background,
        child: Center(child: Text("Tongasoa ianao",style: TextStyle(color: Colors.white),)),
    );
  }
}