import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_request.dart';
import '../widgets/auth/auth_widget.dart';

import '../../../../shared/state_management/providers.dart';
import '../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/onboarding/driver/core/interfaces/driver_service_interface.dart';

class SignUpScreen extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onRegistrationSuccess;

  const SignUpScreen({
    super.key,
    this.onNavigateToLogin,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onRegistrationSuccess,
  });

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  Future<void> _handleSignUp(
    String firstName,
    String lastName,
    String email,
    String password,
  ) async {
    final auth = context.authVM;

    final request = SignUpRequest(
      email: email,
      firstName: firstName,
      lastName: lastName.isNotEmpty ? lastName : 'Non spécifié',
      password: password,
    );

    final success = await auth.signUp(request);

    if (!mounted) return;

    if (success) {
      // CRITICAL: Auto-login after signup so GraphQL mutations work
      bool loginSuccess = false;
      try {
        loginSuccess = await auth.signIn(email, password);
        if (!loginSuccess && mounted) {
          SnackbarHelper.showWarning(
            context,
            'Inscription réussie mais connexion automatique échouée. Veuillez vous connecter.',
          );
        }
      } catch (e) {
        if (mounted) {
          SnackbarHelper.showWarning(
            context,
            'Inscription réussie. Connexion auto échouée: $e',
          );
        }
      }

      // If we successfully auto-logged in, apply any pending role (USER or DRIVER)
      if (loginSuccess) {
        try {
          final session = ServiceLocator.instance.get<SessionService>();
          final pending = session.pendingRole;
          if (pending != null && pending.isNotEmpty) {
            final svc = ServiceLocator.instance.get<IDriverService>();
            await svc.setUserRole(isDriver: pending == 'DRIVER');
            await session.clearPendingRole();
          }
        } catch (_) {}
      }

      try {
        final session = ServiceLocator.instance.get<SessionService>();
        await session.saveSignupInfo(
          firstName: firstName,
          lastName: lastName,
          email: email,
        );
      } catch (_) {}
      if (!mounted) return;
      if (widget.onRegistrationSuccess != null) {
        widget.onRegistrationSuccess!();
      } else if (widget.onNavigateToLogin != null) {
        widget.onNavigateToLogin!();
      }
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ?? 'Erreur lors de l\'inscription',
      );
    }
  }

  void _handleGoogleSignIn() {
    if (!mounted) return;
    if (widget.onGoogleSignIn != null) {
      widget.onGoogleSignIn!();
    } else {
      SnackbarHelper.showInfo(
        context,
        'Connexion Google non encore implémentée',
      );
    }
  }

  void _handleFacebookSignIn() {
    if (!mounted) return;
    if (widget.onFacebookSignIn != null) {
      widget.onFacebookSignIn!();
    } else {
      SnackbarHelper.showInfo(
        context,
        'Connexion Facebook non encore implémentée',
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthWidget(
      isLogin: false,
      isForgotPassword: false,
      onSignUp: _handleSignUp,
      onGoogleSignIn: _handleGoogleSignIn,
      onFacebookSignIn: _handleFacebookSignIn,
      onNavigateToLogin: widget.onNavigateToLogin,
    );
  }
}
