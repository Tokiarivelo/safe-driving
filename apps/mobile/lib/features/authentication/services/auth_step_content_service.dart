import '../models/auth_step_content_model.dart';

class AuthStepContentService {
  static final Map<String, AuthStepContent> stepContents = {
    'forgotPassword': AuthStepContent(
      title: "🔒 Mot de passe oublié ?",
      subtitle:
          "Saisissez votre adresse email et nous vous enverrons un code de réinitialisation.",
      subSubtitle: "",
      actionButtonText: "Envoyer le code",
      socialText: "",
      navigationPrefix: "",
      navigationLink: "",
      backToLoginText: "Retour à la connexion",
      forgotPasswordText: "",
      additionalContent: {
        "inputs": [
          {"hint": "Adresse email", "icon": "email_outlined", "type": "email"},
        ],
      },
    ),
    'resetPassword': AuthStepContent(
      title: "🔐 Réinitialiser le mot de passe",
      subtitle:
          "Choisissez un nouveau mot de passe sécurisé pour votre compte. Assurez-vous qu'il contient au moins 8 caractères.",
      subSubtitle: "",
      actionButtonText: "Réinitialiser le mot de passe",
      socialText: "",
      navigationPrefix: "",
      navigationLink: "",
      backToLoginText: "Retour à la connexion",
      forgotPasswordText: "",
      additionalContent: {
        "inputs": [
          {
            "hint": "Nouveau mot de passe",
            "icon": "lock_outlined",
            "type": "password",
          },
          {
            "hint": "Confirmer le mot de passe",
            "icon": "lock_outlined",
            "type": "confirmPassword",
          },
        ],
      },
    ),
    'register': AuthStepContent(
      title: "🚀 Prêt à rejoindre Safe Driving ?",
      subtitle: "Explorez la ville comme jamais auparavant.",
      subSubtitle:
          "Créez votre compte et laissez notre assistant intelligent vous guider pour une expérience fluide, rapide et sécurisée.",
      actionButtonText: "S'inscrire",
      socialText: "- ou s'inscrire avec -",
      navigationPrefix: "Vous avez déjà un compte ? ",
      navigationLink: "Se connecter",
      backToLoginText: "",
      forgotPasswordText: "",
      additionalContent: {
        "inputs": [
          {"hint": "Nom", "icon": "badge_outlined", "type": "text"},
          {"hint": "Prénom", "icon": "badge_outlined", "type": "text"},
          {"hint": "Email", "icon": "email_outlined", "type": "email"},
          {"hint": "Mot de passe", "icon": "lock_outlined", "type": "password"},
          {
            "hint": "Confirmer le mot de passe",
            "icon": "lock_outlined",
            "type": "confirmPassword",
          },
        ],
      },
    ),
    'login': AuthStepContent(
      title: "👋 Bienvenue sur Safe Driving",
      subtitle: "Voyagez l'esprit léger.",
      subSubtitle:
          "Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en temps réel.",
      actionButtonText: "Se connecter",
      socialText: "- ou continuer avec -",
      navigationPrefix: "Pas encore de compte ? ",
      navigationLink: "S'inscrire",
      backToLoginText: "",
      forgotPasswordText: "Mot de passe oublié ?",
      additionalContent: {
        "inputs": [
          {
            "hint": "Email ou Nom d'utilisateur",
            "icon": "person_outline",
            "type": "email",
          },
          {"hint": "Mot de passe", "icon": "lock_outlined", "type": "password"},
        ],
      },
    ),
  };
}
