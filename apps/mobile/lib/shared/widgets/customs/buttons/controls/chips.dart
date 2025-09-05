import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

class Chips {
  static Widget customChoiceChip({
    required String label,
    required bool selected,
    required ValueChanged<bool> onSelected,
    Color? selectedColor,
    Color? labelColor,
  }) {
    return Builder(
      builder: (context) => FilterChip(
        label: Text(
          label,
          style: TextStyle(
            color: (labelColor ??
                    (selected ? AppColors.light : AppColors.textColor))
                .adapt(context),
          ),
        ),
        selected: selected,
        onSelected: onSelected,
        selectedColor:
            (selectedColor ?? AppColors.fillButtonBackground).adapt(context),
        selectedShadowColor: AppColors.light.adapt(context),
        side: BorderSide(
          color: ColorsWidget.subtleBorderColor(context),
          width: 1,
        ),
      ),
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
    return Builder(
      builder: (context) => FilterChip(
        avatar: avatarIcon != null
            ? Icon(
                avatarIcon,
                size: 18,
                color: selected
                    ? ((selectedLabelColor ?? AppColors.light).adapt(context))
                    : ((labelColor ?? AppColors.buttonWithoutBackGround)
                        .adapt(context)),
              )
            : null,
        label: Text(
          label,
          style: TextStyle(
            color: selected
                ? ((selectedLabelColor ?? AppColors.light).adapt(context))
                : ((labelColor ?? AppColors.buttonWithoutBackGround)
                    .adapt(context)),
          ),
        ),
        selected: selected,
        onSelected: onSelected,
        selectedColor:
            (selectedColor ?? AppColors.fillButtonBackground).adapt(context),
        checkmarkColor: (checkmarkColor ?? AppColors.light).adapt(context),
        backgroundColor: backgroundColor,
        side: BorderSide(
          color: selected
              ? ((selectedColor ?? AppColors.fillButtonBackground).adapt(context))
              : ColorsWidget.subtleBorderColor(context),
        ),
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
    return Builder(
      builder: (context) => Chip(
        avatar: avatar,
        label: Text(
          label,
          style: TextStyle(
            color:
                (labelColor ?? AppColors.buttonWithoutBackGround).adapt(context),
            fontSize: fontSize ?? 12,
          ),
        ),
        deleteIcon: onDeleted != null
            ? Icon(
                Icons.close,
                size: deleteIconSize ?? 18,
                color: (deleteIconColor ?? AppColors.buttonWithoutBackGround)
                    .adapt(context),
              )
            : null,
        onDeleted: onDeleted,
        backgroundColor: backgroundColor,
        side: BorderSide(
          color: borderColor != null
              ? borderColor.adapt(context)
              : ColorsWidget.subtleBorderColor(context),
          width: 1,
        ),
      ),
    );
  }
}
