import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/chips.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
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
        Text(stepContent.title, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: AppColors.buttonWithoutBackGround
                .adapt(context)
                .withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),

        // Thème
        Builder(
          builder: (context) => Text(
            themeLabel,
            style: TextStyle(
              color: AppColors.buttonWithoutBackGround.adapt(context),
            ),
          ),
        ),
        Row(
          children: [
            Chips.customChoiceChip(
              label: themeOptions[0],
              selected: selectedTheme == themeOptions[0],
              onSelected: (_) => onThemeChanged(themeOptions[0]),
            ),
            const SizedBox(width: 8),
            Chips.customChoiceChip(
              label: themeOptions[1],
              selected: selectedTheme == themeOptions[1],
              onSelected: (_) => onThemeChanged(themeOptions[1]),
            ),
          ],
        ),

        const SizedBox(height: 16),

        Builder(
          builder: (context) => Text(
            transportLabel,
            style: TextStyle(
              color: AppColors.buttonWithoutBackGround.adapt(context),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.fillButtonBackground
                  .adapt(context)
                  .withValues(alpha: 0.3),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(8),
          child: Wrap(
            spacing: 8,
            children: UserOnboardingData.transportModes.map((mode) {
              final isSelected = selectedTransports.contains(mode);
              return Chips.customFilterChip(
                avatarIcon: UserOnboardingData.transportIcons[mode],
                label: mode,
                selected: isSelected,
                onSelected: (selected) => onTransportChanged(mode, selected),
                selectedLabelColor: AppColors.light.adapt(context),
                labelColor: AppColors.buttonWithoutBackGround.adapt(context),
              );
            }).toList(),
          ),
        ),

        const SizedBox(height: 24),
        ButtonRows.laterAndActionButtons(
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
