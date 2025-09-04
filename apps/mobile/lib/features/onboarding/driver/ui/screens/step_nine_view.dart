import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/chips.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/language_buttons.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';

class StepNineView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepNineView({
    super.key,
    required this.step,
    required this.coordinator,
    required this.onContinue,
    this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    final themeOptions = [
      {'label': 'Automatique', 'value': 'auto'},
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
            style: AppTextStyles.h1(context).copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: AppColors.textColor.adapt(context).withAlpha(180),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),

          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Align(
                alignment: Alignment.centerLeft,
                child: Text('Thème', style: AppTextStyles.h2BoldNeutral(context)),
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
                                coordinator
                                    .preferencesViewModel
                                    .selectedTheme ==
                                option['value'],
                            onSelected: (_) {
                              final value = option['value']!;
                              coordinator.preferencesViewModel.setSelectedTheme(value);
                              final mode = ThemeController.fromLabel(value);
                              context.read<ThemeController>().setMode(mode);
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
              Align(
                alignment: Alignment.centerLeft,
                child: Text('Langue', style: AppTextStyles.h2BoldNeutral(context)),
              ),
              const SizedBox(height: 12),
              LanguageButtons.languageButtonContainer(
                selectedLanguage:
                    coordinator.preferencesViewModel.selectedLanguage,
                onLanguageChanged: (lang) {
                  coordinator.preferencesViewModel.setSelectedLanguage(lang);
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
