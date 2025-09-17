import '../models/auth_models.dart';
import '../models/auth_request.dart';
import '../data/auth_data_source_interface.dart';
import '../repositories/repositories.dart';
import 'session_service.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';

class AuthService {
  final IAuthDataSource _dataSource;
  final SessionService _sessionService;
  final UserRepository _userRepository;

  AuthService(this._dataSource, this._sessionService, this._userRepository);

  bool get isAuthenticated => _sessionService.isAuthenticated;
  String? get token => _sessionService.token;

  Future<AuthResult> signIn(String email, String password) async {
    try {
      final request = SignInRequest(email: email, password: password);
      final result = await _dataSource.signIn(request);
      if (result.containsKey('token') && result.containsKey('user')) {
        final user = User.fromJson(result['user']);
        final token = result['token'] as String;
        final refresh = result['refreshToken'] as String?;
        await _saveTokens(token, refresh);
        try {
          await _sessionService.saveUserId(user.id);
        } catch (_) {}
        return AuthResult.success(user: user, token: token, refreshToken: refresh);
      }
      return AuthResult.failure(errorMessage: 'Authentification échouée');
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> signUp(SignUpRequest request) async {
    try {
      final result = await _dataSource.signUp(request);

      final looksLikeUser = result.containsKey('id');
      if (looksLikeUser) {
        return AuthResult.success(user: User.fromJson(result));
      }

      if (result['success'] == false) {
        final msg = _formatRegisterError((result['message'] ?? '').toString());
        return AuthResult.failure(errorMessage: msg, errorCode: result['errorCode']);
      }
      if (result.containsKey('message')) {
        final msg = _formatRegisterError((result['message'] ?? '').toString());
        return AuthResult.failure(errorMessage: msg, errorCode: result['errorCode']);
      }

      return AuthResult.failure(errorMessage: 'Inscription échouée');
    } catch (e) {
      return AuthResult.failure(
        errorMessage: _formatRegisterError(e.toString()),
      );
    }
  }

  Future<AuthResult> resetPasswordConfirm(String sessionToken, String newPassword) async {
    try {
      final result = await _dataSource.resetPasswordConfirm(sessionToken, newPassword);
      if (result['success'] == true) {
        return AuthResult.success(message: 'Mot de passe mis à jour');
      }
      return AuthResult.failure(errorMessage: result['message'] ?? 'Échec de la réinitialisation');
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
  }

  Future<AuthResult> resetPassword(String email) async {
    try {
      final request = ResetPasswordRequest(email: email);
      final result = await _dataSource.resetPassword(request);
      if (result.containsKey('email') && result.containsKey('resetLink')) {
        return AuthResult.success(message: 'Lien envoyé');
      }
      return AuthResult.failure(errorMessage: 'Échec de l\'envoi du lien');
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
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
    try {
      final result = await _dataSource.updateProfile(request);
      if (result.isNotEmpty) {
        return AuthResult.success(user: User.fromJson(result));
      }
      return AuthResult.failure(errorMessage: 'Erreur de mise à jour');
    } catch (e) {
      return AuthResult.failure(errorMessage: e.toString());
    }
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
      if (result['success'] == true && result['tokens'] != null) {
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
        errorMessage: result['message'] ?? 'Rafraîchissement non supporté',
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
      if (result.containsKey('token') && result.containsKey('user')) {
        final user = User.fromJson(result['user']);
        final token = result['token'] as String;
        await _saveTokens(token, null);
        return AuthResult.success(user: user, token: token);
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

  Future<void> _saveTokens(String token, String? refreshToken) async {
    if (refreshToken == null || refreshToken.isEmpty) {
      await _sessionService.saveToken(token);
    } else {
      await _sessionService.saveTokens(token, refreshToken);
    }
 
    try {
      GraphQLClientWrapper.instance
          .updateTokens(accessToken: token, refreshToken: refreshToken);
    } catch (_) {}
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
