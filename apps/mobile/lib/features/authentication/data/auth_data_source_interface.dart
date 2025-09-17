import 'package:safe_driving/features/authentication/models/change_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/reset_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/update_profile_request_model.dart';

import '../models/auth_request.dart';

abstract class IAuthDataSource {
  Future<Map<String, dynamic>> signIn(SignInRequest request);
  Future<Map<String, dynamic>> signUp(SignUpRequest request);
  Future<Map<String, dynamic>> resetPassword(ResetPasswordRequest request);
  Future<Map<String, dynamic>> resetPasswordConfirm(String sessionToken, String newPassword);
  Future<Map<String, dynamic>> refreshToken(String refreshToken);
  Future<Map<String, dynamic>> signInWithGoogle();
  Future<Map<String, dynamic>> signInWithFacebook();
  Future<Map<String, dynamic>> getCurrentUser();
  Future<Map<String, dynamic>> updateProfile(UpdateProfileRequest request);
  Future<Map<String, dynamic>> changePassword(ChangePasswordRequest request);
  Future<Map<String, dynamic>> deleteAccount(String userId, String password);
}
