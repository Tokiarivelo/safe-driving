import 'package:flutter/material.dart';
import '../core/interfaces/driver_service_interface.dart';

class DriverFormViewModel extends ChangeNotifier {
  final IDriverService _service;
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, dynamic> _formData = {};
  bool _isLoading = false;
  String? _errorMessage;

  DriverFormViewModel(this._service);

  Map<String, dynamic> get formData => _formData;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  TextEditingController getController(String key) {
    if (!_controllers.containsKey(key)) {
      _controllers[key] = TextEditingController();
    }
    return _controllers[key]!;
  }

  void updateFormField(String key, String value) {
    _formData[key] = value;
    notifyListeners();
  }

  String getFormFieldValue(String key) {
    return _formData[key]?.toString() ?? '';
  }

  bool validatePersonalInfo() {
    final data = getPersonalInfoData();
    return _service.validatePersonalInfo(data);
  }

  bool validateVehicleInfo() {
    final data = getVehicleInfoData();
    return _service.validateVehicleInfo(data);
  }

  Map<String, String> getSummaryData() {
    return {
      'Nom': getController('name').text.isNotEmpty
          ? getController('name').text
          : 'Non renseigné',
      'E-mail': getController('email').text.isNotEmpty
          ? getController('email').text
          : 'Non renseigné',
      'Téléphone': getController('phone').text.isNotEmpty
          ? getController('phone').text
          : 'Non renseigné',
      'Marque': getController('marque').text.isNotEmpty
          ? getController('marque').text
          : 'Non renseigné',
      'Modèle': getController('modele').text.isNotEmpty
          ? getController('modele').text
          : 'Non renseigné',
      'Immatriculation': getController('immatriculation').text.isNotEmpty
          ? getController('immatriculation').text
          : 'Non renseigné',
      'Nombre de places': getController('places').text.isNotEmpty
          ? getController('places').text
          : 'Non renseigné',
      'Type de véhicule': getController('typeVehicule').text.isNotEmpty
          ? getController('typeVehicule').text
          : 'Non renseigné',
    };
  }

  String getFieldValue(String fieldName) {
    final summaryData = getSummaryData();
    return summaryData[fieldName] ?? 'Non renseigné';
  }

  TextEditingController get nameController => getController('name');
  TextEditingController get emailController => getController('email');
  TextEditingController get phoneController => getController('phone');
  TextEditingController get marqueController => getController('marque');
  TextEditingController get modeleController => getController('modele');
  TextEditingController get immatriculationController => getController('immatriculation');
  TextEditingController get placesController => getController('places');
  TextEditingController get typeVehiculeController => getController('typeVehicule');

  // Data extraction methods
  Map<String, dynamic> getPersonalInfoData() {
    return {
      'name': nameController.text,
      'email': emailController.text,
      'phone': phoneController.text,
    };
  }

  Map<String, dynamic> getVehicleInfoData() {
    return {
      'marque': marqueController.text,
      'modele': modeleController.text,
      'immatriculation': immatriculationController.text,
      'couleur': '',
      'annee': int.tryParse(getController('annee').text) ?? 0,
      'places': int.tryParse(placesController.text) ?? 4,
      'typeVehicule': typeVehiculeController.text,
    };
  }

  // Save methods
  Future<void> savePersonalInfo() async {
    _setLoading(true);
    try {
      final data = getPersonalInfoData();
      await _service.savePersonalInfo(data);
      _clearError();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des informations personnelles: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> saveVehicleInfo() async {
    _setLoading(true);
    try {
      final data = getVehicleInfoData();
      await _service.saveVehicleInfo(data);
      _clearError();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des informations du véhicule: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  // Validation helpers
  bool isPersonalInfoValid() => validatePersonalInfo();
  bool isVehicleInfoValid() => validateVehicleInfo();

  // State management
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  // Summary for display
  Map<String, String> getFormSummary() {
    return getSummaryData();
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }
}
