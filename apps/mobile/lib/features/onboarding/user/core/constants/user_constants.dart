class UserConstants {
  static const String moduleName = 'user_onboarding';

  static const int totalSteps = 5;

  static const String homeRoute = '/home';
  static const String onboardingRoute = '/onboarding/user';

  static const Map<String, String> validationMessages = {
    'transportRequired': 'Veuillez sélectionner au moins un mode de transport',
  };

  static const Map<String, String> labels = {
    'gps': 'GPS',
    'notifications': 'Notifications',
    'theme': 'Thème',
    'transport': 'Transport(s)',
    'language': 'Langue',
  };
}

