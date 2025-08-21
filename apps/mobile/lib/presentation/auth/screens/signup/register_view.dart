import 'package:flutter/material.dart';
import '../../widgets/auth/auth_widget.dart';
import '../../models/auth_models.dart';
import '../../../../shared/state_management/state.dart';
import '../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class RegisterView extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onRegistrationSuccess;

  const RegisterView({
    super.key,
    this.onNavigateToLogin,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onRegistrationSuccess,
  });

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  Future<void> _handleSignUp(
    String firstName,
    String lastName,
    String email,
    String password,
  ) async {
    final auth = context.authVM;

    final input = RegisterInput(
      email: email,
      firstName: firstName,
      lastName: lastName.isNotEmpty ? lastName : null,
      password: password,
    );

    final success = await auth.register(input);

    if (!mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(
        context,
        'Inscription réussie ! Vous pouvez maintenant vous connecter.',
      );
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
