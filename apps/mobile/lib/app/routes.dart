import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/auth/auth_view.dart';

class AppRoutes {
  static const String auth = '/auth';
  
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthView(),
  };
}
