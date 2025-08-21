import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';
import '../upload_widget.dart';
import '../camera_interface.dart';
import '../captured_photos_modal.dart';
import '../policy_modal.dart';
import '../../../models/driver_onboarding_step_model.dart';
import '../../../viewmodels/driver_onboarding_coordinator.dart';
import '../../../models/driver_onboarding_data.dart';

class DriverUIBuilder {
  static Widget buildStepContent(
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    Function(int) navigateToStep,
    BuildContext context,
  ) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          Text(
            textAlign: TextAlign.center,
            step.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            textAlign: TextAlign.center,
            step.subtitle,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 24),

          // Build additional content based on step type
          if (step.additionalContent != null)
            _buildAdditionalContent(
              step.additionalContent!,
              step,
              coordinator,
              navigateToStep,
              context,
            ),

          const SizedBox(height: 32),

          // Build buttons
          _buildButtons(step, coordinator, nextStep, context),
        ],
      ),
    );
  }

  static Widget _buildAdditionalContent(
    Map<String, dynamic> content,
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
    BuildContext context,
  ) {
    // Form content
    if (content.containsKey('form')) {
      return _buildForm(content['form'] as Map<String, String>, coordinator);
    }

    // Identity documents
    if (content.containsKey('carteIdentité')) {
      final carteIdentiteData =
          content['carteIdentité'] as Map<String, dynamic>;
      return _buildIdentityDocuments(carteIdentiteData, coordinator, context);
    }

    // Vehicle documents
    if (content.containsKey('documents')) {
      final documentsData = content['documents'] as Map<String, dynamic>;
      return _buildVehicleDocuments(documentsData, coordinator, context);
    }

    // Selfie camera
    if (content.containsKey('selfie')) {
      final selfieData = content['selfie'] as Map<String, dynamic>;
      return _buildSelfieCamera(selfieData, coordinator, context);
    }

    // Notifications checkboxes
    if (content.containsKey('checkboxOptions')) {
      final checkboxOptions = content['checkboxOptions'] as List<String>;
      if (step.title == "Restez informé") {
        return _buildNotificationsCheckboxes(checkboxOptions, coordinator);
      }
      if (step.title == "Un dernier point avant de démarrer") {
        return _buildLegalCheckboxes(checkboxOptions, coordinator, context);
      }
    }

    // Theme and language preferences
    if (content.containsKey('theme')) {
      return _buildPreferences(content, coordinator);
    }

    // Summary
    if (content.containsKey('resume')) {
      final resumeData = content['resume'] as List;
      return _buildSummary(resumeData, coordinator, navigateToStep);
    }

    // Completion QR code
    if (content.containsKey('subsubtitle') ||
        content.containsKey('instructions') ||
        content.containsKey('messageConfiance')) {
      return _buildCompletionContent(content);
    }

    // Legal content (CGU/Privacy Policy)
    if (content.containsKey('content')) {
      return const SizedBox.shrink(); // Content will be shown in modal
    }

    return const SizedBox.shrink();
  }

  static Widget _buildForm(
    Map<String, String> formData,
    DriverOnboardingCoordinator coordinator,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Personal info form
        if (formData.containsKey('labelTextName')) ...[
          CustomInputField(
            label: formData['labelTextName'],
            hint: formData['placeholderName']!,
            icon: Icons.person,
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
            controller: coordinator.personalInfoViewModel.getController('name'),
            validator: (value) =>
                RegexFormatter.getNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelTextEmail'],
            hint: formData['placeholderEmail']!,
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            controller: coordinator.personalInfoViewModel.getController('email'),
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelTextPhone'],
            hint: formData['placeholderPhone']!,
            icon: Icons.phone,
            keyboardType: TextInputType.phone,
            showLabel: true,
            controller: coordinator.personalInfoViewModel.getController('phone'),
            validator: (value) => value?.isEmpty == true
                ? null
                : (RegexFormatter.isValidMalagasyPhone(value!)
                      ? null
                      : RegexFormatter.getMalagasyPhoneValidationMessage(
                          value,
                        )),
          ),
        ],

        // Vehicle info form
        if (formData.containsKey('labelMarque')) ...[
          CustomInputField(
            label: formData['labelMarque'],
            hint: formData['placeholderMarque']!,
            icon: Icons.car_rental,
            showLabel: true,
            controller: coordinator.vehicleInfoViewModel.getController('marque'),
            validator: (value) =>
                RegexFormatter.getVehicleNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelModele'],
            hint: formData['placeholderModele']!,
            icon: Icons.directions_car,
            showLabel: true,
            controller: coordinator.vehicleInfoViewModel.getController('modele'),
            validator: (value) =>
                RegexFormatter.getVehicleNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelImmatriculation'],
            hint: formData['placeholderImmatriculation']!,
            icon: Icons.confirmation_number,
            showLabel: true,
            controller: coordinator.vehicleInfoViewModel.getController('immatriculation'),
            validator: (value) =>
                RegexFormatter.getLicensePlateValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelPlaces'],
            hint: formData['placeholderPlaces']!,
            icon: Icons.airline_seat_recline_normal,
            keyboardType: TextInputType.number,
            showLabel: true,
            controller: coordinator.vehicleInfoViewModel.getController('places'),
            validator: (value) =>
                RegexFormatter.getSeatCountValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelTypeVehicule'],
            hint: formData['placeholderTypeVehicule']!,
            icon: Icons.local_taxi,
            showLabel: true,
            controller: coordinator.vehicleInfoViewModel.getController('typeVehicule'),
          ),
        ],
      ],
    );
  }

  static Widget _buildIdentityDocuments(
    Map<String, dynamic> carteIdentiteData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (carteIdentiteData.containsKey('rectoID'))
          _buildUploadSection(
            carteIdentiteData['rectoID'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('versoID'))
          _buildUploadSection(
            carteIdentiteData['versoID'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('permisConduire'))
          _buildUploadSection(
            carteIdentiteData['permisConduire'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
      ],
    );
  }

  static Widget _buildVehicleDocuments(
    Map<String, dynamic> documentsData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (documentsData.containsKey('certificatImmatriculation'))
          _buildDocumentSection(
            documentsData['certificatImmatriculation'] as Map<String, dynamic>,
            'Certificat d\'immatriculation',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('attestationAssurance'))
          _buildDocumentSection(
            documentsData['attestationAssurance'] as Map<String, dynamic>,
            'Attestation d\'assurance',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('photosVehicule'))
          _buildDocumentSection(
            documentsData['photosVehicule'] as Map<String, dynamic>,
            'Photos du véhicule',
            coordinator,
            context,
          ),
      ],
    );
  }

  static Widget _buildUploadSection(
    Map<String, dynamic> sectionData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    final title = sectionData['title'] as String? ?? '';
    final textCenter = sectionData['textCenter'] as String?;
    final bouton = sectionData['bouton'] as String?;

    return UploadWidget(
      title: title,
      description: textCenter!,
      buttonText: bouton!,
      onPhotosChanged: (photos) async {
        String storageType;
        if (title.contains('Recto')) {
          storageType = 'carteIdentiteRecto';
        } else if (title.contains('Verso')) {
          storageType = 'carteIdentiteVerso';
        } else if (title.contains('Permis')) {
          storageType = 'permisConduire';
        } else {
          storageType = 'unknown';
        }

        await coordinator.documentUploadViewModel.uploadPhotos(photos.cast<File>(), storageType);

        if (context.mounted) {
          SnackbarHelper.showSuccess(
            context,
            '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $title',
          );
        }
      },
    );
  }

  static Widget _buildDocumentSection(
    Map<String, dynamic> documentData,
    String defaultTitle,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    final uploadZone = documentData['uploadZone'] as Map<String, dynamic>?;
    final ajoutPhoto = documentData['ajoutPhoto'] as String?;

    if (uploadZone != null) {
      final textCenter = uploadZone['textCenter'] as String?;
      final bouton = uploadZone['bouton'] as String?;

      return UploadWidget(
        title: defaultTitle,
        description: textCenter!,
        buttonText: bouton!,
        addMorePhotosText: ajoutPhoto,
        onPhotosChanged: (photos) async {
          String storageType;
          if (defaultTitle.contains('Certificat')) {
            storageType = 'certificatImmatriculation';
          } else if (defaultTitle.contains('Attestation')) {
            storageType = 'attestationAssurance';
          } else if (defaultTitle.contains('Photos')) {
            storageType = 'photosVehicule';
          } else {
            storageType = 'unknown';
          }

          await coordinator.documentUploadViewModel.uploadPhotos(photos.cast<File>(), storageType);

          if (context.mounted) {
            SnackbarHelper.showSuccess(
              context,
              '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $defaultTitle',
            );
          }
        },
      );
    }

    return const SizedBox.shrink();
  }

  static Widget _buildSelfieCamera(
    Map<String, dynamic> selfieData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return SizedBox(
      height: 400,
      child: CameraInterface(
        onPictureTaken: (imagePath) async {
          if (imagePath != null) {
            final capturedFile = File(imagePath);
            coordinator.documentUploadViewModel.addCapturedPhoto(capturedFile);

            await coordinator.documentUploadViewModel.uploadPhotos([capturedFile], 'selfie');

            if (context.mounted) {
              SnackbarHelper.showSuccess(context, 'Selfie pris avec succès !');
              _showCapturedPhotosModal(context, coordinator);
            }
          } else {
            SnackbarHelper.showError(
              context,
              'Erreur lors de la prise de photo',
            );
          }
        },
      ),
    );
  }

  static void _showCapturedPhotosModal(
    BuildContext context,
    DriverOnboardingCoordinator coordinator,
  ) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return CapturedPhotosModal(
          selectedImages: coordinator.documentUploadViewModel.capturedPhotos,
          onImagesChanged: (updatedImages) {
            coordinator.documentUploadViewModel.updateCapturedPhotos(updatedImages);
          },
        );
      },
    );
  }

  static Widget _buildNotificationsCheckboxes(
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
          child: SwitchesAndRadios.customCheckbox(
            title: option,
            value: coordinator.preferencesViewModel.selectedNotifications.contains(option),
            onChanged: (value) {
              coordinator.preferencesViewModel.toggleNotification(option);
            },
            titleColor: AppColors.fillButtonBackground,
          ),
        );
      }).toList(),
    );
  }

  static Widget _buildLegalCheckboxes(
    List<String> checkboxOptions,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      children: [
        ElegantAcceptanceButton.elegantAcceptanceButton(
          text: "Conditions Générales d'Utilisation",
          subtitle: "Lire et accepter les CGU",
          isAccepted: coordinator.legalViewModel.cguAccepted[0],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                final cguStep = DriverOnboardingData.getStep(12); // CGU step
                return PolicyModal(
                  titleContent: cguStep.title,
                  content: cguStep.additionalContent?["content"] ?? "",
                  onAccept: () {
                    coordinator.legalViewModel.setCguAccepted(0, true);
                  },
                );
              },
            );
          },
        ),
        const SizedBox(height: 16),
        ElegantAcceptanceButton.elegantAcceptanceButton(
          text: "Politique de Confidentialité",
          subtitle: "Lire et accepter la politique",
          isAccepted: coordinator.legalViewModel.cguAccepted[1],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                final privacyStep = DriverOnboardingData.getStep(
                  13,
                ); // Privacy step
                return PolicyModal(
                  titleContent: privacyStep.title,
                  content: privacyStep.additionalContent?["content"] ?? "",
                  onAccept: () {
                    coordinator.legalViewModel.setCguAccepted(1, true);
                  },
                );
              },
            );
          },
        ),
      ],
    );
  }

  static Widget _buildPreferences(
    Map<String, dynamic> content,
    DriverOnboardingCoordinator coordinator,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Theme selection
        if (content.containsKey('theme')) ...[
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
              Chips.customChoiceChip(
                label: 'Clair',
                selected: coordinator.preferencesViewModel.selectedTheme == 'clair',
                onSelected: (_) {
                  coordinator.preferencesViewModel.setTheme('clair');
                },
              ),
              const SizedBox(width: 24),
              Chips.customChoiceChip(
                label: 'Sombre',
                selected: coordinator.preferencesViewModel.selectedTheme == 'sombre',
                onSelected: (_) {
                  coordinator.preferencesViewModel.setTheme('sombre');
                },
              ),
            ],
          ),
          const SizedBox(height: 32),
        ],

        // Language selection
        if (content.containsKey('langue')) ...[
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
            selectedLanguage: coordinator.preferencesViewModel.selectedLanguage,
            onLanguageChanged: (lang) {
              coordinator.preferencesViewModel.setLanguage(lang);
            },
          ),
        ],
      ],
    );
  }

  static Widget _buildSummary(
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
                return _buildResumeElement(
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

  static Widget _buildResumeElement(
    String element,
    String sectionTitle,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
  ) {
    if (element == 'Photos uploadées') {
      final totalPhotos = coordinator.documentUploadViewModel.getTotalUploadedPhotosCount();
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

    final fieldValue = coordinator.getFieldValue(element);
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
                  navigateToStep(stepIndex);
                },
              ),
            ),
        ],
      ),
    );
  }

  static Widget _buildCompletionContent(Map<String, dynamic> content) {
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

  static Widget _buildButtons(
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    // GPS step has special handling
    if (step.title == "Partagez votre position") {
      return _buildGpsButtons(coordinator, nextStep, context);
    }

    // Legal step has special handling
    if (step.title == "Un dernier point avant de démarrer") {
      if (coordinator.legalViewModel.allCguAccepted) {
        return PrimaryButton.primaryButton(
          text: "Continuer",
          onPressed: nextStep,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        );
      }
      return const SizedBox.shrink();
    }

    if (step.buttonTitles.isNotEmpty) {
      return ButtonRows.buttonRow(
        buttonTitles: step.buttonTitles,
        onPressedList: step.buttonTitles.map((buttonTitle) {
          final isMainButton =
              step.buttonTitles.indexOf(buttonTitle) ==
              step.buttonTitles.length - 1;
          final isPlusTard = buttonTitle.toLowerCase().contains('plus tard');

          return () {
            if (isMainButton && !isPlusTard) {
              nextStep();
            } else {
              nextStep();
            }
          };
        }).toList(),
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        isLastButtonPrimary: true,
        spacing: 8,
        buttonPadding: const EdgeInsets.symmetric(vertical: 16),
        fontSize: 16,
      );
    }

    return const SizedBox.shrink();
  }

  static Widget _buildGpsButtons(
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
                groupValue: coordinator.preferencesViewModel.gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) => coordinator.preferencesViewModel.setGpsEnabled(false),
                titleColor: AppColors.fillButtonBackground,
                activeColor: AppColors.fillButtonBackground,
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<String>(
                title: "Autoriser",
                value: "Autoriser",
                groupValue: coordinator.preferencesViewModel.gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) async {
                  if (value == "Autoriser") {
                    final granted = await coordinator.preferencesViewModel.requestGpsPermission();
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
                titleColor: AppColors.fillButtonBackground,
                activeColor: AppColors.fillButtonBackground,
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

  static IconData _getFieldIcon(String fieldName) {
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

  static IconData _getSectionIcon(String sectionTitle) {
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

  static int _getStepIndexForField(String fieldName) {
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
