import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class SecondaryButton {
  static Widget secondaryButton({
    required String text,
    required VoidCallback onPressed,
    double? fontSize,
    EdgeInsets? padding,
    double? borderRadius,
    Color? backgroundColor,
    Color? textColor,
    Color? borderColor,
    double? elevation,
    Widget? icon,
  }) {
    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        backgroundColor: backgroundColor ?? AppColors.light,
        foregroundColor: textColor ?? AppColors.buttonWithoutBackGround,
        elevation: elevation,
        side: BorderSide(
          color: borderColor ?? AppColors.buttonWithoutBackGround,
        ),
        padding: padding ?? const EdgeInsets.symmetric(vertical: 20),
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

  static Widget transparentButton({
    required String text,
    required VoidCallback onPressed,
    double? fontSize,
    EdgeInsets? padding,
    double? borderRadius,
    Color? textColor,
    Color? borderColor,
    double? elevation,
    Icon? icon,
  }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.light,
        foregroundColor: textColor ?? AppColors.buttonWithoutBackGround,
        elevation: elevation,
        shadowColor: AppColors.dark,
        side: BorderSide(
          color: borderColor ?? AppColors.buttonWithoutBackGround,
          width: 0.2,
        ),
        padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius ?? 11),
        ),
      ),
      child: icon == null
          ? Text(
              text,
              style: AppTextStyles.button16.copyWith(fontSize: fontSize ?? 16),
            )
          : Row(
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
            ),
    );
  }
}
