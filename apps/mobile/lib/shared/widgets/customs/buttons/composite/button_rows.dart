import 'package:flutter/material.dart';
import '../basic/primary_button.dart';
import '../basic/secondary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';

class ButtonRows {
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
                ? PrimaryButton.primaryButton(
                    text: buttonTitle,
                    onPressed: onPressedList[index],
                    fontSize: fontSize,
                    padding: buttonPadding,
                    elevation: 6,
                  )
                : SecondaryButton.transparentButton(
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

  static Widget roleChoiceButtons({
    required VoidCallback onUserPressed,
    required VoidCallback onDriverPressed,
    double? spacing,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Expanded(
          child: Builder(
            builder: (context) => PrimaryButton.primaryButton(
              text: context.l10n.stepRoleUser,
              onPressed: onUserPressed,
              fontSize: 10,
              borderRadius: 2,
              padding: const EdgeInsets.symmetric(vertical: 15),
            ),
          ),
        ),
        SizedBox(width: spacing ?? 50),
        Expanded(
          child: Builder(
            builder: (context) => PrimaryButton.primaryButton(
              text: context.l10n.stepRoleDriver,
              onPressed: onDriverPressed,
              fontSize: 10,
              borderRadius: 2,
              padding: const EdgeInsets.symmetric(vertical: 15),
            ),
          ),
        ),
      ],
    );
  }

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
              child: SecondaryButton.secondaryButton(
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
              child: PrimaryButton.primaryButton(
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

  static Widget finalValidationButtons({
    required VoidCallback onCancelPressed,
    required VoidCallback onValidatePressed,
    String cancelText = 'Annuler',
    String validateText = 'Valider',
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        SecondaryButton.secondaryButton(
          text: cancelText,
          onPressed: onCancelPressed,
          borderRadius: 2,
        ),
        PrimaryButton.primaryButton(
          text: validateText,
          onPressed: onValidatePressed,
          borderRadius: 2,
        ),
      ],
    );
  }
}
