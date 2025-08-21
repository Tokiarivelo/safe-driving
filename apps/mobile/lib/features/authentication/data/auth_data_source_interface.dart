import '../models/auth_request.dart';

abstract class IAuthDataSource {
  Future<Map<String, dynamic>> signIn(SignInRequest request);
  Future<Map<String, dynamic>> signUp(SignUpRequest request);
  Future<Map<String, dynamic>> resetPassword(ResetPasswordRequest request);
  Future<Map<String, dynamic>> refreshToken(String refreshToken);
  Future<Map<String, dynamic>> signInWithGoogle();
  Future<Map<String, dynamic>> signInWithFacebook();
  Future<Map<String, dynamic>> getCurrentUser();
  Future<Map<String, dynamic>> updateProfile(UpdateProfileRequest request);
  Future<Map<String, dynamic>> changePassword(ChangePasswordRequest request);
  Future<Map<String, dynamic>> deleteAccount(String userId, String password);
}
