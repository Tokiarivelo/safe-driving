import 'package:flutter/material.dart';

class VehicleInfoViewModel extends ChangeNotifier {
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, dynamic> _formData = {};

  // Getters for specific controllers
  TextEditingController get marqueController => getController('marque');
  TextEditingController get modeleController => getController('modele');
  TextEditingController get immatriculationController =>
      getController('immatriculation');
  TextEditingController get placesController => getController('places');
  TextEditingController get typeVehiculeController =>
      getController('typeVehicule');

  Map<String, dynamic> get formData => _formData;

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

  bool validateVehicleInfo() {
    final marque = getController('marque').text;
    final modele = getController('modele').text;
    final immatriculation = getController('immatriculation').text;
    return marque.isNotEmpty && modele.isNotEmpty && immatriculation.isNotEmpty;
  }

  Map<String, String> getVehicleInfoSummary() {
    return {
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

  Map<String, String> getVehicleInfoData() {
    return {
      'marque': getController('marque').text,
      'modele': getController('modele').text,
      'immatriculation': getController('immatriculation').text,
      'places': getController('places').text,
      'type': getController('typeVehicule').text,
    };
  }

  void clearVehicleInfo() {
    for (final controller in _controllers.values) {
      controller.clear();
    }
    _formData.clear();
    notifyListeners();
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }
}
