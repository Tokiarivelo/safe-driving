import 'package:flutter/material.dart';
import '../../../shared/state_management/state.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';

class ResetSuccessHandler {
  static Future<void> handleResetPassword({
    required BuildContext context,
    required String newPassword,
    required String confirmPassword,
    VoidCallback? onResetSuccess,
    VoidCallback? onNavigateToLogin,
  }) async {
    if (newPassword.isEmpty) {
      SnackbarHelper.showError(context, "Veuillez saisir votre nouveau mot de passe");
      return;
    }
    
    if (confirmPassword.isEmpty) {
      SnackbarHelper.showError(context, "Veuillez confirmer votre nouveau mot de passe");
      return;
    }

    if (newPassword != confirmPassword) {
      SnackbarHelper.showError(
        context,
        'Les mots de passe ne correspondent pas',
      );
      return;
    }

    if (newPassword.length < 8) {
      SnackbarHelper.showError(
        context,
        'Le mot de passe doit contenir au moins 8 caractères',
      );
      return;
    }

    if (!context.mounted) return;

    final auth = context.authVM;
    final success = await auth.resetPassword(newPassword);

    if (!context.mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(
        context,
        'Mot de passe réinitialisé avec succès',
      );
      if (onResetSuccess != null) {
        onResetSuccess();
      } else if (onNavigateToLogin != null) {
        onNavigateToLogin();
      }
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ??
            'Erreur lors de la réinitialisation du mot de passe',
      );
    }
  }
}
