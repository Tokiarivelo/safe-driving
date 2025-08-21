import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/auth/auth_widget.dart';
import 'package:safe_driving/models/auth/auth_model.dart';
import 'package:safe_driving/shared/state_management/state.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/shared/widgets/customs/animations/animation_widget.dart';

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

  Future<void> _handleResetPassword(
    String newPassword,
    String confirmPassword,
  ) async {
    if (!mounted) return;

    if (newPassword != confirmPassword) {
      SnackbarHelper.showError(
        context,
        'Les mots de passe ne correspondent pas',
      );
      return;
    }

    final auth = context.authVM;
    final success = await auth.resetPassword(newPassword);

    if (!mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(
        context,
        'Mot de passe réinitialisé avec succès',
      );
      _navigateToLogin();
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ??
            'Erreur lors de la réinitialisation du mot de passe',
      );
    }
  }

  void _handleGoogleSignIn() {
    if (!mounted) return;
    SnackbarHelper.showInfo(context, 'Connexion Google non encore implémentée');
  }

  void _handleFacebookSignIn() {
    if (!mounted) return;
    SnackbarHelper.showInfo(
      context,
      'Connexion Facebook non encore implémentée',
    );
  }

  Widget _buildAuthWidget() {
    switch (_currentIndex) {
      case 0: // Login
        return SmoothSlideTransition(
          key: const ValueKey('login'),
          direction: SlideDirection.fromLeft,
          child: AuthWidget(
            isLogin: true,
            isForgotPassword: false,
            onForgotPassword: _navigateToForgotPassword,
            onSignIn: _handleSignIn,
            onGoogleSignIn: _handleGoogleSignIn,
            onFacebookSignIn: _handleFacebookSignIn,
            onNavigateToRegister: _navigateToRegister,
          ),
        );
      case 1: // Register
        return SmoothSlideTransition(
          key: const ValueKey('register'),
          direction: SlideDirection.fromRight,
          child: AuthWidget(
            isLogin: false,
            isForgotPassword: false,
            onForgotPassword: _navigateToForgotPassword,
            onSignUp: _handleSignUp,
            onGoogleSignIn: _handleGoogleSignIn,
            onFacebookSignIn: _handleFacebookSignIn,
            onNavigateToLogin: _navigateToLogin,
          ),
        );
      case 2: // Forgot Password
        return SmoothSlideTransition(
          key: const ValueKey('forgot'),
          direction: SlideDirection.fromTop,
          child: AuthWidget(
            isLogin: false,
            isForgotPassword: true,
            onResetPassword: _handleResetPassword,
            onNavigateToLogin: _navigateToLogin,
            onSignIn: (_, _) => _navigateToLogin(),
            onSignUp: (_, _, _, _) => _navigateToRegister(),
          ),
        );
      default:
        return const SizedBox.shrink();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.color1,
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        transitionBuilder: (Widget child, Animation<double> animation) {
          return SlideTransition(
            position:
                Tween<Offset>(
                  begin: const Offset(0.05, 0),
                  end: Offset.zero,
                ).animate(
                  CurvedAnimation(
                    parent: animation,
                    curve: Curves.easeInOutCubic,
                  ),
                ),
            child: FadeTransition(
              opacity: Tween<double>(begin: 0.0, end: 1.0).animate(
                CurvedAnimation(
                  parent: animation,
                  curve: const Interval(0.2, 1.0, curve: Curves.easeOut),
                ),
              ),
              child: child,
            ),
          );
        },
        child: _buildAuthWidget(),
      ),
    );
  }
}
