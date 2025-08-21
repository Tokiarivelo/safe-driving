import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../../../../shared/widgets/customs/buttons/utils/permission_handlers.dart';

class UserOnboardingService {
  static Future<bool> requestGpsPermission(BuildContext context) async {
    return await PermissionHandlers.handleGpsPermission(context);
  }

  static Future<bool> requestNotificationPermission(
    BuildContext context,
    List<String> selectedNotifications,
  ) async {
    return await PermissionHandlers.handleNotificationPermissions(
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
