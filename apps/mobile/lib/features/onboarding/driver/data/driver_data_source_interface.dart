import '../models/driver_onboarding_data.dart';

abstract class IDriverDataSource {
  Future<Map<String, dynamic>> savePersonalInfo({
    required String userId,
    required String name,
    required String email,
    required String phone,
  });

  Future<Map<String, dynamic>> saveVehicleInfo({
    required String userId,
    required String marque,
    required String modele,
    required String immatriculation,
    int? places,
    String? typeVehicule,
  });

  Future<Map<String, dynamic>> uploadDocument({
    required String userId,
    required String documentType,
    required String filePath,
    required String side,
  });

  Future<Map<String, dynamic>> uploadSelfie({
    required String userId,
    required String filePath,
  });

  Future<Map<String, dynamic>> saveNotificationPreferences({
    required String userId,
    required Map<String, bool> preferences,
  });

  Future<Map<String, dynamic>> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  });

  Future<Map<String, dynamic>> completeDriverOnboarding(String userId);

  Future<Map<String, dynamic>> getDriverOnboardingData(String userId);

  Future<Map<String, dynamic>> updateDriverOnboardingData({
    required String userId,
    required DriverOnboardingData data,
  });

  Future<Map<String, dynamic>> getDocumentValidationStatus(String userId);

  Future<Map<String, dynamic>> getUploadedDocuments(String userId);

  Future<Map<String, dynamic>> deleteDocument({
    required String userId,
    required String documentId,
  });

  Future<Map<String, dynamic>> updateOnboardingStep({
    required String userId,
    required int currentStep,
    required Map<String, dynamic> stepData,
  });

  Future<Map<String, dynamic>> validateDriverInfo({
    required String userId,
    required Map<String, dynamic> driverInfo,
  });

  Future<Map<String, dynamic>> getDriverStats(String userId);

  Future<Map<String, dynamic>> updateDriverProfile({
    required String userId,
    Map<String, dynamic>? personalInfo,
    Map<String, dynamic>? vehicleInfo,
    Map<String, dynamic>? preferences,
  });

  Future<String> generatePresignedUrl({
    required String key,
    required String contentType,
    double? expiresIn,
  });

  Future<Map<String, dynamic>> createUpload({
    required String userId,
    required String documentType,
    required String key,
    required String url,
    required int size,
    String? originalName,
    String? contentType,
    String? etag,
    String? driverVehicleId,
  });

  Future<String> generateDriverQrCode({String? type});

  Future<Map<String, dynamic>> updateDriverStatus({
    required String userId,
    required Map<String, dynamic> input,
  });

  Future<Map<String, dynamic>> upsertUserPreference(Map<String, dynamic> input);
}
