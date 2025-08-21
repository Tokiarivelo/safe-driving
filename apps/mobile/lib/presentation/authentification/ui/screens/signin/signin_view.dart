import 'package:flutter/material.dart';
import '../../widgets/auth/auth_widget.dart';
import '../../../../../shared/state_management/providers.dart';
import '../../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class SigninView extends StatefulWidget {
  final VoidCallback? onNavigateToRegister;
  final VoidCallback? onNavigateToForgotPassword;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;

  const SigninView({
    super.key,
    this.onNavigateToRegister,
    this.onNavigateToForgotPassword,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
  });

  @override
  State<SigninView> createState() => _SigninViewState();
}

class _SigninViewState extends State<SigninView> {
  Future<void> _handleSignIn(String email, String password) async {
    final auth = context.authVM;

    final success = await auth.login(email, password);

    if (!mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(context, 'Connexion réussie !');
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ?? 'Email ou mot de passe invalide',
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
      isLogin: true,
      isForgotPassword: false,
      onForgotPassword: widget.onNavigateToForgotPassword,
      onSignIn: _handleSignIn,
      onGoogleSignIn: _handleGoogleSignIn,
      onFacebookSignIn: _handleFacebookSignIn,
      onNavigateToRegister: widget.onNavigateToRegister,
    );
  }
}
