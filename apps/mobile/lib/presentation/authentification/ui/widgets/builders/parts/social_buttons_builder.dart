import 'package:flutter/material.dart';
import '../../../../../../core/constants/colors/colors.dart';

class SocialButtonsBuilder {
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
}
