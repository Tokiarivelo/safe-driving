import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class LanguageButtons {
  static Widget languageButton({
    required String language,
    required String flag,
    required bool isSelected,
    required VoidCallback onPressed,
  }) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.fillButtonBackground
              : AppColors.transparent,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(
            color: isSelected
                ? AppColors.fillButtonBackground
                : AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
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
                color: isSelected
                    ? AppColors.light
                    : AppColors.buttonWithoutBackGround,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget languageButtonContainer({
    required String selectedLanguage,
    required Function(String) onLanguageChanged,
  }) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
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
  }
}
