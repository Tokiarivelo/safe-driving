import 'package:flutter/material.dart';
import '../../../../../../core/constants/colors/colors.dart';

class SocialButtonsBuilder {
  static Widget buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) {
    return Builder(
      builder: (context) {
        final isDark = Theme.of(context).brightness == Brightness.dark;
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 5),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5),
            border: Border.all(
              color: isDark
                  ? AppColors.light
                  : AppColors.buttonWithoutBackGround.adapt(context),
            ),
          ),
          child: GestureDetector(
            onTap: onTap,
            child: Image.asset(imagePath, height: 40),
          ),
        );
      },
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
          imagePath: 'lib/resources/assets/img/social/google.png',
        ),
        buildSocialButton(
          onTap: onFacebookSignIn,
          imagePath: 'lib/resources/assets/img/social/facebook.png',
        ),
      ],
    );
  }
}
