import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/core/constants/utils/form/form_utils.dart';

class StepFourView extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onSkip;
  final Function(Map<String, String>) onDataChanged;

  const StepFourView({
    super.key,
    required this.onNext,
    required this.onSkip,
    required this.onDataChanged,
  });

  @override
  State<StepFourView> createState() => _StepFourViewState();
}

class _StepFourViewState extends State<StepFourView> {
  final TextEditingController _marqueController = TextEditingController();
  final TextEditingController _modeleController = TextEditingController();
  final TextEditingController _immatriculationController = TextEditingController();
  final TextEditingController _placesController = TextEditingController();
  final TextEditingController _typeVehiculeController = TextEditingController();

  @override
  void dispose() {
    _marqueController.dispose();
    _modeleController.dispose();
    _immatriculationController.dispose();
    _placesController.dispose();
    _typeVehiculeController.dispose();
    super.dispose();
  }

  void _handleNext() {
    widget.onDataChanged({
      'marque': _marqueController.text,
      'modele': _modeleController.text,
      'immatriculation': _immatriculationController.text,
      'places': _placesController.text,
      'typeVehicule': _typeVehiculeController.text,
    });
    widget.onNext();
  }

  @override
  Widget build(BuildContext context) {
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
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Pour mieux vous identifier et garantir la sécurité de vos passagers, renseignez les caractéristiques de votre voiture.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
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
                    controller: _marqueController,
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
                    controller: _modeleController,
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
                    controller: _immatriculationController,
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
                    controller: _placesController,
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
                    controller: _typeVehiculeController,
                    backgroundColor: AppColors.inputTextBackground,
                  ),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: 32),
          ButtonsWidget.buttonRow(
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
