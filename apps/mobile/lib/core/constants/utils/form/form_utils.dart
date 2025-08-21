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

  /// Validates French license plate number
  /// Supports old format (123-ABC-12) and new format (AB-123-CD)
  static bool isValidLicensePlate(String plate) {
    final cleanPlate = plate.replaceAll(RegExp(r'[\s\-]'), '').toUpperCase();
    // Old format: 123ABC12 or new format: AB123CD
    final oldFormatRegex = RegExp(r'^[0-9]{3}[A-Z]{3}[0-9]{2}$');
    final newFormatRegex = RegExp(r'^[A-Z]{2}[0-9]{3}[A-Z]{2}$');
    return oldFormatRegex.hasMatch(cleanPlate) ||
        newFormatRegex.hasMatch(cleanPlate);
  }

  /// Gets license plate validation message
  static String getLicensePlateValidationMessage(String plate) {
    if (plate.isEmpty) return "";
    if (!isValidLicensePlate(plate)) {
      return "Format invalide (ex: AB-123-CD ou 123-ABC-12)";
    }
    return "";
  }

  /// Validates vehicle brand/model (letters, numbers, spaces, hyphens)
  static bool isValidVehicleName(String name) {
    if (name.trim().length < 2) return false;
    final vehicleNameRegex = RegExp(r'^[a-zA-ZÀ-ÿ0-9\s\-]+$');
    return vehicleNameRegex.hasMatch(name.trim());
  }

  /// Gets vehicle name validation message
  static String getVehicleNameValidationMessage(String name) {
    if (name.isEmpty) return "";
    if (name.trim().length < 2) return "2 caractères minimum";
    if (!isValidVehicleName(name)) {
      return "Seuls les lettres, chiffres, espaces et tirets sont autorisés";
    }
    return "";
  }

  /// Validates number of seats (1-9 for cars, up to 50+ for buses)
  static bool isValidSeatCount(String seats) {
    final seatNumber = int.tryParse(seats);
    return seatNumber != null && seatNumber >= 1 && seatNumber <= 99;
  }

  /// Gets seat count validation message
  static String getSeatCountValidationMessage(String seats) {
    if (seats.isEmpty) return "";
    final seatNumber = int.tryParse(seats);
    if (seatNumber == null) return "Doit être un nombre";
    if (seatNumber < 1 || seatNumber > 99) {
      return "Entre 1 et 99 places";
    }
    return "";
  }

  /// Validates name (first name, last name)
  /// - 2-50 characters
  /// - Only letters, spaces, hyphens, apostrophes
  /// - Cannot start or end with space
  static bool isValidName(String name) {
    final trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) return false;
    final nameRegex = RegExp(r"^[a-zA-ZÀ-ÿ\s\-']+$");
    return nameRegex.hasMatch(trimmedName) &&
        !trimmedName.startsWith(' ') &&
        !trimmedName.endsWith(' ');
  }

  /// Gets name validation message
  static String getNameValidationMessage(String name) {
    if (name.isEmpty) return "";
    final trimmedName = name.trim();
    if (trimmedName.length < 2) return "2 caractères minimum";
    if (trimmedName.length > 50) return "50 caractères maximum";
    if (!RegExp(r"^[a-zA-ZÀ-ÿ\s\-']+$").hasMatch(trimmedName)) {
      return "Seuls les lettres, espaces, tirets et apostrophes sont autorisés";
    }
    return "";
  }

  /// Validates Malagasy phone number
  /// Accepts: +261XXXXXXXXX, 261XXXXXXXXX, 0XXXXXXXXX
  /// X must be 9 digits total, starting with 3
  static bool isValidMalagasyPhone(String phone) {
    final cleanPhone = phone.replaceAll(RegExp(r'[\s\-\.]'), '');

    // Format with +261 or 261 prefix
    final phoneRegex = RegExp(r'^(?:\+261|261)?[3][2-468]|039\d{7}$');

    // Format with leading 0
    final localPhoneRegex = RegExp(r'^0[3][2-468]\d{7}$');

    return phoneRegex.hasMatch(cleanPhone) ||
        localPhoneRegex.hasMatch(cleanPhone);
  }

  /// Gets Malagasy phone validation message
  static String getMalagasyPhoneValidationMessage(String phone) {
    if (phone.isEmpty) return "";
    if (!isValidMalagasyPhone(phone)) {
      return "(ex: +261 34 XX XX XXX ou 034 XX XX XXX)";
    }
    return "";
  }

  /// Formats Malagasy phone number to standard format
  static String formatMalagasyPhone(String phone) {
    final cleanPhone = phone.replaceAll(RegExp(r'[\s\-\.]'), '');

    if (!isValidMalagasyPhone(cleanPhone)) return phone;

    // Remove any existing prefixes
    var normalizedPhone = cleanPhone.replaceAll(RegExp(r'^(\+261|261|0)'), '');

    // Format as +261 XX XXX XX
    return '+261 ${normalizedPhone.substring(0, 2)} ${normalizedPhone.substring(2, 5)} ${normalizedPhone.substring(5)}';
  }
}
