import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/ui/screens/signup/signup_view.dart';
import '../../../../core/constants/colors/colors.dart';
import 'signin/signin_view.dart';
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
        return SigninView(
          key: const ValueKey('login'),
          onNavigateToRegister: _navigateToRegister,
          onNavigateToForgotPassword: _navigateToForgotPassword,
        );
      case 1:
        return SignupView(
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
    return Scaffold(
      backgroundColor: AppColors.color1,
      body: _buildAuthWidget(),
    );
  }
}
