import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../models/user_onboarding_data.dart';

class StepFiveView extends StatelessWidget {
  final String selectedTheme;
  final List<String> selectedTransports;
  final Function(String) onThemeChanged;
  final Function(String, bool) onTransportChanged;
  final VoidCallback onLaterPressed;
  final VoidCallback onValidatePressed;

  const StepFiveView({
    super.key,
    required this.selectedTheme,
    required this.selectedTransports,
    required this.onThemeChanged,
    required this.onTransportChanged,
    required this.onLaterPressed,
    required this.onValidatePressed,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(3);
    final themeLabel = stepContent.additionalContent?['themeLabel'];
    final themeOptions = stepContent.additionalContent?['themeOptions'];
    final transportLabel = stepContent.additionalContent?['transportLabel'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          stepContent.title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: AppColors.buttonWithoutBackGround,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: TextStyle(
            color: AppColors.buttonWithoutBackGround.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),

        // Thème
        Text(
          themeLabel,
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),
        Row(
          children: [
            ButtonsWidget.customChoiceChip(
              label: themeOptions[0],
              selected: selectedTheme == themeOptions[0],
              onSelected: (_) => onThemeChanged(themeOptions[0]),
            ),
            const SizedBox(width: 8),
            ButtonsWidget.customChoiceChip(
              label: themeOptions[1],
              selected: selectedTheme == themeOptions[1],
              onSelected: (_) => onThemeChanged(themeOptions[1]),
            ),
          ],
        ),

        const SizedBox(height: 16),

        Text(
          transportLabel,
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(8),
          child: Wrap(
            spacing: 8,
            children: UserOnboardingData.transportModes.map((mode) {
              final isSelected = selectedTransports.contains(mode);
              return ButtonsWidget.customFilterChip(
                avatarIcon: UserOnboardingData.transportIcons[mode],
                label: mode,
                selected: isSelected,
                onSelected: (selected) => onTransportChanged(mode, selected),
                selectedLabelColor: AppColors.light,
                labelColor: AppColors.buttonWithoutBackGround,
              );
            }).toList(),
          ),
        ),

        const SizedBox(height: 24),
        ButtonsWidget.laterAndActionButtons(
          onLaterPressed: onLaterPressed,
          onActionPressed: () {
            if (selectedTransports.isEmpty) {
              SnackbarHelper.showWarning(
                context,
                'Veuillez sélectionner au moins un mode de transport',
                duration: const Duration(seconds: 2),
              );
              return;
            }
            onValidatePressed();
          },
          actionText: stepContent.buttonTitles[1],
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
