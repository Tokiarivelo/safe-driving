import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import '../../models/user_onboarding_data.dart';
import '../../models/user_onboarding_step_model.dart';

class StepSixView extends StatelessWidget {
  final AppState appState;
  final Function(bool) onGpsChanged;
  final Function(bool) onNotificationsChanged;
  final Function(String) onTransportRemoved;
  final Function(String) onLanguageChanged;
  final VoidCallback onCancelPressed;
  final VoidCallback onCompletePressed;

  const StepSixView({
    super.key,
    required this.appState,
    required this.onGpsChanged,
    required this.onNotificationsChanged,
    required this.onTransportRemoved,
    required this.onLanguageChanged,
    required this.onCancelPressed,
    required this.onCompletePressed,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(4);
    final summaryLabels = stepContent.additionalContent?['summaryLabels'];

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

        Row(
          children: [
            ButtonsWidget.customSwitch(
              value: appState.gpsEnabled,
              onChanged: onGpsChanged,
            ),
            const SizedBox(width: 8),
            Text(
              summaryLabels['gps'],
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
          ],
        ),

        Row(
          children: [
            ButtonsWidget.customSwitch(
              value: appState.notifEnabled,
              onChanged: onNotificationsChanged,
            ),
            const SizedBox(width: 8),
            Text(
              summaryLabels['notifications'],
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
          ],
        ),

        const SizedBox(height: 16),

        Text(
          '${summaryLabels['theme']} : ${appState.selectedTheme}',
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),

        const SizedBox(height: 8),

        Text(
          '${summaryLabels['transport']} :',
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
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (appState.selectedTransports.isNotEmpty)
                Wrap(
                  spacing: 8,
                  runSpacing: 4,
                  children: appState.selectedTransports.map((transport) {
                    return ButtonsWidget.customChip(
                      label: transport,
                      avatar: Icon(
                        UserOnboardingData.transportIcons[transport],
                        size: 16,
                        color: AppColors.buttonWithoutBackGround,
                      ),
                      onDeleted: () => onTransportRemoved(transport),
                    );
                  }).toList(),
                )
              else
                Text(
                  summaryLabels['noTransport'],
                  style: TextStyle(
                    color: AppColors.buttonWithoutBackGround.withValues(
                      alpha: 0.6,
                    ),
                    fontStyle: FontStyle.italic,
                  ),
                ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        Text(
          '${summaryLabels['language']} :',
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),
        const SizedBox(height: 8),
        ButtonsWidget.languageButtonContainer(
          selectedLanguage: appState.selectedLanguage,
          onLanguageChanged: onLanguageChanged,
        ),

        const SizedBox(height: 24),

        ButtonsWidget.laterAndActionButtons(
          onLaterPressed: onCancelPressed,
          onActionPressed: onCompletePressed,
          laterText: stepContent.buttonTitles[0],
          actionText: stepContent.buttonTitles[1],
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
