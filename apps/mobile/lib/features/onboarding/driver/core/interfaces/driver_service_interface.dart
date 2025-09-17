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

  Future<void> uploadDocumentPhotos(List<File> photos, String documentType);
  Future<void> uploadSelfie(File photo);

  Future<void> completeDriverOnboarding(Map<String, dynamic> data);

  Future<String> generateDriverQrCode({String? type});

  Future<void> clearAllData();
  int getTotalUploadedPhotosCount();
  int getPersonalUploadedPhotosCount();
  int getVehicleUploadedPhotosCount();

  bool validatePersonalInfo(Map<String, dynamic> data);
  bool validateVehicleInfo(Map<String, dynamic> data);
  bool validateDocuments();
}
