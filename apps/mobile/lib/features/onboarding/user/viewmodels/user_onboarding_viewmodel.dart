import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../models/user_onboarding_data.dart';
import '../repositories/user_onboarding_repository.dart';

part 'parts/state.dart';
part 'parts/navigation.dart';
part 'parts/preferences.dart';
part 'parts/validation.dart';
part 'parts/computed.dart';
part 'parts/persistence.dart';

abstract class UserOnboardingContract extends ChangeNotifier {
  int get _currentStep;
  set _currentStep(int value);

  AppState get _appState;
  set _appState(AppState value);

  Map<int, bool> get _expandedTiles;

  set _isLoading(bool value);

  set _errorMessage(String? value);

  UserOnboardingRepository get _repository;

  int get totalSteps;

  void _setLoading(bool loading);
  void _setError(String? error);

  Future<void> _savePreferences();
}

class UserOnboardingViewModel extends UserOnboardingContract
    with
        UserOnboardingStateMixin,
        UserOnboardingNavigationMixin,
        UserOnboardingPreferencesMixin,
        UserOnboardingValidationMixin,
        UserOnboardingComputedMixin,
        UserOnboardingPersistenceMixin {
  @override
  final UserOnboardingRepository _repository;

  @override
  int _currentStep = 1;
  @override
  AppState _appState = const AppState();
  @override
  final Map<int, bool> _expandedTiles = {};
  @override
  bool _isLoading = false;
  @override
  String? _errorMessage;

  int get currentStep => _currentStep;
  AppState get appState => _appState;
  Map<int, bool> get expandedTiles => _expandedTiles;
  @override
  int get totalSteps => UserOnboardingData.totalSteps;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isFirstStep => _currentStep == 1;
  bool get isLastStep => _currentStep == UserOnboardingData.totalSteps;

  UserOnboardingViewModel({UserOnboardingRepository? repository})
      : _repository = repository ?? UserOnboardingRepository();
}
