import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

class StepTwoView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTwoView({
    super.key,
    required this.step,
    required this.coordinator,
    required this.onContinue,
    this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
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
            style: AppTextStyles.h1(context).copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description ?? '',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),

          // Form fields
          CustomInputField(
            label: 'Nom complet',
            hint: 'John Doe',
            icon: Icons.person,
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
            controller: coordinator.personalInfoViewModel.nameController,
            readOnly: true,
            enabled: false,
            onChanged: (value) => {},
            validator: (value) =>
                RegexFormatter.getNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: 'E-mail',
            hint: 'example@email.com',
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            controller: coordinator.personalInfoViewModel.emailController,
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
            readOnly: true,
            enabled: false,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: 'Téléphone',
            hint: '+261...',
            icon: Icons.phone,
            keyboardType: TextInputType.phone,
            showLabel: true,
            controller: coordinator.personalInfoViewModel.phoneController,
            onChanged: (value) => {},
            validator: (value) => value?.isEmpty == true
                ? null
                : (RegexFormatter.isValidMalagasyPhone(value!)
                      ? null
                      : RegexFormatter.getMalagasyPhoneValidationMessage(
                          value,
                        )),
          ),

          const SizedBox(height: 32),

          ButtonRows.buttonRow(
            buttonTitles: step.buttonTitles,
            onPressedList: [onSkip ?? () {}, onContinue],
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
