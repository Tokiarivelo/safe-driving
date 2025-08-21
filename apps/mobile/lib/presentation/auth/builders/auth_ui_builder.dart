import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import '../models/auth_models.dart';
import '../../../core/constants/colors/colors.dart';
import '../../../shared/widgets/customs/inputs/inputs_widget.dart';

class AuthUIBuilder {
  static Widget buildHeaderText({
    required StepAuthContent stepData,
    required bool isForgotPassword,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          stepData.title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 20,
            color: AppColors.titleColor,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          stepData.subtitle,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            color: AppColors.titleColor.withAlpha(220),
          ),
        ),
        if (!isForgotPassword && stepData.subSubtitle.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            stepData.subSubtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inder',
              fontSize: 12,
              fontWeight: FontWeight.w200,
              color: AppColors.titleColor.withAlpha(220),
            ),
          ),
        ],
      ],
    );
  }

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

  static Widget buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(5),
        border: Border.all(color: AppColors.buttonWithoutBackGround),
      ),
      child: GestureDetector(
        onTap: onTap,
        child: Image.asset(imagePath, height: 40),
      ),
    );
  }

  static Widget buildSocialButtons({
    required VoidCallback? onGoogleSignIn,
    required VoidCallback? onFacebookSignIn,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        buildSocialButton(
          onTap: onGoogleSignIn,
          imagePath: 'assets/img/social/google.png',
        ),
        buildSocialButton(
          onTap: onFacebookSignIn,
          imagePath: 'assets/img/social/facebook.png',
        ),
      ],
    );
  }

  static Widget buildNavigationLink({
    required StepAuthContent stepData,
    required VoidCallback? onTap,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          stepData.navigationPrefix,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.textColor,
            fontSize: 12,
          ),
        ),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: AppColors.buttonWithoutBackGround,
                  width: 1.5,
                ),
              ),
            ),
            child: Text(
              stepData.navigationLink,
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: 9,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }

  static Widget buildBackToLoginButton({
    required String backText,
    required VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
          const SizedBox(width: 8),
          Text(
            backText,
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
            ),
          ),
        ],
      ),
    );
  }

  static Widget buildForgotPasswordLink({
    required String forgotText,
    required VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Align(
        alignment: Alignment.centerRight,
        child: Container(
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: AppColors.buttonWithoutBackGround),
            ),
          ),
          child: Text(
            forgotText,
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
              fontWeight: FontWeight.bold,
              fontSize: 10,
            ),
          ),
        ),
      ),
    );
  }

  static Widget buildLogo({required bool isSmallScreen}) {
    return Transform.scale(
      scale: isSmallScreen ? 0.8 : 1,
      child: SvgPicture.asset(
        'assets/logo/logo.svg',
        height: isSmallScreen ? 80 : 100,
        width: 500,
      ),
    );
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
    return CustomInputField(
      hint: hint,
      icon: icon,
      obscureText: obscureText,
      isPassword: isPassword,
      isConfirmPassword: isConfirmPassword,
      controller: controller,
      errorMessage: errorMessage,
      onChanged: onChanged,
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
    );
  }

  static Widget buildMainContent({
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required StepAuthContent stepData,
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
        buildLogo(isSmallScreen: isSmallScreen),
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
          buildSocialButtons(
            onGoogleSignIn: onGoogleSignIn,
            onFacebookSignIn: onFacebookSignIn,
          ),
          SizedBox(height: isSmallScreen ? 15 : 20),
          buildNavigationLink(
            stepData: stepData,
            onTap: isLogin ? onNavigateToRegister : onNavigateToLogin,
          ),
        ],
        if (isForgotPassword) ...[
          const SizedBox(height: 10),
          buildBackToLoginButton(
            backText: stepData.backToLoginText,
            onTap: onNavigateToLogin,
          ),
        ],
      ],
    );
  }

  static Widget buildAuthContainer({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required Widget child,
  }) {
    final bool isRegister = !isLogin && !isForgotPassword;
    final screenHeight = MediaQuery.of(context).size.height;
    final headerHeight = isRegister
        ? (isSmallScreen ? 140 : 200)
        : (isSmallScreen ? 140 : 180);
    final availableHeight =
        screenHeight -
        headerHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 0),
      constraints: BoxConstraints(
        minHeight: isRegister ? 400 : availableHeight * 0.9,
        maxHeight: isRegister ? double.infinity : availableHeight * 0.95,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 6,
            spreadRadius: 6,
            offset: isRegister ? const Offset(0, -4) : const Offset(0, -2),
          ),
        ],
      ),
      child: child,
    );
  }

  static StepAuthContent getStepData({
    required bool isLogin,
    required bool isForgotPassword,
    bool isResetPassword = false,
  }) {
    final String stepKey = isResetPassword
        ? 'resetPassword'
        : isForgotPassword
        ? 'forgotPassword'
        : isLogin
        ? 'login'
        : 'register';

    return StepAuthDataText.stepContents[stepKey]!;
  }
}
