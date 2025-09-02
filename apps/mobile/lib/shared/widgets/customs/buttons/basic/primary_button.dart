import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class PrimaryButton {
  static Widget primaryButton({
    required String text,
    required VoidCallback onPressed,
    double? fontSize,
    EdgeInsets? padding,
    double? borderRadius,
    Color? backgroundColor,
    Color? textColor,
    double? elevation,
    Widget? icon,
  }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        shadowColor: AppColors.dark,
        backgroundColor: backgroundColor ?? AppColors.fillButtonBackground,
        foregroundColor: textColor ?? AppColors.light,
        elevation: elevation ?? 6,
        padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius ?? 11),
        ),
      ),
      child: icon != null
          ? Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                icon,
                const SizedBox(width: 8),
                Text(
                  text,
                  style: AppTextStyles.button16.copyWith(
                    fontSize: fontSize ?? 16,
                  ),
                ),
              ],
            )
          : Text(
              text,
              style: AppTextStyles.button16.copyWith(fontSize: fontSize ?? 16),
            ),
    );
  }

  static Widget nextButton({
    required VoidCallback onPressed,
    String text = 'Suivant',
    double? borderRadius,
    double? fontSize,
    EdgeInsets? padding,
  }) {
    return Center(
      child: primaryButton(
        text: text,
        onPressed: onPressed,
        borderRadius: borderRadius ?? 2,
        fontSize: fontSize ?? 14,
        padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
      ),
    );
  }
}
