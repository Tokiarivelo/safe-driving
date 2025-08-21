import '../models/auth_models.dart';

abstract class AuthDataSource {
  Future<AuthResponse> login(String email, String password);
  Future<AuthResponse> register(RegisterInput input);
  Future<void> resetPassword(String password);
  Future<User> getCurrentUser();
  Future<User> updateUser(String id, UpdateUserInput input);
  Future<bool> isEmailTaken(String email);
}
