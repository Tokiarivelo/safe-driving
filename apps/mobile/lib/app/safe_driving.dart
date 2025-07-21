import 'package:flutter/material.dart';
import 'package:safe_driving/app/routes.dart';

class SafeDriving extends StatelessWidget {
  const SafeDriving({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Safe Driving',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Inder',
      ),
      initialRoute: AppRoutes.auth,
      routes: AppRoutes.routes,
    );
  }
}
