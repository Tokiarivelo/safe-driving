import '../../models/auth_models.dart';

abstract class IAuthService {
  Future<AuthResult> login(String email, String password);

  Future<AuthResult> register(RegisterInput input);

  Future<AuthResult> requestPasswordReset(String email);

  Future<AuthResult> resetPassword(String token, String newPassword);

  Future<void> logout();

  Future<AuthResult> refreshToken();

  bool get isAuthenticated;

  String? get currentToken;
}

abstract class IUserService {
  Future<AuthResult> getCurrentUser();

  Future<AuthResult> updateUser(String id, UpdateUserInput input);

  Future<bool> isEmailTaken(String email);

  Future<AuthResult> deleteUser(String id);
}
