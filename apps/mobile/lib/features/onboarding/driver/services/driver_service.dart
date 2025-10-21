import 'dart:io';
import 'dart:developer' as developer;
import '../core/interfaces/driver_service_interface.dart';
import '../repositories/driver_repository.dart';
import 'storage_service.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'upload/document_uploader.dart';
import 'utils/validators.dart';
import 'permissions_service.dart';

class DriverService implements IDriverService {
  final DriverRepository _repository;
  final StorageService _storageService;
  final SessionService _sessionService;
  final DocumentUploader _uploader;
  final PermissionsService _permissions;

  String? _currentVehicleId;

  int _backendPersonalPhotos = 0;
  int _backendVehiclePhotos = 0;

  DriverService(this._repository, this._storageService, this._sessionService)
    : _uploader = DocumentUploader(_repository, _storageService),
      _permissions = PermissionsService();

  @override
  Future<bool> requestCameraPermission() async {
    return _permissions.requestCamera();
  }

  @override
  Future<bool> requestStoragePermission() async {
    return _permissions.requestStorage();
  }

  @override
  Future<bool> requestLocationPermission() async {
    return _permissions.requestLocation();
  }

  @override
  Future<void> savePersonalInfo(Map<String, dynamic> personalInfo) async {
    if (!validatePersonalInfo(personalInfo)) {
      throw ArgumentError('Invalid personal info data');
    }

    try {
      final userId = _getUserIdOrThrow();
      await _repository.savePersonalInfo(
        userId: userId,
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
      final userId = _getUserIdOrThrow();
      final marque = (vehicleInfo['marque'] ?? '').toString();
      final modele = (vehicleInfo['modele'] ?? '').toString();
      final immatriculation = (vehicleInfo['immatriculation'] ?? '').toString();
      final placesStr = (vehicleInfo['places'] ?? '').toString();
      final typeVehicule =
          (vehicleInfo['type'] ?? vehicleInfo['typeVehicule'] ?? '').toString();
      final places = int.tryParse(placesStr);

      final created = await _repository.saveVehicleInfo(
        userId: userId,
        marque: marque,
        modele: modele,
        immatriculation: immatriculation,
        places: places,
        typeVehicule: typeVehicule.isNotEmpty ? typeVehicule : null,
      );
      try {
        _currentVehicleId = (created['id'] ?? created['vehicleId'] ?? '')
            .toString();
      } catch (_) {
        _currentVehicleId = null;
      }
    } catch (e) {
      throw Exception('Failed to save vehicle info: $e');
    }
  }

  @override
  Future<void> uploadDocumentPhotos(
    List<File> photos,
    String documentType,
  ) async {
    final userId = _getUserIdOrThrow();
    await _uploader.uploadDocumentPhotos(
      userId: userId,
      photos: photos,
      documentType: documentType,
      currentVehicleId: _currentVehicleId,
    );
  }

  @override
  Future<void> uploadSelfie(File photo) async {
    final userId = _getUserIdOrThrow();
    await _uploader.uploadSelfie(userId: userId, photo: photo);
  }

  @override
  Future<void> saveNotificationPreferences(
    Map<String, bool> preferences,
  ) async {
    try {
      final userId = _getUserIdOrThrow();
      await _repository.saveNotificationPreferences(
        userId: userId,
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
      final userId = _getUserIdOrThrow();
      await _repository.saveAppPreferences(
        userId: userId,
        theme: theme,
        language: language,
      );
    } catch (e) {
      throw Exception('Failed to save app preferences: $e');
    }
  }

  @override
  Future<void> saveGpsPreference(bool enabled) async {
    try {
      await _repository.upsertUserPreference({'activateLocation': enabled});
    } catch (e) {
      throw Exception('Failed to save GPS preference: $e');
    }
  }

  @override
  Future<void> completeDriverOnboarding(Map<String, dynamic> data) async {
    final userId = _getUserIdOrThrow();
    try {
      final cgu = data['cgu_accepted'] == true;
      final privacy = data['privacy_policy_accepted'] == true;
      await _repository.upsertUserPreference({
        'cguAccepted': cgu,
        'privacyPolicyAccepted': privacy,
        'driverTermsAccepted': true,
      });
      await _repository.updateDriverStatus(
        userId: userId,
        input: {'isDriver': true},
      );
    } catch (e) {
      throw Exception('Failed to complete driver onboarding: $e');
    }
  }

  @override
  Future<void> saveLegalAcceptance({
    bool? cguAccepted,
    bool? privacyPolicyAccepted,
  }) async {
    try {
      final input = <String, dynamic>{};
      if (cguAccepted != null) input['cguAccepted'] = cguAccepted;
      if (privacyPolicyAccepted != null) {
        input['privacyPolicyAccepted'] = privacyPolicyAccepted;
      }
      if (input.isEmpty) return;
      await _repository.upsertUserPreference(input);
    } catch (e) {
      throw Exception('Failed to save legal acceptance: $e');
    }
  }

  @override
  Future<void> setUserVerified(bool value) async {
    final userId = _getUserIdOrThrow();
    try {
      await _repository.updateDriverStatus(
        userId: userId,
        input: {'isDriver': true, 'isVerified': value},
      );
    } catch (e) {
      throw Exception('Failed to update verification status: $e');
    }
  }

  @override
  Future<String> generateDriverQrCode({String? type}) async {
    try {
      return await _repository.generateDriverQrCode(type: type);
    } catch (e) {
      throw Exception('Failed to generate driver QR code: $e');
    }
  }

  @override
  Future<void> clearAllData() async {
    try {
      await _storageService.clearAllPhotos();
      _backendPersonalPhotos = 0;
      _backendVehiclePhotos = 0;
    } catch (e) {
      throw Exception('Failed to clear all data: $e');
    }
  }

  @override
  Future<void> refreshBackendPhotoCounts() async {
    final userId = _getUserIdOrThrow();
    try {
      final docs = await _repository.getUploadedDocuments(userId);
      // Expecting a response like: { files: [ { type: 'SELFIE' | 'ID_CARD_FRONT' | 'VEHICLE_REGISTRATION' | ... } ] }
      final List<dynamic> files = docs['files'] as List<dynamic>? ?? [];
      int personal = 0;
      int vehicle = 0;
      for (final f in files) {
        final type = (f is Map && f['type'] is String)
            ? (f['type'] as String)
            : '';
        switch (type) {
          case 'USER':
            personal += 1;
            break;
          case 'VEHICLE':
            vehicle += 1;
            break;
          case 'SELFIE':
          case 'ID_CARD_FRONT':
          case 'ID_CARD_BACK':
          case 'DRIVER_LICENSE':
            personal += 1;
            break;
          case 'VEHICLE_REGISTRATION':
          case 'REGISTRATION':
          case 'INSURANCE':
          case 'VEHICLE_PHOTO':
            vehicle += 1;
            break;
          default:
            try {
              final key = (f['key'] ?? '').toString().toUpperCase();
              if (key.contains('/DRIVER/SELFIE') ||
                  key.contains('ID_CARD') ||
                  key.contains('LICENSE') ||
                  key.contains('/USER/')) {
                personal += 1;
              } else if (key.contains('VEHICLE')) {
                vehicle += 1;
              }
            } catch (_) {}
            break;
        }
      }
      _backendPersonalPhotos = personal;
      _backendVehiclePhotos = vehicle;
    } catch (e) {
      throw Exception('Failed to refresh backend photo counts: $e');
    }
  }

  @override
  int get cachedPersonalPhotosCount => _backendPersonalPhotos;

  @override
  int get cachedVehiclePhotosCount => _backendVehiclePhotos;

  @override
  int get cachedTotalPhotosCount =>
      _backendPersonalPhotos + _backendVehiclePhotos;

  @override
  int getTotalUploadedPhotosCount() {
    return _storageService.getTotalUploadedPhotosCount();
  }

  @override
  int getPersonalUploadedPhotosCount() {
    try {
      final types = <String>[
        'carteIdentiteRecto',
        'carte_identite_recto',
        'carteIdentiteVerso',
        'carte_identite_verso',
        'permisConduire',
        'permis_conduire',
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
        'certificatImmatriculation',
        'certificat_immatriculation',
        'attestationAssurance',
        'attestation_assurance',
        'photosVehicule',
        'photos_vehicule',
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
    return DriverValidators.validatePersonalInfo(data);
  }

  @override
  bool validateVehicleInfo(Map<String, dynamic> data) {
    return DriverValidators.validateVehicleInfo(data);
  }

  @override
  bool validateDocuments() {
    try {
      // Prefer backend cache if available
      final backendCount = cachedTotalPhotosCount;
      if (backendCount > 0) return backendCount >= 3;
      return getTotalUploadedPhotosCount() >= 3;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<void> updateOnboardingStep({
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    final userId = _getUserIdOrThrow();
    try {
      await _repository.updateOnboardingStep(
        userId: userId,
        currentStep: currentStep,
        stepData: stepData,
      );
    } catch (e) {
      throw Exception('Failed to update onboarding step: $e');
    }
  }

  @override
  Future<void> setUserRole({required bool isDriver}) async {
    final userId = _getUserIdOrThrow();
    try {
      final roleName = isDriver ? 'DRIVER' : 'USER';
      developer.log('setUserRole start: userId=$userId, role=$roleName');
      await _repository.updateDriverStatus(
        userId: userId,
        input: {'isDriver': isDriver},
      );
      developer.log('setUserRole success: userId=$userId, role=$roleName');
    } catch (e) {
      developer.log('setUserRole error: $e');
      throw Exception('Failed to set user role: $e');
    }
  }

  String _getUserIdOrThrow() {
    final id = _sessionService.userId;
    if (id == null || id.isEmpty) {
      throw StateError('Utilisateur non authentifié');
    }
    return id;
  }

  // @override
  // Future<String> generateDriverQrCode({String? type}) {
  //   // TODO: implement generateDriverQrCode
  //   throw UnimplementedError();
  // }
}
