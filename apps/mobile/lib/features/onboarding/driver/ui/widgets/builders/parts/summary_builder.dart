import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/l10n/l10n.dart';

class SummaryBuilder {
  // Localize section titles
  static String _localizeSectionTitle(BuildContext context, String sectionKey) {
    switch (sectionKey) {
      case 'Informations personnelles':
      case 'Infos personnelles':
        return context.l10n.driverSummaryPersonalInfo;
      case 'Véhicule':
        return context.l10n.driverSummaryVehicle;
      case 'GPS & Notifications':
        return context.l10n.driverSummaryGpsNotifications;
      case 'Préférences':
        return context.l10n.driverSummaryPreferences;
      default:
        return sectionKey;
    }
  }

  // Localize field labels depending on section when necessary
  static String _localizeFieldLabel(BuildContext context, String fieldKey, String sectionTitle) {
    switch (fieldKey) {
      case 'Nom':
        return context.l10n.driverSummaryPersonalInfoName;
      case 'E-mail':
        return context.l10n.driverSummaryPersonalInfoEmail;
      case 'Téléphone':
        return context.l10n.driverSummaryPersonalInfoPhone;
      case 'Photos uploadées':
        // Personal or vehicle photos
        if (sectionTitle == 'Véhicule') {
          return context.l10n.driverSummaryVehiclePhotos;
        }
        return context.l10n.driverSummaryPersonalInfoPhotos;
      case 'Type':
        return context.l10n.driverSummaryVehicleType;
      case 'Marque':
        return context.l10n.driverSummaryVehicleBrand;
      case 'Modèle':
        return context.l10n.driverSummaryVehicleModel;
      case 'Immatriculation':
        return context.l10n.driverSummaryVehicleRegistration;
      case 'Nombre de places':
        return context.l10n.driverSummaryVehicleSeats;
      case 'GPS':
        return context.l10n.driverSummaryGps;
      case 'Notifications':
        return context.l10n.driverSummaryNotifications;
      case 'Thème':
        return context.l10n.driverSummaryTheme;
      case 'Langue':
        return context.l10n.driverSummaryLanguage;
      default:
        return fieldKey;
    }
  }
  static Widget buildSummary(
    List resumeData,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
    BuildContext context,
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
            color: AppColors.backgroundSecondary,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: AppColors.light,
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
                    color: AppColors.light,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
          child: Text(
                      _localizeSectionTitle(context, titre),
                      style: AppTextStyles.body16(context).copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppColors.light,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.backgroundSecondary,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: AppColors.light,
                        width: 1,
                      ),
                    ),
                    child: IconButton(
                      icon: const Icon(
                        Icons.edit,
                        size: 16,
                        color: AppColors.light,
                      ),
                      padding: EdgeInsets.zero,
                      onPressed: () {
                        navigateToStep(getStepIndexForSection(titre));
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              ...elements.map<Widget>((element) {
                return buildResumeElement(
                  context,
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
    BuildContext context,
    String element,
    String sectionTitle,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
  ) {
    final localizedLabel = _localizeFieldLabel(context, element, sectionTitle);
    if (element == 'Photos uploadées') {
 
      final isVehicle = sectionTitle == 'Véhicule';
      final totalPhotos = isVehicle
          ? coordinator.documentUploadViewModel.getVehicleUploadedPhotosCount()
          : coordinator.documentUploadViewModel.getPersonalUploadedPhotosCount();
      final stepIndex = isVehicle ? 4 : 2;
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          children: [
            Icon(
              getFieldIcon(element),
              size: 16,
              color: AppColors.light,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                '$localizedLabel : $totalPhotos',
                style: AppTextStyles.body14(context).copyWith(
                  color: AppColors.light,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.backgroundSecondary,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: AppColors.light,
                  width: 1,
                ),
              ),
              child: IconButton(
                icon: const Icon(
                  Icons.edit,
                  size: 16,
                  color: AppColors.light,
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

    final fieldValue = coordinator.getFieldValue(element);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            getFieldIcon(element),
            size: 16,
            color: AppColors.light,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: '$localizedLabel: ',
                    style: AppTextStyles.body14(context).copyWith(
                      color: AppColors.light,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  TextSpan(
                    text: fieldValue,
                    style: AppTextStyles.body14(context).copyWith(
                      color: AppColors.light,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  static Widget buildCompletionContent(Map<String, dynamic> content, BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (content.containsKey('subsubtitle'))
          Text(
            context.l10n.driverCompleteQrCodeSubtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Theme.of(context).brightness == Brightness.dark
                  ? AppColors.light
                  : Theme.of(context).colorScheme.onSurface,
              fontFamily: 'Inder',
            ),
          ),
        const SizedBox(height: 16),

        // QR Code placeholder
        Container(
          width: 150,
          height: 150,
          decoration: BoxDecoration(
            color: AppColors.inputTextBackground.adapt(context).withAlpha(100),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: AppColors.fillButtonBackground.adapt(context).withAlpha(100),
              width: 2,
            ),
          ),
          child: Center(
            child: Icon(
              Icons.qr_code,
              size: 80,
              color: AppColors.fillButtonBackground.adapt(context),
            ),
          ),
        ),

        const SizedBox(height: 16),
        if (content.containsKey('instructions'))
          Text(
            context.l10n.driverCompleteQrCodeInstructions,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Theme.of(context).brightness == Brightness.dark
                  ? AppColors.light
                  : Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
              height: 1.4,
              fontFamily: 'Inder',
            ),
          ),

        const SizedBox(height: 20),
        if (content.containsKey('messageConfiance'))
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.backgroundSecondary,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppColors.light,
                width: 1,
              ),
            ),
            child: Text(
              context.l10n.driverCompleteThankYou,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: AppColors.light,
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
      case 'Informations personnelles':
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

  static int getStepIndexForSection(String sectionTitle) {
    switch (sectionTitle) {
      case 'Infos personnelles':
      case 'Informations personnelles':
        return 1;
      case 'Véhicule':
        return 3;
      case 'GPS & Notifications':
        return 6;
      case 'Préférences':
        return 8;
      default:
        return 0;
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
      case 'Photos uploadées':
        return 4;
      default:
        return 0;
    }
  }
}
