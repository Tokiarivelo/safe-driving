import 'package:flutter/material.dart';
import '../../widgets/auth/auth_widget.dart';
import '../../../models/auth_request.dart';
import '../../../../../shared/state_management/providers.dart';
import '../../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class SignupView extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onRegistrationSuccess;

  const SignupView({
    super.key,
    this.onNavigateToLogin,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onRegistrationSuccess,
  });

  @override
  State<SignupView> createState() => _SignupViewState();
}

class _SignupViewState extends State<SignupView> {
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

    final success = await auth.register(request);

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
