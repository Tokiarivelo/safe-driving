import 'package:flutter/material.dart';
import '../../../models/auth_step_content_model.dart';

import 'parts/header_builder.dart';
import 'parts/action_button_builder.dart';
import 'parts/social_buttons_builder.dart';
import 'parts/navigation_links_builder.dart';
import 'parts/logo_builder.dart';
import 'parts/input_builder.dart';
import 'parts/auth_container_builder.dart';
import 'parts/step_data_getter.dart';

class AuthUIBuilder {
  static Widget buildHeaderText({
    required BuildContext context,
    required AuthStepContent stepData,
    required bool isForgotPassword,
  }) {
    return HeaderBuilder.buildHeaderText(
      context: context,
      stepData: stepData,
      isForgotPassword: isForgotPassword,
    );
  }

  static Widget buildActionButton({
    required String buttonText,
    required VoidCallback onPressed,
  }) {
    return ActionButtonBuilder.buildActionButton(
      buttonText: buttonText,
      onPressed: onPressed,
    );
  }

  static Widget buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) {
    return SocialButtonsBuilder.buildSocialButton(
      onTap: onTap,
      imagePath: imagePath,
    );
  }

  static Widget buildSocialButtons({
    required VoidCallback? onGoogleSignIn,
    required VoidCallback? onFacebookSignIn,
  }) {
    return SocialButtonsBuilder.buildSocialButtons(
      onGoogleSignIn: onGoogleSignIn,
      onFacebookSignIn: onFacebookSignIn,
    );
  }

  static Widget buildNavigationLink({
    required BuildContext context,
    required AuthStepContent stepData,
    required VoidCallback? onTap,
  }) {
    return NavigationLinksBuilder.buildNavigationLink(
      context: context,
      stepData: stepData,
      onTap: onTap,
    );
  }

  static Widget buildBackToLoginButton({
    required String backText,
    required VoidCallback? onTap,
  }) {
    return NavigationLinksBuilder.buildBackToLoginButton(
      backText: backText,
      onTap: onTap,
    );
  }

  static Widget buildForgotPasswordLink({
    required String forgotText,
    required VoidCallback? onTap,
  }) {
    return InputBuilder.buildForgotPasswordLink(
      forgotText: forgotText,
      onTap: onTap,
    );
  }

  static Widget buildLogo({required bool isSmallScreen}) {
    return LogoBuilder.buildLogo(isSmallScreen: isSmallScreen);
  }

  static Widget buildInputFieldWithValidation({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
    TextEditingController? controller,
    String? errorMessage,
    Function(String)? onChanged,
    required bool isSmallScreen,
  }) {
    return InputBuilder.buildInputFieldWithValidation(
      hint: hint,
      icon: icon,
      obscureText: obscureText,
      isPassword: isPassword,
      isConfirmPassword: isConfirmPassword,
      controller: controller,
      errorMessage: errorMessage,
      onChanged: onChanged,
      isSmallScreen: isSmallScreen,
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
    return ActionButtonBuilder.buildMainContent(
      isLogin: isLogin,
      isForgotPassword: isForgotPassword,
      isSmallScreen: isSmallScreen,
      stepData: stepData,
      onButtonPress: onButtonPress,
      onGoogleSignIn: onGoogleSignIn,
      onFacebookSignIn: onFacebookSignIn,
      onNavigateToRegister: onNavigateToRegister,
      onNavigateToLogin: onNavigateToLogin,
      onForgotPassword: onForgotPassword,
      inputFields: inputFields,
      key: key,
    );
  }

  static Widget buildAuthContainer({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required Widget child,
  }) {
    return AuthContainerBuilder.buildAuthContainer(
      context: context,
      isLogin: isLogin,
      isForgotPassword: isForgotPassword,
      isSmallScreen: isSmallScreen,
      child: child,
    );
  }

  static AuthStepContent getStepData({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    bool isResetPassword = false,
  }) {
    return StepDataGetter.getStepData(
      context: context,
      isLogin: isLogin,
      isForgotPassword: isForgotPassword,
      isResetPassword: isResetPassword,
    );
  }
}
