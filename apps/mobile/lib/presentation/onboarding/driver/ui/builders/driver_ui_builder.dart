import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/core/constants/utils/form/form_utils.dart';
import '../widgets/upload_widget.dart';
import '../widgets/camera_interface.dart';
import '../widgets/captured_photos_modal.dart';
import '../widgets/policy_modal.dart';
import '../../models/driver_onboarding_step_model.dart';
import '../../viewmodels/driver_onboarding_viewmodel.dart';
import '../../utils/driver_onboarding_data.dart';

class DriverUIBuilder {
  static Widget buildStepContent(
    DriverOnboardingStepModel step,
    DriverOnboardingViewModel viewModel,
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
              viewModel,
              navigateToStep,
              context,
            ),

          const SizedBox(height: 32),

          // Build buttons
          _buildButtons(step, viewModel, nextStep, context),
        ],
      ),
    );
  }

  static Widget _buildAdditionalContent(
    Map<String, dynamic> content,
    DriverOnboardingStepModel step,
    DriverOnboardingViewModel viewModel,
    Function(int) navigateToStep,
    BuildContext context,
  ) {
    // Form content
    if (content.containsKey('form')) {
      return _buildForm(content['form'] as Map<String, String>, viewModel);
    }

    // Identity documents
    if (content.containsKey('carteIdentité')) {
      final carteIdentiteData =
          content['carteIdentité'] as Map<String, dynamic>;
      return _buildIdentityDocuments(carteIdentiteData, viewModel, context);
    }

    // Vehicle documents
    if (content.containsKey('documents')) {
      final documentsData = content['documents'] as Map<String, dynamic>;
      return _buildVehicleDocuments(documentsData, viewModel, context);
    }

    // Selfie camera
    if (content.containsKey('selfie')) {
      final selfieData = content['selfie'] as Map<String, dynamic>;
      return _buildSelfieCamera(selfieData, viewModel, context);
    }

    // Notifications checkboxes
    if (content.containsKey('checkboxOptions')) {
      final checkboxOptions = content['checkboxOptions'] as List<String>;
      if (step.title == "Restez informé") {
        return _buildNotificationsCheckboxes(checkboxOptions, viewModel);
      }
      if (step.title == "Un dernier point avant de démarrer") {
        return _buildLegalCheckboxes(checkboxOptions, viewModel, context);
      }
    }

    // Theme and language preferences
    if (content.containsKey('theme')) {
      return _buildPreferences(content, viewModel);
    }

    // Summary
    if (content.containsKey('resume')) {
      final resumeData = content['resume'] as List;
      return _buildSummary(resumeData, viewModel, navigateToStep);
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
    DriverOnboardingViewModel viewModel,
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
            controller: viewModel.getController('name'),
            validator: (value) =>
                RegexFormatter.getNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelTextEmail'],
            hint: formData['placeholderEmail']!,
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            controller: viewModel.getController('email'),
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
            controller: viewModel.getController('phone'),
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
            controller: viewModel.getController('marque'),
            validator: (value) =>
                RegexFormatter.getVehicleNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelModele'],
            hint: formData['placeholderModele']!,
            icon: Icons.directions_car,
            showLabel: true,
            controller: viewModel.getController('modele'),
            validator: (value) =>
                RegexFormatter.getVehicleNameValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelImmatriculation'],
            hint: formData['placeholderImmatriculation']!,
            icon: Icons.confirmation_number,
            showLabel: true,
            controller: viewModel.getController('immatriculation'),
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
            controller: viewModel.getController('places'),
            validator: (value) =>
                RegexFormatter.getSeatCountValidationMessage(value!),
          ),
          const SizedBox(height: 16),
          CustomInputField(
            label: formData['labelTypeVehicule'],
            hint: formData['placeholderTypeVehicule']!,
            icon: Icons.local_taxi,
            showLabel: true,
            controller: viewModel.getController('typeVehicule'),
          ),
        ],
      ],
    );
  }

  static Widget _buildIdentityDocuments(
    Map<String, dynamic> carteIdentiteData,
    DriverOnboardingViewModel viewModel,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (carteIdentiteData.containsKey('rectoID'))
          _buildUploadSection(
            carteIdentiteData['rectoID'] as Map<String, dynamic>,
            viewModel,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('versoID'))
          _buildUploadSection(
            carteIdentiteData['versoID'] as Map<String, dynamic>,
            viewModel,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('permisConduire'))
          _buildUploadSection(
            carteIdentiteData['permisConduire'] as Map<String, dynamic>,
            viewModel,
            context,
          ),
      ],
    );
  }

  static Widget _buildVehicleDocuments(
    Map<String, dynamic> documentsData,
    DriverOnboardingViewModel viewModel,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (documentsData.containsKey('certificatImmatriculation'))
          _buildDocumentSection(
            documentsData['certificatImmatriculation'] as Map<String, dynamic>,
            'Certificat d\'immatriculation',
            viewModel,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('attestationAssurance'))
          _buildDocumentSection(
            documentsData['attestationAssurance'] as Map<String, dynamic>,
            'Attestation d\'assurance',
            viewModel,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('photosVehicule'))
          _buildDocumentSection(
            documentsData['photosVehicule'] as Map<String, dynamic>,
            'Photos du véhicule',
            viewModel,
            context,
          ),
      ],
    );
  }

  static Widget _buildUploadSection(
    Map<String, dynamic> sectionData,
    DriverOnboardingViewModel viewModel,
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

        await viewModel.uploadPhotos(photos.cast<File>(), storageType);

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
    DriverOnboardingViewModel viewModel,
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

          await viewModel.uploadPhotos(photos.cast<File>(), storageType);

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
    DriverOnboardingViewModel viewModel,
    BuildContext context,
  ) {
    return SizedBox(
      height: 400,
      child: CameraInterface(
        onPictureTaken: (imagePath) async {
          if (imagePath != null) {
            final capturedFile = File(imagePath);
            viewModel.addCapturedPhoto(capturedFile);

            await viewModel.uploadPhotos([capturedFile], 'selfie');

            if (context.mounted) {
              SnackbarHelper.showSuccess(context, 'Selfie pris avec succès !');
              _showCapturedPhotosModal(context, viewModel);
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
    DriverOnboardingViewModel viewModel,
  ) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return CapturedPhotosModal(
          selectedImages: viewModel.capturedPhotos,
          onImagesChanged: (updatedImages) {
            viewModel.updateCapturedPhotos(updatedImages);
          },
        );
      },
    );
  }

  static Widget _buildNotificationsCheckboxes(
    List<String> checkboxOptions,
    DriverOnboardingViewModel viewModel,
  ) {
    return Column(
      children: checkboxOptions.asMap().entries.map((entry) {
        int idx = entry.key;
        String option = entry.value;
        return Padding(
          padding: EdgeInsets.only(
            bottom: idx < checkboxOptions.length - 1 ? 8.0 : 0,
          ),
          child: ButtonsWidget.customCheckbox(
            title: option,
            value: viewModel.selectedNotifications.contains(option),
            onChanged: (value) {
              viewModel.toggleNotification(option);
            },
            titleColor: AppColors.fillButtonBackground,
          ),
        );
      }).toList(),
    );
  }

  static Widget _buildLegalCheckboxes(
    List<String> checkboxOptions,
    DriverOnboardingViewModel viewModel,
    BuildContext context,
  ) {
    return Column(
      children: [
        ButtonsWidget.elegantAcceptanceButton(
          text: "Conditions Générales d'Utilisation",
          subtitle: "Lire et accepter les CGU",
          isAccepted: viewModel.cguAccepted[0],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                final cguStep = DriverOnboardingData.getStep(12); // CGU step
                return PolicyModal(
                  titleContent: cguStep.title,
                  content: cguStep.additionalContent?["content"] ?? "",
                  onAccept: () {
                    viewModel.setCguAccepted(0, true);
                  },
                );
              },
            );
          },
        ),
        const SizedBox(height: 16),
        ButtonsWidget.elegantAcceptanceButton(
          text: "Politique de Confidentialité",
          subtitle: "Lire et accepter la politique",
          isAccepted: viewModel.cguAccepted[1],
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
                    viewModel.setCguAccepted(1, true);
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
    DriverOnboardingViewModel viewModel,
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
              ButtonsWidget.customChoiceChip(
                label: 'Clair',
                selected: viewModel.selectedTheme == 'clair',
                onSelected: (_) {
                  viewModel.setTheme('clair');
                },
              ),
              const SizedBox(width: 24),
              ButtonsWidget.customChoiceChip(
                label: 'Sombre',
                selected: viewModel.selectedTheme == 'sombre',
                onSelected: (_) {
                  viewModel.setTheme('sombre');
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
          ButtonsWidget.languageButtonContainer(
            selectedLanguage: viewModel.selectedLanguage,
            onLanguageChanged: (lang) {
              viewModel.setLanguage(lang);
            },
          ),
        ],
      ],
    );
  }

  static Widget _buildSummary(
    List resumeData,
    DriverOnboardingViewModel viewModel,
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
                  viewModel,
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
    DriverOnboardingViewModel viewModel,
    Function(int) navigateToStep,
  ) {
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

    final fieldValue = _getFieldValue(element, viewModel);
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
    DriverOnboardingViewModel viewModel,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    // GPS step has special handling
    if (step.title == "Partagez votre position") {
      return _buildGpsButtons(viewModel, nextStep, context);
    }

    // Legal step has special handling
    if (step.title == "Un dernier point avant de démarrer") {
      if (viewModel.allCguAccepted) {
        return ButtonsWidget.primaryButton(
          text: "Continuer",
          onPressed: nextStep,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        );
      }
      return const SizedBox.shrink();
    }

    if (step.buttonTitles.isNotEmpty) {
      return ButtonsWidget.buttonRow(
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
    DriverOnboardingViewModel viewModel,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: ButtonsWidget.customRadio<String>(
                title: "Plus tard",
                value: "Plus tard",
                groupValue: viewModel.gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) => viewModel.setGpsEnabled(false),
                titleColor: AppColors.fillButtonBackground,
                activeColor: AppColors.fillButtonBackground,
              ),
            ),
            Expanded(
              child: ButtonsWidget.customRadio<String>(
                title: "Autoriser",
                value: "Autoriser",
                groupValue: viewModel.gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) async {
                  if (value == "Autoriser") {
                    final granted = await viewModel.requestGpsPermission();
                    if (context.mounted && granted) {
                      SnackbarHelper.showSuccess(
                        context,
                        'Géolocalisation activée avec succès !',
                      );
                    }
                  } else {
                    viewModel.setGpsEnabled(false);
                  }
                },
                titleColor: AppColors.fillButtonBackground,
                activeColor: AppColors.fillButtonBackground,
              ),
            ),
          ],
        ),
        const SizedBox(height: 32),
        ButtonsWidget.primaryButton(
          text: "Continuer",
          onPressed: nextStep,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        ),
      ],
    );
  }

  static String _getFieldValue(
    String fieldName,
    DriverOnboardingViewModel viewModel,
  ) {
    final summaryData = viewModel.getSummaryData();
    return summaryData[fieldName] ?? 'Non renseigné';
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
