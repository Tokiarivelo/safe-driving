import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/auth/screens/auth_screen.dart';
import 'package:safe_driving/presentation/onboarding/user/ui/views/user_onboarding_screen.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String onboarding = '/onboarding';
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthScreen(),
    onboarding: (context) => const UserOnboardingScreen(),
  };
}
