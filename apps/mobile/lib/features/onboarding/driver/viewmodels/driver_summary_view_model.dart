import 'package:flutter/material.dart';
import '../services/driver_summary_service.dart';
import '../core/interfaces/driver_service_interface.dart';

class DriverSummaryViewModel extends ChangeNotifier {
  final IDriverService _service;

  DriverSummaryViewModel(this._service);

  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  List<Map<String, dynamic>> getResumeData() {
    return DriverSummaryService.getResumeData();
  }

  IconData getFieldIcon(String fieldName) {
    return DriverSummaryService.getFieldIcon(fieldName);
  }

  IconData getSectionIcon(String sectionTitle) {
    return DriverSummaryService.getSectionIcon(sectionTitle);
  }

  int getStepIndexForField(String fieldName) {
    return DriverSummaryService.getStepIndexForField(fieldName);
  }

  String getFieldValue(String fieldName, Map<String, String> formData) {
    return formData[fieldName] ?? 'Non renseigné';
  }

  int getTotalUploadedPhotosCount() {
    try {
      return _service.getTotalUploadedPhotosCount();
    } catch (e) {
      _setError('Erreur lors de la récupération du nombre de photos: $e');
      return 0;
    }
  }

  Future<void> completeOnboarding(Map<String, dynamic> data) async {
    _setLoading(true);
    try {
      await _service.completeDriverOnboarding(data);
    } catch (e) {
      _setError('Erreur lors de la finalisation: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  bool validateAllData(Map<String, dynamic> data) {
    try {
      final personalValid = _service.validatePersonalInfo(
        data['personal_info'] ?? {},
      );
      final vehicleValid = _service.validateVehicleInfo(
        data['vehicle_info'] ?? {},
      );
      final documentsValid = _service.validateDocuments();

      return personalValid && vehicleValid && documentsValid;
    } catch (e) {
      _setError('Erreur lors de la validation: $e');
      return false;
    }
  }
}
