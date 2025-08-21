import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/authentification/ui/screens/auth_screen.dart';
import 'package:safe_driving/presentation/onboarding/user/ui/screens/user_onboarding_screen.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String onboarding = '/onboarding';
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthScreen(),
    onboarding: (context) => const UserOnboardingScreen(),
  };
}
