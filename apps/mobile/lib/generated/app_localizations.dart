import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_fr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'generated/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('fr'),
  ];

  /// Titre de l'application affiché dans la barre d'applications
  ///
  /// In en, this message translates to:
  /// **'Safe Driving'**
  String get appTitle;

  /// Bouton ou titre de connexion
  ///
  /// In en, this message translates to:
  /// **'Login'**
  String get login;

  /// Bouton ou titre d'inscription
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get register;

  /// Libellé du champ email
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// Libellé du champ mot de passe
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get password;

  /// Libellé du champ de confirmation de mot de passe
  ///
  /// In en, this message translates to:
  /// **'Confirm Password'**
  String get confirmPassword;

  /// Lien pour récupérer le mot de passe oublié
  ///
  /// In en, this message translates to:
  /// **'Forgot Password?'**
  String get forgotPassword;

  /// Bouton de connexion avec Google
  ///
  /// In en, this message translates to:
  /// **'Login with Google'**
  String get loginWithGoogle;

  /// Bouton de connexion avec Facebook
  ///
  /// In en, this message translates to:
  /// **'Login with Facebook'**
  String get loginWithFacebook;

  /// Onglet ou page d'accueil
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get home;

  /// Page de profil utilisateur
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profile;

  /// Page des paramètres
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// Bouton de déconnexion
  ///
  /// In en, this message translates to:
  /// **'Logout'**
  String get logout;

  /// Titre principal de l'application
  ///
  /// In en, this message translates to:
  /// **'Safe Driving'**
  String get safeDriving;

  /// Bouton pour démarrer un voyage
  ///
  /// In en, this message translates to:
  /// **'Start Trip'**
  String get startTrip;

  /// Bouton pour terminer un voyage
  ///
  /// In en, this message translates to:
  /// **'End Trip'**
  String get endTrip;

  /// Indicateur de vitesse
  ///
  /// In en, this message translates to:
  /// **'Speed'**
  String get speed;

  /// Limite de vitesse
  ///
  /// In en, this message translates to:
  /// **'Speed Limit'**
  String get speedLimit;

  /// Distance parcourue
  ///
  /// In en, this message translates to:
  /// **'Distance'**
  String get distance;

  /// Durée du voyage
  ///
  /// In en, this message translates to:
  /// **'Duration'**
  String get duration;

  /// Message d'erreur pour email invalide
  ///
  /// In en, this message translates to:
  /// **'Invalid email address'**
  String get invalidEmail;

  /// Message d'erreur pour mot de passe trop court
  ///
  /// In en, this message translates to:
  /// **'Password must be at least 8 characters'**
  String get passwordTooShort;

  /// Message d'erreur quand les mots de passe ne correspondent pas
  ///
  /// In en, this message translates to:
  /// **'Passwords do not match'**
  String get passwordsDoNotMatch;

  /// Message d'erreur de connexion réseau
  ///
  /// In en, this message translates to:
  /// **'Network connection error'**
  String get networkError;

  /// Bouton d'annulation
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// Bouton de confirmation
  ///
  /// In en, this message translates to:
  /// **'Confirm'**
  String get confirm;

  /// Bouton de sauvegarde
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get save;

  /// Indicateur de chargement
  ///
  /// In en, this message translates to:
  /// **'Loading...'**
  String get loading;

  /// Message de bienvenue
  ///
  /// In en, this message translates to:
  /// **'Welcome'**
  String get welcome;

  /// Sélecteur de langue
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// Titre de la page mot de passe oublié
  ///
  /// In en, this message translates to:
  /// **'🔒 Forgot Password?'**
  String get authForgotPasswordTitle;

  /// Sous-titre de la page mot de passe oublié
  ///
  /// In en, this message translates to:
  /// **'Don\'t panic, it happens to everyone. Enter your email address in the form and we\'ll send you a link to reset your password securely.'**
  String get authForgotPasswordSubtitle;

  /// Titre de la page d'inscription
  ///
  /// In en, this message translates to:
  /// **'🚀 Ready to join Safe Driving?'**
  String get authRegisterTitle;

  /// Sous-titre de la page d'inscription
  ///
  /// In en, this message translates to:
  /// **'Explore the city like never before.'**
  String get authRegisterSubtitle;

  /// Sous-sous-titre de la page d'inscription
  ///
  /// In en, this message translates to:
  /// **'Create your account and let our intelligent assistant guide you for a smooth, fast, and secure experience.'**
  String get authRegisterSubSubtitle;

  /// Titre de la page de connexion
  ///
  /// In en, this message translates to:
  /// **'👋 Welcome to Safe Driving'**
  String get authLoginTitle;

  /// Sous-titre de la page de connexion
  ///
  /// In en, this message translates to:
  /// **'Travel with peace of mind.'**
  String get authLoginSubtitle;

  /// Sous-sous-titre de la page de connexion
  ///
  /// In en, this message translates to:
  /// **'Sign in to book your transport in a flash and track your ride in real time.'**
  String get authLoginSubSubtitle;

  /// Champ email ou nom d'utilisateur
  ///
  /// In en, this message translates to:
  /// **'Email or Username'**
  String get emailOrUsername;

  /// Champ prénom
  ///
  /// In en, this message translates to:
  /// **'First Name'**
  String get firstName;

  /// Champ nom de famille
  ///
  /// In en, this message translates to:
  /// **'Last Name'**
  String get lastName;

  /// Séparateur pour les options de connexion sociale
  ///
  /// In en, this message translates to:
  /// **'- or continue with -'**
  String get orContinueWith;

  /// Séparateur pour les options d'inscription sociale
  ///
  /// In en, this message translates to:
  /// **'- or sign up with -'**
  String get orSignUpWith;

  /// Lien retour vers la page de connexion
  ///
  /// In en, this message translates to:
  /// **'Back to login'**
  String get backToLogin;

  /// Bouton réinitialiser le mot de passe
  ///
  /// In en, this message translates to:
  /// **'Reset Password'**
  String get resetPassword;

  /// Bouton de connexion
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get signIn;

  /// Bouton d'inscription
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get signUp;

  /// Texte pour aller vers l'inscription
  ///
  /// In en, this message translates to:
  /// **'No account yet? '**
  String get noAccountYet;

  /// Texte pour aller vers la connexion
  ///
  /// In en, this message translates to:
  /// **'Already have an account? '**
  String get alreadyHaveAccount;

  /// Lien vers l'inscription
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get registerAction;

  /// Lien vers la connexion
  ///
  /// In en, this message translates to:
  /// **'Login'**
  String get loginAction;

  /// Erreur email requis
  ///
  /// In en, this message translates to:
  /// **'Please enter your email address'**
  String get pleaseEnterEmail;

  /// Erreur email invalide
  ///
  /// In en, this message translates to:
  /// **'Please enter a valid email address'**
  String get pleaseEnterValidEmail;

  /// Erreur email/nom d'utilisateur requis
  ///
  /// In en, this message translates to:
  /// **'Please enter your email or username'**
  String get pleaseEnterEmailOrUsername;

  /// Erreur mot de passe requis
  ///
  /// In en, this message translates to:
  /// **'Please enter your password'**
  String get pleaseEnterPassword;

  /// Erreur prénom requis
  ///
  /// In en, this message translates to:
  /// **'Please enter your first name'**
  String get pleaseEnterFirstName;

  /// Erreur nom de famille requis
  ///
  /// In en, this message translates to:
  /// **'Please enter your last name'**
  String get pleaseEnterLastName;

  /// Erreur longueur mot de passe
  ///
  /// In en, this message translates to:
  /// **'Password must be at least 8 characters long'**
  String get passwordMinLength;

  /// Erreur confirmation mot de passe requise
  ///
  /// In en, this message translates to:
  /// **'Please confirm your password'**
  String get pleaseConfirmPassword;

  /// Erreur mots de passe différents
  ///
  /// In en, this message translates to:
  /// **'Passwords do not match'**
  String get passwordsDoNotMatchError;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en', 'fr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'fr':
      return AppLocalizationsFr();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
