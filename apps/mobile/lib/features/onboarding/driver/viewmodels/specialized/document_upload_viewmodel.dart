import 'dart:io' show File; // Restrict import for non-web platforms
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import '../../core/interfaces/driver_service_interface.dart';

class DocumentUploadViewModel extends ChangeNotifier {
  final IDriverService _service;

  DocumentUploadViewModel(this._service);

  final List<File> _capturedPhotos = [];

  final Map<String, List<File>> _pendingUploads = {};
  // Compteur spécifique au Web pour suivre les téléchargements sans File système
  int _webUploadedCount = 0;

  final Map<String, int> _typeCounts = {};
  bool _isLoading = false;
  String? _errorMessage;

  int? _backendPersonalCount;
  int? _backendVehicleCount;

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

  // Queue photos to upload later (when pressing "Valider")
  void queuePhotosForUpload(List<File> photos, String documentType) {
    if (photos.isEmpty) return;
    final list = _pendingUploads.putIfAbsent(documentType, () => <File>[]);
    list.addAll(photos);
    _typeCounts[documentType] = ( _typeCounts[documentType] ?? 0 ) + photos.length;
    notifyListeners();
  }

  bool get hasPendingUploads => _pendingUploads.values.any((l) => l.isNotEmpty);

  // Perform the actual uploads for any pending files
  Future<void> flushPendingUploads() async {
    if (!hasPendingUploads) return;
    _setLoading(true);
    try {
      for (final entry in _pendingUploads.entries) {
        if (entry.value.isEmpty) continue;
        await _service.uploadDocumentPhotos(entry.value, entry.key);
      }
      _pendingUploads.clear();
    } catch (e) {
      _setError('Erreur lors de l\'upload des photos: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  // Immediate upload method (kept for backwards compatibility)
  Future<void> uploadPhotos(List<File> photos, String documentType) async {
    queuePhotosForUpload(photos, documentType);
    await flushPendingUploads();
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

  Future<void> refreshBackendPhotoCounts() async {
    _setLoading(true);
    try {
      await _service.refreshBackendPhotoCounts();
      _backendPersonalCount = _service.cachedPersonalPhotosCount;
      _backendVehicleCount = _service.cachedVehiclePhotosCount;
    } catch (e) {
      _setError('Erreur lors de la récupération des photos: $e');
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
      
      // First check local counts from queued uploads
      int localTotal = 0;
      for (final count in _typeCounts.values) {
        localTotal += count;
      }
      if (localTotal > 0) return localTotal;
      
      // Then check backend counts if available
      final backend = (_backendPersonalCount ?? 0) + (_backendVehicleCount ?? 0);
      if (backend > 0) return backend;
      
      // Finally fallback to service count
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
      if (_backendPersonalCount != null) return _backendPersonalCount!;

    
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
      if (_backendVehicleCount != null) return _backendVehicleCount!;

   
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
