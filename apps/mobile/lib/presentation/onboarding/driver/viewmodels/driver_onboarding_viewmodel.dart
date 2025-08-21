import 'dart:io';
import 'package:flutter/material.dart';
import '../models/driver_onboarding_step_model.dart';
import '../services/driver_services.dart';
import '../services/storage_service.dart';
import '../models/driver_onboarding_data.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class DriverOnboardingViewModel extends ChangeNotifier {
  final DriverOnboardingService _service = DriverOnboardingService();

  int _currentStep = 0;
  bool _isLoading = false;
  String? _errorMessage;

  // Form data
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, dynamic> _formData = {};
  final List<File> _capturedPhotos = [];
  bool _gpsEnabled = false;
  final List<String> _selectedNotifications = [];
  String _selectedTheme = 'clair';
  String _selectedLanguage = 'fr';
  final List<bool> _cguAccepted = [false, false];

  // Getters
  int get currentStep => _currentStep;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  List<DriverOnboardingStepModel> get steps =>
      DriverOnboardingData.getDriverSteps();

  bool get gpsEnabled => _gpsEnabled;
  List<String> get selectedNotifications => _selectedNotifications;
  String get selectedTheme => _selectedTheme;
  String get selectedLanguage => _selectedLanguage;
  List<bool> get cguAccepted => _cguAccepted;
  List<File> get capturedPhotos => _capturedPhotos;

  Map<String, dynamic> get formData => _formData;

  TextEditingController getController(String key) {
    if (!_controllers.containsKey(key)) {
      _controllers[key] = TextEditingController();
    }
    return _controllers[key]!;
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void goToStep(int stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      _currentStep = stepIndex;
      notifyListeners();
    }
  }

  void nextStep() {
    if (_currentStep < steps.length - 1) {
      _currentStep++;
      notifyListeners();
    }
  }

  void previousStep() {
    if (_currentStep > 0) {
      _currentStep--;
      notifyListeners();
    }
  }

  // Form data management
  void updateFormField(String key, String value) {
    _formData[key] = value;
    notifyListeners();
  }

  String getFormFieldValue(String key) {
    return _formData[key]?.toString() ?? '';
  }

  // GPS methods
  void setGpsEnabled(bool enabled) {
    _gpsEnabled = enabled;
    notifyListeners();
  }

  Future<bool> requestGpsPermission() async {
    _setLoading(true);
    try {
      final granted = await _service.requestLocationPermission();
      setGpsEnabled(granted);
      return granted;
    } catch (e) {
      _setError('Erreur lors de la demande de permission GPS: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Notifications methods
  void toggleNotification(String notification) {
    if (_selectedNotifications.contains(notification)) {
      _selectedNotifications.remove(notification);
    } else {
      _selectedNotifications.add(notification);
    }
    notifyListeners();
  }

  // Theme and language methods
  void setTheme(String theme) {
    _selectedTheme = theme;
    notifyListeners();
  }

  void setLanguage(String language) {
    _selectedLanguage = language;
    notifyListeners();
  }

  // CGU methods
  void setCguAccepted(int index, bool accepted) {
    if (index >= 0 && index < _cguAccepted.length) {
      _cguAccepted[index] = accepted;
      notifyListeners();
    }
  }

  bool get allCguAccepted => _cguAccepted.every((accepted) => accepted);

  // Photo methods
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

  // Validation methods
  bool isStepValid(int stepIndex) {
    final step = steps[stepIndex];

    switch (step.stepType) {
      case DriverStepType.personalInfo:
        return _validatePersonalInfo();
      case DriverStepType.vehicleInfo:
        return _validateVehicleInfo();
      case DriverStepType.legal:
        return allCguAccepted;
      default:
        return true;
    }
  }

  bool _validatePersonalInfo() {
    final name = getController('name').text;
    final email = getController('email').text;
    return name.isNotEmpty && email.isNotEmpty;
  }

  bool _validateVehicleInfo() {
    final marque = getController('marque').text;
    final modele = getController('modele').text;
    final immatriculation = getController('immatriculation').text;
    return marque.isNotEmpty && modele.isNotEmpty && immatriculation.isNotEmpty;
  }

  // Summary data methods
  Map<String, String> getSummaryData() {
    return {
      'Nom': getController('name').text.isNotEmpty
          ? getController('name').text
          : 'Non renseigné',
      'E-mail': getController('email').text.isNotEmpty
          ? getController('email').text
          : 'Non renseigné',
      'Téléphone': getController('phone').text.isNotEmpty
          ? getController('phone').text
          : 'Non renseigné',
      'Marque': getController('marque').text.isNotEmpty
          ? getController('marque').text
          : 'Non renseigné',
      'Modèle': getController('modele').text.isNotEmpty
          ? getController('modele').text
          : 'Non renseigné',
      'Immatriculation': getController('immatriculation').text.isNotEmpty
          ? getController('immatriculation').text
          : 'Non renseigné',
      'Nombre de places': getController('places').text.isNotEmpty
          ? getController('places').text
          : 'Non renseigné',
      'Type de véhicule': getController('typeVehicule').text.isNotEmpty
          ? getController('typeVehicule').text
          : 'Non renseigné',
      'GPS': _gpsEnabled ? 'Activé' : 'Désactivé',
      'Notifications': _selectedNotifications.isNotEmpty
          ? _selectedNotifications.join(', ')
          : 'Aucune',
      'Thème': _selectedTheme == 'clair' ? 'Clair' : 'Sombre',
      'Langue': _selectedLanguage == 'fr' ? 'Français' : 'Anglais',
    };
  }

  // Completion method
  Future<void> completeOnboarding() async {
    _setLoading(true);
    try {
      final data = {
        'personal_info': {
          'name': getController('name').text,
          'email': getController('email').text,
          'phone': getController('phone').text,
        },
        'vehicle_info': {
          'marque': getController('marque').text,
          'modele': getController('modele').text,
          'immatriculation': getController('immatriculation').text,
          'places': getController('places').text,
          'type': getController('typeVehicule').text,
        },
        'preferences': {
          'gps_enabled': _gpsEnabled,
          'notifications': _selectedNotifications,
          'theme': _selectedTheme,
          'language': _selectedLanguage,
        },
        'cgu_accepted': allCguAccepted,
      };

      await _service.completeDriverOnboarding(data);
    } catch (e) {
      _setError('Erreur lors de la finalisation: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  TextEditingController get nameController => getController('name');
  TextEditingController get emailController => getController('email');
  TextEditingController get phoneController => getController('phone');
  TextEditingController get marqueController => getController('marque');
  TextEditingController get modeleController => getController('modele');
  TextEditingController get immatriculationController =>
      getController('immatriculation');
  TextEditingController get placesController => getController('places');
  TextEditingController get typeVehiculeController =>
      getController('typeVehicule');

  // GPS permission handler
  Future<void> handleGpsPermission(BuildContext context) async {
    final granted = await ButtonsWidget.handleGpsPermission(context);
    setGpsEnabled(granted);
    if (granted && context.mounted) {
      SnackbarHelper.showSuccess(
        context,
        'Géolocalisation activée avec succès !',
      );
    }
  }

  // Selfie handler
  Future<void> onSelfieTaken(String? imagePath) async {
    if (imagePath != null) {
      final capturedFile = File(imagePath);
      addCapturedPhoto(capturedFile);

      try {
        final storageService = StorageService();
        await storageService.storePhoto(
          capturedFile,
          StorageService.selfieType,
        );
      } catch (e) {
        _setError('Erreur lors du stockage du selfie: $e');
      }
    }
  }

  // Theme setter
  void setSelectedTheme(String theme) {
    _selectedTheme = theme;
    notifyListeners();
  }

  // Language setter
  void setSelectedLanguage(String language) {
    _selectedLanguage = language;
    notifyListeners();
  }

  // Field value getter for summary
  String getFieldValue(String fieldName) {
    final summaryData = getSummaryData();
    return summaryData[fieldName] ?? 'Non renseigné';
  }

  // Total uploaded photos count
  int getTotalUploadedPhotosCount() {
    try {
      final storageService = StorageService();
      return storageService.getTotalUploadedPhotosCount();
    } catch (e) {
      return 0;
    }
  }

  // CGU and Privacy Policy content
  String getCguContent() {
    final cguStep = steps.firstWhere(
      (step) => step.title.contains('Conditions Générales'),
      orElse: () => steps[12],
    );
    return cguStep.additionalContent?['content'] ?? '';
  }

  String getPrivacyPolicyContent() {
    final privacyStep = steps.firstWhere(
      (step) => step.title.contains('Politique de Confidentialité'),
      orElse: () => steps[13],
    );
    return privacyStep.additionalContent?['content'] ?? '';
  }

  // Identity document handlers
  Future<void> handleIdentityRectoPhotos(List<dynamic> photos) async {
    try {
      final storageService = StorageService();
      await storageService.storePhotos(
        photos,
        StorageService.identityRectoType,
      );
    } catch (e) {
      _setError('Erreur lors du stockage des photos recto: $e');
    }
  }

  Future<void> handleIdentityVersoPhotos(List<dynamic> photos) async {
    try {
      final storageService = StorageService();
      await storageService.storePhotos(
        photos,
        StorageService.identityVersoType,
      );
    } catch (e) {
      _setError('Erreur lors du stockage des photos verso: $e');
    }
  }

  Future<void> handleDrivingLicensePhotos(List<dynamic> photos) async {
    try {
      final storageService = StorageService();
      await storageService.storePhotos(
        photos,
        StorageService.drivingLicenseType,
      );
    } catch (e) {
      _setError('Erreur lors du stockage des photos de permis: $e');
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }
}
