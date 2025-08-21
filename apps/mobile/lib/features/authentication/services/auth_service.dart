import '../models/models.dart'
    hide ResetPasswordRequest, ChangePasswordRequest, UpdateProfileRequest;
import '../models/auth_request.dart';
import '../data/auth_data_source_interface.dart';
import '../repositories/repositories.dart';
import 'session_service.dart';

class AuthService {
  final IAuthDataSource _dataSource;
  final SessionService _sessionService;
  final UserRepository _userRepository;

  AuthService(this._dataSource, this._sessionService, this._userRepository);

  bool get isAuthenticated => _sessionService.isAuthenticated;
  String? get token => _sessionService.token;

  Future<AuthResult> signIn(String email, String password) async {
    return _handleAuth(() async {
      final request = SignInRequest(email: email, password: password);
      return await _dataSource.signIn(request);
    });
  }

  Future<AuthResult> signUp(SignUpRequest request) async {
    return _handleAuth(() async {
      return await _dataSource.signUp(request);
    }, formatError: _formatRegisterError);
  }

  Future<AuthResult> resetPassword(String email) async {
    return _handleSimpleResult(() async {
      final request = ResetPasswordRequest(email: email);
      return await _dataSource.resetPassword(request);
    }, 'Erreur de réinitialisation');
  }

  Future<AuthResult> getCurrentUser() async {
    try {
      final result = await _dataSource.getCurrentUser();
      if (result.isNotEmpty) {
        return AuthResult.success(user: User.fromJson(result));
      }
      return AuthResult.failure(errorMessage: 'Utilisateur non trouvé');
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> updateProfile(UpdateProfileRequest request) async {
    return _handleUserResult(() async {
      return await _dataSource.updateProfile(request);
    }, 'Erreur de mise à jour');
  }

  Future<AuthResult> changePassword(ChangePasswordRequest request) async {
    return _handleSimpleResult(() async {
      return await _dataSource.changePassword(request);
    }, 'Erreur de changement de mot de passe');
  }

  Future<AuthResult> refreshToken() async {
    try {
      final refreshToken = _sessionService.refreshToken;
      if (refreshToken == null) {
        return AuthResult.failure(
          errorMessage: 'Token de rafraîchissement manquant',
        );
      }

      final result = await _dataSource.refreshToken(refreshToken);

      if (result['success'] == true) {
        await _saveTokens(
          result['tokens']['accessToken'],
          result['tokens']['refreshToken'],
        );
        return AuthResult.success(
          token: result['tokens']['accessToken'],
          refreshToken: result['tokens']['refreshToken'],
        );
      }
      return AuthResult.failure(
        errorMessage: result['message'] ?? 'Erreur de rafraîchissement',
        errorCode: result['errorCode'],
      );
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> signInWithGoogle() async {
    return _handleAuth(() => _dataSource.signInWithGoogle());
  }

  Future<AuthResult> signInWithFacebook() async {
    return _handleAuth(() => _dataSource.signInWithFacebook());
  }

  Future<AuthResult> deleteAccount(String userId, String password) async {
    try {
      final result = await _dataSource.deleteAccount(userId, password);
      if (result['success'] == true) {
        await logout();
        return AuthResult.success(message: result['message']);
      }
      return AuthResult.failure(
        errorMessage: result['message'] ?? 'Erreur de suppression du compte',
        errorCode: result['errorCode'],
      );
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<void> logout() async => _sessionService.clear();

  Future<bool> isEmailTaken(String email) async {
    try {
      return await _userRepository.isEmailTaken(email);
    } catch (e) {
      return false;
    }
  }

  Future<AuthResult> _handleAuth(
    Future<Map<String, dynamic>> Function() operation, {
    String Function(String)? formatError,
  }) async {
    try {
      final result = await operation();
      if (result['success'] == true) {
        final user = User.fromJson(result['user']);
        final token = result['tokens']['accessToken'];
        final refreshToken = result['tokens']['refreshToken'];

        await _saveTokens(token, refreshToken);
        return AuthResult.success(
          user: user,
          token: token,
          refreshToken: refreshToken,
        );
      }

      String errorMessage = result['message'] ?? 'Erreur d\'authentification';
      if (formatError != null) errorMessage = formatError(errorMessage);

      return AuthResult.failure(
        errorMessage: errorMessage,
        errorCode: result['errorCode'],
      );
    } catch (e) {
      String errorMessage = e.toString();
      if (formatError != null) errorMessage = formatError(errorMessage);
      return AuthResult.failure(errorMessage: errorMessage);
    }
  }

  Future<AuthResult> _handleSimpleResult(
    Future<Map<String, dynamic>> Function() operation,
    String defaultError,
  ) async {
    try {
      final result = await operation();
      if (result['success'] == true) {
        return AuthResult.success(message: result['message']);
      }
      return AuthResult.failure(
        errorMessage: result['message'] ?? defaultError,
        errorCode: result['errorCode'],
      );
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> _handleUserResult(
    Future<Map<String, dynamic>> Function() operation,
    String defaultError,
  ) async {
    try {
      final result = await operation();
      if (result['success'] == true) {
        return AuthResult.success(user: User.fromJson(result['user']));
      }
      return AuthResult.failure(
        errorMessage: result['message'] ?? defaultError,
        errorCode: result['errorCode'],
      );
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<void> _saveTokens(String token, String refreshToken) async {
    await _sessionService.saveTokens(token, refreshToken);
  }

  String _formatRegisterError(String message) {
    if (message.contains('Unique constraint') ||
        message.contains('email') ||
        message.contains('ConflictException')) {
      return 'Cette adresse email est déjà utilisée. Veuillez en choisir une autre.';
    }
    if (message.contains('password')) {
      return 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre.';
    }
    if (message.contains('firstName')) return 'Le prénom est requis.';
    if (message.contains('non-nullable field LoginOutput.user')) {
      return 'Échec de l\'inscription. Cet email est peut-être déjà utilisé.';
    }
    if (message.contains('INTERNAL_SERVER_ERROR')) {
      return 'Erreur serveur lors de l\'inscription. Veuillez réessayer.';
    }
    if (message.contains('Exception')) {
      return message.replaceAll('Exception: ', '');
    }
    return message;
  }
}
