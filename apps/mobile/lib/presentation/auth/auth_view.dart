import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/auth/auth_widget.dart';
import 'package:safe_driving/models/auth/auth_model.dart';
import 'package:safe_driving/shared/state_management/state.dart';
import 'package:safe_driving/shared/widgets/snackbar/snackbar_helper.dart';

class AuthView extends StatefulWidget {
  const AuthView({super.key});

  @override
  State<AuthView> createState() => _AuthViewState();
}

class _AuthViewState extends State<AuthView> {
  int _currentIndex = 0;

  void _navigateTo(int index) {
    if (mounted) {
      setState(() => _currentIndex = index);
    }
  }

  void _navigateToLogin() => _navigateTo(0);
  void _navigateToRegister() => _navigateTo(1);
  void _navigateToForgotPassword() => _navigateTo(2);

  Future<void> _handleSignIn(String email, String password) async {
    final auth = context.authVM;

    final success = await auth.login(email, password);

    if (!mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(context, 'Connexion réussie !');
      // affichage du next screen
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ?? 'Email ou mot de passe invalide',
      );
    }
  }

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
      _navigateToLogin();
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ?? 'Erreur lors de l\'inscription',
      );
    }
  }

  void _handleResetPassword(String email) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Mbola tsy vita lol, miandry server'),
        backgroundColor: Colors.orange,
      ),
    );
  }

  void _handleGoogleSignIn() {
    if (!mounted) return;
    SnackbarHelper.showInfo(context, 'Connexion Google non encore implémentée');
  }

  void _handleFacebookSignIn() {
    if (!mounted) return;
    SnackbarHelper.showInfo(context, 'Connexion Facebook non encore implémentée');
  }

  Widget _buildAuthWidget() {
    switch (_currentIndex) {
      case 0:
        return AuthWidget(
          isLogin: true,
          isForgotPassword: false,
          onForgotPassword: _navigateToForgotPassword,
          onSignIn: _handleSignIn,
          onGoogleSignIn: _handleGoogleSignIn,
          onFacebookSignIn: _handleFacebookSignIn,
          onNavigateToRegister: _navigateToRegister,
        );
      case 1:
        return AuthWidget(
          isLogin: false,
          isForgotPassword: false,
          onForgotPassword: _navigateToForgotPassword,
          onSignUp: _handleSignUp,
          onGoogleSignIn: _handleGoogleSignIn,
          onFacebookSignIn: _handleFacebookSignIn,
          onNavigateToLogin: _navigateToLogin,
        );
      case 2:
        return AuthWidget(
          isLogin: false,
          isForgotPassword: true,
          onResetPassword: _handleResetPassword,
          onNavigateToLogin: _navigateToLogin,
          onSignIn: (_, __) => _navigateToLogin(),
          onSignUp: (_, __, ___, ____) => _navigateToRegister(),
        );
      default:
        return const SizedBox.shrink();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildAuthWidget(),
    );
  }
}
