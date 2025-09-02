import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

class StepFourView extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onSkip;
  final Function(Map<String, String>) onDataChanged;
  // Optionally inject the coordinator (falls back to Provider if null)
  final DriverOnboardingCoordinator? coordinator;

  const StepFourView({
    super.key,
    required this.onNext,
    required this.onSkip,
    required this.onDataChanged,
    this.coordinator,
  });

  @override
  State<StepFourView> createState() => _StepFourViewState();
}

class _StepFourViewState extends State<StepFourView> {
  DriverOnboardingCoordinator get _coordinator =>
      widget.coordinator ?? context.read<DriverOnboardingCoordinator>();

  void _handleNext() {
    final vm = _coordinator.vehicleInfoViewModel;

    // Propagate data to legacy callback while ensuring we use the shared controllers
    widget.onDataChanged({
      'marque': vm.getController('marque').text,
      'modele': vm.getController('modele').text,
      'immatriculation': vm.getController('immatriculation').text,
      'places': vm.getController('places').text,
      'typeVehicule': vm.getController('typeVehicule').text,
    });

    widget.onNext();
  }

  @override
  Widget build(BuildContext context) {
    final vm = _coordinator.vehicleInfoViewModel;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          const Text(
            'Dites-nous en plus sur votre véhicule',
            textAlign: TextAlign.center,
            style: AppTextStyles.h1,
          ),
          const SizedBox(height: 16),
          Text(
            'Pour mieux vous identifier et garantir la sécurité de vos passagers, renseignez les caractéristiques de votre voiture.',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16.copyWith(
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),

          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  CustomInputField(
                    label: 'Marque',
                    hint: 'ex: Peugeot',
                    icon: Icons.car_rental,
                    showLabel: true,
                    controller: vm.getController('marque'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) =>
                        RegexFormatter.getVehicleNameValidationMessage(value!),
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Modèle',
                    hint: 'ex: 404',
                    icon: Icons.directions_car,
                    showLabel: true,
                    controller: vm.getController('modele'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) =>
                        RegexFormatter.getVehicleNameValidationMessage(value!),
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Numéro d\'immatriculation',
                    hint: 'ex: AB-123-CD',
                    icon: Icons.confirmation_number,
                    showLabel: true,
                    controller: vm.getController('immatriculation'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) =>
                        RegexFormatter.getLicensePlateValidationMessage(value!),
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Nombre de places',
                    hint: 'ex: 4',
                    icon: Icons.airline_seat_recline_normal,
                    keyboardType: TextInputType.number,
                    showLabel: true,
                    controller: vm.getController('places'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) =>
                        RegexFormatter.getSeatCountValidationMessage(value!),
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Type de véhicule',
                    hint: 'ex: Voiture',
                    icon: Icons.local_taxi,
                    showLabel: true,
                    controller: vm.getController('typeVehicule'),
                    backgroundColor: AppColors.inputTextBackground,
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 32),
          ButtonRows.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
            onPressedList: [widget.onSkip, _handleNext],
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
