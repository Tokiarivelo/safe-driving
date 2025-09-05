// Authentication type definitions
import 'package:json_annotation/json_annotation.dart';
import 'user_types.dart';

part 'auth_types.g.dart';

@JsonSerializable()
class LoginInput {
  final String email;
  final String password;

  LoginInput({
    required this.email,
    required this.password,
  });

  factory LoginInput.fromJson(Map<String, dynamic> json) => 
      _$LoginInputFromJson(json);
  Map<String, dynamic> toJson() => _$LoginInputToJson(this);
}

@JsonSerializable()
class LoginOutput {
  final String token;
  final User user;

  LoginOutput({
    required this.token,
    required this.user,
  });

  factory LoginOutput.fromJson(Map<String, dynamic> json) => 
      _$LoginOutputFromJson(json);
  Map<String, dynamic> toJson() => _$LoginOutputToJson(this);
}

@JsonSerializable()
class RegisterInput {
  final String email;
  final String password;
  final String? firstName;
  final String? lastName;
  final String? phoneNumber;
  final String? role;

  RegisterInput({
    required this.email,
    required this.password,
    this.firstName,
    this.lastName,
    this.phoneNumber,
    this.role,
  });

  factory RegisterInput.fromJson(Map<String, dynamic> json) => 
      _$RegisterInputFromJson(json);
  Map<String, dynamic> toJson() => _$RegisterInputToJson(this);
}

@JsonSerializable()
class ForgotPasswordOutput {
  final bool success;
  final String? message;
  final String? sessionToken;

  ForgotPasswordOutput({
    required this.success,
    this.message,
    this.sessionToken,
  });

  factory ForgotPasswordOutput.fromJson(Map<String, dynamic> json) => 
      _$ForgotPasswordOutputFromJson(json);
  Map<String, dynamic> toJson() => _$ForgotPasswordOutputToJson(this);
}

@JsonSerializable()
class ResetPasswordInput {
  final String sessionToken;
  final String newPassword;

  ResetPasswordInput({
    required this.sessionToken,
    required this.newPassword,
  });

  factory ResetPasswordInput.fromJson(Map<String, dynamic> json) => 
      _$ResetPasswordInputFromJson(json);
  Map<String, dynamic> toJson() => _$ResetPasswordInputToJson(this);
}
