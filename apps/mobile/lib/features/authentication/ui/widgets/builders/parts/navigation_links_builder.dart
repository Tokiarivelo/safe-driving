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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final underlineColor = isDark
        ? AppColors.light
        : AppColors.buttonWithoutBackGround.adapt(context);
    final linkStyle = AppTextStyles.link9Bold(context).copyWith(
      color: isDark ? AppColors.light : Theme.of(context).colorScheme.tertiary,
    );

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          stepData.navigationPrefix,
          style: AppTextStyles.navPrefix12(context),
        ),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(color: underlineColor, width: 1.5),
              ),
            ),
            child: Text(stepData.navigationLink, style: linkStyle),
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
      builder: (context) {
        final isDark = Theme.of(context).brightness == Brightness.dark;
        final color = isDark
            ? AppColors.light
            : AppColors.buttonWithoutBackGround.adapt(context);
        return GestureDetector(
          onTap: onTap,
          child: Row(
            children: [
              Icon(Icons.arrow_back, color: color),
              const SizedBox(width: 8),
              Text(
                backText,
                style: TextStyle(fontFamily: 'Inder', color: color),
              ),
            ],
          ),
        );
      },
    );
  }
}
