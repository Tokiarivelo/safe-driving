import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../core/interfaces/user_service_interface.dart';
import '../data/user_data_source_interface.dart';
import '../../../../shared/widgets/customs/buttons/utils/permission_handlers.dart';
import '../ui/screens/user_welcome_screen.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_client.dart';
import 'package:safe_driving/api/graph-ql/mutations.dart';
import 'package:safe_driving/features/onboarding/driver/core/interfaces/driver_service_interface.dart';

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
    } catch (_) {}
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
      if (_dataSource != null) {
        await _dataSource.completeOnboarding('current');
      }
    } catch (_) {}

    // Ensure role USER is persisted and a QR code is created for the current user
    try {
      final svc = ServiceLocator.instance.get<IDriverService>();
      await svc.setUserRole(isDriver: false);
    } catch (_) {}
    try {
      // Generate and persist a personal QR code (server-side stores it)
      final client = GraphQLClientWrapper.instance;
      await client.executeMutation(
        document: createUserQrMutation,
        variables: const {'type': 'png'},
      );
    } catch (_) {}

    if (!context.mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const UserWelcomeScreen()),
    );
  }
}
