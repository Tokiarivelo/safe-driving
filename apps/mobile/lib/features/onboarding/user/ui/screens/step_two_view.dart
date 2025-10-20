import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/utils/permission_handlers.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../models/user_onboarding_data.dart';

class StepThreeView extends StatelessWidget {
  final bool gpsEnabled;
  final Function(bool) onGpsChanged;
  final VoidCallback onNextStep;

  const StepThreeView({
    super.key,
    required this.gpsEnabled,
    required this.onGpsChanged,
    required this.onNextStep,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(1);
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
            color: AppColors.buttonWithoutBackGround
                .adapt(context)
                .withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[0],
                value: false,
                groupValue: gpsEnabled,
                onChanged: (value) => onGpsChanged(value!),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[1],
                value: true,
                groupValue: gpsEnabled,
                onChanged: (value) async {
                  if (value!) {
                    final granted =
                        await PermissionHandlers.handleGpsPermission(context);
                    if (!context.mounted) return;
                    if (granted) {
                      onGpsChanged(true);
                      SnackbarHelper.showSuccess(
                        context,
                        'Géolocalisation activée avec succès !',
                        duration: const Duration(seconds: 2),
                      );
                    }
                  } else {
                    onGpsChanged(false);
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
