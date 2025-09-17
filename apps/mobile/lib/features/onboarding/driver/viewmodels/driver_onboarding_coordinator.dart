import 'package:flutter/material.dart';
import 'dart:developer' as developer;
import '../core/interfaces/driver_service_interface.dart';
import '../models/driver_onboarding_step_model.dart';
import 'specialized/onboarding_flow_viewmodel.dart';
import 'specialized/personal_info_viewmodel.dart';
import 'specialized/vehicle_info_viewmodel.dart';
import 'specialized/preferences_viewmodel.dart';
import 'specialized/document_upload_viewmodel.dart';
import 'specialized/legal_viewmodel.dart';

class DriverOnboardingCoordinator extends ChangeNotifier {
  final IDriverService _service;

  // Specialized ViewModels
  late final OnboardingFlowViewModel _flowViewModel;
  late final PersonalInfoViewModel _personalInfoViewModel;
  late final VehicleInfoViewModel _vehicleInfoViewModel;
  late final PreferencesViewModel _preferencesViewModel;
  late final DocumentUploadViewModel _documentUploadViewModel;
  late final LegalViewModel _legalViewModel;

  DriverOnboardingCoordinator(this._service) {
    _initializeViewModels();
    _setupListeners();
  }

  void _initializeViewModels() {
    _flowViewModel = OnboardingFlowViewModel();
    _personalInfoViewModel = PersonalInfoViewModel();
    _vehicleInfoViewModel = VehicleInfoViewModel();
    _preferencesViewModel = PreferencesViewModel(_service);
    _documentUploadViewModel = DocumentUploadViewModel(_service);
    _legalViewModel = LegalViewModel();
  }

  void _setupListeners() {
    _flowViewModel.addListener(() => notifyListeners());
    _personalInfoViewModel.addListener(() => notifyListeners());
    _vehicleInfoViewModel.addListener(() => notifyListeners());
    _preferencesViewModel.addListener(() => notifyListeners());
    _documentUploadViewModel.addListener(() => notifyListeners());
    _legalViewModel.addListener(() => notifyListeners());
  }

  // Getters pour accéder aux ViewModels spécialisés bien sur
  OnboardingFlowViewModel get flowViewModel => _flowViewModel;
  PersonalInfoViewModel get personalInfoViewModel => _personalInfoViewModel;
  VehicleInfoViewModel get vehicleInfoViewModel => _vehicleInfoViewModel;
  PreferencesViewModel get preferencesViewModel => _preferencesViewModel;
  DocumentUploadViewModel get documentUploadViewModel =>
      _documentUploadViewModel;
  LegalViewModel get legalViewModel => _legalViewModel;

  int get currentStep => _flowViewModel.currentStep;
  bool get isLoading =>
      _flowViewModel.isLoading ||
      _preferencesViewModel.isLoading ||
      _documentUploadViewModel.isLoading;
  String? get errorMessage =>
      _flowViewModel.errorMessage ??
      _preferencesViewModel.errorMessage ??
      _documentUploadViewModel.errorMessage;
  List<DriverOnboardingStepModel> get steps => _flowViewModel.steps;

  void goToStep(int stepIndex) => _flowViewModel.goToStep(stepIndex);
  void nextStep() async {
    final index = _flowViewModel.currentStep;
    final step = _flowViewModel.steps[index];
    _flowViewModel.setLoading(true);
    try {
      switch (step.stepType) {
        case DriverStepType.personalInfo:
          await _service.savePersonalInfo(
            _personalInfoViewModel.getPersonalInfoData(),
          );
          break;
        case DriverStepType.vehicleInfo:
          await _service.saveVehicleInfo(
            _vehicleInfoViewModel.getVehicleInfoData(),
          );
          break;
        case DriverStepType.legal:
          await _service.completeDriverOnboarding({
            'cgu_accepted': _legalViewModel.allCguAccepted,
            'privacy_policy_accepted': _legalViewModel.cguAccepted.length > 1
                ? _legalViewModel.cguAccepted[1]
                : false,
          });
          break;
        default:
          break;
      }
      _flowViewModel.nextStep();
    } catch (e) {
      _flowViewModel.setError('Erreur: $e');
    } finally {
      _flowViewModel.setLoading(false);
    }
  }

  void previousStep() => _flowViewModel.previousStep();

  bool isStepValid(int stepIndex) {
    final step = steps[stepIndex];

    switch (step.stepType) {
      case DriverStepType.personalInfo:
        return _personalInfoViewModel.validatePersonalInfo();
      case DriverStepType.vehicleInfo:
        return _vehicleInfoViewModel.validateVehicleInfo();
      case DriverStepType.legal:
        return _legalViewModel.validateLegalAcceptance();
      default:
        return true;
    }
  }

  Map<String, String> getSummaryData() {
    final summaryData = <String, String>{};

    summaryData.addAll(_personalInfoViewModel.getPersonalInfoSummary());

    summaryData.addAll(_vehicleInfoViewModel.getVehicleInfoSummary());

    summaryData.addAll(_preferencesViewModel.getPreferencesSummary());

    summaryData.addAll(_legalViewModel.getLegalSummary());

    return summaryData;
  }

  Future<void> completeOnboarding() async {
    _flowViewModel.setLoading(true);

    try {
      final data = {
        'personal_info': _personalInfoViewModel.getPersonalInfoData(),
        'vehicle_info': _vehicleInfoViewModel.getVehicleInfoData(),
        'preferences': _preferencesViewModel.getPreferencesData(),
        'cgu_accepted': _legalViewModel.allCguAccepted,
      };

      await _service.completeDriverOnboarding(data);
    } catch (e) {
      _flowViewModel.setError('Erreur lors de la finalisation: $e');
      rethrow;
    } finally {
      _flowViewModel.setLoading(false);
    }
  }

  Future<String> generateDriverQrCode({String? type}) {
    return _service.generateDriverQrCode(type: type);
  }

  Future<String> generateDriverQrCode({String? type}) {
    return _service.generateDriverQrCode(type: type);
  }

  String getFieldValue(String fieldName) {
    final summaryData = getSummaryData();
    return summaryData[fieldName] ?? 'Non renseigné';
  }

  void clearAllErrors() {
    _flowViewModel.clearError();
    _preferencesViewModel.clearError();
    _documentUploadViewModel.clearError();
  }

  void resetAllData() {
    _personalInfoViewModel.clearPersonalInfo();
    _vehicleInfoViewModel.clearVehicleInfo();
    _preferencesViewModel.resetPreferences();
    _documentUploadViewModel.clearCapturedPhotos();
    _legalViewModel.resetLegalAcceptance();
    _flowViewModel.goToStep(0);
  }

  @override
  void dispose() {
    _flowViewModel.dispose();
    _personalInfoViewModel.dispose();
    _vehicleInfoViewModel.dispose();
    _preferencesViewModel.dispose();
    _documentUploadViewModel.dispose();
    _legalViewModel.dispose();
    super.dispose();
  }
}
