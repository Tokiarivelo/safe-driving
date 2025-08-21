import '../models/driver_onboarding_data.dart';

class DriverRepository {
  Future<void> savePersonalInfo({
    required String userId,
    required String name,
    required String email,
    required String phone,
  }) async {
    throw UnimplementedError('savePersonalInfo not implemented yet');
  }

  Future<void> saveVehicleInfo({
    required String userId,
    required String marque,
    required String modele,
    required String immatriculation,
    required String couleur,
    required int annee,
  }) async {
    throw UnimplementedError('saveVehicleInfo not implemented yet');
  }

  Future<String> uploadDocument({
    required String userId,
    required String documentType,
    required String filePath,
    required String side,
  }) async {
    throw UnimplementedError('uploadDocument not implemented yet');
  }

  Future<String> uploadSelfie({
    required String userId,
    required String filePath,
  }) async {
    throw UnimplementedError('uploadSelfie not implemented yet');
  }

  Future<void> saveNotificationPreferences({
    required String userId,
    required Map<String, bool> preferences,
  }) async {
    throw UnimplementedError('saveNotificationPreferences not implemented yet');
  }

  /// Sauvegarde les préférences de thème et langue
  Future<void> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  }) async {
    throw UnimplementedError('saveAppPreferences not implemented yet');
  }

  Future<void> completeDriverOnboarding(String userId) async {
    throw UnimplementedError('completeDriverOnboarding not implemented yet');
  }

  Future<DriverOnboardingData?> getDriverOnboardingData(String userId) async {
    throw UnimplementedError('getDriverOnboardingData not implemented yet');
  }

  Future<void> updateDriverOnboardingData({
    required String userId,
    required DriverOnboardingData data,
  }) async {
    throw UnimplementedError('updateDriverOnboardingData not implemented yet');
  }

  Future<Map<String, String>> getDocumentValidationStatus(String userId) async {
    throw UnimplementedError('getDocumentValidationStatus not implemented yet');
  }

  Future<Map<String, List<String>>> getUploadedDocuments(String userId) async {
    throw UnimplementedError('getUploadedDocuments not implemented yet');
  }

  Future<void> deleteDocument({
    required String userId,
    required String documentId,
  }) async {
    throw UnimplementedError('deleteDocument not implemented yet');
  }

  Future<void> updateOnboardingStep({
    required String userId,
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    throw UnimplementedError('updateOnboardingStep not implemented yet');
  }

  Future<Map<String, String?>> validateDriverInfo({
    required String userId,
    required Map<String, dynamic> driverInfo,
  }) async {
    throw UnimplementedError('validateDriverInfo not implemented yet');
  }

  Future<Map<String, dynamic>> getDriverStats(String userId) async {
    throw UnimplementedError('getDriverStats not implemented yet');
  }

  Future<void> updateDriverProfile({
    required String userId,
    Map<String, dynamic>? personalInfo,
    Map<String, dynamic>? vehicleInfo,
    Map<String, dynamic>? preferences,
  }) async {
    throw UnimplementedError('updateDriverProfile not implemented yet');
  }
}
