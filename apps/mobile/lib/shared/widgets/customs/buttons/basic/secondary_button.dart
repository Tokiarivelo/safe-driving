import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

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
    return Builder(
      builder: (context) {
        final theme = Theme.of(context);
        final isDarkMode = theme.brightness == Brightness.dark;
        

        final defaultBackgroundColor = backgroundColor ?? theme.colorScheme.surface;
        final defaultTextColor = textColor ?? (isDarkMode 
            ? theme.colorScheme.onSurface // Texte clair lisible en sombre
            : AppColors.buttonWithoutBackGround);
        final defaultBorderColor = borderColor ?? ColorsWidget.subtleBorderColor(context);
        
        return OutlinedButton(
          onPressed: onPressed,
          style: OutlinedButton.styleFrom(
            backgroundColor: defaultBackgroundColor,
            foregroundColor: defaultTextColor,
            elevation: elevation,
            side: BorderSide(
              color: defaultBorderColor,
              width: 1,
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
                      style: TextStyle(
                        fontSize: fontSize ?? 16,
                      ),
                    ),
                  ],
                )
              : Text(
                  text,
                  style: TextStyle(fontSize: fontSize ?? 16),
                ),
        );
      },
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
    return Builder(
      builder: (context) {
        final theme = Theme.of(context);
        final isDarkMode = theme.brightness == Brightness.dark;
        
        final defaultBackgroundColor = isDarkMode 
            ? theme.colorScheme.surface  
            : AppColors.light;
        final defaultTextColor = textColor ?? (isDarkMode 
            ? theme.colorScheme.onSurface
            : AppColors.buttonWithoutBackGround);
        final defaultBorderColor = borderColor ?? ColorsWidget.subtleBorderColor(context);
        
        return ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: defaultBackgroundColor,
            foregroundColor: defaultTextColor,
            elevation: elevation,
            shadowColor: isDarkMode ? Colors.black54 : AppColors.dark,
            side: BorderSide(
              color: defaultBorderColor,
              width: 1.0,
            ),
            padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(borderRadius ?? 11),
            ),
          ),
          child: icon == null
              ? Text(
                  text,
                  style: TextStyle(fontSize: fontSize ?? 16),
                )
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    icon,
                    const SizedBox(width: 8),
                    Text(
                      text,
                      style: TextStyle(
                        fontSize: fontSize ?? 16,
                      ),
                    ),
                  ],
                ),
        );
      },
    );
  }
}
