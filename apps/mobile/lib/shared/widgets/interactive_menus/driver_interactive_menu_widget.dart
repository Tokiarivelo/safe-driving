import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import 'package:safe_driving/shared/widgets/pagination/pagination_widget.dart';
import 'package:safe_driving/models/interactive_menu/interactive_menu_models.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/shared/widgets/customs/upload/upload_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/shared/widgets/customs/photos_management/camera/camera_management/camera_management.dart';
import 'package:safe_driving/shared/widgets/customs/photos_management/gallery/captured_photos_modal.dart';
import 'package:safe_driving/shared/widgets/customs/cgu_politique/cgu_politique.dart';
import 'dart:io';

class DriverInteractiveMenuWidget extends StatefulWidget {
  const DriverInteractiveMenuWidget({super.key});

  @override
  DriverInteractiveMenuWidgetState createState() =>
      DriverInteractiveMenuWidgetState();
}

class DriverInteractiveMenuWidgetState
    extends State<DriverInteractiveMenuWidget> {
  static const int _totalSteps = 14;
  final GlobalKey<PaginationWidgetState> _paginationKey =
      GlobalKey<PaginationWidgetState>();
  final List<StepDriverContent> stepContents = StepDriverDataText.stepContents;

  // State management for driver steps
  bool _gpsEnabled = false;
  final List<String> _selectedNotifications = [];
  String _selectedTheme = 'clair';
  String _selectedLanguage = 'fr';
  final List<bool> _cguAccepted = [false, false];
  final List<File> _capturedPhotos = [];

  void _showCapturedPhotosModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return CapturedPhotosModal(
          selectedImages: _capturedPhotos,
          onImagesChanged: (updatedImages) {
            setState(() {
              _capturedPhotos.clear();
              _capturedPhotos.addAll(updatedImages);
            });
          },
        );
      },
    );
  }

  Widget _buildStepContent(StepDriverContent step, VoidCallback nextStep) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,

        children: [
          SizedBox(height: 20),
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

          if (step.additionalContent != null &&
              step.additionalContent?['form'] != null)
            _buildForm(step.additionalContent!['form'] as Map<String, String>)
          else if (step.additionalContent != null)
            _buildAdditionalContent(step.additionalContent!, step),
          const SizedBox(height: 32),

          // Cas spécial pour l'étape 7 (GPS) - utiliser des boutons radio
          if (step.title == "Partagez votre position")
            _buildGpsRadioButtons(nextStep)
          // Ne pas afficher les boutons par défaut pour l'étape CGU car elle a ses propres boutons
          else if (step.buttonTitles.isNotEmpty &&
              step.title != "Un dernier point avant de démarrer")
            ButtonsWidget.buttonRow(
              buttonTitles: step.buttonTitles,
              onPressedList: step.buttonTitles.map((buttonTitle) {
                final isMainButton =
                    step.buttonTitles.indexOf(buttonTitle) ==
                    step.buttonTitles.length - 1;
                return () {
                  if (isMainButton) {
                    //après
                    nextStep();
                  } else {
                    nextStep(); //plus tard
                  }
                };
              }).toList(),
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

  Widget _buildGpsRadioButtons(VoidCallback nextStep) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: ButtonsWidget.customRadio<String>(
                title: "Plus tard",
                value: "Plus tard",
                groupValue: _gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) => setState(() => _gpsEnabled = false),
                titleColor: AppColors.fillButtonBackground,
                activeColor: AppColors.fillButtonBackground,
              ),
            ),
            Expanded(
              child: ButtonsWidget.customRadio<String>(
                title: "Autoriser",
                value: "Autoriser",
                groupValue: _gpsEnabled ? "Autoriser" : "Plus tard",
                onChanged: (value) async {
                  if (value == "Autoriser") {
                    final granted = await ButtonsWidget.handleGpsPermission(
                      context,
                    );
                    if (mounted) {
                      setState(() {
                        _gpsEnabled = granted;
                      });
                      if (granted) {
                        SnackbarHelper.showSuccess(
                          context,
                          'Géolocalisation activée avec succès !',
                        );
                      }
                    }
                  } else {
                    setState(() => _gpsEnabled = false);
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

  Widget _buildAdditionalContent(
    Map<String, dynamic> content,
    StepDriverContent step,
  ) {
    if (content.containsKey('carteIdentité')) {
      final carteIdentiteData =
          content['carteIdentité'] as Map<String, dynamic>;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (carteIdentiteData.containsKey('rectoID'))
            _buildUploadSection(
              carteIdentiteData['rectoID'] as Map<String, dynamic>,
            ),

          const SizedBox(height: 16),

          if (carteIdentiteData.containsKey('versoID'))
            _buildUploadSection(
              carteIdentiteData['versoID'] as Map<String, dynamic>,
            ),

          const SizedBox(height: 16),

          if (carteIdentiteData.containsKey('permisConduire'))
            _buildUploadSection(
              carteIdentiteData['permisConduire'] as Map<String, dynamic>,
            ),
        ],
      );
    }

    // Gérer le cas spécifique des documents véhicule (Step 5)
    if (content.containsKey('documents')) {
      final documentsData = content['documents'] as Map<String, dynamic>;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (documentsData.containsKey('certificatImmatriculation'))
            _buildDocumentSection(
              documentsData['certificatImmatriculation']
                  as Map<String, dynamic>,
              'Certificat d\'immatriculation',
            ),

          const SizedBox(height: 16),

          if (documentsData.containsKey('attestationAssurance'))
            _buildDocumentSection(
              documentsData['attestationAssurance'] as Map<String, dynamic>,
              'Attestation d\'assurance',
            ),

          const SizedBox(height: 16),

          if (documentsData.containsKey('photosVehicule'))
            _buildDocumentSection(
              documentsData['photosVehicule'] as Map<String, dynamic>,
              'Photos du véhicule',
            ),
        ],
      );
    }

    // Gérer le cas spécifique du selfie (Step 6)
    if (content.containsKey('selfie')) {
      final selfieData = content['selfie'] as Map<String, dynamic>;
      final title = selfieData['title'] as String?;
      final description = selfieData['description'] as String?;

      return CameraManagement(
        title: title,
        description: description,
        onPictureTaken: (imagePath) {
          if (imagePath != null) {
            final capturedFile = File(imagePath);
            setState(() {
              _capturedPhotos.add(capturedFile);
            });
            SnackbarHelper.showSuccess(context, 'Selfie pris avec succès !');
            _showCapturedPhotosModal();
          } else {
            SnackbarHelper.showError(
              context,
              'Erreur lors de la prise de photo',
            );
          }
        },
      );
    }

    if (content.containsKey('radioOptions')) {
      final radioOptions = content['radioOptions'] as List<String>;
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Expanded(
                child: ButtonsWidget.customRadio<bool>(
                  title: radioOptions[0],
                  value: false,
                  groupValue: _gpsEnabled,
                  onChanged: (value) => setState(() => _gpsEnabled = value!),
                  titleColor: AppColors.fillButtonBackground,
                  activeColor: AppColors.fillButtonBackground,
                ),
              ),
              Expanded(
                child: ButtonsWidget.customRadio<bool>(
                  title: radioOptions[1],
                  value: true,
                  groupValue: _gpsEnabled,
                  onChanged: (value) => setState(() => _gpsEnabled = value!),
                  titleColor: AppColors.fillButtonBackground,
                  activeColor: AppColors.fillButtonBackground,
                ),
              ),
            ],
          ),
        ],
      );
    }

    if (content.containsKey('checkboxOptions')) {
      final checkboxOptions = content['checkboxOptions'] as List<String>;

      // Handle step 8 (notifications)
      if (step.title == "Restez informé") {
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
                value: _selectedNotifications.contains(option),
                onChanged: (value) {
                  setState(() {
                    if (value!) {
                      _selectedNotifications.add(option);
                    } else {
                      _selectedNotifications.remove(option);
                    }
                  });
                },
                titleColor: AppColors.fillButtonBackground,
              ),
            );
          }).toList(),
        );
      }

      // Handle step 10 (CGU & politique)
      if (step.title == "Un dernier point avant de démarrer") {
        return Column(
          children: [
            ButtonsWidget.elegantAcceptanceButton(
              text: "Conditions Générales d'Utilisation",
              subtitle: "Lire et accepter les CGU",
              isAccepted: _cguAccepted[0],
              onTap: () {
                showDialog(
                  context: context,
                  builder: (context) {
                    return PolicyModal(
                      content:
                          StepDriverDataText
                              .stepContents[10]
                              .additionalContent?["content"] ??
                          "",
                      onAccept: () {
                        setState(() {
                          _cguAccepted[0] = true;
                        });
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
              isAccepted: _cguAccepted[1],
              onTap: () {
                showDialog(
                  context: context,
                  builder: (context) {
                    return PolicyModal(
                      content:
                          StepDriverDataText
                              .stepContents[11]
                              .additionalContent?["content"] ??
                          "",
                      onAccept: () {
                        setState(() {
                          _cguAccepted[1] = true;
                        });
                      },
                    );
                  },
                );
              },
            ),
            const SizedBox(height: 32),
            // Show Continue button only when both CGU and Policy are accepted
            if (_cguAccepted.every((accepted) => accepted))
              ButtonsWidget.primaryButton(
                text: "Continuer",
                onPressed: () {
                  _paginationKey.currentState?.nextStep();
                },
                padding: const EdgeInsets.symmetric(
                  vertical: 16,
                  horizontal: 40,
                ),
              ),
          ],
        );
      }
    }

    if (content.containsKey('theme')) {
      final themeOptions =
          (content['theme']['options'] as List<Map<String, String>>);

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
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
              ...themeOptions
                  .asMap()
                  .entries
                  .map((entry) {
                    final index = entry.key;
                    final option = entry.value;
                    return [
                      ButtonsWidget.customChoiceChip(
                        label: option['label']!,
                        selected: _selectedTheme == option['value'],
                        onSelected: (_) {
                          setState(() {
                            _selectedTheme = option['value']!;
                          });
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
            selectedLanguage: _selectedLanguage,
            onLanguageChanged: (lang) {
              setState(() {
                _selectedLanguage = lang;
              });
            },
          ),
        ],
      );
    }

    // Cas par défaut pour les autres contenus additionnels
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.inputTextBackground.withAlpha(77),
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Text(
        'Contenu additionnel à implémenter selon le type',
        style: TextStyle(
          color: AppColors.textColor,
          fontStyle: FontStyle.italic,
        ),
      ),
    );
  }

  Widget _buildUploadSection(Map<String, dynamic> sectionData) {
    final title = sectionData['title'] as String? ?? '';
    final textCenter = sectionData['textCenter'] as String?;
    final bouton = sectionData['bouton'] as String?;

    return UploadWidget(
      title: title,
      description: textCenter!,
      buttonText: bouton!,
      onPhotosChanged: (photos) {
        SnackbarHelper.showSuccess(
          context,
          '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $title',
        );
      },
    );
  }

  Widget _buildDocumentSection(
    Map<String, dynamic> documentData,
    String defaultTitle,
  ) {
    final uploadZone = documentData['uploadZone'] as Map<String, dynamic>?;
    final ajoutPhoto = documentData['ajoutPhoto'] as String?;

    if (uploadZone != null) {
      final textCenter = uploadZone['textCenter'] as String?;
      final bouton = uploadZone['bouton'] as String?;

      // Simuler l'état hasPhotoAdded
      bool hasPhotoAdded = false;

      return UploadWidget(
        title: defaultTitle,
        description: textCenter!,
        buttonText: bouton!,
        addMorePhotosText: ajoutPhoto,
        hasPhotoAdded: hasPhotoAdded,
        onPhotosChanged: (photos) {
          SnackbarHelper.showSuccess(
            context,
            '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $defaultTitle',
          );
        },
      );
    }

    return Container();
  }

  Widget _buildForm(Map<String, String> formData) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Formulaire d'informations personnelles (Step 2)
        if (formData.containsKey('labelTextName')) ...[
          CustomInputField(
            label: formData['labelTextName'],
            hint: formData['placeholderName']!,
            icon: Icons.person,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTextEmail'],
            hint: formData['placeholderEmail']!,
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            showLabel: true,
            backgroundColor: Colors.grey[300],
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTextPhone'],
            hint: formData['placeholderPhone']!,
            icon: Icons.phone,
            keyboardType: TextInputType.phone,
            showLabel: true,
          ),
        ],

        // Formulaire d'informations véhicule (Step 4)
        if (formData.containsKey('labelMarque')) ...[
          CustomInputField(
            label: formData['labelMarque'],
            hint: formData['placeholderMarque']!,
            icon: Icons.car_rental,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelModele'],
            hint: formData['placeholderModele']!,
            icon: Icons.directions_car,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelImmatriculation'],
            hint: formData['placeholderImmatriculation']!,
            icon: Icons.confirmation_number,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelPlaces'],
            hint: formData['placeholderPlaces']!,
            icon: Icons.airline_seat_recline_normal,
            keyboardType: TextInputType.number,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTypeVehicule'],
            hint: formData['placeholderTypeVehicule']!,
            icon: Icons.local_taxi,
            showLabel: true,
          ),
        ],
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final headerHeight = screenHeight * 0.25;

    return Scaffold(
      body: Container(
        decoration: ColorsWidget.background,
        child: PaginationWidget(
          key: _paginationKey,
          totalSteps: _totalSteps,
          contentBuilder: (currentStep, nextStep, previousStep) {
            return Stack(
              children: [
                // Container du haut (25% de l'écran)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: headerHeight,
                  child: Container(
                    width: double.infinity,
                    decoration: ColorsWidget.background,
                    child: SafeArea(
                      child: Column(
                        children: [
                          // Logo
                          Expanded(
                            flex: 2,
                            child: Center(
                              child: SvgPicture.asset(
                                'assets/logo/logo_white.svg',
                                width: 85,
                                height: 85,
                              ),
                            ),
                          ),
                          // Zone progression
                          Transform.translate(
                            offset: const Offset(0, -12),
                            child: Expanded(
                              flex: 1,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 24,
                                ),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    _paginationKey.currentState
                                            ?.buildCircularProgress() ??
                                        const SizedBox(),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Transform.translate(
                                        offset: const Offset(0, -5),
                                        child: Container(
                                          alignment: Alignment.centerLeft,
                                          child:
                                              _paginationKey.currentState
                                                  ?.buildDotDashProgress() ??
                                              const SizedBox(),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                // Zone contenu (reste de l'écran) avec border radius forcé
                Positioned(
                  top: headerHeight,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  child: ClipRRect(
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                    child: Container(
                      color: AppColors.secondBackgroundColor,
                      child:
                          _paginationKey.currentState?.buildPageView(
                            itemBuilder: (index) {
                              return SingleChildScrollView(
                                child: _buildStepContent(
                                  stepContents[index],
                                  nextStep,
                                ),
                              );
                            },
                            itemCount: stepContents.length,
                          ) ??
                          const Center(child: CircularProgressIndicator()),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
