class DocumentTypeMapper {
  static String mapUserDocumentType(String type) {
    switch (type) {
      case 'identity_recto':
      case 'carte_identite_recto':
      case 'carteIdentiteRecto':
        return 'ID_CARD_FRONT';
      case 'identity_verso':
      case 'carte_identite_verso':
      case 'carteIdentiteVerso':
        return 'ID_CARD_BACK';
      case 'driving_license':
      case 'permis_conduire':
      case 'permisConduire':
        return 'DRIVER_LICENSE';
      case 'selfie':
        return 'SELFIE';
      default:
        return type.toUpperCase();
    }
  }

  static String mapVehicleDocumentType(String type) {
    switch (type) {
      case 'certificat_immatriculation':
      case 'certificatImmatriculation':
        return 'REGISTRATION';
      case 'attestation_assurance':
      case 'attestationAssurance':
        return 'INSURANCE';
      default:
        return 'OTHER';
    }
  }

  static bool isVehicleDocumentType(String type) {
    return type == 'certificatImmatriculation' ||
        type == 'certificat_immatriculation' ||
        type == 'attestationAssurance' ||
        type == 'attestation_assurance';
  }

  static bool isVehicleImagesType(String type) {
    return type == 'photosVehicule' || type == 'photos_vehicule';
  }

  static String? defaultNameForDocumentType(String backendType) {
    switch (backendType) {
      case 'ID_CARD_FRONT':
        return "Carte d'identité (Recto)";
      case 'ID_CARD_BACK':
        return "Carte d'identité (Verso)";
      case 'REGISTRATION':
      case 'VEHICLE_REGISTRATION':
        return "Certificat d'immatriculation";
      case 'INSURANCE':
        return "Attestation d'assurance";
      case 'VEHICLE_PHOTO':
        return 'Photo du véhicule';
      default:
        return null;
    }
  }
}
