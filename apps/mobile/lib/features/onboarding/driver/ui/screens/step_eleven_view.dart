import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_summary_view_model.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

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

  Widget _buildResumeElement(
    DriverSummaryViewModel summaryViewModel,
    String element,
    String sectionTitle,
  ) {
    if (element == 'Photos uploadées') {
      final totalPhotos = summaryViewModel.getTotalUploadedPhotosCount();
      final photosStepIndex = summaryViewModel.getStepIndexForField(element);
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          children: [
            Icon(
              summaryViewModel.getFieldIcon(element),
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
            const SizedBox(width: 8),
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

          return Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 20),
                _buildHeader(),
                const SizedBox(height: 24),
                _buildSummaryContent(summaryViewModel, resumeData),
                const SizedBox(height: 16),
                _buildActionButton(summaryViewModel),
                _buildErrorMessage(summaryViewModel),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Text(
          step.title,
          textAlign: TextAlign.center,
          style: AppTextStyles.h1.copyWith(
            fontSize: 24,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 16),
        Text(
          step.description ?? '',
          textAlign: TextAlign.center,
          style: AppTextStyles.body16.copyWith(
            color: AppColors.textColor.withAlpha(180),
            height: 1.5,
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryContent(
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

            return _buildSectionContainer(summaryViewModel, titre, elements);
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildSectionContainer(
    DriverSummaryViewModel summaryViewModel,
    String titre,
    List<String> elements,
  ) {
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
          _buildSectionHeader(summaryViewModel, titre),
          const SizedBox(height: 12),
          ...elements.map<Widget>((element) {
            return _buildResumeElement(summaryViewModel, element, titre);
          }),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(
    DriverSummaryViewModel summaryViewModel,
    String titre,
  ) {
    final stepIndex = summaryViewModel.getStepIndexForSection(titre);
    return Row(
      children: [
        Icon(
          summaryViewModel.getSectionIcon(titre),
          size: 20,
          color: AppColors.fillButtonBackground,
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            titre,
            style: AppTextStyles.body16.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(width: 8),
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
    );
  }

  Widget _buildActionButton(DriverSummaryViewModel summaryViewModel) {
    if (summaryViewModel.isLoading) {
      return const CircularProgressIndicator();
    }

    return PrimaryButton.primaryButton(
      text: "Valider",
      onPressed: () => _handleValidation(summaryViewModel),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
    );
  }

  Widget _buildErrorMessage(DriverSummaryViewModel summaryViewModel) {
    if (summaryViewModel.errorMessage == null) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        summaryViewModel.errorMessage!,
        style: AppTextStyles.body14.copyWith(color: Colors.red),
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
