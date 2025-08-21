import 'package:flutter/material.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../../shared/state_management/providers.dart';

class SigninViewModel extends ChangeNotifier {
  BuildContext? _context;

  void setContext(BuildContext context) {
    _context = context;
  }

  Future<void> handleSignIn(String email, String password) async {
    if (_context == null) return;
    
    final auth = _context!.authVM;

    final success = await auth.login(email, password);

    if (success) {
      SnackbarHelper.showSuccess(_context!, 'Connexion réussie !');
    } else {
      SnackbarHelper.showError(
        _context!,
        auth.errorMessage ?? 'Email ou mot de passe invalide',
      );
    }
  }

  void handleGoogleSignIn(VoidCallback? onGoogleSignIn) {
    if (_context == null) return;
    
    if (onGoogleSignIn != null) {
      onGoogleSignIn();
    } else {
      SnackbarHelper.showInfo(
        _context!,
        'Connexion Google non encore implémentée',
      );
    }
  }

  void handleFacebookSignIn(VoidCallback? onFacebookSignIn) {
    if (_context == null) return;
    
    if (onFacebookSignIn != null) {
      onFacebookSignIn();
    } else {
      SnackbarHelper.showInfo(
        _context!,
        'Connexion Facebook non encore implémentée',
      );
    }
  }
}
