import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/chips.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/language_buttons.dart';

class StepNineView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepNineView({
    super.key,
    required this.step,
    required this.viewModel,
    required this.onContinue,
    this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    final themeOptions = [
      {'label': 'Clair', 'value': 'clair'},
      {'label': 'Sombre', 'value': 'sombre'},
    ];

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
            step.description!,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 32),

          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Thème',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textColor,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  ...themeOptions
                      .asMap()
                      .entries
                      .map((entry) {
                        final index = entry.key;
                        final option = entry.value;
                        return [
                          Chips.customChoiceChip(
                            label: option['label']!,
                            selected:
                                viewModel.selectedTheme == option['value'],
                            onSelected: (_) {
                              viewModel.setSelectedTheme(option['value']!);
                            },
                          ),
                          if (index < themeOptions.length - 1)
                            const SizedBox(width: 24),
                        ];
                      })
                      .expand((element) => element),
                ],
              ),
              const SizedBox(height: 32),
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Langue',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textColor,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              LanguageButtons.languageButtonContainer(
                selectedLanguage: viewModel.selectedLanguage,
                onLanguageChanged: (lang) {
                  viewModel.setSelectedLanguage(lang);
                },
              ),
            ],
          ),

          const SizedBox(height: 32),

          ButtonRows.buttonRow(
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
