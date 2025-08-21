import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/authentification/ui/screens/auth_screen.dart';
import 'package:safe_driving/presentation/onboarding/driver/ui/views/driver_onboarding_screen.dart';

import 'package:safe_driving/presentation/onboarding/user/ui/screens/user_onboarding_screen.dart';

class AppRoutes {
  static const String auth = '/auth';

  static const String useronboarding = '/user_onboarding';
  static const String driveronboarding = '/driver_onboarding';
  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthScreen(),

    useronboarding: (context) => const UserOnboardingScreen(),
    driveronboarding: (context) => const DriverOnboardingScreen(),
  };
}
