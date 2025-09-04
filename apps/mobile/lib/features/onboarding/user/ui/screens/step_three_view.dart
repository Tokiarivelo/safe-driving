import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/utils/permission_handlers.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../models/user_onboarding_data.dart';

class StepFourView extends StatelessWidget {
  final bool notificationsEnabled;
  final Function(bool) onNotificationsChanged;
  final VoidCallback onNextStep;

  const StepFourView({
    super.key,
    required this.notificationsEnabled,
    required this.onNotificationsChanged,
    required this.onNextStep,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(2);
    final radioOptions =
        stepContent.additionalContent?['radioOptions'] ??
        ['Plus tard', 'Activer'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(stepContent.title, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: AppColors.buttonWithoutBackGround.adapt(context).withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[0],
                value: false,
                groupValue: notificationsEnabled,
                onChanged: (value) => onNotificationsChanged(value!),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[1],
                value: true,
                groupValue: notificationsEnabled,
                onChanged: (value) async {
                  if (value!) {
                    final selectedNotifications = ['push', 'alerts'];
                    final granted =
                        await PermissionHandlers.handleNotificationPermissions(
                          context,
                          selectedNotifications,
                        );
                    if (!context.mounted) return;
                    if (granted) {
                      onNotificationsChanged(true);
                    }
                  } else {
                    onNotificationsChanged(false);
                    SnackbarHelper.showSuccess(
                      context,
                      'Préférences de notifications sauvegardées !',
                      duration: const Duration(seconds: 2),
                    );
                  }
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        PrimaryButton.nextButton(
          onPressed: onNextStep,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
        ),
      ],
    );
  }
}
