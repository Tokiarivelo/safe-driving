import 'package:flutter/material.dart';

class PersonalInfoViewModel extends ChangeNotifier {
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, dynamic> _formData = {};

  // Getters
  TextEditingController get nameController => getController('name');
  TextEditingController get emailController => getController('email');
  TextEditingController get phoneController => getController('phone');

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

  bool validatePersonalInfo() {
    final name = getController('name').text;
    final email = getController('email').text;
    return name.isNotEmpty && email.isNotEmpty;
  }

  Map<String, String> getPersonalInfoSummary() {
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
    };
  }

  Map<String, String> getPersonalInfoData() {
    return {
      'name': getController('name').text,
      'email': getController('email').text,
      'phone': getController('phone').text,
    };
  }

  void clearPersonalInfo() {
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
