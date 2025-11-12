import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SwitchesAndRadios {
  static Widget customSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
    Color? activeColor,
  }) {
    return Builder(
      builder: (context) => Switch(
        value: value,
        onChanged: onChanged,
        thumbColor: WidgetStateProperty.all(AppColors.light),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return (activeColor ?? AppColors.progress).adapt(context);
          }
          return null;
        }),
      ),
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
    return Builder(
      builder: (context) {
        final bool isSelected = value == groupValue;
        final bool isDark = Theme.of(context).brightness == Brightness.dark;
        final Color resolvedIconColor = isDark
            ? AppColors.textColorDark
            : (activeColor ?? AppColors.buttonWithoutBackGround).adapt(context);
        final Color resolvedTitleColor = isDark
            ? AppColors.textColorDark
            : (titleColor ?? AppColors.buttonWithoutBackGround).adapt(context);

        return ListTile(
          contentPadding: EdgeInsets.zero,
          dense: true,
          visualDensity: const VisualDensity(horizontal: -4),
          leading: Icon(
            isSelected
                ? Icons.radio_button_checked
                : Icons.radio_button_unchecked,
            color: resolvedIconColor,
          ),
          title: Text(
            title,
            style: TextStyle(
              color: resolvedTitleColor,
              fontWeight: FontWeight.w600,
            ),
          ),
          onTap: () => onChanged(value),
        );
      },
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
    return Builder(
      builder: (context) => CheckboxListTile(
        title: Text(
          title,
          style: TextStyle(
            color: (titleColor ?? Theme.of(context).colorScheme.onSurface),
            fontFamily: 'Inder',
          ),
        ),
        value: value,
        onChanged: onChanged,
        activeColor: (activeColor ?? AppColors.buttonWithoutBackGround).adapt(
          context,
        ),
        checkColor: (checkColor ?? AppColors.light).adapt(context),
        controlAffinity: ListTileControlAffinity.leading,
        contentPadding: EdgeInsets.zero,
        side: BorderSide(
          color: Theme.of(context).brightness == Brightness.dark
              ? AppColors.light
              : Theme.of(context).colorScheme.onSurface,
        ),
      ),
    );
  }
}
