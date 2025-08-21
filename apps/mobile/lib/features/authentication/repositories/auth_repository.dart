import 'package:safe_driving/features/authentication/models/auth_request.dart';
import 'package:safe_driving/features/authentication/data/auth_data_source_interface.dart';

class AuthRepository {
  final IAuthDataSource _dataSource;

  AuthRepository(this._dataSource);

  Future<Map<String, dynamic>> signIn(String email, String password) async {
    final request = SignInRequest(email: email, password: password);
    return await _dataSource.signIn(request);
  }

  Future<Map<String, dynamic>> signUp(String firstName, String lastName, String email, String password) async {
    final request = SignUpRequest(
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    );
    return await _dataSource.signUp(request);
  }

  Future<Map<String, dynamic>> resetPassword(String email) async {
    final request = ResetPasswordRequest(email: email);
    return await _dataSource.resetPassword(request);
  }

  Future<Map<String, dynamic>> getCurrentUser() async {
    return await _dataSource.getCurrentUser();
  }

  Future<Map<String, dynamic>> updateProfile({
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
    return await _dataSource.updateProfile(request);
  }

  Future<Map<String, dynamic>> changePassword(String currentPassword, String newPassword) async {
    final request = ChangePasswordRequest(
      currentPassword: currentPassword,
      newPassword: newPassword,
    );
    return await _dataSource.changePassword(request);
  }

  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    return await _dataSource.refreshToken(refreshToken);
  }

  Future<Map<String, dynamic>> signInWithGoogle() async {
    return await _dataSource.signInWithGoogle();
  }

  Future<Map<String, dynamic>> signInWithFacebook() async {
    return await _dataSource.signInWithFacebook();
  }

  Future<Map<String, dynamic>> deleteAccount(String userId, String password) async {
    return await _dataSource.deleteAccount(userId, password);
  }
}
