import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/utils/permission_handlers.dart';

class StepEightView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepEightView({
    super.key,
    required this.step,
    required this.coordinator,
    required this.onContinue,
    this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    final notificationOptions = ['SMS', 'Push notification mobile', 'E-mail'];

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          Text(
            step.title,
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(
              context,
            ).copyWith(fontSize: 24, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.75),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),

          Column(
            children: notificationOptions.asMap().entries.map((entry) {
              int idx = entry.key;
              String option = entry.value;
              return Padding(
                padding: EdgeInsets.only(
                  bottom: idx < notificationOptions.length - 1 ? 8.0 : 0,
                ),
                child: SwitchesAndRadios.customCheckbox(
                  title: option,
                  value: coordinator.preferencesViewModel.selectedNotifications
                      .contains(option),
                  onChanged: (value) {
                    coordinator.preferencesViewModel.toggleNotification(option);
                  },
                  titleColor: Theme.of(context).colorScheme.onSurface,
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 32),

          ButtonRows.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
            onPressedList: [
              onSkip ?? () {},
              () async {
                final selected =
                    coordinator.preferencesViewModel.selectedNotifications;

                await PermissionHandlers.handleNotificationPermissions(
                  context,
                  selected,
                );

                if (!context.mounted) return;

                if (selected.any((s) => s.toLowerCase().contains('sms'))) {
                  await PermissionHandlers.handleSmsPermission(context);
                }

                if (!context.mounted) return;

                onContinue();
              },
            ],
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            isLastButtonPrimary: true,
            spacing: 8,
            buttonPadding: const EdgeInsets.symmetric(vertical: 16),
            fontSize: 16,
          ),
        ],
      ),
    );
  }
}
