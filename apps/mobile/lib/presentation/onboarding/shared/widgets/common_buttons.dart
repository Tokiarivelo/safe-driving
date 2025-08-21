import 'package:flutter/material.dart';

class OnboardingButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonType type;
  final bool isLoading;
  final IconData? icon;
  final double? width;
  final double? height;
  final EdgeInsetsGeometry? padding;
  final TextStyle? textStyle;

  const OnboardingButton({
    super.key,
    required this.text,
    this.onPressed,
    this.type = ButtonType.primary,
    this.isLoading = false,
    this.icon,
    this.width,
    this.height,
    this.padding,
    this.textStyle,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDisabled = onPressed == null || isLoading;

    Widget buttonChild = isLoading
        ? SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(
                type == ButtonType.primary ? Colors.white : theme.primaryColor,
              ),
            ),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18),
                const SizedBox(width: 8),
              ],
              Text(text, style: textStyle, textAlign: TextAlign.center),
            ],
          );

    Widget button;
    switch (type) {
      case ButtonType.primary:
        button = ElevatedButton(
          onPressed: isDisabled ? null : onPressed,
          style: ElevatedButton.styleFrom(
            padding:
                padding ??
                const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            minimumSize: Size(width ?? 0, height ?? 48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: buttonChild,
        );
        break;
      case ButtonType.secondary:
        button = OutlinedButton(
          onPressed: isDisabled ? null : onPressed,
          style: OutlinedButton.styleFrom(
            padding:
                padding ??
                const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            minimumSize: Size(width ?? 0, height ?? 48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: buttonChild,
        );
        break;
      case ButtonType.text:
        button = TextButton(
          onPressed: isDisabled ? null : onPressed,
          style: TextButton.styleFrom(
            padding:
                padding ??
                const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            minimumSize: Size(width ?? 0, height ?? 48),
          ),
          child: buttonChild,
        );
        break;
    }

    return SizedBox(width: width, child: button);
  }
}

enum ButtonType { primary, secondary, text }

class OnboardingButtonRow extends StatelessWidget {
  final Widget? previousButton;
  final Widget? nextButton;
  final MainAxisAlignment alignment;
  final CrossAxisAlignment crossAlignment;
  final double spacing;

  const OnboardingButtonRow({
    super.key,
    this.previousButton,
    this.nextButton,
    this.alignment = MainAxisAlignment.spaceBetween,
    this.crossAlignment = CrossAxisAlignment.center,
    this.spacing = 16,
  });

  @override
  Widget build(BuildContext context) {
    final buttons = <Widget>[];

    if (previousButton != null) {
      buttons.add(Expanded(child: previousButton!));
    }

    if (previousButton != null && nextButton != null) {
      buttons.add(SizedBox(width: spacing));
    }

    if (nextButton != null) {
      buttons.add(Expanded(child: nextButton!));
    }

    if (buttons.isEmpty) {
      return const SizedBox.shrink();
    }

    return Row(
      mainAxisAlignment: alignment,
      crossAxisAlignment: crossAlignment,
      children: buttons,
    );
  }
}

/// Convenience constructors for common button combinations
extension OnboardingButtonExtensions on OnboardingButton {
  static OnboardingButton previous({
    String text = 'Précédent',
    VoidCallback? onPressed,
    bool isLoading = false,
  }) {
    return OnboardingButton(
      text: text,
      onPressed: onPressed,
      type: ButtonType.secondary,
      isLoading: isLoading,
      icon: Icons.arrow_back,
    );
  }

  static OnboardingButton next({
    String text = 'Suivant',
    VoidCallback? onPressed,
    bool isLoading = false,
  }) {
    return OnboardingButton(
      text: text,
      onPressed: onPressed,
      type: ButtonType.primary,
      isLoading: isLoading,
      icon: Icons.arrow_forward,
    );
  }

  static OnboardingButton finish({
    String text = 'Terminer',
    VoidCallback? onPressed,
    bool isLoading = false,
  }) {
    return OnboardingButton(
      text: text,
      onPressed: onPressed,
      type: ButtonType.primary,
      isLoading: isLoading,
      icon: Icons.check,
    );
  }

  static OnboardingButton skip({
    String text = 'Passer',
    VoidCallback? onPressed,
  }) {
    return OnboardingButton(
      text: text,
      onPressed: onPressed,
      type: ButtonType.text,
    );
  }
}
