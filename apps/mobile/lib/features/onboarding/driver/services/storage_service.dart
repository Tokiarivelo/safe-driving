import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as path;

class StorageService {
  static const String carteIdentiteRectoType = 'carte_identite_recto';
  static const String carteIdentiteVersoType = 'carte_identite_verso';
  static const String permisConduireType = 'permis_conduire';
  static const String certificatImmatriculationType = 'certificat_immatriculation';
  static const String attestationAssuranceType = 'attestation_assurance';
  static const String photosVehiculeType = 'photos_vehicule';
  static const String selfieType = 'selfie';
  
  // Alias pour compatibilité avec les méthodes du ViewModel
  static const String identityRectoType = carteIdentiteRectoType;
  static const String identityVersoType = carteIdentiteVersoType;
  static const String drivingLicenseType = permisConduireType;

  final Map<String, List<File>> _storedPhotos = {};

  Future<void> storePhotos(List<dynamic> photos, String type) async {
    try {
      final directory = await getApplicationDocumentsDirectory();
      final typeDirectory = Directory(path.join(directory.path, 'driver_documents', type));
      
      if (!await typeDirectory.exists()) {
        await typeDirectory.create(recursive: true);
      }

      final List<File> storedFiles = [];
      
      for (int i = 0; i < photos.length; i++) {
        final file = photos[i];
        final fileName = '${type}_${DateTime.now().millisecondsSinceEpoch}_$i${path.extension(file.path)}';
        final targetPath = path.join(typeDirectory.path, fileName);
        
        final copiedFile = await file.copy(targetPath);
        storedFiles.add(copiedFile);
      }
      
      _storedPhotos[type] = [...(_storedPhotos[type] ?? []), ...storedFiles];
    } catch (e) {
      throw Exception('Erreur lors du stockage des photos: $e');
    }
  }

  Future<void> storePhoto(File photo, String type) async {
    await storePhotos([photo], type);
  }

  List<File> getPhotosForType(String type) {
    return _storedPhotos[type] ?? [];
  }

  int getTotalUploadedPhotosCount() {
    int totalCount = 0;
    _storedPhotos.forEach((key, value) {
      totalCount += value.length;
    });
    return totalCount;
  }

  Future<void> clearAllPhotos() async {
    try {
      final directory = await getApplicationDocumentsDirectory();
      final documentsDirectory = Directory(path.join(directory.path, 'driver_documents'));
      
      if (await documentsDirectory.exists()) {
        await documentsDirectory.delete(recursive: true);
      }
      
      _storedPhotos.clear();
    } catch (e) {
      throw Exception('Erreur lors du nettoyage des données: $e');
    }
  }
}
