import 'package:flutter/material.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../../shared/state_management/providers.dart';
import 'package:safe_driving/app/routes.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/api/graph-ql/queries.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/features/onboarding/driver/core/interfaces/driver_service_interface.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';

class SigninViewModel extends ChangeNotifier {
  BuildContext? _context;

  void setContext(BuildContext context) {
    _context = context;
  }

  Future<void> handleSignIn(String email, String password) async {
    if (_context == null) return;

    final auth = _context!.authVM;

    final success = await auth.signIn(email, password);

    if (success) {
      bool hasRole = false;
      Map<String, dynamic>? meUser;
      try {
        final me = await GraphQLClientWrapper.instance.executeQuery(
          document: meFullQuery,
          variables: const {},
        );
        meUser = me['me'] as Map<String, dynamic>?;
        final role = (meUser != null) ? (meUser['role'] as String?) : null;
        hasRole = role != null && role.trim().isNotEmpty;
        if (!hasRole && meUser != null) {
          final roles = meUser['Role'] as List<dynamic>?;
          hasRole = roles != null && roles.isNotEmpty;
        }
      } catch (_) {
        hasRole = false;
      }
      if (!hasRole) {
        try {
          final session = ServiceLocator.instance.get<SessionService>();
          final pending = session.pendingRole;
          if (pending != null && pending.isNotEmpty) {
            final svc = ServiceLocator.instance.get<IDriverService>();
            await svc.setUserRole(isDriver: pending == 'DRIVER');
            await session.clearPendingRole();
            final me2 = await GraphQLClientWrapper.instance.executeQuery(
              document: meFullQuery,
              variables: const {},
            );
            meUser = me2['me'] as Map<String, dynamic>?;
            final role2 = (meUser != null) ? (meUser['role'] as String?) : null;
            hasRole = role2 != null && role2.trim().isNotEmpty;
            if (!hasRole && meUser != null) {
              final roles2 = meUser['Role'] as List<dynamic>?;
              hasRole = roles2 != null && roles2.isNotEmpty;
            }
          }
        } catch (_) {}
      }
      if (!hasRole) {
        Navigator.pushReplacementNamed(_context!, AppRoutes.onboarding);
        return;
      }

      final bool isVerified = meUser != null && (meUser['isVerified'] == true);
      if (!isVerified) {
        Navigator.pushReplacementNamed(_context!, AppRoutes.onboarding);
        return;
      }

      bool completed = false;
      try {
        final resp = await GraphQLClientWrapper.instance.executeQuery(
          document: getUserPreferencesQuery,
          variables: const {},
        );
        final pref = (resp['userPreference'] ?? resp['userPreferences']);
        if (pref is Map<String, dynamic>) {
          final cgu = pref['cguAccepted'] == true;
          final privacy = pref['privacyPolicyAccepted'] == true;
          completed = cgu && privacy;
        }
      } catch (_) {
        completed = false;
      }

      if (completed) {
        Navigator.pushReplacementNamed(_context!, AppRoutes.home);
      } else {
        Navigator.pushReplacementNamed(_context!, AppRoutes.onboarding);
      }
    } else {
      SnackbarHelper.showError(
        _context!,
        auth.errorMessage ?? 'Email ou mot de passe invalide',
      );
    }
  }

  void handleGoogleSignIn(VoidCallback? onGoogleSignIn) {
    if (_context == null) return;

    if (onGoogleSignIn != null) {
      onGoogleSignIn();
    } else {
      SnackbarHelper.showInfo(
        _context!,
        'Connexion Google non encore implémentée',
      );
    }
  }

  void handleFacebookSignIn(VoidCallback? onFacebookSignIn) {
    if (_context == null) return;

    if (onFacebookSignIn != null) {
      onFacebookSignIn();
    } else {
      SnackbarHelper.showInfo(
        _context!,
        'Connexion Facebook non encore implémentée',
      );
    }
  }
}
