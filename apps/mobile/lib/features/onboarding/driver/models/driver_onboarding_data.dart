import 'driver_onboarding_step_model.dart';

class DriverOnboardingData {
  static const int totalSteps = 12;

  static List<DriverOnboardingStepModel> getDriverSteps() {
    return [
      DriverOnboardingStepModel(
        stepNumber: 2,
        title: 'Bienvenue chez Safe Driving !',
        subtitle:
            "Merci d'avoir choisi Safe Driving. Commençons par configurer votre profil pour que vous puissiez prendre la route en toute sérénité.",
        stepType: DriverStepType.welcome,
        buttonTitles: ["Plus tard", "Démarrer"],
      ),

      DriverOnboardingStepModel(
        stepNumber: 3,
        title: 'Quelques détails sur vous',
        subtitle:
            "Renseignez vos coordonnées pour que nous puissions vous contacter et valider votre identité",
        stepType: DriverStepType.personalInfo,
        additionalContent: {
          "form": {
            "labelTextName": "Nom complet",
            "placeholderName": "John Doe",
            "labelTextEmail": "E-mail",
            "placeholderEmail": "example@email.com",
            "labelTextPhone": "Téléphone",
            "placeholderPhone": "+261...",
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 3: Identity Documents
      DriverOnboardingStepModel(
        stepNumber: 4,
        title: 'Vérification d\'identité',
        subtitle:
            "Téléchargez votre permis de conduire et votre carte d'identité pour vous assurer une inscription rapide et fiable.",
        stepType: DriverStepType.documents,
        additionalContent: {
          "carteIdentité": {
            "rectoID": {
              "title": "Carte d'identité - Recto",
              "textCenter":
                  "Téléchargez la face avant de votre carte d'identité",
              "bouton": "Ajouter un fichier",
            },
            "versoID": {
              "title": "Carte d'identité - Verso",
              "textCenter":
                  "Téléchargez la face arrière de votre carte d'identité",
              "bouton": "Ajouter un fichier",
            },
            "permisConduire": {
              "title": "Permis de conduire",
              "textCenter": "Téléchargez votre permis de conduire valide",
              "bouton": "Ajouter un fichier",
            },
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 4: Vehicle Information
      DriverOnboardingStepModel(
        stepNumber: 5,
        title: 'Dites-nous en plus sur votre véhicule',
        subtitle:
            "Pour mieux vous identifier et garantir la sécurité de vos passagers, renseignez les caractéristiques de votre voiture.",
        stepType: DriverStepType.vehicleInfo,
        additionalContent: {
          "form": {
            "labelMarque": "Marque",
            "placeholderMarque": "ex: Peugeot",
            "labelModele": "Modèle",
            "placeholderModele": "ex: 404",
            "labelImmatriculation": "Numéro d'immatriculation",
            "placeholderImmatriculation": "ex: AB-123-CD",
            "labelPlaces": "Nombre de places",
            "placeholderPlaces": "ex: 4",
            "labelTypeVehicule": "Type de véhicule",
            "placeholderTypeVehicule": "ex: Voiture",
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 5: Vehicle Documents
      DriverOnboardingStepModel(
        stepNumber: 6,
        title: 'À propos de votre véhicule',
        subtitle:
            "Ajoutez votre certificat d'immatriculation, votre attestation d'assurance et quelques photos du véhicule.",
        stepType: DriverStepType.documents,
        additionalContent: {
          "documents": {
            "certificatImmatriculation": {
              "uploadZone": {
                "textCenter":
                    "Téléchargez votre certificat d'immatriculation (carte grise)",
                "bouton": "Ajouter un fichier",
              },
              "ajoutPhoto": "Ajouter plus de photos",
            },
            "attestationAssurance": {
              "uploadZone": {
                "textCenter":
                    "Téléchargez votre attestation d'assurance valide",
                "bouton": "Ajouter un fichier",
              },
              "ajoutPhoto": "Ajouter plus de photos",
            },
            "photosVehicule": {
              "uploadZone": {
                "textCenter":
                    "Ajoutez des photos de votre véhicule (extérieur et intérieur)",
                "bouton": "Ajouter un fichier",
              },
              "ajoutPhoto": "Ajouter plus de photos",
            },
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 6: Selfie
      DriverOnboardingStepModel(
        stepNumber: 7,
        title: 'Confirmez votre identité en photo',
        subtitle:
            "Prenez un selfie en temps réel pour finaliser la vérification et renforcer la sécurité de la communauté.",
        stepType: DriverStepType.selfie,
        additionalContent: {
          "selfie": {
            "title": "Selfie de vérification",
            "description":
                "Positionnez-vous face à la caméra et assurez-vous que votre visage soit bien visible.",
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 7: GPS Permission
      DriverOnboardingStepModel(
        stepNumber: 8,
        title: 'Partagez votre position',
        subtitle:
            "Autorisez la géolocalisation pour recevoir les demandes de course à proximité.",
        stepType: DriverStepType.gps,
        buttonTitles: ["Plus tard", "Activer"],
      ),

      // Step 8: Notifications
      DriverOnboardingStepModel(
        stepNumber: 9,
        title: 'Restez informé',
        subtitle:
            "Choisissez comment vous souhaitez être alerté(e) des nouvelles missions : push, SMS ou e-mail.",
        stepType: DriverStepType.notifications,
        additionalContent: {
          "checkboxOptions": ["SMS", "Push notification mobile", "E-mail"],
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 9: Preferences
      DriverOnboardingStepModel(
        stepNumber: 10,
        title: 'Personnalisez votre expérience',
        subtitle:
            "Réglez votre thème (clair/sombre) et choisissez la langue de l'application.",
        stepType: DriverStepType.preferences,
        additionalContent: {
          "theme": {
            "options": [
              {"label": "Clair", "value": "clair"},
              {"label": "Sombre", "value": "sombre"},
            ],
          },
          "langue": {
            "options": [
              {"label": "Français", "value": "fr"},
              {"label": "Anglais", "value": "en"},
            ],
          },
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 10: Legal
      DriverOnboardingStepModel(
        stepNumber: 11,
        title: 'Un dernier point avant de démarrer',
        subtitle:
            "Merci de lire et d'accepter nos Conditions Générales d'Utilisation et notre Politique de Confidentialité.",
        stepType: DriverStepType.legal,
        additionalContent: {
          "checkboxOptions": [
            "J'accepte les CGU",
            "J'accepte la Politique de Confidentialité",
          ],
        },
        buttonTitles: ["Plus tard", "Valider"],
      ),

      // Step 11: Summary
      DriverOnboardingStepModel(
        stepNumber: 11,
        title: 'Tout est prêt !',
        subtitle:
            "Vérifiez vos informations et vos choix avant de valider. Vous pourrez toujours revenir modifier vos préférences plus tard.",
        stepType: DriverStepType.summary,
        additionalContent: {
          "resume": [
            {
              "titre": "Infos personnelles",
              "elements": ["Nom", "E-mail", "Téléphone", "Photos uploadées"],
            },
            {
              "titre": "Véhicule",
              "elements": [
                "Type",
                "Marque",
                "Modèle",
                "Immatriculation",
                "Nombre de places",
                "Photos uploadées",
              ],
            },
            {
              "titre": "GPS & Notifications",
              "elements": ["GPS", "Notifications"],
            },
            {
              "titre": "Préférences",
              "elements": ["Thème", "Langue"],
            },
          ],
        },
        buttonTitles: ["Valider"],
      ),

      // Step 12: Completion - Final step of onboarding
      DriverOnboardingStepModel(
        stepNumber: 12,
        title: '🎉 Bienvenue à bord, ',
        subtitle:
            "Votre profil a bien été complété et validé. Vous êtes maintenant prêt(e) à utiliser Safe Driving en tant que chauffeur.",
        stepType: DriverStepType.completion,
        additionalContent: {
          "subsubtitle": "Votre QR code personnel a été généré :",
          "instructions":
              "Il permettra à vos passagers de vous identifier rapidement et en toute sécurité. Vous pouvez à tout moment consulter ou télécharger ce QR code dans le menu Mon compte > Mon QR code.",
          "messageConfiance":
              "Merci de faire partie de la communauté Safe Driving. Nous vous souhaitons de bons trajets en toute sécurité !",
        },
        buttonTitles: ["C'est parti"],
      ),
    ];
  }

  static DriverOnboardingStepModel getStep(int index) {
    final steps = getDriverSteps();
    if (index >= 0 && index < steps.length) {
      return steps[index];
    }
    return steps[0];
  }

  static int getStepIndexByType(DriverStepType type) {
    final steps = getDriverSteps();
    for (int i = 0; i < steps.length; i++) {
      if (steps[i].stepType == type) {
        return i;
      }
    }
    return 0;
  }

  static bool isLastStep(int currentStep) {
    return currentStep >= totalSteps - 1;
  }

  static double getProgress(int currentStep) {
    return (currentStep + 1) / totalSteps;
  }
}
