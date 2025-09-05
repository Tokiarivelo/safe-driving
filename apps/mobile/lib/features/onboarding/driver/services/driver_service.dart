import 'dart:io';
import 'package:permission_handler/permission_handler.dart';
import '../core/interfaces/driver_service_interface.dart';
import '../repositories/driver_repository.dart';
import 'storage_service.dart';

/// Service standardisé pour la gestion du driver onboarding
/// Implémente l'interface IDriverService et suit l'architecture MVVM
class DriverService implements IDriverService {
  final DriverRepository _repository;
  final StorageService _storageService;

  DriverService(this._repository, this._storageService);

  @override
  Future<bool> requestCameraPermission() async {
    try {
      final status = await Permission.camera.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<bool> requestStoragePermission() async {
    try {
      final status = await Permission.storage.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<bool> requestLocationPermission() async {
    try {
      final status = await Permission.location.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<void> savePersonalInfo(Map<String, dynamic> personalInfo) async {
    if (!validatePersonalInfo(personalInfo)) {
      throw ArgumentError('Invalid personal info data');
    }

    try {
      await _repository.savePersonalInfo(
        userId: 'temp_user_id',
        name: personalInfo['name'] ?? '',
        email: personalInfo['email'] ?? '',
        phone: personalInfo['phone'] ?? '',
      );
    } catch (e) {
      throw Exception('Failed to save personal info: $e');
    }
  }

  @override
  Future<void> saveVehicleInfo(Map<String, dynamic> vehicleInfo) async {
    if (!validateVehicleInfo(vehicleInfo)) {
      throw ArgumentError('Invalid vehicle info data');
    }

    try {
      await _repository.saveVehicleInfo(
        userId: 'temp_user_id',
        marque: vehicleInfo['marque'] ?? '',
        modele: vehicleInfo['modele'] ?? '',
        immatriculation: vehicleInfo['immatriculation'] ?? '',
        couleur: vehicleInfo['couleur'] ?? '',
        annee: vehicleInfo['annee'] ?? 0,
      );
    } catch (e) {
      throw Exception('Failed to save vehicle info: $e');
    }
  }

  @override
  Future<void> uploadDocumentPhotos(
    List<File> photos,
    String documentType,
  ) async {
    try {
      // Store locally first
      await _storageService.storePhotos(photos, documentType);

      // Upload each photo to server via repository
      for (final photo in photos) {
        await _repository.uploadDocument(
          userId: 'temp_user_id',
          documentType: documentType,
          filePath: photo.path,
          side: 'front',
        );
      }
    } catch (e) {
      throw Exception('Failed to upload document photos: $e');
    }
  }

  @override
  Future<void> uploadSelfie(File photo) async {
    try {
      // Store locally first
      await _storageService.storePhoto(photo, StorageService.selfieType);

      // Upload to server via repository
      await _repository.uploadSelfie(
        userId: 'temp_user_id',
        filePath: photo.path,
      );
    } catch (e) {
      throw Exception('Failed to upload selfie: $e');
    }
  }

  @override
  Future<void> saveNotificationPreferences(
    Map<String, bool> preferences,
  ) async {
    try {
      await _repository.saveNotificationPreferences(
        userId: 'temp_user_id',
        preferences: preferences,
      );
    } catch (e) {
      throw Exception('Failed to save notification preferences: $e');
    }
  }

  @override
  Future<void> saveAppPreferences({
    required String theme,
    required String language,
  }) async {
    try {
      await _repository.saveAppPreferences(
        userId: 'temp_user_id',
        theme: theme,
        language: language,
      );
    } catch (e) {
      throw Exception('Failed to save app preferences: $e');
    }
  }

  @override
  Future<void> completeDriverOnboarding(Map<String, dynamic> data) async {
    try {
      await _repository.completeDriverOnboarding('temp_user_id');
    } catch (e) {
      throw Exception('Failed to complete driver onboarding: $e');
    }
  }

  @override
  Future<void> clearAllData() async {
    try {
      await _storageService.clearAllPhotos();
    } catch (e) {
      throw Exception('Failed to clear all data: $e');
    }
  }

  @override
  int getTotalUploadedPhotosCount() {
    return _storageService.getTotalUploadedPhotosCount();
  }

  @override
  int getPersonalUploadedPhotosCount() {
    try {
   
      final types = <String>[
        'carteIdentiteRecto', 'carte_identite_recto',
        'carteIdentiteVerso', 'carte_identite_verso',
        'permisConduire', 'permis_conduire',
        StorageService.selfieType,
      ];
      int total = 0;
      for (final t in types) {
        total += _storageService.getPhotosForType(t).length;
      }
      return total;
    } catch (_) {
      return 0;
    }
  }

  @override
  int getVehicleUploadedPhotosCount() {
    try {
   
      final types = <String>[
        'certificatImmatriculation', 'certificat_immatriculation',
        'attestationAssurance', 'attestation_assurance',
        'photosVehicule', 'photos_vehicule',
      ];
      int total = 0;
      for (final t in types) {
        total += _storageService.getPhotosForType(t).length;
      }
      return total;
    } catch (_) {
      return 0;
    }
  }

  @override
  bool validatePersonalInfo(Map<String, dynamic> data) {
    final name = data['name']?.toString() ?? '';
    final email = data['email']?.toString() ?? '';
    final phone = data['phone']?.toString() ?? '';

    if (name.isEmpty || name.length < 2) return false;
    if (email.isEmpty || !_isValidEmail(email)) return false;
    if (phone.isEmpty || phone.length < 10) return false;

    return true;
  }

  @override
  bool validateVehicleInfo(Map<String, dynamic> data) {
    final marque = data['marque']?.toString() ?? '';
    final modele = data['modele']?.toString() ?? '';
    final immatriculation = data['immatriculation']?.toString() ?? '';

    if (marque.isEmpty || marque.length < 2) return false;
    if (modele.isEmpty || modele.length < 2) return false;
    if (immatriculation.isEmpty || immatriculation.length < 6) return false;

    return true;
  }

  @override
  bool validateDocuments() {
    try {
      return getTotalUploadedPhotosCount() >= 3; // Minimum required photos
    } catch (e) {
      return false;
    }
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }
}
