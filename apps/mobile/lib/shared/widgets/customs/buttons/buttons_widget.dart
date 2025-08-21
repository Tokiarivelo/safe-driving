import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class ButtonsWidget {
  /// Bouton principal avec background rempli
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
                      style: TextStyle(
                        fontSize: fontSize ?? 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                )
              : Text(
                  text,
                  style: TextStyle(
                    fontSize: fontSize ?? 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
        );
  }

  /// Bouton secondaire avec bordure (outline)
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
                      style: TextStyle(
                        fontSize: fontSize ?? 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                )
              : Text(
                  text,
                  style: TextStyle(
                    fontSize: fontSize ?? 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
        );
  }

  /// Bouton transparent avec bordure
  static Widget transparentButton({
    required String text,
    required VoidCallback onPressed,
    double? fontSize,
    EdgeInsets? padding,
    double? borderRadius,
    Color? textColor,
    Color? borderColor,
    double? elevation,
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
            ),
            padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(borderRadius ?? 11),
            ),
          ),
          child: Text(
            text,
            style: TextStyle(
              fontSize: fontSize ?? 16,
              fontWeight: FontWeight.w500,
            ),
          ),
        );
  }

  /// Row de boutons avec espacement automatique (pour les boutons côte à côte)
  static Widget buttonRow({
    required List<String> buttonTitles,
    required List<VoidCallback> onPressedList,
    MainAxisAlignment? mainAxisAlignment,
    bool isLastButtonPrimary = true,
    double? spacing,
    EdgeInsets? buttonPadding,
    double? fontSize,
  }) {
    assert(
      buttonTitles.length == onPressedList.length,
      'ButtonTitles and onPressedList must have the same length',
    );

    return Row(
      mainAxisAlignment: mainAxisAlignment ?? MainAxisAlignment.spaceEvenly,
      children: buttonTitles.asMap().entries.map((entry) {
        final index = entry.key;
        final buttonTitle = entry.value;
        final isMainButton =
            isLastButtonPrimary && index == buttonTitles.length - 1;

        return Expanded(
          child: Padding(
            padding: EdgeInsets.only(
              left: index == 0 ? 0 : (spacing ?? 8),
              right: index == buttonTitles.length - 1 ? 0 : (spacing ?? 8),
            ),
            child: isMainButton
                ? primaryButton(
                    text: buttonTitle,
                    onPressed: onPressedList[index],
                    fontSize: fontSize,
                    padding: buttonPadding,
                    elevation: 6,
                  )
                : transparentButton(
                    text: buttonTitle,
                    onPressed: onPressedList[index],
                    fontSize: fontSize,
                    padding: buttonPadding,
                    elevation: 6,
                  ),
          ),
        );
      }).toList(),
    );
  }

  /// Boutons pour le choix de rôle (Driver/User)
  static Widget roleChoiceButtons({
    required VoidCallback onUserPressed,
    required VoidCallback onDriverPressed,
    double? spacing,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Expanded(
          child: primaryButton(
            text: 'Je suis utilisateur',
            onPressed: onUserPressed,
            fontSize: 10,
            borderRadius: 2,
            padding: const EdgeInsets.symmetric(vertical: 12),
          ),
        ),
        SizedBox(width: spacing ?? 50),
        Expanded(
          child: primaryButton(
            text: 'Je suis un chauffeur',
            onPressed: onDriverPressed,
            fontSize: 10,
            borderRadius: 2,
            padding: const EdgeInsets.symmetric(vertical: 12),
          ),
        ),
      ],
    );
  }

  /// Boutons pour "Plus tard" et action principale
  static Widget laterAndActionButtons({
    required VoidCallback onLaterPressed,
    required VoidCallback onActionPressed,
    required String actionText,
    String laterText = 'Plus tard',
    MainAxisAlignment? mainAxisAlignment,
    double? fontSize,
    EdgeInsets? padding,
    double? spacing,
  }) {
    return Stack(
      children: [
        Row(
          mainAxisAlignment: mainAxisAlignment ?? MainAxisAlignment.spaceEvenly,
          children: [
            Expanded(
              child: secondaryButton(
                text: laterText,
                onPressed: onLaterPressed,
                borderRadius: 2,
                fontSize: fontSize ?? 14,
                padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
                elevation: 5,
              ),
            ),
            SizedBox(width: spacing ?? 16),
            Expanded(
              child: primaryButton(
                text: actionText,
                onPressed: onActionPressed,
                borderRadius: 2,
                fontSize: fontSize ?? 14,
                padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ],
        ),
      ],
    );
  }

  /// Bouton simple avec style personnalisable
  static Widget customButton({
    required String text,
    required VoidCallback onPressed,
    ButtonStyle? style,
    Widget? child,
  }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: style,
      child: child ?? Text(text),
    );
  }

  /// Bouton de navigation "Suivant"
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

  /// Boutons de validation finale (Annuler/Valider)
  static Widget finalValidationButtons({
    required VoidCallback onCancelPressed,
    required VoidCallback onValidatePressed,
    String cancelText = 'Annuler',
    String validateText = 'Valider',
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        secondaryButton(
          text: cancelText,
          onPressed: onCancelPressed,
          borderRadius: 2,
        ),
        primaryButton(
          text: validateText,
          onPressed: onValidatePressed,
          borderRadius: 2,
        ),
      ],
    );
  }

  /// Bouton pour le choix de langue avec flag
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
