import 'dart:io';
import 'dart:developer' as developer;
import 'package:permission_handler/permission_handler.dart';
import 'storage_service.dart';

class DriverOnboardingService {
  final StorageService _storageService = StorageService();

  Future<bool> requestLocationPermission() async {
    try {
      final status = await Permission.location.request();
      return status.isGranted;
    } catch (e) {
      developer.log('Erreur lors de la demande de permission GPS: $e', name: 'DriverOnboardingService');
      return false;
    }
  }

  Future<void> uploadDocumentPhotos(
    List<File> photos,
    String documentType,
  ) async {
    try {
      await _storageService.storePhotos(photos, documentType);
    } catch (e) {
      throw Exception('Erreur lors de l\'upload des documents: $e');
    }
  }

  Future<void> uploadSelfie(File photo) async {
    try {
      await _storageService.storePhoto(photo, StorageService.selfieType);
    } catch (e) {
      throw Exception('Erreur lors de l\'upload du selfie: $e');
    }
  }

  Future<void> completeDriverOnboarding(Map<String, dynamic> data) async {
    try {
      await Future.delayed(const Duration(seconds: 2));

      developer.log('Driver onboarding completed with data: $data', name: 'DriverOnboardingService');
    } catch (e) {
      throw Exception('Erreur lors de la finalisation de l\'inscription: $e');
    }
  }

  int getTotalUploadedPhotosCount() {
    return _storageService.getTotalUploadedPhotosCount();
  }

  Future<void> clearAllData() async {
    try {
      await _storageService.clearAllPhotos();
    } catch (e) {
      throw Exception('Erreur lors du nettoyage des données: $e');
    }
  }
}
