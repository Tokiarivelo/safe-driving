// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get appTitle => 'Safe Driving';

  @override
  String get login => 'Connexion';

  @override
  String get register => 'S\'inscrire';

  @override
  String get email => 'Email';

  @override
  String get password => 'Mot de passe';

  @override
  String get confirmPassword => 'Confirmer le mot de passe';

  @override
  String get forgotPassword => 'Mot de passe oublié ?';

  @override
  String get loginWithGoogle => 'Se connecter avec Google';

  @override
  String get loginWithFacebook => 'Se connecter avec Facebook';

  @override
  String get home => 'Accueil';

  @override
  String get profile => 'Profil';

  @override
  String get settings => 'Paramètres';

  @override
  String get logout => 'Déconnexion';

  @override
  String get safeDriving => 'Safe Driving';

  @override
  String get startTrip => 'Démarrer le voyage';

  @override
  String get endTrip => 'Terminer le voyage';

  @override
  String get speed => 'Vitesse';

  @override
  String get speedLimit => 'Limite de vitesse';

  @override
  String get distance => 'Distance';

  @override
  String get duration => 'Durée';

  @override
  String get invalidEmail => 'Adresse email invalide';

  @override
  String get passwordTooShort =>
      'Le mot de passe doit contenir au moins 8 caractères';

  @override
  String get passwordsDoNotMatch => 'Les mots de passe ne correspondent pas';

  @override
  String get networkError => 'Erreur de connexion réseau';

  @override
  String get cancel => 'Annuler';

  @override
  String get confirm => 'Confirmer';

  @override
  String get save => 'Enregistrer';

  @override
  String get loading => 'Chargement...';

  @override
  String get welcome => 'Bienvenue';

  @override
  String get language => 'Langue';

  @override
  String get authForgotPasswordTitle => '🔒 Mot de passe oublié ?';

  @override
  String get authForgotPasswordSubtitle =>
      'Pas de panique, ça arrive à tout le monde. Entrez votre adresse e-mail dans le formulaire et nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.';

  @override
  String get authRegisterTitle => '🚀 Prêt à rejoindre Safe Driving ?';

  @override
  String get authRegisterSubtitle =>
      'Explorez la ville comme jamais auparavant.';

  @override
  String get authRegisterSubSubtitle =>
      'Créez votre compte et laissez notre assistant intelligent vous guider pour une expérience fluide, rapide et sécurisée.';

  @override
  String get authLoginTitle => '👋 Bienvenue sur Safe Driving';

  @override
  String get authLoginSubtitle => 'Voyagez l\'esprit léger.';

  @override
  String get authLoginSubSubtitle =>
      'Connectez-vous pour réserver votre transport en un clin d\'œil et suivre votre course en temps réel.';

  @override
  String get emailOrUsername => 'Email ou nom d\'utilisateur';

  @override
  String get firstName => 'Prénom';

  @override
  String get lastName => 'Nom de famille';

  @override
  String get orContinueWith => '- ou continuer avec -';

  @override
  String get orSignUpWith => '- ou s\'inscrire avec -';

  @override
  String get backToLogin => 'Retour à la connexion';

  @override
  String get resetPassword => 'Réinitialiser le mot de passe';

  @override
  String get signIn => 'Se connecter';

  @override
  String get signUp => 'S\'inscrire';

  @override
  String get noAccountYet => 'Pas encore de compte ? ';

  @override
  String get alreadyHaveAccount => 'Vous avez déjà un compte ? ';

  @override
  String get registerAction => 'S\'inscrire';

  @override
  String get loginAction => 'Se connecter';

  @override
  String get pleaseEnterEmail => 'Veuillez saisir votre adresse email';

  @override
  String get pleaseEnterValidEmail =>
      'Veuillez saisir une adresse email valide';

  @override
  String get pleaseEnterEmailOrUsername =>
      'Veuillez saisir votre email ou nom d\'utilisateur';

  @override
  String get pleaseEnterPassword => 'Veuillez saisir votre mot de passe';

  @override
  String get pleaseEnterFirstName => 'Veuillez saisir votre prénom';

  @override
  String get pleaseEnterLastName => 'Veuillez saisir votre nom de famille';

  @override
  String get passwordMinLength =>
      'Le mot de passe doit contenir au moins 8 caractères';

  @override
  String get pleaseConfirmPassword => 'Veuillez confirmer votre mot de passe';

  @override
  String get passwordsDoNotMatchError =>
      'Les mots de passe ne correspondent pas';
}
