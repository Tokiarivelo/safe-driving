import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../../../../shared/widgets/customs/buttons/buttons_widget.dart';

class UserOnboardingService {
  static Future<bool> requestGpsPermission(BuildContext context) async {
    return await ButtonsWidget.handleGpsPermission(context);
  }

  static Future<bool> requestNotificationPermission(
    BuildContext context,
    List<String> selectedNotifications,
  ) async {
    return await ButtonsWidget.handleNotificationPermissions(
      context,
      selectedNotifications,
    );
  }

  static Future<void> saveUserPreferences(AppState state) async {}

  static Future<AppState?> loadUserPreferences() async {
    return null;
  }

  static void completeOnboarding(BuildContext context) {
    Navigator.pushReplacementNamed(context, '/home');
  }
}
