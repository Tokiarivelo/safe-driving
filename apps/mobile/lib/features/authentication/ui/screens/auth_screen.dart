import 'package:flutter/material.dart';
import '../../../../core/constants/colors/colors.dart';
import 'sign_in_screen.dart';
import 'sign_up_screen.dart';
import 'password/forgot_password_view.dart';
import 'password/reset_password_view.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> with TickerProviderStateMixin {
  int _currentIndex = 0;
  String? _userEmailForReset;

  void _navigateTo(int index) {
    if (mounted) {
      setState(() => _currentIndex = index);
    }
  }

  void _navigateToLogin() => _navigateTo(0);
  void _navigateToRegister() => _navigateTo(1);
  void _navigateToForgotPassword() => _navigateTo(2);
  void _navigateToResetPassword(String email) {
    _userEmailForReset = email;
    _navigateTo(3);
  }

  Widget _buildAuthWidget() {
    switch (_currentIndex) {
      case 0:
        return SignInScreen(
          key: const ValueKey('login'),
          onNavigateToRegister: _navigateToRegister,
          onNavigateToForgotPassword: _navigateToForgotPassword,
        );
      case 1:
        return SignUpScreen(
          key: const ValueKey('register'),
          onNavigateToLogin: _navigateToLogin,
          onRegistrationSuccess: _navigateToLogin,
        );
      case 2:
        return ForgotPasswordView(
          key: const ValueKey('forgot'),
          onNavigateToLogin: _navigateToLogin,
          onSendCodeSuccess: _navigateToResetPassword,
        );
      case 3:
        return ResetPasswordView(
          key: const ValueKey('reset'),
          email: _userEmailForReset,
          onNavigateToLogin: _navigateToLogin,
          onResetSuccess: _navigateToLogin,
        );
      default:
        return const SizedBox.shrink();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Scaffold(

      backgroundColor: isDark
          ? Theme.of(context).scaffoldBackgroundColor
          : AppColors.color1.adapt(context),
      body: _buildAuthWidget(),
    );
  }
}
