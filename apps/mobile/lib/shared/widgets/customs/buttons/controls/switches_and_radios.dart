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
      onChanged: onChanged,
      activeColor: activeColor ?? AppColors.buttonWithoutBackGround,
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
