import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

class LanguageButtons {
  static Widget languageButton({
    required String language,
    required String flag,
    required bool isSelected,
    required VoidCallback onPressed,
  }) {
    return Builder(
      builder: (context) {
        final theme = Theme.of(context);
        final isDarkMode = theme.brightness == Brightness.dark;
   
        final selectedBackgroundColor = isDarkMode 
            ? theme.colorScheme.primary 
            : AppColors.fillButtonBackground;
        final selectedBorderColor = selectedBackgroundColor;
        final unselectedBorderColor = ColorsWidget.subtleBorderColor(context);
        final textColor = isSelected
            ? theme.colorScheme.onPrimary
            : (isDarkMode ? theme.colorScheme.onSurface : AppColors.buttonWithoutBackGround);
            
        return GestureDetector(
          onTap: onPressed,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: isSelected
                  ? selectedBackgroundColor
                  : AppColors.transparent,
              borderRadius: BorderRadius.circular(6),
              border: Border.all(
                color: isSelected
                    ? selectedBorderColor
                    : unselectedBorderColor,
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(flag, style: const TextStyle(fontSize: 16)),
                const SizedBox(width: 6),
                Text(
                  language,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  static Widget languageButtonContainer({
    required String selectedLanguage,
    required Function(String) onLanguageChanged,
  }) {
    return Builder(
      builder: (context) {
        final borderColor = ColorsWidget.subtleBorderColor(context);
            
        return Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: borderColor,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              languageButton(
                language: 'Français',
                flag: '🇫🇷',
                isSelected: selectedLanguage == 'Français',
                onPressed: () => onLanguageChanged('Français'),
              ),
              const SizedBox(width: 12),
              languageButton(
                language: 'English',
                flag: '🇺🇸',
                isSelected: selectedLanguage == 'English',
                onPressed: () => onLanguageChanged('English'),
              ),
            ],
          ),
        );
      },
    );
  }
}
