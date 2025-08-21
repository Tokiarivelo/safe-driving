import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/presentation/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/presentation/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

class StepTwoView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTwoView({
    super.key,
    required this.step,
    required this.viewModel,
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
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description ?? '',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
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
            controller: viewModel.nameController,
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
            controller: viewModel.emailController,
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: 'Téléphone',
            hint: '+261...',
            icon: Icons.phone,
            keyboardType: TextInputType.phone,
            showLabel: true,
            controller: viewModel.phoneController,
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

          ButtonsWidget.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
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
