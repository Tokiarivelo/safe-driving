import 'package:flutter/material.dart';
// import 'package:path/path.dart';
import 'package:safe_driving/features/authentication/ui/screens/auth_screen.dart';
import 'package:safe_driving/features/onboarding/driver/ui/screens/driver_onboarding_screen.dart';
import 'package:safe_driving/features/onboarding/onboarding_screen.dart';

import 'package:safe_driving/features/onboarding/user/ui/screens/user_onboarding_screen.dart';
//-------
import 'package:safe_driving/features/home/ui/screens/home_screen.dart';
// import 'package:safe_driving/features/home/ui/screens/exemple_page.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String onboarding = "/onboarding";
  static const String useronboarding = '/user_onboarding';
  static const String driveronboarding = '/driver_onboarding';
  //------
  static const String home = '/home';
  static const String exemple = '/exemple';

  static Map<String, WidgetBuilder> routes = {
    auth: (context) => const AuthScreen(),
    onboarding: (context) => OnboardingScreen(
      onUserPressed: () {
        Navigator.pushNamed(context, useronboarding);
      },
      onDriverPressed: () {
        Navigator.pushNamed(context, driveronboarding);
      },
    ),
    useronboarding: (context) => const UserOnboardingScreen(),
    driveronboarding: (context) => const DriverOnboardingScreen(),
    home: (context) => const HomeScreen(),
    // home: (context) => const HomeScreen(),
    // exemple: (context) => const ExamplePage(),
  };
}
