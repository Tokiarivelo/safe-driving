import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class ButtonsWidget {
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
              style: TextStyle(
                fontSize: fontSize ?? 16,
                fontWeight: FontWeight.w500,
              ),
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
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
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
            padding: const EdgeInsets.symmetric(vertical: 15),
          ),
        ),
        SizedBox(width: spacing ?? 50),
        Expanded(
          child: primaryButton(
            text: 'Je suis un chauffeur',
            onPressed: onDriverPressed,
            fontSize: 10,
            borderRadius: 2,
            padding: const EdgeInsets.symmetric(vertical: 15),
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

  /// Custom Switch
  static Widget customSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
    Color? activeColor,
  }) {
    return Switch(
      value: value,
      onChanged: onChanged,
      activeColor: activeColor ?? AppColors.progress,
    );
  }

  /// Custom RadioListTile
  static Widget customRadio<T>({
    required String title,
    required T value,
    required T groupValue,
    required ValueChanged<T?> onChanged,
    Color? activeColor,
    Color? titleColor,
  }) {
    return RadioListTile<T>(
      contentPadding: EdgeInsets.zero,
      visualDensity: const VisualDensity(horizontal: -4),
      title: Text(
        title,
        style: TextStyle(
          color: titleColor ?? AppColors.buttonWithoutBackGround,
          fontWeight: FontWeight.w600,
        ),
      ),
      value: value,
      groupValue: groupValue,
      activeColor: activeColor ?? AppColors.buttonWithoutBackGround,
      onChanged: onChanged,
    );
  }

  /// Custom CheckboxListTile
  static Widget customCheckbox({
    required String title,
    required bool value,
    required ValueChanged<bool?> onChanged,
    Color? activeColor,
    Color? checkColor,
    Color? titleColor,
  }) {
    return CheckboxListTile(
      title: Text(
        title,
        style: TextStyle(
          color: titleColor ?? AppColors.textColor,
          fontFamily: 'Inder',
        ),
      ),
      value: value,
      onChanged: onChanged,
      activeColor: activeColor ?? AppColors.buttonWithoutBackGround,
      checkColor: checkColor ?? AppColors.light,
      controlAffinity: ListTileControlAffinity.leading,
      contentPadding: EdgeInsets.zero,
      side: BorderSide(
        color: AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
      ),
    );
  }

  /// Custom ChoiceChip for themes
  static Widget customChoiceChip({
    required String label,
    required bool selected,
    required ValueChanged<bool> onSelected,
    Color? selectedColor,
    Color? labelColor,
  }) {
    return FilterChip(
      label: Text(
        label,
        style: TextStyle(
          color:
              labelColor ?? (selected ? AppColors.light : AppColors.textColor),
        ),
      ),
      selected: selected,
      onSelected: onSelected,
      selectedColor: selectedColor ?? AppColors.fillButtonBackground,
      selectedShadowColor: AppColors.light,
    );
  }

  /// Elegant acceptance button for CGU and policies
  static Widget elegantAcceptanceButton({
    required String text,
    required String subtitle,
    required bool isAccepted,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: isAccepted ? null : onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.light,
          border: Border.all(
            color: isAccepted
                ? AppColors.fillButtonBackground
                : AppColors.fillButtonBackground.withValues(alpha: 0.3),
            width: 2,
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: isAccepted
                  ? AppColors.buttonWithoutBackGround.withValues(alpha: 0.1)
                  : AppColors.fillButtonBackground.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            // Icon on the left with smooth animation
            AnimatedContainer(
              duration: const Duration(milliseconds: 400),
              curve: Curves.easeInOut,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isAccepted
                    ? AppColors.buttonWithoutBackGround
                    : AppColors.fillButtonBackground,
                borderRadius: BorderRadius.circular(12),
                boxShadow: isAccepted
                    ? [
                        BoxShadow(
                          color: AppColors.fillButtonBackground.withValues(
                            alpha: 0.3,
                          ),
                          blurRadius: 8,
                          spreadRadius: 2,
                        ),
                      ]
                    : [],
              ),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                transitionBuilder: (Widget child, Animation<double> animation) {
                  return ScaleTransition(
                    scale: animation,
                    child: FadeTransition(opacity: animation, child: child),
                  );
                },
                child: Icon(
                  isAccepted ? Icons.check_circle : Icons.article_outlined,
                  key: ValueKey<bool>(isAccepted),
                  color: AppColors.light,
                  size: 24,
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    text,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textColor,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    isAccepted ? "Accepté ✓" : subtitle,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textColor.withValues(alpha: 0.7),
                      fontWeight: isAccepted
                          ? FontWeight.w500
                          : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ),
            if (!isAccepted)
              Icon(
                Icons.arrow_forward_ios,
                color: AppColors.fillButtonBackground,
                size: 20,
              ),
          ],
        ),
      ),
    );
  }

  /// Handles GPS permission request and provides user feedback.
  static Future<bool> handleGpsPermission(BuildContext context) async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'Les services de localisation sont désactivés. Veuillez les activer.',
        );
      }
      await Geolocator.openLocationSettings();
      return false;
    }

    // Check and request permission
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        if (context.mounted) {
          SnackbarHelper.showError(
            context,
            'Permission de localisation refusée.',
          );
        }
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'La permission de localisation est refusée en permanence. Veuillez l\'activer dans les paramètres de l\'application.',
        );
      }
      await Geolocator.openAppSettings();
      return false;
    }

    return true;
  }
}
