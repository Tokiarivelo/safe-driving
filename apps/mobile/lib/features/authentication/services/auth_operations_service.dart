import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/authentication/services/auth_service.dart';

import '../models/auth_result.dart';
import '../models/auth_request.dart';

class AuthOperationsService {
  final AuthService _authService;
  final SessionService _sessionService;

  AuthOperationsService(this._authService, this._sessionService);

  Future<AuthResult> signIn(String email, String password) async {
    try {
      final result = await _authService.signIn(email, password);

      if (result.isSuccess) {
        if (result.token != null) {
          await _sessionService.saveToken(result.token!);
        }
        if (result.refreshToken != null) {
          await _sessionService.saveRefreshToken(result.refreshToken!);
        }
      }

      return result;
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> signUp(SignUpRequest request) async {
    try {
      final result = await _authService.signUp(request);

      if (result.isSuccess) {
        if (result.token != null) {
          await _sessionService.saveToken(result.token!);
        }
        if (result.refreshToken != null) {
          await _sessionService.saveRefreshToken(result.refreshToken!);
        }
      }

      return result;
    } catch (e) {
      return AuthResult.failure(
        errorMessage: _formatRegisterError(e.toString()),
      );
    }
  }

  Future<AuthResult> resetPassword(String email) async {
    try {
      return await _authService.resetPassword(email);
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  void logout() {
    _sessionService.clear();
  }

  String _formatRegisterError(String message) {
    if (message.contains('Unique constraint') ||
        message.contains('email') ||
        message.contains('ConflictException')) {
      return 'Cette adresse email est déjà utilisée. Veuillez en choisir une autre.';
    } else if (message.contains('password')) {
      return 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre.';
    } else if (message.contains('firstName')) {
      return 'Le prénom est requis.';
    } else if (message.contains('non-nullable field LoginOutput.user')) {
      return 'Échec de l\'inscription. Cet email est peut-être déjà utilisé.';
    } else if (message.contains('INTERNAL_SERVER_ERROR')) {
      return 'Erreur serveur lors de l\'inscription. Veuillez réessayer.';
    } else if (message.contains('Exception')) {
      return message.replaceAll('Exception: ', '');
    }
    return message;
  }
}
