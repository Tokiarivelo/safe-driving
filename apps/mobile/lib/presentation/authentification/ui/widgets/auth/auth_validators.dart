import '../../../../core/constants/utils/form/form_utils.dart';
import '../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:flutter/material.dart';

class AuthValidators {
  static String? validateSignIn({
    required String email,
    required String password,
    required BuildContext context,
  }) {
    if (email.trim().isEmpty) {
      return "Veuillez saisir votre email ou nom d'utilisateur";
    }
    if (password.trim().isEmpty) {
      return "Veuillez saisir votre mot de passe";
    }
    return null;
  }

  static String? validateSignUp({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
    required String confirmPassword,
    required BuildContext context,
  }) {
    if (firstName.trim().isEmpty) {
      return "Veuillez saisir votre prénom";
    }
    if (lastName.trim().isEmpty) {
      return "Veuillez saisir votre nom de famille";
    }
    if (email.trim().isEmpty) {
      return "Veuillez saisir votre adresse email";
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      return "Veuillez saisir une adresse email valide";
    }
    if (password.trim().isEmpty) {
      return "Veuillez saisir un mot de passe";
    }
    if (password.trim().length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (confirmPassword.trim().isEmpty) {
      return "Veuillez confirmer votre mot de passe";
    }
    if (password.trim() != confirmPassword.trim()) {
      return "Les mots de passe ne correspondent pas";
    }
    return null;
  }

  static String? validateForgotPassword({
    required String email,
    required BuildContext context,
  }) {
    if (email.trim().isEmpty) {
      return "Veuillez saisir votre adresse email";
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      return "Veuillez saisir une adresse email valide";
    }
    return null;
  }

  static String getUsernameValidationError(String value) {
    return RegexFormatter.getUsernameValidationMessage(value);
  }

  static String getEmailValidationError(String value) {
    return RegexFormatter.getEmailValidationMessage(value);
  }

  static String getPasswordValidationError(String value) {
    return RegexFormatter.getPasswordValidationMessage(value);
  }

  static String getConfirmPasswordValidationError(
    String password,
    String confirmPassword,
  ) {
    return password != confirmPassword
        ? "Les mots de passe ne correspondent pas"
        : "";
  }

  static void showValidationError(BuildContext context, String message) {
    SnackbarHelper.showError(context, message);
  }
}
