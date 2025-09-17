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
          Text(
            'Dites-nous en plus sur votre véhicule',
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(context),
          ),
          const SizedBox(height: 16),
          Text(
            'Pour mieux vous identifier et garantir la sécurité de vos passagers, renseignez les caractéristiques de votre voiture.',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: AppColors.textColor.adapt(context).withAlpha(180),
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
                    validator: (value) {
                      final msg = RegexFormatter.getVehicleNameValidationMessage(value ?? '');
                      return msg.isEmpty ? null : msg;
                    },
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Modèle',
                    hint: 'ex: 404',
                    icon: Icons.directions_car,
                    showLabel: true,
                    controller: vm.getController('modele'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) {
                      final msg = RegexFormatter.getVehicleNameValidationMessage(value ?? '');
                      return msg.isEmpty ? null : msg;
                    },
                  ),
                  const SizedBox(height: 16),

                  CustomInputField(
                    label: 'Numéro d\'immatriculation',
                    hint: 'ex: AB-123-CD',
                    icon: Icons.confirmation_number,
                    showLabel: true,
                    controller: vm.getController('immatriculation'),
                    backgroundColor: AppColors.inputTextBackground,
                    validator: (value) {
                      final msg = RegexFormatter.getLicensePlateValidationMessage(value ?? '');
                      return msg.isEmpty ? null : msg;
                    },
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
                    validator: (value) {
                      final msg = RegexFormatter.getSeatCountValidationMessage(value ?? '');
                      return msg.isEmpty ? null : msg;
                    },
                  ),
                  const SizedBox(height: 16),

             
                  Builder(
                    builder: (context) {
                      final options = <String>['Voiture', 'Moto', 'TukTuk'];
                      final ctrl = vm.getController('typeVehicule');
                      final current = ctrl.text.trim().isEmpty ? null : ctrl.text.trim();
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Type de véhicule',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Theme.of(context).colorScheme.onSurface,
                            ),
                          ),
                          const SizedBox(height: 6),
                          InputDecorator(
                            decoration: InputDecoration(
                              isDense: true,
                              contentPadding:
                                  const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              filled: true,
                              fillColor: AppColors.inputTextBackground.adapt(context),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Theme.of(context).brightness == Brightness.dark
                                      ? AppColors.light.withValues(alpha: 0.2)
                                      : AppColors.borderInputField,
                                  width: 1,
                                ),
                                borderRadius: BorderRadius.circular(5),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Theme.of(context).brightness == Brightness.dark
                                      ? AppColors.light.withValues(alpha: 0.2)
                                      : AppColors.borderInputField,
                                  width: 1,
                                ),
                                borderRadius: BorderRadius.circular(5),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Theme.of(context).brightness == Brightness.dark
                                      ? AppColors.light.withValues(alpha: 0.4)
                                      : AppColors.borderInputField,
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(5),
                              ),
                            ),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton<String>(
                                isExpanded: true,
                                hint: const Text('ex: Voiture'),
                                value: current,
                                items: options
                                    .map((e) => DropdownMenuItem<String>(
                                          value: e,
                                          child: Text(e),
                                        ))
                                    .toList(),
                                onChanged: (val) {
                                  final text = val ?? '';
                                  if (ctrl.text != text) {
                                    ctrl.text = text;
                                  }
                                },
                              ),
                            ),
                          ),
                        ],
                      );
                    },
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
