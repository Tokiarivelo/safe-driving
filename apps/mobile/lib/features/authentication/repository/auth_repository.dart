import '../models/auth_result.dart';
import '../models/user/user_model.dart';

class AuthRepository {
  Future<AuthResult> signIn({
    required String email,
    required String password,
  }) async {
    throw UnimplementedError('signIn not implemented yet');
  }

  Future<AuthResult> signUp({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
  }) async {
    throw UnimplementedError('signUp not implemented yet');
  }

  Future<AuthResult> resetPassword({required String email}) async {
    throw UnimplementedError('resetPassword not implemented yet');
  }

  Future<AuthResult> signInWithGoogle() async {
    throw UnimplementedError('signInWithGoogle not implemented yet');
  }

  Future<AuthResult> signInWithFacebook() async {
    throw UnimplementedError('signInWithFacebook not implemented yet');
  }

  Future<void> signOut() async {
    throw UnimplementedError('signOut not implemented yet');
  }

  Future<bool> verifyToken(String token) async {
    throw UnimplementedError('verifyToken not implemented yet');
  }

  Future<String?> refreshToken(String refreshToken) async {
    throw UnimplementedError('refreshToken not implemented yet');
  }

  Future<User?> getCurrentUser() async {
    throw UnimplementedError('getCurrentUser not implemented yet');
  }

  Future<User> updateProfile({
    required String userId,
    String? firstName,
    String? lastName,
    String? email,
    String? phone,
  }) async {
    throw UnimplementedError('updateProfile not implemented yet');
  }

  Future<bool> changePassword({
    required String currentPassword,
    required String newPassword,
  }) async {
    throw UnimplementedError('changePassword not implemented yet');
  }

  Future<bool> deleteAccount({
    required String userId,
    required String password,
  }) async {
    throw UnimplementedError('deleteAccount not implemented yet');
  }
}
