import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';

class UserCommonButton {
  static Widget laterAndActionButtons({
    required VoidCallback onLaterPressed,
    required VoidCallback onActionPressed,
    required String actionText,
    String laterText = 'Plus tard',
    double? fontSize,
    EdgeInsets? padding,
  }) {
    return ButtonsWidget.laterAndActionButtons(
      onLaterPressed: onLaterPressed,
      onActionPressed: onActionPressed,
      actionText: actionText,
      laterText: laterText,
      fontSize: fontSize ?? 14,
      padding: padding ?? const EdgeInsets.symmetric(vertical: 16),
    );
  }

  static Widget nextButton({
    required VoidCallback onPressed,
    String text = 'Suivant',
    double? fontSize,
    EdgeInsets? padding,
  }) {
    return ButtonsWidget.nextButton(
      text: text,
      onPressed: onPressed,
      fontSize: fontSize ?? 14,
      padding:
          padding ?? const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
      borderRadius: 2,
    );
  }

  static Widget roleChoiceButtons({
    required VoidCallback onUserPressed,
    required VoidCallback onDriverPressed,
    double? spacing,
  }) {
    return ButtonsWidget.roleChoiceButtons(
      onUserPressed: onUserPressed,
      onDriverPressed: onDriverPressed,
      spacing: spacing ?? 50,
    );
  }

  static Widget customRadio<T>({
    required String title,
    required T value,
    required T groupValue,
    required ValueChanged<T?> onChanged,
    Color? activeColor,
    Color? titleColor,
  }) {
    return ButtonsWidget.customRadio<T>(
      title: title,
      value: value,
      groupValue: groupValue,
      onChanged: onChanged,
      activeColor: activeColor,
      titleColor: titleColor,
    );
  }

  static Widget customChoiceChip({
    required String label,
    required bool selected,
    required ValueChanged<bool> onSelected,
    Color? selectedColor,
    Color? labelColor,
  }) {
    return ButtonsWidget.customChoiceChip(
      label: label,
      selected: selected,
      onSelected: onSelected,
      selectedColor: selectedColor,
      labelColor: labelColor,
    );
  }

  static Widget customSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
    Color? activeColor,
  }) {
    return ButtonsWidget.customSwitch(
      value: value,
      onChanged: onChanged,
      activeColor: activeColor,
    );
  }

  static Widget languageButtonContainer({
    required String selectedLanguage,
    required Function(String) onLanguageChanged,
  }) {
    return ButtonsWidget.languageButtonContainer(
      selectedLanguage: selectedLanguage,
      onLanguageChanged: onLanguageChanged,
    );
  }
}
