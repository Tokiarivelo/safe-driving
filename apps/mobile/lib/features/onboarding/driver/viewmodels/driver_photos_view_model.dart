import 'dart:io';
import 'package:flutter/material.dart';
import '../core/interfaces/driver_service_interface.dart';
import '../services/storage_service.dart';

class DriverPhotosViewModel extends ChangeNotifier {
  final IDriverService _service;
  final List<File> _capturedPhotos = [];
  bool _isLoading = false;
  String? _errorMessage;

  DriverPhotosViewModel(this._service);

  List<File> get capturedPhotos => _capturedPhotos;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

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

  Future<void> onSelfieTaken(String? imagePath) async {
    if (imagePath != null) {
      final capturedFile = File(imagePath);
      addCapturedPhoto(capturedFile);

      _setLoading(true);
      try {
        await _service.uploadSelfie(capturedFile);
        _clearError();
      } catch (e) {
        _setError('Erreur lors du stockage du selfie: $e');
        rethrow;
      } finally {
        _setLoading(false);
      }
    }
  }

  Future<void> handleIdentityRectoPhotos(List<dynamic> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(
        photos.cast<File>(),
        StorageService.identityRectoType,
      );
      _clearError();
    } catch (e) {
      _setError('Erreur lors du stockage des photos recto: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleIdentityVersoPhotos(List<dynamic> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(
        photos.cast<File>(),
        StorageService.identityVersoType,
      );
      _clearError();
    } catch (e) {
      _setError('Erreur lors du stockage des photos verso: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleDrivingLicensePhotos(List<dynamic> photos) async {
    _setLoading(true);
    try {
      await _service.uploadDocumentPhotos(
        photos.cast<File>(),
        StorageService.drivingLicenseType,
      );
      _clearError();
    } catch (e) {
      _setError('Erreur lors du stockage des photos de permis: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  int getTotalUploadedPhotosCount() {
    return _service.getTotalUploadedPhotosCount();
  }

  bool hasRequiredDocuments() {
    return _service.validateDocuments();
  }

  // State management
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
