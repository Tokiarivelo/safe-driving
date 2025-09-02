import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';

class SummaryBuilder {
  static Widget buildSummary(
    List resumeData,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
  ) {
    return Column(
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
                    getSectionIcon(titre),
                    size: 20,
                    color: AppColors.fillButtonBackground,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    titre,
                    style: AppTextStyles.body16.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              ...elements.map<Widget>((element) {
                return buildResumeElement(
                  element,
                  titre,
                  coordinator,
                  navigateToStep,
                );
              }),
            ],
          ),
        );
      }).toList(),
    );
  }

  static Widget buildResumeElement(
    String element,
    String sectionTitle,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
  ) {
    if (element == 'Photos uploadées') {
      final totalPhotos = coordinator.documentUploadViewModel
          .getTotalUploadedPhotosCount();
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          children: [
            Icon(
              getFieldIcon(element),
              size: 16,
              color: AppColors.fillButtonBackground,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                '$element : $totalPhotos',
                style: AppTextStyles.body14.copyWith(
                  color: AppColors.textColor.withAlpha(200),
                ),
              ),
            ),
          ],
        ),
      );
    }

    final fieldValue = coordinator.getFieldValue(element);
    final stepIndex = getStepIndexForField(element);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            getFieldIcon(element),
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
                    style: AppTextStyles.body14.copyWith(
                      color: AppColors.textColor.withAlpha(200),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  TextSpan(
                    text: fieldValue,
                    style: AppTextStyles.body14.copyWith(
                      color: AppColors.textColor.withAlpha(160),
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
                  navigateToStep(stepIndex);
                },
              ),
            ),
        ],
      ),
    );
  }

  static Widget buildCompletionContent(Map<String, dynamic> content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (content.containsKey('subsubtitle'))
          Text(
            content['subsubtitle'] as String,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
        const SizedBox(height: 16),

        // QR Code placeholder
        Container(
          width: 150,
          height: 150,
          decoration: BoxDecoration(
            color: AppColors.inputTextBackground.withAlpha(100),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: AppColors.fillButtonBackground.withAlpha(100),
              width: 2,
            ),
          ),
          child: const Center(
            child: Icon(
              Icons.qr_code,
              size: 80,
              color: AppColors.fillButtonBackground,
            ),
          ),
        ),

        const SizedBox(height: 16),
        if (content.containsKey('instructions'))
          Text(
            content['instructions'] as String,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: AppColors.textColor.withAlpha(180),
              height: 1.4,
              fontFamily: 'Inder',
            ),
          ),

        const SizedBox(height: 20),
        if (content.containsKey('messageConfiance'))
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.fillButtonBackground.withAlpha(20),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppColors.fillButtonBackground.withAlpha(100),
                width: 1,
              ),
            ),
            child: Text(
              content['messageConfiance'] as String,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: AppColors.textColor,
                height: 1.4,
                fontFamily: 'Inder',
              ),
            ),
          ),
      ],
    );
  }

  static IconData getFieldIcon(String fieldName) {
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

  static IconData getSectionIcon(String sectionTitle) {
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

  static int getStepIndexForField(String fieldName) {
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
}
