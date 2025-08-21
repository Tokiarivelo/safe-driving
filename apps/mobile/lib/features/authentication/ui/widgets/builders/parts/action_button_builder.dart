import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';
import '../../../../../../core/constants/colors/colors.dart';
import 'logo_builder.dart';
import 'social_buttons_builder.dart';
import 'navigation_links_builder.dart';

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
    required AuthStepContent stepData,
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
        LogoBuilder.buildLogo(isSmallScreen: isSmallScreen),
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
          SocialButtonsBuilder.buildSocialButtons(
            onGoogleSignIn: onGoogleSignIn,
            onFacebookSignIn: onFacebookSignIn,
          ),
          SizedBox(height: isSmallScreen ? 15 : 20),
          NavigationLinksBuilder.buildNavigationLink(
            stepData: stepData,
            onTap: isLogin ? onNavigateToRegister : onNavigateToLogin,
          ),
        ],
        if (isForgotPassword) ...[
          const SizedBox(height: 10),
          NavigationLinksBuilder.buildBackToLoginButton(
            backText: stepData.backToLoginText,
            onTap: onNavigateToLogin,
          ),
        ],
      ],
    );
  }
}
