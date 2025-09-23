import 'dart:io';

abstract class IDriverService {
  Future<bool> requestCameraPermission();
  Future<bool> requestStoragePermission();
  Future<bool> requestLocationPermission();

  Future<void> savePersonalInfo(Map<String, dynamic> personalInfo);
  Future<void> saveVehicleInfo(Map<String, dynamic> vehicleInfo);
  Future<void> saveNotificationPreferences(Map<String, bool> preferences);
  Future<void> saveAppPreferences({
    required String theme,
    required String language,
  });

  Future<void> saveGpsPreference(bool enabled);

  Future<void> uploadDocumentPhotos(List<File> photos, String documentType);
  Future<void> uploadSelfie(File photo);

  Future<void> completeDriverOnboarding(Map<String, dynamic> data);

  Future<void> saveLegalAcceptance({
    bool? cguAccepted,
    bool? privacyPolicyAccepted,
  });

  Future<void> setUserVerified(bool value);

  Future<String> generateDriverQrCode({String? type});

  Future<void> clearAllData();

  Future<void> refreshBackendPhotoCounts();
  int get cachedPersonalPhotosCount;
  int get cachedVehiclePhotosCount;
  int get cachedTotalPhotosCount;

  int getTotalUploadedPhotosCount();
  int getPersonalUploadedPhotosCount();
  int getVehicleUploadedPhotosCount();

  Future<void> updateOnboardingStep({
    required int currentStep,
    required Map<String, dynamic> stepData,
  });
  Future<void> setUserRole({required bool isDriver});

  bool validatePersonalInfo(Map<String, dynamic> data);
  bool validateVehicleInfo(Map<String, dynamic> data);
  bool validateDocuments();
}
