import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

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
    return Builder(
      builder: (context) {
        final theme = Theme.of(context);
        final isDarkMode = theme.brightness == Brightness.dark;

        final defaultBackgroundColor = isDarkMode
            ? theme.colorScheme.primary
            : AppColors.fillButtonBackground;
        final defaultTextColor = theme.colorScheme.onPrimary;

        return ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            shadowColor: isDarkMode ? Colors.black54 : AppColors.dark,
            backgroundColor: backgroundColor ?? defaultBackgroundColor,
            foregroundColor: textColor ?? defaultTextColor,
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
                    Text(text, style: TextStyle(fontSize: fontSize ?? 16)),
                  ],
                )
              : Text(text, style: TextStyle(fontSize: fontSize ?? 16)),
        );
      },
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
