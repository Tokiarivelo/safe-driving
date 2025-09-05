part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingPersistenceMixin on UserOnboardingContract {
  @override
  Future<void> _savePreferences() async {
    await _repository.saveUserPreferences(_appState);
  }

  Future<void> loadPreferences() async {
    _setLoading(true);
    try {
      final savedState = await _repository.loadUserPreferences();
      if (savedState != null) {
        _appState = savedState;
        notifyListeners();
      }
    } catch (e) {
      _setError('Erreur lors du chargement des préférences');
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> completeOnboarding(BuildContext context) async {
    _setLoading(true);
    _setError(null);

    try {
      await _savePreferences();
      if (context.mounted) {
        await _repository.completeOnboarding(context);
      }
      _setLoading(false);
      return true;
    } catch (e) {
      _setError('Erreur lors de la finalisation');
      _setLoading(false);
      return false;
    }
  }
}
