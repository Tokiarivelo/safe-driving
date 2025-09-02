class DriverConstants {
  static const String moduleName = 'driver_onboarding';

  static const int totalSteps = 12;
  static const int minPhotosRequired = 2;
  static const int maxPhotosAllowed = 5;

  static const String personalInfoStep = 'personal_info';
  static const String vehicleInfoStep = 'vehicle_info';
  static const String documentsStep = 'documents';
  static const String selfieStep = 'selfie';
  static const String permissionsStep = 'permissions';
  static const String preferencesStep = 'preferences';
  static const String legalStep = 'legal';

  static const List<String> requiredDocumentTypes = [
    'permis_recto',
    'permis_verso',
    'carte_grise_recto',
    'carte_grise_verso',
  ];

  static const List<String> supportedImageFormats = ['jpg', 'jpeg', 'png'];

  static const Duration uploadTimeout = Duration(minutes: 5);
  static const Duration cameraTimeout = Duration(minutes: 2);

  static const Map<String, String> validationMessages = {
    'nameRequired': 'Le nom est obligatoire',
    'emailRequired': 'L\'email est obligatoire',
    'emailInvalid': 'Format d\'email invalide',
    'phoneRequired': 'Le numéro de téléphone est obligatoire',
    'phoneInvalid': 'Format de téléphone invalide',
    'vehicleMarqueRequired': 'La marque du véhicule est obligatoire',
    'vehicleModeleRequired': 'Le modèle du véhicule est obligatoire',
    'vehicleImmatriculationRequired': 'L\'immatriculation est obligatoire',
    'vehicleImmatriculationInvalid': 'Format d\'immatriculation invalide',
    'vehicleCouleurRequired': 'La couleur du véhicule est obligatoire',
    'vehicleAnneeRequired': 'L\'année du véhicule est obligatoire',
    'vehicleAnneeInvalid': 'Année du véhicule invalide',
    'photosRequired': 'Au moins $minPhotosRequired photos sont requises',
    'photosLimit': 'Maximum $maxPhotosAllowed photos autorisées',
    'cguRequired': 'L\'acceptation des CGU est obligatoire',
  };

  static const Map<String, String> errorMessages = {
    'uploadFailed': 'Échec du téléchargement des documents',
    'cameraFailed': 'Erreur lors de l\'accès à la caméra',
    'permissionDenied': 'Permission refusée',
    'networkError': 'Erreur de connexion réseau',
    'serverError': 'Erreur serveur',
    'validationFailed': 'Erreur de validation des données',
    'saveDataFailed': 'Erreur lors de la sauvegarde',
  };
}
