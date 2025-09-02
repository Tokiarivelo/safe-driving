import 'package:flutter/material.dart';

class AuthNavigationLinks extends StatelessWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onNavigateToRegister;

  const AuthNavigationLinks({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    this.onNavigateToLogin,
    this.onNavigateToRegister,
  });

  @override
  Widget build(BuildContext context) {
    if (isForgotPassword) {
      return _buildForgotPasswordLinks();
    }

    return _buildAuthToggleLinks();
  }

  Widget _buildForgotPasswordLinks() {
    return Column(
      children: [
        SizedBox(height: isSmallScreen ? 15 : 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Vous vous souvenez de votre mot de passe? '),
            TextButton(
              onPressed: onNavigateToLogin,
              child: const Text('Se connecter'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAuthToggleLinks() {
    return Column(
      children: [
        SizedBox(height: isSmallScreen ? 15 : 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(isLogin ? 'Pas encore de compte? ' : 'Déjà un compte? '),
            TextButton(
              onPressed: isLogin ? onNavigateToRegister : onNavigateToLogin,
              child: Text(isLogin ? 'S\'inscrire' : 'Se connecter'),
            ),
          ],
        ),
      ],
    );
  }
}
