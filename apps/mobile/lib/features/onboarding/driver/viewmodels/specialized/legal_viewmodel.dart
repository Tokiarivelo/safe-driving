import 'package:flutter/material.dart';
import '../../models/driver_onboarding_data.dart';

class LegalViewModel extends ChangeNotifier {
  final List<bool> _cguAccepted = [false, false];

  List<bool> get cguAccepted => _cguAccepted;
  bool get allCguAccepted => _cguAccepted.every((accepted) => accepted);

  void setCguAccepted(int index, bool accepted) {
    if (index >= 0 && index < _cguAccepted.length) {
      _cguAccepted[index] = accepted;
      notifyListeners();
    }
  }

  void acceptAllCgu() {
    for (int i = 0; i < _cguAccepted.length; i++) {
      _cguAccepted[i] = true;
    }
    notifyListeners();
  }

  void rejectAllCgu() {
    for (int i = 0; i < _cguAccepted.length; i++) {
      _cguAccepted[i] = false;
    }
    notifyListeners();
  }

  bool isCguAccepted(int index) {
    if (index >= 0 && index < _cguAccepted.length) {
      return _cguAccepted[index];
    }
    return false;
  }

  String getCguContent() {
    try {
      return DriverOnboardingData.getCguContent();
    } catch (e) {
      return 'Erreur: Impossible de charger les conditions générales d\'utilisation.';
    }
  }

  String getPrivacyPolicyContent() {
    try {
      return DriverOnboardingData.getPrivacyPolicyContent();
    } catch (e) {
      return 'Erreur: Impossible de charger la politique de confidentialité.';
    }
  }

  String getCguTitle() {
    try {
      return DriverOnboardingData.getCguTitle();
    } catch (e) {
      return 'Conditions Générales d\'Utilisation';
    }
  }

  String getPrivacyPolicyTitle() {
    try {
      return DriverOnboardingData.getPrivacyPolicyTitle();
    } catch (e) {
      return 'Politique de Confidentialité';
    }
  }

  Map<String, dynamic>? getLegalDocumentData(int index) {
    try {
      if (index >= 0 && index < DriverOnboardingData.cguContents[0].length) {
        return DriverOnboardingData.cguContents[0][index]
            as Map<String, dynamic>?;
      }
    } catch (e) {
      // Ignore error and return null
    }
    return null;
  }

  bool validateLegalAcceptance() {
    return allCguAccepted;
  }

  Map<String, bool> getLegalStatus() {
    return {
      'cgu_accepted': _cguAccepted.isNotEmpty ? _cguAccepted[0] : false,
      'privacy_policy_accepted': _cguAccepted.length > 1
          ? _cguAccepted[1]
          : false,
      'all_accepted': allCguAccepted,
    };
  }

  void resetLegalAcceptance() {
    for (int i = 0; i < _cguAccepted.length; i++) {
      _cguAccepted[i] = false;
    }
    notifyListeners();
  }

  Map<String, String> getLegalSummary() {
    return {
      'CGU': _cguAccepted.isNotEmpty && _cguAccepted[0]
          ? 'Acceptées'
          : 'Non acceptées',
      'Politique de confidentialité': _cguAccepted.length > 1 && _cguAccepted[1]
          ? 'Acceptée'
          : 'Non acceptée',
      'Statut global': allCguAccepted ? 'Toutes acceptées' : 'En attente',
    };
  }

  int get totalRequiredAcceptances => _cguAccepted.length;
  int get currentAcceptances =>
      _cguAccepted.where((accepted) => accepted).length;

  // Progress for UI
  double get acceptanceProgress {
    if (_cguAccepted.isEmpty) return 0.0;
    return currentAcceptances / totalRequiredAcceptances;
  }
}
