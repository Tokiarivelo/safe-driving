import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/secondary_button.dart';

class DriverCommonButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isPrimary;
  final IconData? icon;

  const DriverCommonButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isPrimary = true,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    if (isPrimary) {
      return PrimaryButton.primaryButton(
        text: text,
        onPressed: onPressed,
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        icon: icon != null ? Icon(icon, color: AppColors.light.adapt(context)) : null,
      );
    }
    return SecondaryButton.secondaryButton(
      text: text,
      onPressed: onPressed,
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
      icon: icon != null
          ? Icon(icon, color: AppColors.buttonWithoutBackGround.adapt(context))
          : null,
    );
  }
}
