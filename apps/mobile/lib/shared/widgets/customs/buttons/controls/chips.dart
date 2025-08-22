import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class Chips {
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

  static Widget customFilterChip({
    required String label,
    required bool selected,
    required ValueChanged<bool> onSelected,
    IconData? avatarIcon,
    Color? selectedColor,
    Color? checkmarkColor,
    Color? backgroundColor,
    Color? labelColor,
    Color? selectedLabelColor,
  }) {
    return FilterChip(
      avatar: avatarIcon != null
          ? Icon(
              avatarIcon,
              size: 18,
              color: selected
                  ? (selectedLabelColor ?? AppColors.light)
                  : (labelColor ?? AppColors.buttonWithoutBackGround),
            )
          : null,
      label: Text(
        label,
        style: TextStyle(
          color: selected
              ? (selectedLabelColor ?? AppColors.light)
              : (labelColor ?? AppColors.buttonWithoutBackGround),
        ),
      ),
      selected: selected,
      onSelected: onSelected,
      selectedColor: selectedColor ?? AppColors.fillButtonBackground,
      checkmarkColor: checkmarkColor ?? AppColors.light,
      backgroundColor: backgroundColor,
      side: BorderSide(
        color: selected
            ? (selectedColor ?? AppColors.fillButtonBackground)
            : AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
      ),
    );
  }

  static Widget customChip({
    required String label,
    Widget? avatar,
    VoidCallback? onDeleted,
    Color? backgroundColor,
    Color? labelColor,
    Color? deleteIconColor,
    Color? borderColor,
    double? fontSize,
    double? deleteIconSize,
  }) {
    return Chip(
      avatar: avatar,
      label: Text(
        label,
        style: TextStyle(
          color: labelColor ?? AppColors.buttonWithoutBackGround,
          fontSize: fontSize ?? 12,
        ),
      ),
      deleteIcon: onDeleted != null
          ? Icon(
              Icons.close,
              size: deleteIconSize ?? 18,
              color: deleteIconColor ?? AppColors.buttonWithoutBackGround,
            )
          : null,
      onDeleted: onDeleted,
      backgroundColor: backgroundColor ?? AppColors.secondBackgroundColor,
      side: BorderSide(
        color:
            borderColor ??
            AppColors.fillButtonBackground.withValues(alpha: 0.5),
        width: 1,
      ),
    );
  }
}
