import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/ui/screens/auth_screen.dart';
import 'package:safe_driving/features/authentication/ui/screens/auth_loading_screen.dart';
import 'package:safe_driving/features/home/message/ui/screens/message_screens.dart';
import 'package:safe_driving/features/onboarding/driver/ui/screens/driver_onboarding_screen.dart';
import 'package:safe_driving/features/onboarding/onboarding_screen.dart';
import 'package:safe_driving/features/onboarding/user/ui/screens/user_onboarding_screen.dart';
import 'package:safe_driving/features/home/acceuil/ui/screens/exemple_page.dart';
import 'package:safe_driving/features/home/acceuil/ui/screens/home_screen.dart';
import 'package:safe_driving/features/home/map/ui/screens/map_screen.dart';
import 'package:safe_driving/features/home/map/ui/widgets/map_view.dart';
import 'package:safe_driving/features/scan_session/ui/screens/scan_user_page.dart';
import 'package:latlong2/latlong.dart';

class AppRoutes {
  static const String loading = '/';
  static const String auth = '/auth';
  static const String onboarding = "/onboarding";
  static const String useronboarding = '/user_onboarding';
  static const String driveronboarding = '/driver_onboarding';
  static const String home = '/home';
  static const String exemple = '/exemple';
  static const String message = '/message';
  static const String map = '/map';
  static const String searchTransport = '/home/search_transport';
  static const String scanSession = '/scan_session';

  static Map<String, WidgetBuilder> routes = {
    loading: (context) => const AuthLoadingScreen(),
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
    exemple: (context) => const ExamplePage(),
    message: (context) => const MessageScreen(),
    map: (context) => const MapScreen(),
    searchTransport: (context) {
      final args = ModalRoute.of(context)?.settings.arguments;
      LatLng? initialCenter;
      bool openFilters = false;
      if (args is Map) {
        final m = args.cast<String, dynamic>();
        final c = m['initialCenter'];
        if (c is LatLng) initialCenter = c;
        final o = m['openFilters'];
        if (o is bool) openFilters = o;
      }
      return MapView(initialCenter: initialCenter, openFilters: openFilters);
    },
    scanSession: (context) {
      final args = ModalRoute.of(context)?.settings.arguments;
      String sessionId = '';
      if (args is Map) {
        final m = args.cast<String, dynamic>();
        final s = m['sessionId'];
        if (s is String) sessionId = s;
      }
      return ScanUserPage(sessionId: sessionId);
    },
  };
}
