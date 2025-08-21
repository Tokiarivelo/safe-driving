import 'package:flutter/material.dart';

class AuthSocialButtons extends StatelessWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;

  const AuthSocialButtons({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
  });

  @override
  Widget build(BuildContext context) {
    if (isForgotPassword || !isLogin) return const SizedBox.shrink();

    return Column(
      children: [
        SizedBox(height: isSmallScreen ? 15 : 20),
        const Row(
          children: [
            Expanded(child: Divider()),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('OU'),
            ),
            Expanded(child: Divider()),
          ],
        ),
        SizedBox(height: isSmallScreen ? 15 : 20),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: onGoogleSignIn,
                icon: const Icon(Icons.g_mobiledata),
                label: const Text('Google'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: onFacebookSignIn,
                icon: const Icon(Icons.facebook),
                label: const Text('Facebook'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
