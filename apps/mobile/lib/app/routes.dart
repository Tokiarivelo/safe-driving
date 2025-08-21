import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/auth/auth_view.dart';
import 'package:safe_driving/presentation/interactive_menu/interactive_menu_view.dart';
import 'package:safe_driving/shared/widgets/interactive_menus/driver_interactive_menu_widget.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String menu = '/menu';
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthView(),
    menu: (context) => const InteractiveMenuView(),
  };
}
