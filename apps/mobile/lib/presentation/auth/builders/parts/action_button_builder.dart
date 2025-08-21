import 'package:flutter/material.dart';
import '../../../../core/constants/colors/colors.dart';

class ActionButtonBuilder {
  static Widget buildActionButton({
    required String buttonText,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.fillButtonBackground,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        ),
        child: Text(
          buttonText,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.titleColor,
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  static Widget buildMainContent({
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required dynamic stepData,
    required VoidCallback onButtonPress,
    required VoidCallback? onGoogleSignIn,
    required VoidCallback? onFacebookSignIn,
    required VoidCallback? onNavigateToRegister,
    required VoidCallback? onNavigateToLogin,
    required VoidCallback? onForgotPassword,
    required Widget inputFields,
    ValueKey<String>? key,
  }) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        // Logo will be imported from logo_builder
        SizedBox(height: isSmallScreen ? 10 : 15),
        inputFields,
        SizedBox(height: isSmallScreen ? 12 : 16),
        buildActionButton(
          buttonText: stepData.actionButtonText,
          onPressed: onButtonPress,
        ),
        SizedBox(height: isSmallScreen ? 12 : 16),
        if (!isForgotPassword) ...[
          Text(
            stepData.socialText,
            style: const TextStyle(
              fontFamily: 'Inder',
              color: AppColors.textColor,
            ),
          ),
          SizedBox(height: isSmallScreen ? 10 : 15),
          // Social buttons will be imported from social_buttons_builder
          SizedBox(height: isSmallScreen ? 15 : 20),
          // Navigation links will be imported from navigation_links_builder
        ],
        if (isForgotPassword) ...[
          const SizedBox(height: 10),
          // Back to login button will be imported from navigation_links_builder
        ],
      ],
    );
  }
}
