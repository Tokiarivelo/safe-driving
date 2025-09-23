import 'package:flutter/material.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../../../../../core/utils/form/form_utils.dart';
import '../../../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class AuthValidationHandler {
  static String validateField(
    BuildContext context,
    String value,
    String fieldType,
  ) {
    switch (fieldType) {
      case 'email':
        if (value.isEmpty) return '';
        return RegexFormatter.isValidEmail(value)
            ? ''
            : context.l10n.pleaseEnterValidEmail;
      case 'password':
        if (value.isEmpty) return '';
        return value.length < 8 ? context.l10n.passwordMinLength : '';
      case 'username':
        return '';
      default:
        return '';
    }
  }

  static String validateConfirmPassword(
    BuildContext context,
    String password,
    String confirmPassword,
  ) {
    return password != confirmPassword
        ? context.l10n.passwordsDoNotMatchError
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
      _showError(context, context.l10n.pleaseEnterEmail);
      return false;
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      _showError(context, context.l10n.pleaseEnterValidEmail);
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
      _showError(context, context.l10n.pleaseEnterEmailOrUsername);
      return false;
    }
    if (password.trim().isEmpty) {
      _showError(context, context.l10n.pleaseEnterPassword);
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
      _showError(context, context.l10n.pleaseEnterFirstName);
      return false;
    }
    if (lastName.trim().isEmpty) {
      _showError(context, context.l10n.pleaseEnterLastName);
      return false;
    }
    if (email.trim().isEmpty) {
      _showError(context, context.l10n.pleaseEnterEmail);
      return false;
    }
    if (!RegexFormatter.isValidEmail(email.trim())) {
      _showError(context, context.l10n.pleaseEnterValidEmail);
      return false;
    }
    if (password.trim().isEmpty) {
      _showError(context, context.l10n.pleaseEnterPassword);
      return false;
    }
    if (password.trim().length < 8) {
      _showError(context, context.l10n.passwordMinLength);
      return false;
    }
    if (confirmPassword.trim().isEmpty) {
      _showError(context, context.l10n.pleaseConfirmPassword);
      return false;
    }
    if (password.trim() != confirmPassword.trim()) {
      _showError(context, context.l10n.passwordsDoNotMatchError);
      return false;
    }
    return true;
  }

  static void _showError(BuildContext context, String message) {
    SnackbarHelper.showError(context, message);
  }
}
