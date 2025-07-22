/// Formatter for validating various input formats using regex
class RegexFormatter {
  static bool isValidEmail(String email) {
    final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    return emailRegex.hasMatch(email);
  }

  /// Validates if the password meets strong criteria
  /// - At least 8 characters
  /// - At least one uppercase letter
  /// - At least one lowercase letter
  /// - At least one number
  /// - At least one special character
  static bool isStrongPassword(String password) {
    if (password.length < 8) return false;
    final strongPasswordRegex = RegExp(
      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    );
    return strongPasswordRegex.hasMatch(password);
  }

  /// Gets detailed password validation message
  static String getPasswordValidationMessage(String password) {
    if (password.isEmpty) return "";

    List<String> missing = [];

    if (password.length < 8) missing.add("8 caractères min");
    if (!RegExp(r'[a-z]').hasMatch(password)) missing.add("1 minuscule");
    if (!RegExp(r'[A-Z]').hasMatch(password)) missing.add("1 majuscule");
    if (!RegExp(r'\d').hasMatch(password)) missing.add("1 chiffre");
    if (!RegExp(r'[@$!%*?&]').hasMatch(password)) {
      missing.add("1 symbole (@\$!%*?&)");
    }

    if (missing.isEmpty) return "";
    return "Manque: ${missing.join(", ")}";
  }

  /// Validates phone number (French format)
  /// Accepts: 0123456789, +33123456789, 01 23 45 67 89, +33 1 23 45 67 89
  static bool isValidPhoneNumber(String phone) {
    final cleanPhone = phone.replaceAll(RegExp(r'[\s\-\.]'), '');
    final phoneRegex = RegExp(r'^(?:\+33|0)[1-9](?:[0-9]{8})$');
    return phoneRegex.hasMatch(cleanPhone);
  }

  /// Gets phone validation message
  static String getPhoneValidationMessage(String phone) {
    if (phone.isEmpty) return "";
    if (!isValidPhoneNumber(phone)) {
      return "Format invalide (ex: 01 23 45 67 89)";
    }
    return "";
  }

  /// Validates username
  /// - 3-20 characters
  /// - Only letters, numbers, underscores, and hyphens
  /// - Cannot start or end with underscore or hyphen
  static bool isValidUsername(String username) {
    if (username.length < 3 || username.length > 20) return false;
    final usernameRegex = RegExp(r'^[a-zA-Z0-9]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$');
    return usernameRegex.hasMatch(username);
  }

  /// Gets username validation message
  static String getUsernameValidationMessage(String username) {
    if (username.isEmpty) return "";

    if (username.length < 3) return "3 caractères minimum";
    if (username.length > 20) return "20 caractères maximum";
    if (!RegExp(r'^[a-zA-Z0-9]').hasMatch(username)) {
      return "Doit commencer par une lettre ou un chiffre";
    }
    if (!RegExp(r'[a-zA-Z0-9]$').hasMatch(username)) {
      return "Doit finir par une lettre ou un chiffre";
    }
    if (!RegExp(r'^[a-zA-Z0-9_-]+$').hasMatch(username)) {
      return "Seuls les lettres, chiffres, _ et - sont autorisés";
    }

    return "";
  }

  /// Gets email validation message
  static String getEmailValidationMessage(String email) {
    if (email.isEmpty) return "";
    if (!isValidEmail(email)) {
      return "Format email invalide";
    }
    return "";
  }
}
