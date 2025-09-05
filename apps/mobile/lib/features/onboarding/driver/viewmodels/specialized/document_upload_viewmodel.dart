import 'dart:io' show File; // Restrict import for non-web platforms
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import '../../core/interfaces/driver_service_interface.dart';

class DocumentUploadViewModel extends ChangeNotifier {
  final IDriverService _service;

  DocumentUploadViewModel(this._service);

  final List<File> _capturedPhotos = [];
  // Compteur spécifique au Web pour suivre les téléchargements sans File système
  int _webUploadedCount = 0;

  final Map<String, int> _typeCounts = {};
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  List<File> get capturedPhotos => _capturedPhotos;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  // Photo management methods
  void addCapturedPhoto(File photo) {
    _capturedPhotos.add(photo);
    notifyListeners();
  }

  void removeCapturedPhoto(int index) {
    if (index >= 0 && index < _capturedPhotos.length) {
      _capturedPhotos.removeAt(index);
      notifyListeners();
    }
  }

  void clearCapturedPhotos() {
    _capturedPhotos.clear();
    notifyListeners();
  }

  void updateCapturedPhotos(List<File> photos) {
    _capturedPhotos.clear();
    _capturedPhotos.addAll(photos);
    notifyListeners();
  }

  // Document upload methods
  Future<void> uploadPhotos(List<File> photos, String documentType) async {

    _typeCounts[documentType] = photos.length;
    notifyListeners();

    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(photos, documentType);
    } catch (e) {
      // On garde au moins le compteur local pour l'affichage du résumé
      _setError('Erreur lors de l\'upload des photos: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleIdentityRectoPhotos(List<File> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(photos, 'identity_recto');
    } catch (e) {
      _setError('Erreur lors du stockage des photos recto: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleIdentityVersoPhotos(List<File> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(photos, 'identity_verso');
    } catch (e) {
      _setError('Erreur lors du stockage des photos verso: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleDrivingLicensePhotos(List<File> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(photos, 'driving_license');
    } catch (e) {
      _setError('Erreur lors du stockage des photos de permis: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Selfie handler
  Future<void> onSelfieTaken(String? imagePath) async {
    if (imagePath == null) return;

    if (kIsWeb) {
      // Sur le Web, pas de File système: on comptabilise localement pour le résumé
      _webUploadedCount += 1;
      notifyListeners();
      // Optionnel: implémenter un upload réel côté web dans le service si nécessaire
      return;
    }

    final capturedFile = File(imagePath);
    addCapturedPhoto(capturedFile);

    _setLoading(true);
    try {
      await _service.uploadSelfie(capturedFile);
    } catch (e) {
      _setError('Erreur lors du stockage du selfie: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Total uploaded photos count
  int getTotalUploadedPhotosCount() {
    try {
      if (kIsWeb) {
        // Sur le Web, on retourne le compteur local (pas de stockage fichier)
        return _webUploadedCount;
      }
      return _service.getTotalUploadedPhotosCount();
    } catch (e) {
      return kIsWeb ? _webUploadedCount : 0;
    }
  }


  int getPersonalUploadedPhotosCount() {
    try {
      if (kIsWeb) {
        return _webUploadedCount; // selfie only on web
      }
   
      final personalTypes = <String>[
        'carteIdentiteRecto', 'carte_identite_recto',
        'carteIdentiteVerso', 'carte_identite_verso',
        'permisConduire', 'permis_conduire',
        'selfie',
      ];
      int local = 0;
      for (final t in personalTypes) {
        local += _typeCounts[t] ?? 0;
      }
      if (local > 0) return local;

   
      return _service.getPersonalUploadedPhotosCount();
    } catch (e) {
      return kIsWeb ? _webUploadedCount : 0;
    }
  }

  int getVehicleUploadedPhotosCount() {
    try {
      if (kIsWeb) {
        return 0; // not tracked on web
      }
    
      final vehicleTypes = <String>[
        'certificatImmatriculation', 'certificat_immatriculation',
        'attestationAssurance', 'attestation_assurance',
        'photosVehicule', 'photos_vehicule',
      ];
      int local = 0;
      for (final t in vehicleTypes) {
        local += _typeCounts[t] ?? 0;
      }
      if (local > 0) return local;

      return _service.getVehicleUploadedPhotosCount();
    } catch (e) {
      return 0;
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
