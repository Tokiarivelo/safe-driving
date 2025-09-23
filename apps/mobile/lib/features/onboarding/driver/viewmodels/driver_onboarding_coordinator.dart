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


  void acceptLegal(int index) {
    _legalViewModel.setCguAccepted(index, true);
    try {
      if (index == 0) {
        _service.saveLegalAcceptance(cguAccepted: true);
      } else if (index == 1) {
        _service.saveLegalAcceptance(privacyPolicyAccepted: true);
      }
    } catch (_) {

    }
  }

  Future<void> markDriverVerified() async {
    await _service.setUserVerified(true);
  }

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
  Future<void> nextStep() async {
    final index = _flowViewModel.currentStep;
    final step = _flowViewModel.steps[index];
    _flowViewModel.setLoading(true);
    try {
      Map<String, dynamic> stepData = {};
      switch (step.stepType) {
        case DriverStepType.welcome:
          stepData = {};
          break;
        case DriverStepType.personalInfo:
          final data = _personalInfoViewModel.getPersonalInfoData();
          try {
            await _service.savePersonalInfo(data);
            stepData = data;
          } catch (e) {
            developer.log('Error saving personal info: $e');
            _flowViewModel.setError('Erreur lors de la sauvegarde: $e');
            rethrow;
          }
          break;
        case DriverStepType.vehicleInfo:
          final data = _vehicleInfoViewModel.getVehicleInfoData();
          try {
            await _service.saveVehicleInfo(data);
            stepData = data;
          } catch (e) {
            developer.log('Error saving vehicle info: $e');
            _flowViewModel.setError(
              'Erreur lors de la sauvegarde du véhicule: $e',
            );
            rethrow;
          }
          break;
        case DriverStepType.documents:
          try {
            await _documentUploadViewModel.flushPendingUploads();
          } catch (e) {
            developer.log('Error flushing uploads: $e');
          }
          stepData = {
            'personal_photos': _documentUploadViewModel
                .getPersonalUploadedPhotosCount(),
            'vehicle_photos': _documentUploadViewModel
                .getVehicleUploadedPhotosCount(),
            'total_photos': _documentUploadViewModel
                .getTotalUploadedPhotosCount(),
          };
          developer.log('Document step data: $stepData');
          break;
        case DriverStepType.selfie:
          stepData = {
            'selfie_uploaded':
                _documentUploadViewModel.getPersonalUploadedPhotosCount() > 0,
          };
          break;
        case DriverStepType.gps:
          stepData = {'gps_enabled': _preferencesViewModel.gpsEnabled};
          try {
            await _service.saveGpsPreference(_preferencesViewModel.gpsEnabled);
          } catch (e) {
            developer.log('Error saving GPS preference: $e');
            _flowViewModel.setError('Erreur lors de la sauvegarde GPS: $e');
            rethrow;
          }
          break;
        case DriverStepType.notifications:
          stepData = {
            'notifications': _preferencesViewModel.selectedNotifications,
          };
          try {
            final prefs = <String, bool>{
              'activateSmsNotifications': _preferencesViewModel
                  .selectedNotifications
                  .contains('SMS'),
              'activateNotifications': _preferencesViewModel
                  .selectedNotifications
                  .contains('Push notification mobile'),
              'activateEmailNotifications': _preferencesViewModel
                  .selectedNotifications
                  .contains('E-mail'),
            };
            await _service.saveNotificationPreferences(prefs);
          } catch (e) {
            developer.log('Error saving notifications preference: $e');
            _flowViewModel.setError(
              'Erreur lors de la sauvegarde des notifications: $e',
            );
            rethrow;
          }
          break;
        case DriverStepType.preferences:
          stepData = _preferencesViewModel.getPreferencesData();
          try {
            await _service.saveAppPreferences(
              theme: _preferencesViewModel.selectedTheme,
              language: _preferencesViewModel.selectedLanguage,
            );
          } catch (e) {
            developer.log('Error saving app preferences: $e');
            _flowViewModel.setError(
              'Erreur lors de la sauvegarde des préférences: $e',
            );
            rethrow;
          }
          break;
        case DriverStepType.legal:
          final legal = {
            'cgu_accepted': _legalViewModel.allCguAccepted,
            'privacy_policy_accepted': _legalViewModel.cguAccepted.length > 1
                ? _legalViewModel.cguAccepted[1]
                : false,
          };
          try {
            await _service.completeDriverOnboarding(legal);
          } catch (e) {
            developer.log('Error completing onboarding: $e');
            _flowViewModel.setError('Erreur lors de la finalisation: $e');
            rethrow;
          }
          stepData = legal;
          break;
        case DriverStepType.summary:
        case DriverStepType.completion:
          stepData = {};
          break;
        case DriverStepType.photos:
          throw UnimplementedError();
      }

      // Skip sending unsupported onboarding step progress to backend.
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
