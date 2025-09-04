import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';

import '../../../../../../core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class NavigationLinksBuilder {
  static Widget buildNavigationLink({
    required BuildContext context,
    required AuthStepContent stepData,
    required VoidCallback? onTap,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(stepData.navigationPrefix, style: AppTextStyles.navPrefix12(context)),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: AppColors.buttonWithoutBackGround.adapt(context),
                  width: 1.5,
                ),
              ),
            ),
            child: Text(
              stepData.navigationLink,
              style: AppTextStyles.link9Bold(context),
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
    return Builder(
      builder: (context) => GestureDetector(
        onTap: onTap,
        child: Row(
          children: [
            Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround.adapt(context)),
            const SizedBox(width: 8),
            Text(
              backText,
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround.adapt(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
