import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SwitchesAndRadios {
  static Widget customSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
    Color? activeColor,
  }) {
    return Switch(
      value: value,
      onChanged: onChanged,
      activeThumbColor: activeColor ?? AppColors.progress,
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
    final bool isSelected = value == groupValue;
    final Color resolvedColor = activeColor ?? AppColors.buttonWithoutBackGround;

    return ListTile(
      contentPadding: EdgeInsets.zero,
      dense: true,
      visualDensity: const VisualDensity(horizontal: -4),
      leading: Icon(
        isSelected ? Icons.radio_button_checked : Icons.radio_button_unchecked,
        color: resolvedColor,
      ),
      title: Text(
        title,
        style: TextStyle(
          color: titleColor ?? AppColors.buttonWithoutBackGround,
          fontWeight: FontWeight.w600,
        ),
      ),
      onTap: () => onChanged(value),
    );
  }

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
}
