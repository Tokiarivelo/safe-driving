import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class StorageService {
  // Types de photos
  static const String selfieType = 'selfie';
  static const String carteIdentiteRectoType = 'carte_identite_recto';
  static const String carteIdentiteVersoType = 'carte_identite_verso';
  static const String permisConduireType = 'permis_conduire';
  static const String certificatImmatriculationType =
      'certificat_immatriculation';
  static const String attestationAssuranceType = 'attestation_assurance';
  static const String photosVehiculeType = 'photos_vehicule';

  static final StorageService _instance = StorageService._internal();
  factory StorageService() => _instance;
  StorageService._internal();

  final Map<String, List<dynamic>> _storedPhotos = {};

  Future<String?> storePhoto(dynamic photo, String type) async {
    try {
      if (!_storedPhotos.containsKey(type)) {
        _storedPhotos[type] = [];
      }
      _storedPhotos[type]!.add(photo);

      final timestamp = DateTime.now().millisecondsSinceEpoch;
      return '${type}_$timestamp';
    } catch (e) {
      debugPrint('Erreur lors du stockage de la photo: $e');
      return null;
    }
  }

  Future<List<String>> storePhotos(List<dynamic> photos, String type) async {
    final List<String> storedPaths = [];

    for (final photo in photos) {
      final storedPath = await storePhoto(photo, type);
      if (storedPath != null) {
        storedPaths.add(storedPath);
      }
    }

    return storedPaths;
  }

  List<dynamic> getPhotos(String type) {
    return _storedPhotos[type] ?? [];
  }

  int getPhotosCount(String type) {
    return _storedPhotos[type]?.length ?? 0;
  }

  int getTotalUploadedPhotosCount() {
    int total = 0;

    total += getPhotosCount(selfieType);

    total += getPhotosCount(carteIdentiteRectoType);
    total += getPhotosCount(carteIdentiteVersoType);
    total += getPhotosCount(permisConduireType);

    // Documents véhicule
    total += getPhotosCount(certificatImmatriculationType);
    total += getPhotosCount(attestationAssuranceType);
    total += getPhotosCount(photosVehiculeType);

    return total;
  }

  Future<bool> removePhoto(String type, dynamic photo) async {
    try {
      if (_storedPhotos.containsKey(type)) {
        _storedPhotos[type]!.remove(photo);
      }
      return true;
    } catch (e) {
      debugPrint('Erreur lors de la suppression de la photo: $e');
      return false;
    }
  }

  Future<bool> removeAllPhotos(String type) async {
    try {
      _storedPhotos.remove(type);
      return true;
    } catch (e) {
      debugPrint('Erreur lors de la suppression des photos: $e');
      return false;
    }
  }

  Future<bool> clearAll() async {
    try {
      _storedPhotos.clear();
      return true;
    } catch (e) {
      debugPrint('Erreur lors du nettoyage du stockage: $e');
      return false;
    }
  }
}
