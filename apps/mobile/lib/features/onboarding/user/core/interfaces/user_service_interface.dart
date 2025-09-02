import 'package:flutter/material.dart';
import '../../models/user_onboarding_step_model.dart';

abstract class IUserOnboardingService {
  Future<bool> requestGpsPermission(BuildContext context);

  Future<bool> requestNotificationPermission(
    BuildContext context,
    List<String> selectedNotifications,
  );

  Future<void> saveUserPreferences(AppState state);

  Future<AppState?> loadUserPreferences();

  Future<void> completeOnboarding(BuildContext context);
}

