import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_summary_view_model.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';

class StepElevenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;
  final Function(int) onNavigateToStep;

  const StepElevenView({
    super.key,
    required this.step,
    required this.coordinator,
    required this.onContinue,
    this.onSkip,
    required this.onNavigateToStep,
  });

  String _localizeFieldLabel(BuildContext context, String fieldKey) {
    switch (fieldKey) {
      case 'Nom':
        return context.l10n.driverSummaryPersonalInfoName;
      case 'E-mail':
        return context.l10n.driverSummaryPersonalInfoEmail;
      case 'Téléphone':
        return context.l10n.driverSummaryPersonalInfoPhone;
      case 'Photos uploadées':
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

  String _localizeSectionTitle(BuildContext context, String sectionKey) {
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

  Widget _buildResumeElement(
    BuildContext context,
    DriverSummaryViewModel summaryViewModel,
    String element,
    String sectionTitle,
  ) {
    final displayLabel = _localizeFieldLabel(context, element);
    if (element == 'Photos uploadées') {
    
      final isVehicle = sectionTitle == 'Véhicule';
      final totalPhotos = isVehicle
          ? coordinator.documentUploadViewModel.getVehicleUploadedPhotosCount()
          : coordinator.documentUploadViewModel.getPersonalUploadedPhotosCount();
      final photosStepIndex = isVehicle ? 4 : 2;
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          children: [
            Icon(
              summaryViewModel.getFieldIcon(element),
              size: 16,
              color: AppColors.light,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                '$displayLabel : $totalPhotos',
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
                icon: Icon(
                  Icons.edit,
                  size: 16,
                  color: AppColors.light,
                ),
                padding: EdgeInsets.zero,
                onPressed: () {
                  onNavigateToStep(photosStepIndex);
                },
              ),
            ),
          ],
        ),
      );
    }

    final summaryData = coordinator.getSummaryData();
    final fieldValue = summaryViewModel.getFieldValue(element, summaryData);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            summaryViewModel.getFieldIcon(element),
            size: 16,
            color: AppColors.light,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: '$displayLabel: ',
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

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) =>
          ServiceLocator.instance.get<DriverSummaryViewModel>(),
      child: Consumer<DriverSummaryViewModel>(
        builder: (context, summaryViewModel, child) {
          final resumeData = summaryViewModel.getResumeData();

       
          final future = coordinator.documentUploadViewModel.refreshBackendPhotoCounts();

          return FutureBuilder<void>(
            future: future,
            builder: (context, snapshot) {
              return Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const SizedBox(height: 20),
                    _buildHeader(context),
                    const SizedBox(height: 24),
                    _buildSummaryContent(context, summaryViewModel, resumeData),
                    const SizedBox(height: 16),
                    _buildActionButton(context, summaryViewModel),
                    _buildErrorMessage(context, summaryViewModel),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Column(
      children: [
        Text(
          step.title,
          textAlign: TextAlign.center,
          style: AppTextStyles.h1(context).copyWith(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: AppColors.light,
          ),
        ),
        const SizedBox(height: 16),
        Text(
          step.description ?? '',
          textAlign: TextAlign.center,
          style: AppTextStyles.body16(context).copyWith(
            height: 1.5,
            color: AppColors.light,
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryContent(
    BuildContext context,
    DriverSummaryViewModel summaryViewModel,
    List<Map<String, dynamic>> resumeData,
  ) {
    return Expanded(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: resumeData.map<Widget>((section) {
            final titre = section['titre'] as String;
            final elements = section['elements'] as List<String>;

            return _buildSectionContainer(context, summaryViewModel, titre, elements);
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildSectionContainer(
    BuildContext context,
    DriverSummaryViewModel summaryViewModel,
    String titre,
    List<String> elements,
  ) {
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
          _buildSectionHeader(context, summaryViewModel, titre),
          const SizedBox(height: 12),
          ...elements.map<Widget>((element) {
            return _buildResumeElement(context, summaryViewModel, element, titre);
          }),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(
    BuildContext context,
    DriverSummaryViewModel summaryViewModel,
    String titre,
  ) {
    final stepIndex = summaryViewModel.getStepIndexForSection(titre);
    final displayTitle = _localizeSectionTitle(context, titre);
    return Row(
      children: [
        Icon(
          summaryViewModel.getSectionIcon(titre),
          size: 20,
          color: AppColors.light,
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            displayTitle,
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
              onNavigateToStep(stepIndex);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildActionButton(BuildContext context, DriverSummaryViewModel summaryViewModel) {
    if (summaryViewModel.isLoading) {
      return const CircularProgressIndicator();
    }

    return PrimaryButton.primaryButton(
      text: context.l10n.driverSummaryValidate,
      onPressed: () => _handleValidation(summaryViewModel),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
    );
  }

  Widget _buildErrorMessage(BuildContext context, DriverSummaryViewModel summaryViewModel) {
    if (summaryViewModel.errorMessage == null) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        summaryViewModel.errorMessage!,
        style: AppTextStyles.body14(context).copyWith(color: Colors.red),
      ),
    );
  }

  Future<void> _handleValidation(
    DriverSummaryViewModel summaryViewModel,
  ) async {
    try {
      final data = _prepareOnboardingData();

      if (summaryViewModel.validateAllData(data)) {
        await summaryViewModel.completeOnboarding(data);
        onContinue();
      }
    } catch (e) {
      // ViewModel
    }
  }

  Map<String, dynamic> _prepareOnboardingData() {
    return {
      'personal_info': coordinator.personalInfoViewModel.getPersonalInfoData(),
      'vehicle_info': coordinator.vehicleInfoViewModel.getVehicleInfoData(),
      'preferences': coordinator.preferencesViewModel.getPreferencesData(),
      'legal': coordinator.legalViewModel.getLegalStatus(),
    };
  }
}
