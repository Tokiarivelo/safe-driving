class AuthConstants {
  static const int minPasswordLength = 8;
  static const int maxPasswordLength = 128;
  static const int minNameLength = 2;
  static const int maxNameLength = 50;

  static const String invalidEmailError = 'Adresse email invalide';
  static const String emailRequiredError = 'L\'adresse email est requise';
  static const String passwordRequiredError = 'Le mot de passe est requis';
  static const String passwordTooShortError =
      'Le mot de passe doit contenir au moins 8 caractères';
  static const String passwordTooLongError =
      'Le mot de passe ne peut pas dépasser 128 caractères';
  static const String passwordMismatchError =
      'Les mots de passe ne correspondent pas';
  static const String firstNameRequiredError = 'Le prénom est requis';
  static const String firstNameTooShortError =
      'Le prénom doit contenir au moins 2 caractères';
  static const String lastNameTooShortError =
      'Le nom doit contenir au moins 2 caractères';

  static const String loginSuccessMessage = 'Connexion réussie';
  static const String registerSuccessMessage = 'Inscription réussie';
  static const String logoutSuccessMessage = 'Déconnexion réussie';
  static const String passwordResetSuccessMessage =
      'Mot de passe réinitialisé avec succès';

  static const String emailFieldKey = 'email';
  static const String passwordFieldKey = 'password';
  static const String confirmPasswordFieldKey = 'confirmPassword';
  static const String firstNameFieldKey = 'firstName';
  static const String lastNameFieldKey = 'lastName';

  static const String loginStep = 'login';
  static const String registerStep = 'register';
  static const String forgotPasswordStep = 'forgotPassword';
  static const String resetPasswordStep = 'resetPassword';

  static const String tokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userDataKey = 'user_data';

  static const String loginEndpoint = '/auth/login';
  static const String registerEndpoint = '/auth/register';
  static const String logoutEndpoint = '/auth/logout';
  static const String refreshEndpoint = '/auth/refresh';
  static const String forgotPasswordEndpoint = '/auth/forgot-password';
  static const String resetPasswordEndpoint = '/auth/reset-password';
}
