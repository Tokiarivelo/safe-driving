import 'driver_onboarding_step_model.dart';

class DriverOnboardingData {
  static const int totalSteps = 13;

  static dynamic getCguContent() {
    return cguContents[0][0]['additionalContent']['content'];
  }

  static dynamic getCguTitle() {
    return cguContents[0][0]['title'];
  }

  static dynamic getPrivacyPolicyContent() {
    return cguContents[0][1]['additionalContent']['content'];
  }

  static dynamic getPrivacyPolicyTitle() {
    return cguContents[0][1]['title'];
  }

  static dynamic cguContents = [
    [
      {
        "title": 'Conditions Générales d\'Utilisation (CGU) de Safe Driving',
        "subtitle": "Veuillez lire attentivement nos conditions d'utilisation.",
        "stepType": DriverStepType.legal,
        "additionalContent": {
          "content":
              "## 1. Objet\n"
              "Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités et conditions d'accès et d'utilisation de la plateforme Safe Driving (ci-après « l'Application »), accessible via site web et application mobile.\n\n"
              "## 2. Acceptation des CGU\n"
              "L'utilisateur (ci-après « l'Utilisateur ») déclare avoir pris connaissance et accepté sans réserve les présentes CGU en cochant la case dédiée lors de son inscription.\n\n"
              "## 3. Définitions\n"
              "* **Application**: service Safe Driving, application mobile et interface web.\n"
              "* **Utilisateur**: toute personne physique ou morale utilisant l'Application.\n"
              "* **Chauffeur**: Utilisateur proposant des services de transport.\n"
              "* **Passager**: Utilisateur sollicitant un transport.\n\n"
              "## 4. Accès et inscription\n"
              "1. L'accès à l'Application est gratuit pour les Passagers.\n"
              "2. Les Chauffeurs doivent fournir des informations exactes et à jour (identité, permis, documents du véhicule).\n"
              "3. Safe Driving se réserve le droit de suspendre ou supprimer tout compte si les informations sont incomplètes ou frauduleuses.\n\n"
              "## 5. Services proposés\n"
              "* Mise en relation instantanée entre Chauffeurs et Passagers\n"
              "* Système de géolocalisation pour indication de position\n"
              "* Interface de paiement sécurisé\n"
              "* Support client et assistance IA Gemini\n\n"
              "## 6. Obligations de l'Utilisateur\n"
              "* Respecter la législation en vigueur et les règles de sécurité\n"
              "* Ne pas publier de contenu illicite ou offensant\n"
              "* Protéger ses identifiants ; toute action sera réputée émaner de l'Utilisateur\n"
              "* Pour les Chauffeurs : maintenir une assurance et un entretien du véhicule en règle\n\n"
              "## 7. Données personnelles\n"
              "Les données personnelles collectées sont traitées conformément à la Politique de Confidentialité de Safe Driving. L'Utilisateur dispose de droits d'accès, de rectification et de suppression de ses données.\n\n"
              "## 8. Propriété intellectuelle\n"
              "Tous les contenus, logos, graphismes et codes sources de l'Application sont la propriété exclusive de Safe Driving. Toute reproduction partielle ou totale est strictement interdite.\n\n"
              "## 9. Responsabilité\n"
              "* Safe Driving n'est pas responsable des dommages résultant d'une mauvaise utilisation de l'Application\n"
              "* Safe Driving ne garantit pas la disponibilité permanente du service\n"
              "* La tarification finale des courses peut varier selon le trafic et les conditions météorologiques\n\n"
              "## 10. Force majeure\n"
              "Safe Driving ne pourra être tenu responsable en cas de force majeure rendant impossible l'exécution de ses obligations.\n\n"
              "## 11. Modification des CGU\n"
              "Safe Driving se réserve le droit de modifier à tout moment les présentes CGU. Les Utilisateurs seront informés de ces modifications via l'Application et devront accepter les nouvelles CGU pour continuer d'utiliser le service.\n\n"
              "## 12. Durée et résiliation\n"
              "Les présentes CGU sont valables pour toute la durée d'utilisation de l'Application. L'Utilisateur peut résilier son compte à tout moment via les paramètres de l'Application.\n\n"
              "## 13. Loi applicable et juridiction\n"
              "Les présentes CGU sont soumises au droit malgache. En cas de litige, compétence expresse est attribuée aux tribunaux de Antananarivo.\n\n"
              "## 14. Contact\n"
              "Pour toute question relative aux CGU ou au fonctionnement de l'Application :\n"
              "* Email : support@safedriving.mg\n"
              "* Téléphone : +261 XX XX XX XX\n\n"
              "**Date de dernière mise à jour : 30 juin 2025**",
        },
        "buttonTitles": ["J'accepte"],
      },
      {
        "title": 'Politique de Confidentialité',
        "subtitle":
            "Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données.",
        "stepType": DriverStepType.legal,
        "additionalContent": {
          "content":
              "Dernière mise à jour : 3 juillet 2025\n\n"
              "Chez Safe Driving, la protection de vos données personnelles est une priorité. Cette politique de confidentialité a pour objectif de vous informer de manière claire sur la façon dont vos données sont collectées, utilisées, stockées et protégées lorsque vous utilisez notre application.\n\n"
              "## 1. Données collectées\n"
              "**Lors de l'inscription :**\n"
              "* Nom complet\n* Adresse e-mail\n* Numéro de téléphone\n* Rôle (chauffeur ou passager)\n* Mot de passe (crypté)\n\n"
              "**Pour les chauffeurs :**\n"
              "* Pièce d'identité et permis de conduire\n* Informations et documents du véhicule\n* Selfie de vérification\n* Géolocalisation (si activée)\n* Préférences et notifications\n\n"
              "**Pendant l'utilisation :**\n"
              "* Historique des trajets\n* Position GPS en temps réel (si activée)\n* Interactions avec l'application (clics, actions, préférences)\n* Avis, commentaires et évaluations\n\n"
              "## 2. Utilisation des données\n"
              "* Créer et gérer votre compte utilisateur\n"
              "* Vérifier votre identité et celle des chauffeurs\n"
              "* Assurer le bon fonctionnement de l'application\n"
              "* Proposer des trajets pertinents (selon la position)\n"
              "* Améliorer l'expérience utilisateur (recommandations, support)\n"
              "* Vous envoyer des notifications importantes (trajets, sécurité, etc.)\n\n"
              "## 3. Partage des données\n"
              "Nous ne vendons jamais vos données à des tiers. Certaines informations peuvent être partagées uniquement :\n"
              "* Avec les passagers pour identifier leur chauffeur (nom, photo, modèle de véhicule, plaque d'immatriculation)\n"
              "* Avec des services partenaires pour assurer les paiements ou vérifier l'identité\n"
              "* Avec les autorités compétentes, uniquement en cas d'obligation légale\n\n"
              "## 4. Stockage et sécurité\n"
              "* Vos données sont hébergées sur des serveurs sécurisés localisés en France ou dans l'UE\n"
              "* Les mots de passe sont chiffrés\n"
              "* Les documents sensibles sont protégés et accessibles uniquement par des systèmes internes sécurisés\n\n"
              "## 5. Géolocalisation\n"
              "L'activation du GPS est facultative, mais nécessaire pour l'utilisation des fonctionnalités de transport en temps réel. Vous pouvez désactiver la géolocalisation à tout moment depuis les paramètres de votre téléphone.\n\n"
              "## 6. Cookies et trackers\n"
              "Nous utilisons uniquement des cookies techniques indispensables au bon fonctionnement de la plateforme. Aucune donnée de navigation à des fins publicitaires n'est collectée.\n\n"
              "## 7. Durée de conservation\n"
              "* Vos données sont conservées tant que votre compte est actif\n"
              "* Vous pouvez demander la suppression de vos données à tout moment\n"
              "* Les documents légaux (chauffeurs) sont conservés pendant 5 ans conformément à la législation applicable\n\n"
              "## 8. Vos droits\n"
              "Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit de :\n"
              "* Accéder à vos données personnelles\n"
              "* Corriger ou mettre à jour vos données\n"
              "* Supprimer votre compte et vos données\n"
              "* Retirer votre consentement\n"
              "* Déposer une plainte auprès de la CNIL\n\n"
              "Pour exercer vos droits, contactez-nous à : **privacy@safedriving.app**\n\n"
              "## 9. Modifications\n"
              "Nous pouvons modifier cette politique à tout moment. Vous serez notifié en cas de changements majeurs. La version la plus récente sera toujours accessible dans l'application.\n\n"
              "**Merci pour votre confiance**\n"
              "Votre sécurité et votre confidentialité sont essentielles. Nous nous engageons à protéger vos données avec transparence, responsabilité et respect.",
        },
        "buttonTitles": ["J'accepte"],
      },
    ],
  ];
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
        stepNumber: 12,
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
        stepNumber: 13,
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
