import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import 'package:safe_driving/l10n/l10n.dart';

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

        final selectedBackgroundColor =
            isDarkMode ? theme.colorScheme.primary : AppColors.fillButtonBackground;
        final selectedBorderColor = selectedBackgroundColor;
        final unselectedBorderColor = ColorsWidget.subtleBorderColor(context);
        final textColor = isSelected
            ? theme.colorScheme.onPrimary
            : (isDarkMode
                ? theme.colorScheme.onSurface
                : AppColors.buttonWithoutBackGround);

        return GestureDetector(
          onTap: onPressed,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: isSelected ? selectedBackgroundColor : AppColors.transparent,
              borderRadius: BorderRadius.circular(6),
              border: Border.all(
                color: isSelected ? selectedBorderColor : unselectedBorderColor,
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

  static String _normalizeToCode(String input) {
    final lower = input.toLowerCase();
    if (lower == 'fr' || lower == 'français' || lower == 'francais') return 'fr';
    if (lower == 'en' || lower == 'english' || lower == 'anglais') return 'en';
    return 'fr';
  }

  static Widget languageButtonContainer({
    required String selectedLanguage,
    required Function(String) onLanguageChanged,
  }) {
    return Builder(
      builder: (context) {
        final borderColor = ColorsWidget.subtleBorderColor(context);
        // Use the current app locale as the source of truth for selection highlighting
        final localeCode = Localizations.localeOf(context).languageCode.toLowerCase();
        final selectedCode = L10n.isSupported(localeCode)
            ? localeCode
            : _normalizeToCode(selectedLanguage);

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
                language: L10n.getLanguageName('fr'),
                flag: L10n.getLanguageFlag('fr'),
                isSelected: selectedCode == 'fr',
                onPressed: () {
                  context.read<LocaleProvider>().setLocaleFromCode('fr');
                  onLanguageChanged('fr');
                },
              ),
              const SizedBox(width: 12),
              languageButton(
                language: L10n.getLanguageName('en'),
                flag: L10n.getLanguageFlag('en'),
                isSelected: selectedCode == 'en',
                onPressed: () {
                  context.read<LocaleProvider>().setLocaleFromCode('en');
                  onLanguageChanged('en');
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
