export 'parts/header_builder.dart';
export 'parts/input_builder.dart';
export 'parts/social_buttons_builder.dart';
export 'parts/action_button_builder.dart';
export 'parts/logo_builder.dart';
export 'parts/navigation_links_builder.dart';
export 'parts/auth_container_builder.dart';
export 'parts/step_data_getter.dart';

import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_models.dart';
import '../../../../../core/constants/colors/colors.dart';
import 'parts/header_builder.dart';
import 'parts/input_builder.dart';
import 'parts/social_buttons_builder.dart';
import 'parts/action_button_builder.dart';
import 'parts/logo_builder.dart';
import 'parts/navigation_links_builder.dart';
import 'parts/auth_container_builder.dart';
import 'parts/step_data_getter.dart';

class AuthUIBuilder {
  static Widget buildHeaderText({
    required AuthStepContent stepData,
    required bool isForgotPassword,
  }) => HeaderBuilder.buildHeaderText(
    stepData: stepData,
    isForgotPassword: isForgotPassword,
  );

  static Widget buildActionButton({
    required String buttonText,
    required VoidCallback onPressed,
  }) => ActionButtonBuilder.buildActionButton(
    buttonText: buttonText,
    onPressed: onPressed,
  );

  static Widget buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) => SocialButtonsBuilder.buildSocialButton(
    onTap: onTap,
    imagePath: imagePath,
  );

  static Widget buildSocialButtons({
    required VoidCallback? onGoogleSignIn,
    required VoidCallback? onFacebookSignIn,
  }) => SocialButtonsBuilder.buildSocialButtons(
    onGoogleSignIn: onGoogleSignIn,
    onFacebookSignIn: onFacebookSignIn,
  );

  static Widget buildNavigationLink({
    required AuthStepContent stepData,
    required VoidCallback? onTap,
  }) => NavigationLinksBuilder.buildNavigationLink(
    stepData: stepData,
    onTap: onTap,
  );

  static Widget buildBackToLoginButton({
    required String backText,
    required VoidCallback? onTap,
  }) => NavigationLinksBuilder.buildBackToLoginButton(
    backText: backText,
    onTap: onTap,
  );

  static Widget buildForgotPasswordLink({
    required String forgotText,
    required VoidCallback? onTap,
  }) => InputBuilder.buildForgotPasswordLink(
    forgotText: forgotText,
    onTap: onTap,
  );

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
  }) => InputBuilder.buildInputFieldWithValidation(
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

  static Widget buildLogo({required bool isSmallScreen}) =>
      LogoBuilder.buildLogo(isSmallScreen: isSmallScreen);

  static Widget buildAuthContainer({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required Widget child,
  }) => AuthContainerBuilder.buildAuthContainer(
    context: context,
    isLogin: isLogin,
    isForgotPassword: isForgotPassword,
    isSmallScreen: isSmallScreen,
    child: child,
  );

  static AuthStepContent getStepData({
    required bool isLogin,
    required bool isForgotPassword,
    bool isResetPassword = false,
  }) => StepDataGetter.getStepData(
    isLogin: isLogin,
    isForgotPassword: isForgotPassword,
    isResetPassword: isResetPassword,
  );

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
        ActionButtonBuilder.buildActionButton(
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
