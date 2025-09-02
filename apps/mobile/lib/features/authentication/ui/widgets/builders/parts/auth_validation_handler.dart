import 'package:flutter/material.dart';
import '../../../../../../core/utils/form/form_utils.dart';
import '../../../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class AuthValidationHandler {
  static String validateField(String value, String fieldType) {
    switch (fieldType) {
      case 'email':
        return RegexFormatter.getEmailValidationMessage(value);
      case 'password':
        return RegexFormatter.getPasswordValidationMessage(value);
      case 'username':
        return RegexFormatter.getUsernameValidationMessage(value);
      default:
        return '';
    }
  }

  static String validateConfirmPassword(
    String password,
    String confirmPassword,
  ) {
    return password != confirmPassword
        ? "Les mots de passe ne correspondent pas"
        : "";
  }

  static bool validateForm({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    required String email,
    required String password,
    String firstName = '',
    String lastName = '',
    String confirmPassword = '',
  }) {
    if (isForgotPassword) {
      return _validateForgotPasswordForm(context, email);
    } else if (isLogin) {
      return _validateSignInForm(context, email, password);
    } else {
      return _validateSignUpForm(
        context,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );
    }
  }

  static bool _validateForgotPasswordForm(BuildContext context, String email) {
    if (email.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre adresse email");
      return false;
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      _showError(context, "Veuillez saisir une adresse email valide");
      return false;
    }
    return true;
  }

  static bool _validateSignInForm(
    BuildContext context,
    String email,
    String password,
  ) {
    if (email.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre email ou nom d'utilisateur");
      return false;
    }
    if (password.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre mot de passe");
      return false;
    }
    return true;
  }

  static bool _validateSignUpForm(
    BuildContext context,
    String firstName,
    String lastName,
    String email,
    String password,
    String confirmPassword,
  ) {
    if (firstName.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre prénom");
      return false;
    }
    if (lastName.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre nom de famille");
      return false;
    }
    if (email.trim().isEmpty) {
      _showError(context, "Veuillez saisir votre adresse email");
      return false;
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      _showError(context, "Veuillez saisir une adresse email valide");
      return false;
    }
    if (password.trim().isEmpty) {
      _showError(context, "Veuillez saisir un mot de passe");
      return false;
    }
    if (password.trim().length < 8) {
      _showError(
        context,
        "Le mot de passe doit contenir au moins 8 caractères",
      );
      return false;
    }
    if (confirmPassword.trim().isEmpty) {
      _showError(context, "Veuillez confirmer votre mot de passe");
      return false;
    }
    if (password.trim() != confirmPassword.trim()) {
      _showError(context, "Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  }

  static void _showError(BuildContext context, String message) {
    SnackbarHelper.showError(context, message);
  }
}
