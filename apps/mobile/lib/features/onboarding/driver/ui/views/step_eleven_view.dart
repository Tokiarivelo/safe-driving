import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

class StepElevenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;
  final Function(int) onNavigateToStep;

  const StepElevenView({
    super.key,
    required this.step,
    required this.viewModel,
    required this.onContinue,
    required this.onNavigateToStep,
    this.onSkip,
  });

  IconData _getFieldIcon(String fieldName) {
    switch (fieldName) {
      case 'Nom':
        return Icons.person;
      case 'E-mail':
        return Icons.email;
      case 'Téléphone':
        return Icons.phone;
      case 'Photos uploadées':
        return Icons.photo_library;
      case 'Type':
        return Icons.local_taxi;
      case 'Marque':
        return Icons.car_rental;
      case 'Modèle':
        return Icons.directions_car;
      case 'Immatriculation':
        return Icons.confirmation_number;
      case 'Nombre de places':
        return Icons.airline_seat_recline_normal;
      case 'GPS':
        return Icons.location_on;
      case 'Notifications':
        return Icons.notifications;
      case 'Thème':
        return Icons.palette;
      case 'Langue':
        return Icons.language;
      default:
        return Icons.info;
    }
  }

  IconData _getSectionIcon(String sectionTitle) {
    switch (sectionTitle) {
      case 'Infos personnelles':
        return Icons.person;
      case 'Véhicule':
        return Icons.directions_car;
      case 'GPS & Notifications':
        return Icons.settings;
      case 'Préférences':
        return Icons.tune;
      default:
        return Icons.info;
    }
  }

  int _getStepIndexForField(String fieldName) {
    switch (fieldName) {
      case 'Nom':
      case 'E-mail':
      case 'Téléphone':
        return 1;
      case 'Type':
      case 'Marque':
      case 'Modèle':
      case 'Immatriculation':
      case 'Nombre de places':
        return 3;
      case 'GPS':
        return 6;
      case 'Notifications':
        return 7;
      case 'Thème':
      case 'Langue':
        return 8;
      default:
        return 0;
    }
  }

  Widget _buildResumeElement(String element, String sectionTitle) {
    if (element == 'Photos uploadées') {
      final totalPhotos = viewModel.getTotalUploadedPhotosCount();
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          children: [
            Icon(
              _getFieldIcon(element),
              size: 16,
              color: AppColors.fillButtonBackground,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                '$element : $totalPhotos',
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.textColor.withAlpha(200),
                  fontFamily: 'Inder',
                ),
              ),
            ),
          ],
        ),
      );
    }

    final fieldValue = viewModel.getFieldValue(element);
    final stepIndex = _getStepIndexForField(element);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            _getFieldIcon(element),
            size: 16,
            color: AppColors.fillButtonBackground,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: '$element: ',
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textColor.withAlpha(200),
                      fontFamily: 'Inder',
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  TextSpan(
                    text: fieldValue,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textColor.withAlpha(160),
                      fontFamily: 'Inder',
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 8),
          if (element != 'Photos uploadées')
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.fillButtonBackground.withAlpha(20),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: AppColors.fillButtonBackground.withAlpha(100),
                  width: 1,
                ),
              ),
              child: IconButton(
                icon: Icon(
                  Icons.edit,
                  size: 16,
                  color: AppColors.fillButtonBackground,
                ),
                padding: EdgeInsets.zero,
                onPressed: () {
                  onNavigateToStep(stepIndex);
                },
              ),
            ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final resumeData = [
      {
        "titre": "Infos personnelles",
        "elements": ["Nom", "E-mail", "Téléphone", "Photos uploadées"],
      },
      {
        "titre": "Véhicule",
        "elements": [
          "Type",
          "Marque",
          "Modèle",
          "Immatriculation",
          "Nombre de places",
          "Photos uploadées",
        ],
      },
      {
        "titre": "GPS & Notifications",
        "elements": ["GPS", "Notifications"],
      },
      {
        "titre": "Préférences",
        "elements": ["Thème", "Langue"],
      },
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
          
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: resumeData.map<Widget>((section) {
                  final titre = section['titre'] as String;
                  final elements = section['elements'] as List<String>;

                  return Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.inputTextBackground.withAlpha(50),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppColors.fillButtonBackground.withAlpha(100),
                        width: 1,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(
                              _getSectionIcon(titre),
                              size: 20,
                              color: AppColors.fillButtonBackground,
                            ),
                            const SizedBox(width: 8),
                            Text(
                              titre,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.textColor,
                                fontFamily: 'Inder',
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        ...elements.map<Widget>((element) {
                          return _buildResumeElement(element, titre);
                        }),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
          
          const SizedBox(height: 16),
          
          PrimaryButton.primaryButton(
            text: "Valider",
            onPressed: onContinue,
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
          ),
        ],
      ),
    );
  }
}
