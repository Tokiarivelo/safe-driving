import 'package:safe_driving/features/authentication/models/auth_request.dart';
import 'package:safe_driving/features/authentication/services/auth_service.dart';
import '../models/auth_models.dart';

class AuthRepository {
  final AuthService _service;

  AuthRepository(this._service);

  Future<AuthResult> signIn(String email, String password) async {
    return await _service.signIn(email, password);
  }

  Future<AuthResult> signUp(
    String firstName,
    String lastName,
    String email,
    String password,
  ) async {
    final request = SignUpRequest(
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    );
    return await _service.signUp(request);
  }

  Future<AuthResult> resetPassword(String email) async {
    return await _service.resetPassword(email);
  }

  Future<AuthResult> getCurrentUser() async {
    return await _service.getCurrentUser();
  }

  Future<AuthResult> updateProfile({
    required String userId,
    String? firstName,
    String? lastName,
    String? email,
    String? phoneNumber,
  }) async {
    final request = UpdateProfileRequest(
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    );
    return await _service.updateProfile(request);
  }

  Future<AuthResult> changePassword(
    String currentPassword,
    String newPassword,
  ) async {
    final request = ChangePasswordRequest(
      currentPassword: currentPassword,
      newPassword: newPassword,
    );
    return await _service.changePassword(request);
  }

  Future<AuthResult> resetPasswordConfirm(String sessionToken, String newPassword) async {
    return await _service.resetPasswordConfirm(sessionToken, newPassword);
  }

  Future<AuthResult> refreshToken() async {
    return await _service.refreshToken();
  }

  Future<AuthResult> signInWithGoogle() async {
    return await _service.signInWithGoogle();
  }

  Future<AuthResult> signInWithFacebook() async {
    return await _service.signInWithFacebook();
  }

  Future<AuthResult> deleteAccount(String userId, String password) async {
    final res = await _service.deleteAccount(userId, password);
    return res;
  }

  Future<bool> isEmailTaken(String email) async {
    return await _service.isEmailTaken(email);
  }

  Future<void> logout() async {
    await _service.logout();
  }
}
