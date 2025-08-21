import 'package:flutter/material.dart';
import '../models/auth_models.dart';
import '../../../core/constants/colors/colors.dart';

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
