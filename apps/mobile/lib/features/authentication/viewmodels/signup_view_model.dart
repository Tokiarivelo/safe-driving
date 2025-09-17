import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_request.dart';
import 'package:safe_driving/shared/state_management/providers.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class SignupViewModel extends ChangeNotifier {
  BuildContext? _context;

  void setContext(BuildContext context) {
    _context = context;
  }

  Future<void> handleSignUp(
    String firstName,
    String lastName,
    String email,
    String password,
    VoidCallback? onSuccess,
  ) async {
    if (_context == null) return;

    final auth = _context!.authVM;
    final request = SignUpRequest(
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    );

    final ok = await auth.signUp(request);

    if (ok) {
      SnackbarHelper.showSuccess(_context!, 'Inscription réussie');
      if (onSuccess != null) onSuccess();
    } else {
      SnackbarHelper.showError(
        _context!,
        auth.errorMessage ?? 'Erreur lors de l\'inscription',
      );
    }
  }
}
