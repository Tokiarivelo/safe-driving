import 'dart:io';
import 'package:flutter/material.dart';
import '../../core/interfaces/driver_service_interface.dart';

class DocumentUploadViewModel extends ChangeNotifier {
  final IDriverService _service;

  DocumentUploadViewModel(this._service);

  final List<File> _capturedPhotos = [];
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
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(photos, documentType);
    } catch (e) {
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
    if (imagePath != null) {
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
  }

  // Total uploaded photos count
  int getTotalUploadedPhotosCount() {
    try {
      return _service.getTotalUploadedPhotosCount();
    } catch (e) {
      return 0;
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
