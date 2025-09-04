import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PreferencesBuilder {
  static Widget buildPreferences(
    Map<String, dynamic> content,
    DriverOnboardingCoordinator coordinator,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Theme selection
        if (content.containsKey('theme')) ...buildThemeSelection(coordinator),

        // Language selection
        if (content.containsKey('langue'))
          ...buildLanguageSelection(coordinator),
      ],
    );
  }

  static List<Widget> buildThemeSelection(
    DriverOnboardingCoordinator coordinator,
  ) {
    return [
      Align(
        alignment: Alignment.centerLeft,
        child: Builder(
          builder: (context) => Text(
            'Thème',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
        ),
      ),
      const SizedBox(height: 12),
      Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Builder(
            builder: (context) {
              return Row(
                children: [
                  Chips.customChoiceChip(
                    label: 'Clair',
                    selected: context.read<ThemeController>().mode != ThemeMode.dark,
                    onSelected: (_) {
                      coordinator.preferencesViewModel.setTheme('clair');
                      context.read<ThemeController>().setMode(ThemeMode.light);
                    },
                  ),
                  const SizedBox(width: 24),
                  Chips.customChoiceChip(
                    label: 'Sombre',
                    selected: context.read<ThemeController>().mode == ThemeMode.dark,
                    onSelected: (_) {
                      coordinator.preferencesViewModel.setTheme('sombre');
                      context.read<ThemeController>().setMode(ThemeMode.dark);
                    },
                  ),
                ],
              );
            },
          ),
        ],
      ),
      const SizedBox(height: 32),
    ];
  }

  static List<Widget> buildLanguageSelection(
    DriverOnboardingCoordinator coordinator,
  ) {
    return [
      Align(
        alignment: Alignment.centerLeft,
        child: Builder(
          builder: (context) => Text(
            'Langue',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
        ),
      ),
      const SizedBox(height: 12),
      LanguageButtons.languageButtonContainer(
        selectedLanguage: coordinator.preferencesViewModel.selectedLanguage,
        onLanguageChanged: (lang) {
          coordinator.preferencesViewModel.setLanguage(lang);
        },
      ),
    ];
  }

  static Widget buildNotificationsCheckboxes(
    List<String> checkboxOptions,
    DriverOnboardingCoordinator coordinator,
  ) {
    return Column(
      children: checkboxOptions.asMap().entries.map((entry) {
        int idx = entry.key;
        String option = entry.value;
        return Padding(
          padding: EdgeInsets.only(
            bottom: idx < checkboxOptions.length - 1 ? 8.0 : 0,
          ),
          child: Builder(
            builder: (context) => SwitchesAndRadios.customCheckbox(
              title: option,
              value: coordinator.preferencesViewModel.selectedNotifications
                  .contains(option),
              onChanged: (value) {
                coordinator.preferencesViewModel.toggleNotification(option);
              },
              titleColor: Theme.of(context).colorScheme.onSurface,
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget buildGpsButtons(
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: SwitchesAndRadios.customRadio<String>(
                title: "Plus tard",
                value: "Plus tard",
                groupValue: coordinator.preferencesViewModel.gpsEnabled
                    ? "Autoriser"
                    : "Plus tard",
                onChanged: (value) =>
                    coordinator.preferencesViewModel.setGpsEnabled(false),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<String>(
                title: "Autoriser",
                value: "Autoriser",
                groupValue: coordinator.preferencesViewModel.gpsEnabled
                    ? "Autoriser"
                    : "Plus tard",
                onChanged: (value) async {
                  if (value == "Autoriser") {
                    final granted = await coordinator.preferencesViewModel
                        .requestGpsPermission();
                    if (context.mounted && granted) {
                      SnackbarHelper.showSuccess(
                        context,
                        'Géolocalisation activée avec succès !',
                      );
                    }
                  } else {
                    coordinator.preferencesViewModel.setGpsEnabled(false);
                  }
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 32),
        PrimaryButton.primaryButton(
          text: "Continuer",
          onPressed: nextStep,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        ),
      ],
    );
  }
}
