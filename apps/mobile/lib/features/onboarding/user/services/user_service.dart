import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../core/interfaces/user_service_interface.dart';
import '../data/user_data_source_interface.dart';
import '../../../../shared/widgets/customs/buttons/utils/permission_handlers.dart';

class UserOnboardingService implements IUserOnboardingService {
  final IUserDataSource? _dataSource;

  UserOnboardingService([this._dataSource]);

  @override
  Future<bool> requestGpsPermission(BuildContext context) async {
    return await PermissionHandlers.handleGpsPermission(context);
  }

  @override
  Future<bool> requestNotificationPermission(
    BuildContext context,
    List<String> selectedNotifications,
  ) async {
    return await PermissionHandlers.handleNotificationPermissions(
      context,
      selectedNotifications,
    );
  }

  @override
  Future<void> saveUserPreferences(AppState state) async {
    if (_dataSource == null) return;
    try {
      await _dataSource.savePreferences(
        userId: 'current',
        preferences: {
          'gpsEnabled': state.gpsEnabled,
          'notifEnabled': state.notifEnabled,
          'selectedTheme': state.selectedTheme,
          'selectedTransports': state.selectedTransports,
          'selectedLanguage': state.selectedLanguage,
        },
      );
    } catch (_) {
      // Ignore until concrete implementation is ready
    }
  }

  @override
  Future<AppState?> loadUserPreferences() async {
    if (_dataSource == null) return null;
    try {
      final data = await _dataSource.getOnboardingData('current');
      return AppState(
        gpsEnabled: data['gpsEnabled'] as bool? ?? false,
        notifEnabled: data['notifEnabled'] as bool? ?? false,
        selectedTheme: data['selectedTheme'] as String? ?? 'Clair',
        selectedTransports:
            (data['selectedTransports'] as List?)?.cast<String>() ?? const [],
        selectedLanguage: data['selectedLanguage'] as String? ?? 'fr',
      );
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> completeOnboarding(BuildContext context) async {
    try {
      if (_dataSource != null) {}
    } catch (_) {
      // Backend completion is optional for now; proceed with navigation
    }
    if (!context.mounted) return;
    Navigator.pushReplacementNamed(context, '/home');
  }
}
