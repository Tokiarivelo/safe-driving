import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/auth/screens/auth_screen.dart';
import 'package:safe_driving/presentation/interactive_menu/interactive_menu_view.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String menu = '/menu';
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthScreen(),
    menu: (context) => const InteractiveMenuView(),
  };
}
