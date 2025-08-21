import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import 'package:safe_driving/shared/widgets/pagination/pagination_widget.dart';
import 'package:safe_driving/models/interactive_menu/interactive_menu_models.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
<<<<<<< HEAD
import 'package:safe_driving/shared/widgets/customs/inputs/inputs.dart';
import 'package:safe_driving/shared/widgets/customs/upload/upload_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
=======
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)

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
<<<<<<< HEAD
  final List<StepDriverContent> stepContents = StepDriverDataText.stepContents;
=======
  final List<StepDriverContent> stepContents = StepDriverData.stepContents;
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)

  Widget _buildStepContent(StepDriverContent step, VoidCallback nextStep) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
<<<<<<< HEAD
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
=======
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            step.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.textColor,
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
            ),
          ),
          const SizedBox(height: 16),
          Text(
<<<<<<< HEAD
            textAlign: TextAlign.center,
            step.subtitle,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
=======
            step.subtitle,
            style: const TextStyle(
              fontSize: 16,
              color: AppColors.textColor,
              height: 1.5,
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
            ),
          ),
          const SizedBox(height: 24),
          // Contenu additionnel basé sur le type de step
<<<<<<< HEAD
          if (step.additionalContent != null &&
              step.additionalContent?['form'] != null)
            _buildForm(step.additionalContent!['form'] as Map<String, String>)
          else if (step.additionalContent != null)
=======
          if (step.additionalContent != null)
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
            _buildAdditionalContent(step.additionalContent!),
          const SizedBox(height: 32),
          // Boutons
          if (step.buttonTitles.isNotEmpty)
            ButtonsWidget.buttonRow(
              buttonTitles: step.buttonTitles,
              onPressedList: step.buttonTitles.map((buttonTitle) {
                final isMainButton =
                    step.buttonTitles.indexOf(buttonTitle) ==
                    step.buttonTitles.length - 1;
                return () {
                  if (isMainButton) {
<<<<<<< HEAD
                    // Bouton principal (Démarrer, Valider, etc.)
                    //à implementer la logique (utilisant shared preference après)
                    nextStep();
                  } else {
                    nextStep(); //plus tard
=======
                    nextStep();
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
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

  Widget _buildAdditionalContent(Map<String, dynamic> content) {
<<<<<<< HEAD
    // Gérer le cas spécifique de la vérification d'identité (Step 3)
    if (content.containsKey('carteIdentité')) {
      final carteIdentiteData =
          content['carteIdentité'] as Map<String, dynamic>;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Recto ID
          if (carteIdentiteData.containsKey('rectoID'))
            _buildUploadSection(
              carteIdentiteData['rectoID'] as Map<String, dynamic>,
            ),

          const SizedBox(height: 16),

          // Verso ID
          if (carteIdentiteData.containsKey('versoID'))
            _buildUploadSection(
              carteIdentiteData['versoID'] as Map<String, dynamic>,
            ),

          const SizedBox(height: 16),

          // Permis de conduire
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
          // Certificat d'immatriculation
          if (documentsData.containsKey('certificatImmatriculation'))
            _buildDocumentSection(
              documentsData['certificatImmatriculation']
                  as Map<String, dynamic>,
              'Certificat d\'immatriculation',
            ),

          const SizedBox(height: 16),

          // Attestation d'assurance
          if (documentsData.containsKey('attestationAssurance'))
            _buildDocumentSection(
              documentsData['attestationAssurance'] as Map<String, dynamic>,
              'Attestation d\'assurance',
            ),

          const SizedBox(height: 16),

          // Photos du véhicule
          if (documentsData.containsKey('photosVehicule'))
            _buildDocumentSection(
              documentsData['photosVehicule'] as Map<String, dynamic>,
              'Photos du véhicule',
            ),
        ],
      );
    }

    // Cas par défaut pour les autres contenus additionnels
=======
    // basé sur les clés dans additionalContent (form, documents, etc.)
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
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

<<<<<<< HEAD
  Widget _buildUploadSection(Map<String, dynamic> sectionData) {
    final title = sectionData['title'] as String? ?? '';
    final textCenter =
        sectionData['textCenter'] as String? ??
        'Glissez un fichier pour le téléverser';
    final bouton = sectionData['bouton'] as String? ?? 'Choisir un fichier';

    return UploadWidget(
      title: title,
      description: textCenter,
      buttonText: bouton,
      onTap: () {
        // Afficher snackbar de succès pour le moment
        SnackbarHelper.showSuccess(context, 'Fichier sélectionné pour $title');
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
      final textCenter =
          uploadZone['textCenter'] as String? ??
          'Glissez un fichier pour le téléverser';
      final bouton = uploadZone['bouton'] as String? ?? 'Choisir un fichier';

      // Simuler l'état hasPhotoAdded
      bool hasPhotoAdded = false; // À remplacer après

      return UploadWidget(
        title: defaultTitle,
        description: textCenter,
        buttonText: bouton,
        addMorePhotosText: ajoutPhoto,
        hasPhotoAdded: hasPhotoAdded,
        onTap: () {
          // Afficher snackbar de succès pour le moment
          SnackbarHelper.showSuccess(
            context,
            'Document sélectionné pour $defaultTitle',
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
            label: formData['labelTextName'] ?? 'Nom complet',
            hint: formData['placeholderName'] ?? 'John Doe',
            icon: Icons.person,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTextEmail'] ?? 'E-mail',
            hint: formData['placeholderEmail'] ?? 'example@email.com',
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTextPhone'] ?? 'Téléphone',
            hint: formData['placeholderPhone'] ?? '+261...',
            icon: Icons.phone,
            keyboardType: TextInputType.phone,
            showLabel: true,
          ),
        ],

        // Formulaire d'informations véhicule (Step 4)
        if (formData.containsKey('labelMarque')) ...[
          CustomInputField(
            label: formData['labelMarque'] ?? 'Marque',
            hint: formData['placeholderMarque'] ?? 'ex: Peugeot',
            icon: Icons.car_rental,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelModele'] ?? 'Modèle',
            hint: formData['placeholderModele'] ?? 'ex: 404',
            icon: Icons.directions_car,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label:
                formData['labelImmatriculation'] ?? 'Numéro d\'immatriculation',
            hint: formData['placeholderImmatriculation'] ?? 'ex: AB-123-CD',
            icon: Icons.confirmation_number,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelPlaces'] ?? 'Nombre de places',
            hint: formData['placeholderPlaces'] ?? 'ex: 4',
            icon: Icons.airline_seat_recline_normal,
            keyboardType: TextInputType.number,
            showLabel: true,
          ),
          const SizedBox(height: 16),

          CustomInputField(
            label: formData['labelTypeVehicule'] ?? 'Type de véhicule',
            hint: formData['placeholderTypeVehicule'] ?? 'ex: Voiture',
            icon: Icons.local_taxi,
            showLabel: true,
          ),
        ],
      ],
    );
  }

=======
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
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
