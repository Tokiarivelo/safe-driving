import 'dart:io';
import 'package:permission_handler/permission_handler.dart';
import 'package:path/path.dart' as p;
import '../core/interfaces/driver_service_interface.dart';
import '../repositories/driver_repository.dart';
import 'storage_service.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';

class DriverService implements IDriverService {
  final DriverRepository _repository;
  final StorageService _storageService;
  final SessionService _sessionService;

  DriverService(this._repository, this._storageService, this._sessionService);

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
      await _repository.saveVehicleInfo(
        userId: userId,
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

  Future<String?> _uploadToS3(String url, File file, String contentType) async {
    final client = HttpClient();
    try {
      final req = await client.putUrl(Uri.parse(url));
      req.headers.set(HttpHeaders.contentTypeHeader, contentType);
      final bytes = await file.readAsBytes();
      req.add(bytes);
      final resp = await req.close();
      if (resp.statusCode < 200 || resp.statusCode >= 300) {
        throw HttpException('S3 upload failed: ${resp.statusCode}');
      }
      return resp.headers.value('etag');
    } finally {
      client.close(force: true);
    }
  }

  String _inferContentType(String path) {
    final lower = path.toLowerCase();
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.heic')) return 'image/heic';
    return 'application/octet-stream';
    }

  String _mapDocumentType(String type) {
    switch (type) {
      case 'identity_recto':
      case 'carte_identite_recto':
        return 'ID_CARD_FRONT';
      case 'identity_verso':
      case 'carte_identite_verso':
        return 'ID_CARD_BACK';
      case 'driving_license':
      case 'permis_conduire':
        return 'DRIVER_LICENSE';
      case 'certificat_immatriculation':
        return 'VEHICLE_REGISTRATION';
      case 'attestation_assurance':
        return 'INSURANCE';
      case 'selfie':
        return 'SELFIE';
      default:
        return type.toUpperCase();
    }
  }

  String _buildS3Key(String userId, String documentType, String fileName) {
    final ts = DateTime.now().millisecondsSinceEpoch;
    return 'uploads/users/$userId/driver/$documentType/${ts}_$fileName';
  }

  @override
  Future<void> uploadDocumentPhotos(
    List<File> photos,
    String documentType,
  ) async {
    final userId = _getUserIdOrThrow();
    final backendType = _mapDocumentType(documentType);
    try {
      await _storageService.storePhotos(photos, documentType);
      for (final photo in photos) {
        final contentType = _inferContentType(photo.path);
        final fileName = p.basename(photo.path);
        final key = _buildS3Key(userId, backendType, fileName);
        final url = await _repository.generatePresignedUrl(
          key: key,
          contentType: contentType,
        );
        final etag = await _uploadToS3(url, photo, contentType);
        final stat = await photo.stat();
        await _repository.createUpload(
          userId: userId,
          documentType: backendType,
          key: key,
          url: url,
          size: stat.size,
          originalName: fileName,
          contentType: contentType,
          etag: etag,
        );
      }
    } catch (e) {
      throw Exception('Failed to upload document photos: $e');
    }
  }

  @override
  Future<void> uploadSelfie(File photo) async {
    final userId = _getUserIdOrThrow();
    try {
      await _storageService.storePhoto(photo, StorageService.selfieType);
      final contentType = _inferContentType(photo.path);
      final fileName = p.basename(photo.path);
      final key = _buildS3Key(userId, 'SELFIE', fileName);
      final url = await _repository.generatePresignedUrl(
        key: key,
        contentType: contentType,
      );
      final etag = await _uploadToS3(url, photo, contentType);
      final stat = await photo.stat();
      await _repository.createUpload(
        userId: userId,
        documentType: 'SELFIE',
        key: key,
        url: url,
        size: stat.size,
        originalName: fileName,
        contentType: contentType,
        etag: etag,
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
        input: {
          'isDriver': true,
        },
      );
    } catch (e) {
      throw Exception('Failed to complete driver onboarding: $e');
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
      return getTotalUploadedPhotosCount() >= 3;
    } catch (e) {
      return false;
    }
  }

  String _getUserIdOrThrow() {
    final id = _sessionService.userId;
    if (id == null || id.isEmpty) {
      throw StateError('Utilisateur non authentifié');
    }
    return id;
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }
}
