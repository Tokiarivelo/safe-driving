import 'user/user.dart';

class AuthResult {
  final bool success;
  final User? user;
  final String? token;
  final String? refreshToken;
  final String? errorMessage;
  final String? errorCode;

  AuthResult({
    required this.success,
    this.user,
    this.token,
    this.refreshToken,
    this.errorMessage,
    this.errorCode,
  });

  factory AuthResult.success({
    required User user,
    required String token,
    String? refreshToken,
  }) {
    return AuthResult(
      success: true,
      user: user,
      token: token,
      refreshToken: refreshToken,
    );
  }

  factory AuthResult.failure({
    required String errorMessage,
    String? errorCode,
  }) {
    return AuthResult(
      success: false,
      errorMessage: errorMessage,
      errorCode: errorCode,
    );
  }

  factory AuthResult.fromJson(Map<String, dynamic> json) {
    return AuthResult(
      success: json['success'] ?? false,
      user: json['user'] != null ? User.fromJson(json['user']) : null,
      token: json['token'],
      refreshToken: json['refreshToken'],
      errorMessage: json['errorMessage'],
      errorCode: json['errorCode'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'user': user?.toJson(),
      'token': token,
      'refreshToken': refreshToken,
      'errorMessage': errorMessage,
      'errorCode': errorCode,
    };
  }

  bool get isAuthenticated => success && user != null && token != null;
}
