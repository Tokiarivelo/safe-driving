import 'package:flutter/material.dart';
import 'dart:ui';
import 'package:flutter_svg/svg.dart';
import '../../../../../core/constants/colors/colors.dart';
import '../builders/auth_ui_builder.dart';
import 'password_input.dart';
import 'confirm_password_input.dart';

class ResetPasswordContainer extends StatelessWidget {
  final TextEditingController passwordController;
  final TextEditingController confirmPasswordController;
  final String passwordError;
  final String confirmPasswordError;
  final Function(String) onPasswordChanged;
  final Function(String) onConfirmPasswordChanged;
  final VoidCallback onResetPassword;
  final VoidCallback? onNavigateToLogin;

  const ResetPasswordContainer({
    super.key,
    required this.passwordController,
    required this.confirmPasswordController,
    required this.passwordError,
    required this.confirmPasswordError,
    required this.onPasswordChanged,
    required this.onConfirmPasswordChanged,
    required this.onResetPassword,
    this.onNavigateToLogin,
  });

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final headerHeight = isSmallScreen ? 140 : 180;
    final availableHeight =
        screenHeight -
        headerHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 0),
      constraints: BoxConstraints(
        minHeight: availableHeight * 0.9,
        maxHeight: availableHeight * 0.95,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 6,
            spreadRadius: 6,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.secondBackgroundColor.withAlpha(100),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Padding(
              padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Transform.scale(
                    scale: isSmallScreen ? 0.8 : 1,
                    child: SvgPicture.asset(
                      'lib/resources/assets/logo/logo.svg',
                      height: isSmallScreen ? 80 : 100,
                      width: 500,
                    ),
                  ),
                  SizedBox(height: isSmallScreen ? 15 : 20),

                  PasswordInput(
                    controller: passwordController,
                    errorMessage: passwordError,
                    onChanged: onPasswordChanged,
                    isSmallScreen: isSmallScreen,
                  ),

                  SizedBox(height: isSmallScreen ? 10 : 15),

                  ConfirmPasswordInput(
                    controller: confirmPasswordController,
                    errorMessage: confirmPasswordError,
                    onChanged: onConfirmPasswordChanged,
                    isSmallScreen: isSmallScreen,
                  ),

                  SizedBox(height: isSmallScreen ? 20 : 25),

                  AuthUIBuilder.buildActionButton(
                    buttonText: "Réinitialiser le mot de passe",
                    onPressed: onResetPassword,
                  ),

                  SizedBox(height: isSmallScreen ? 15 : 20),

                  AuthUIBuilder.buildBackToLoginButton(
                    backText: "Retour à la connexion",
                    onTap: onNavigateToLogin,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
