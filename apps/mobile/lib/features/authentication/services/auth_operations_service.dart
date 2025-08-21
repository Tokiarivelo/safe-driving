import '../models/auth_models.dart';
import 'service/auth_service.dart';
import 'service/session_service.dart';

class AuthOperationsService {
  final AuthService _authService;
  final SessionService _sessionService;

  AuthOperationsService(this._authService, this._sessionService);

  Future<AuthResult> login(String email, String password) async {
    try {
      final authResponse = await _authService.login(email, password);
      _sessionService.saveToken(authResponse.token);
      return AuthResult.success(authResponse.user);
    } catch (e) {
      return AuthResult.failure(e.toString());
    }
  }

  Future<AuthResult> register(RegisterInput input) async {
    try {
      final authResponse = await _authService.register(input);
      _sessionService.saveToken(authResponse.token);
      return AuthResult.success(authResponse.user);
    } catch (e) {
      return AuthResult.failure(_formatRegisterError(e.toString()));
    }
  }

  Future<AuthResult> resetPassword(String newPassword) async {
    try {
      await _authService.resetPassword(newPassword);
      return AuthResult.success(null);
    } catch (e) {
      return AuthResult.failure(e.toString());
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

class AuthResult {
  final bool isSuccess;
  final User? user;
  final String? error;

  AuthResult.success(this.user) : isSuccess = true, error = null;
  AuthResult.failure(this.error) : isSuccess = false, user = null;
}
