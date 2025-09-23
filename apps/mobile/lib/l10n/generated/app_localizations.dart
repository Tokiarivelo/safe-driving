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

  /// Titre de l'étape de sélection du rôle
  ///
  /// In en, this message translates to:
  /// **'Role'**
  String get onboardingRole;

  /// Titre de l'étape de bienvenue
  ///
  /// In en, this message translates to:
  /// **'Welcome'**
  String get onboardingWelcome;

  /// Titre de l'étape GPS
  ///
  /// In en, this message translates to:
  /// **'GPS'**
  String get onboardingGps;

  /// Titre de l'étape notifications
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get onboardingNotifications;

  /// Titre de l'étape préférences
  ///
  /// In en, this message translates to:
  /// **'Preferences'**
  String get onboardingPreferences;

  /// Titre de l'étape récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Summary'**
  String get onboardingSummary;

  /// Titre de l'étape de sélection du rôle
  ///
  /// In en, this message translates to:
  /// **'You are…?'**
  String get stepRoleTitle;

  /// Bouton utilisateur
  ///
  /// In en, this message translates to:
  /// **'I am a user'**
  String get stepRoleUser;

  /// Bouton chauffeur
  ///
  /// In en, this message translates to:
  /// **'I am a driver'**
  String get stepRoleDriver;

  /// Titre de bienvenue
  ///
  /// In en, this message translates to:
  /// **'Welcome to Safe Driving!'**
  String get stepWelcomeTitle;

  /// Sous-titre de bienvenue
  ///
  /// In en, this message translates to:
  /// **'Thank you for joining our community! Let us guide you to customize your experience.'**
  String get stepWelcomeSubtitle;

  /// Bouton plus tard bienvenue
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get stepWelcomeLater;

  /// Bouton démarrer
  ///
  /// In en, this message translates to:
  /// **'Get Started'**
  String get stepWelcomeStart;

  /// Titre étape GPS
  ///
  /// In en, this message translates to:
  /// **'Where are you?'**
  String get stepGpsTitle;

  /// Sous-titre étape GPS
  ///
  /// In en, this message translates to:
  /// **'To offer you the closest vehicles, allow access to your location. It\'s quick and secure.'**
  String get stepGpsSubtitle;

  /// Bouton plus tard GPS
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get stepGpsLater;

  /// Bouton activer GPS
  ///
  /// In en, this message translates to:
  /// **'Enable'**
  String get stepGpsEnable;

  /// Titre étape notifications
  ///
  /// In en, this message translates to:
  /// **'Stay informed'**
  String get stepNotificationsTitle;

  /// Sous-titre étape notifications
  ///
  /// In en, this message translates to:
  /// **'Choose to receive real-time alerts about your driver\'s arrival and trip status.'**
  String get stepNotificationsSubtitle;

  /// Bouton plus tard notifications
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get stepNotificationsLater;

  /// Bouton activer notifications
  ///
  /// In en, this message translates to:
  /// **'Enable'**
  String get stepNotificationsEnable;

  /// Titre étape préférences
  ///
  /// In en, this message translates to:
  /// **'Make it your way'**
  String get stepPreferencesTitle;

  /// Sous-titre étape préférences
  ///
  /// In en, this message translates to:
  /// **'Select your favorite transport modes and enable dark theme if you prefer a gentler experience for your eyes.'**
  String get stepPreferencesSubtitle;

  /// Label thème
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get stepPreferencesTheme;

  /// Thème clair
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get stepPreferencesThemeLight;

  /// Thème sombre
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get stepPreferencesThemeDark;

  /// Label type de transport
  ///
  /// In en, this message translates to:
  /// **'Transport type'**
  String get stepPreferencesTransport;

  /// Voiture
  ///
  /// In en, this message translates to:
  /// **'Car'**
  String get stepPreferencesTransportCar;

  /// Moto
  ///
  /// In en, this message translates to:
  /// **'Motorbike'**
  String get stepPreferencesTransportMoto;

  /// TukTuk
  ///
  /// In en, this message translates to:
  /// **'TukTuk'**
  String get stepPreferencesTransportTukTuk;

  /// Vélo
  ///
  /// In en, this message translates to:
  /// **'Bike'**
  String get stepPreferencesTransportBike;

  /// Bouton plus tard préférences
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get stepPreferencesLater;

  /// Bouton valider préférences
  ///
  /// In en, this message translates to:
  /// **'Validate'**
  String get stepPreferencesValidate;

  /// Titre étape récapitulatif
  ///
  /// In en, this message translates to:
  /// **'All set!'**
  String get stepSummaryTitle;

  /// Sous-titre étape récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Here\'s a summary of your choices. You can always modify them later in settings. Ready to get started?'**
  String get stepSummarySubtitle;

  /// Label GPS récapitulatif
  ///
  /// In en, this message translates to:
  /// **'GPS'**
  String get stepSummaryGps;

  /// Label notifications récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get stepSummaryNotifications;

  /// Label thème récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Theme: {theme}'**
  String stepSummaryTheme(String theme);

  /// Label transports récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Transport(s):'**
  String get stepSummaryTransports;

  /// Texte aucun transport sélectionné
  ///
  /// In en, this message translates to:
  /// **'No transport selected'**
  String get stepSummaryNoTransports;

  /// Bouton annuler récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get stepSummaryCancel;

  /// Bouton valider récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Validate'**
  String get stepSummaryValidate;

  /// Bouton commencer récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Begin'**
  String get stepSummaryBegin;

  /// Bouton suivant
  ///
  /// In en, this message translates to:
  /// **'Next'**
  String get next;

  /// Titre de bienvenue chauffeur onboarding
  ///
  /// In en, this message translates to:
  /// **'Welcome to Safe Driving!'**
  String get driverOnboardingWelcomeTitle;

  /// Sous-titre de bienvenue chauffeur onboarding
  ///
  /// In en, this message translates to:
  /// **'Thank you for choosing Safe Driving. Let\'s start by setting up your profile so you can hit the road with peace of mind.'**
  String get driverOnboardingWelcomeSubtitle;

  /// Bouton plus tard chauffeur
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get driverOnboardingLater;

  /// Bouton démarrer chauffeur
  ///
  /// In en, this message translates to:
  /// **'Get Started'**
  String get driverOnboardingStart;

  /// Titre détails chauffeur
  ///
  /// In en, this message translates to:
  /// **'Tell us more about you'**
  String get driverDetailsTitle;

  /// Sous-titre détails chauffeur
  ///
  /// In en, this message translates to:
  /// **'Provide your contact information so we can reach you and verify your identity'**
  String get driverDetailsSubtitle;

  /// Bouton valider détails
  ///
  /// In en, this message translates to:
  /// **'Validate'**
  String get driverDetailsValidate;

  /// Label nom complet
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get driverDetailsFullName;

  /// Placeholder nom complet
  ///
  /// In en, this message translates to:
  /// **'John Doe'**
  String get driverDetailsFullNamePlaceholder;

  /// Label email chauffeur
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get driverDetailsEmail;

  /// Placeholder email chauffeur
  ///
  /// In en, this message translates to:
  /// **'example@email.com'**
  String get driverDetailsEmailPlaceholder;

  /// Label téléphone chauffeur
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get driverDetailsPhone;

  /// Placeholder téléphone chauffeur
  ///
  /// In en, this message translates to:
  /// **'+261...'**
  String get driverDetailsPhonePlaceholder;

  /// Titre vérification identité
  ///
  /// In en, this message translates to:
  /// **'Identity Verification'**
  String get driverIdentityVerificationTitle;

  /// Sous-titre vérification identité
  ///
  /// In en, this message translates to:
  /// **'Upload your driver\'s license and ID card to ensure a fast and reliable registration.'**
  String get driverIdentityVerificationSubtitle;

  /// Recto document
  ///
  /// In en, this message translates to:
  /// **'Front'**
  String get driverIdentityRecto;

  /// Verso document
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get driverIdentityVerso;

  /// Permis de conduire
  ///
  /// In en, this message translates to:
  /// **'Driver\'s License'**
  String get driverIdentityLicense;

  /// Texte zone upload
  ///
  /// In en, this message translates to:
  /// **'Drag a file to upload'**
  String get driverIdentityUploadText;

  /// Bouton choisir fichier
  ///
  /// In en, this message translates to:
  /// **'Choose a file'**
  String get driverIdentityChooseFile;

  /// Titre infos véhicule
  ///
  /// In en, this message translates to:
  /// **'Tell us about your vehicle'**
  String get driverVehicleInfoTitle;

  /// Sous-titre infos véhicule
  ///
  /// In en, this message translates to:
  /// **'To better identify you and ensure passenger safety, provide your car\'s characteristics.'**
  String get driverVehicleInfoSubtitle;

  /// Label marque véhicule
  ///
  /// In en, this message translates to:
  /// **'Brand'**
  String get driverVehicleBrand;

  /// Placeholder marque véhicule
  ///
  /// In en, this message translates to:
  /// **'e.g. Peugeot'**
  String get driverVehicleBrandPlaceholder;

  /// Label modèle véhicule
  ///
  /// In en, this message translates to:
  /// **'Model'**
  String get driverVehicleModel;

  /// Placeholder modèle véhicule
  ///
  /// In en, this message translates to:
  /// **'e.g. 404'**
  String get driverVehicleModelPlaceholder;

  /// Label immatriculation
  ///
  /// In en, this message translates to:
  /// **'Registration Number'**
  String get driverVehicleRegistration;

  /// Placeholder immatriculation
  ///
  /// In en, this message translates to:
  /// **'e.g. AB-123-CD'**
  String get driverVehicleRegistrationPlaceholder;

  /// Label nombre places
  ///
  /// In en, this message translates to:
  /// **'Number of Seats'**
  String get driverVehicleSeats;

  /// Placeholder nombre places
  ///
  /// In en, this message translates to:
  /// **'e.g. 4'**
  String get driverVehicleSeatsPlaceholder;

  /// Label type véhicule
  ///
  /// In en, this message translates to:
  /// **'Vehicle Type'**
  String get driverVehicleType;

  /// Placeholder type véhicule
  ///
  /// In en, this message translates to:
  /// **'e.g. Car'**
  String get driverVehicleTypePlaceholder;

  /// Titre documents véhicule
  ///
  /// In en, this message translates to:
  /// **'About your vehicle'**
  String get driverVehicleDocumentsTitle;

  /// Sous-titre documents véhicule
  ///
  /// In en, this message translates to:
  /// **'Add your registration certificate, insurance certificate and some photos of the vehicle.'**
  String get driverVehicleDocumentsSubtitle;

  /// Bouton ajouter photos
  ///
  /// In en, this message translates to:
  /// **'Add more photos'**
  String get driverVehicleAddPhotos;

  /// Titre photo identité
  ///
  /// In en, this message translates to:
  /// **'Confirm your identity with a photo'**
  String get driverIdentityPhotoTitle;

  /// Sous-titre photo identité
  ///
  /// In en, this message translates to:
  /// **'Take a real-time selfie to finalize verification and strengthen community security.'**
  String get driverIdentityPhotoSubtitle;

  /// Titre localisation
  ///
  /// In en, this message translates to:
  /// **'Share your location'**
  String get driverLocationTitle;

  /// Sous-titre localisation
  ///
  /// In en, this message translates to:
  /// **'Allow geolocation to receive nearby ride requests.'**
  String get driverLocationSubtitle;

  /// Bouton activer localisation
  ///
  /// In en, this message translates to:
  /// **'Enable'**
  String get driverLocationEnable;

  /// Titre notifications chauffeur
  ///
  /// In en, this message translates to:
  /// **'Stay informed'**
  String get driverNotificationTitle;

  /// Sous-titre notifications chauffeur
  ///
  /// In en, this message translates to:
  /// **'Choose how you want to be alerted about new missions: push, SMS or email.'**
  String get driverNotificationSubtitle;

  /// Option SMS
  ///
  /// In en, this message translates to:
  /// **'SMS'**
  String get driverNotificationSms;

  /// Option push notification
  ///
  /// In en, this message translates to:
  /// **'Mobile push notification'**
  String get driverNotificationPush;

  /// Option email
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get driverNotificationEmail;

  /// Titre personnalisation
  ///
  /// In en, this message translates to:
  /// **'Customize your experience'**
  String get driverCustomizeTitle;

  /// Sous-titre personnalisation
  ///
  /// In en, this message translates to:
  /// **'Set your theme (light/dark), adjust alert volume and choose the app language.'**
  String get driverCustomizeSubtitle;

  /// Thème clair
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get driverCustomizeThemeLight;

  /// Thème sombre
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get driverCustomizeThemeDark;

  /// Langue française
  ///
  /// In en, this message translates to:
  /// **'French'**
  String get driverCustomizeLanguageFr;

  /// Langue anglaise
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get driverCustomizeLanguageEn;

  /// Titre conditions d'utilisation
  ///
  /// In en, this message translates to:
  /// **'One last point before getting started'**
  String get driverTermsTitle;

  /// Sous-titre conditions d'utilisation
  ///
  /// In en, this message translates to:
  /// **'Please read and accept our Terms of Service and Privacy Policy.'**
  String get driverTermsSubtitle;

  /// Accepter CGU
  ///
  /// In en, this message translates to:
  /// **'I accept the Terms of Service'**
  String get driverAcceptTerms;

  /// Accepter politique confidentialité
  ///
  /// In en, this message translates to:
  /// **'I accept the Privacy Policy'**
  String get driverAcceptPrivacy;

  /// Titre CGU
  ///
  /// In en, this message translates to:
  /// **'Safe Driving Terms of Service (ToS)'**
  String get driverCguTitle;

  /// Bouton accepter CGU
  ///
  /// In en, this message translates to:
  /// **'I accept'**
  String get driverCguAccept;

  /// Titre politique confidentialité
  ///
  /// In en, this message translates to:
  /// **'🛡️ Privacy Policy – Safe Driving'**
  String get driverPrivacyTitle;

  /// Bouton accepter politique confidentialité
  ///
  /// In en, this message translates to:
  /// **'I accept'**
  String get driverPrivacyAccept;

  /// Titre récapitulatif chauffeur
  ///
  /// In en, this message translates to:
  /// **'All set!'**
  String get driverSummaryTitle;

  /// Sous-titre récapitulatif chauffeur
  ///
  /// In en, this message translates to:
  /// **'Check your information and choices before validating. You can always come back to modify your preferences later.'**
  String get driverSummarySubtitle;

  /// Bouton valider récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Validate'**
  String get driverSummaryValidate;

  /// Section infos personnelles
  ///
  /// In en, this message translates to:
  /// **'Personal Information'**
  String get driverSummaryPersonalInfo;

  /// Nom récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Name'**
  String get driverSummaryPersonalInfoName;

  /// Email récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get driverSummaryPersonalInfoEmail;

  /// Téléphone récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get driverSummaryPersonalInfoPhone;

  /// Photos uploadées récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Uploaded photos'**
  String get driverSummaryPersonalInfoPhotos;

  /// Section véhicule récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Vehicle'**
  String get driverSummaryVehicle;

  /// Type véhicule récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Type'**
  String get driverSummaryVehicleType;

  /// Marque véhicule récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Brand'**
  String get driverSummaryVehicleBrand;

  /// Modèle véhicule récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Model'**
  String get driverSummaryVehicleModel;

  /// Immatriculation récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Registration'**
  String get driverSummaryVehicleRegistration;

  /// Nombre places récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Number of seats'**
  String get driverSummaryVehicleSeats;

  /// Photos véhicule récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Uploaded photos'**
  String get driverSummaryVehiclePhotos;

  /// Section GPS et notifications
  ///
  /// In en, this message translates to:
  /// **'GPS & Notifications'**
  String get driverSummaryGpsNotifications;

  /// GPS récapitulatif
  ///
  /// In en, this message translates to:
  /// **'GPS'**
  String get driverSummaryGps;

  /// Notifications récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get driverSummaryNotifications;

  /// Section préférences récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Preferences'**
  String get driverSummaryPreferences;

  /// Thème récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get driverSummaryTheme;

  /// Langue récapitulatif
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get driverSummaryLanguage;

  /// Titre bienvenue final
  ///
  /// In en, this message translates to:
  /// **'🎉 Welcome aboard, '**
  String get driverCompleteTitle;

  /// Sous-titre bienvenue final
  ///
  /// In en, this message translates to:
  /// **'Your profile has been completed and validated. You are now ready to use Safe Driving as a driver.'**
  String get driverCompleteSubtitle;

  /// Bouton c'est parti
  ///
  /// In en, this message translates to:
  /// **'Let\'s go!'**
  String get driverCompleteStart;

  /// Sous-titre QR code
  ///
  /// In en, this message translates to:
  /// **'Your personal QR code has been generated:'**
  String get driverCompleteQrCodeSubtitle;

  /// Instructions QR code
  ///
  /// In en, this message translates to:
  /// **'It will allow your passengers to identify you quickly and securely. You can view or download this QR code at any time in the My Account > My QR code menu.'**
  String get driverCompleteQrCodeInstructions;

  /// Message de remerciement final
  ///
  /// In en, this message translates to:
  /// **'Thank you for being part of the Safe Driving community. We wish you safe travels!'**
  String get driverCompleteThankYou;

  /// Bouton envoyer le code (mot de passe oublié)
  ///
  /// In en, this message translates to:
  /// **'Send code'**
  String get sendCode;

  /// Message succès: code de réinitialisation envoyé
  ///
  /// In en, this message translates to:
  /// **'A reset code has been sent to your email address'**
  String get resetCodeSent;

  /// Texte: lire et accepter les CGU
  ///
  /// In en, this message translates to:
  /// **'Read and accept the Terms'**
  String get readAndAcceptTerms;

  /// Texte: lire et accepter la politique de confidentialité
  ///
  /// In en, this message translates to:
  /// **'Read and accept the policy'**
  String get readAndAcceptPolicy;

  /// Succès inscription
  ///
  /// In en, this message translates to:
  /// **'Registration successful! You can now sign in.'**
  String get registrationSuccess;

  /// Erreur lors de l'inscription
  ///
  /// In en, this message translates to:
  /// **'Error during registration'**
  String get registrationError;

  /// Message: Google Sign-In non implémenté
  ///
  /// In en, this message translates to:
  /// **'Google sign-in not implemented yet'**
  String get googleSignInNotImplemented;

  /// Message: Facebook Sign-In non implémenté
  ///
  /// In en, this message translates to:
  /// **'Facebook sign-in not implemented yet'**
  String get facebookSignInNotImplemented;

  /// Title for the map search screen
  ///
  /// In en, this message translates to:
  /// **'Transport search'**
  String get mapSearchTitle;

  /// Placeholder for the start address input
  ///
  /// In en, this message translates to:
  /// **'Start address'**
  String get mapFromPlaceholder;

  /// Placeholder for the destination input
  ///
  /// In en, this message translates to:
  /// **'Destination'**
  String get mapToPlaceholder;

  /// Tooltip for the locate me FAB
  ///
  /// In en, this message translates to:
  /// **'Locate me'**
  String get mapLocate;

  /// Tooltip for the clear FAB
  ///
  /// In en, this message translates to:
  /// **'Clear'**
  String get mapClear;

  /// Snackbar when location permission is denied
  ///
  /// In en, this message translates to:
  /// **'Location permission required to center the map on your position'**
  String get mapPermissionDenied;

  /// Snackbar when geocoding returns no results
  ///
  /// In en, this message translates to:
  /// **'No results found'**
  String get mapNoResults;

  /// Summary pill showing route distance and duration
  ///
  /// In en, this message translates to:
  /// **'{distance} • {duration}'**
  String mapRouteSummary(String distance, String duration);
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
