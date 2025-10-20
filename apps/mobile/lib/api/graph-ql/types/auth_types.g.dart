// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginInput _$LoginInputFromJson(Map<String, dynamic> json) => LoginInput(
  email: json['email'] as String,
  password: json['password'] as String,
);

Map<String, dynamic> _$LoginInputToJson(LoginInput instance) =>
    <String, dynamic>{'email': instance.email, 'password': instance.password};

LoginOutput _$LoginOutputFromJson(Map<String, dynamic> json) => LoginOutput(
  token: json['token'] as String,
  user: User.fromJson(json['user'] as Map<String, dynamic>),
);

Map<String, dynamic> _$LoginOutputToJson(LoginOutput instance) =>
    <String, dynamic>{'token': instance.token, 'user': instance.user};

RegisterInput _$RegisterInputFromJson(Map<String, dynamic> json) =>
    RegisterInput(
      email: json['email'] as String,
      password: json['password'] as String,
      firstName: json['firstName'] as String?,
      lastName: json['lastName'] as String?,
      phoneNumber: json['phoneNumber'] as String?,
      role: json['role'] as String?,
    );

Map<String, dynamic> _$RegisterInputToJson(RegisterInput instance) =>
    <String, dynamic>{
      'email': instance.email,
      'password': instance.password,
      'firstName': instance.firstName,
      'lastName': instance.lastName,
      'phoneNumber': instance.phoneNumber,
      'role': instance.role,
    };

ForgotPasswordOutput _$ForgotPasswordOutputFromJson(
  Map<String, dynamic> json,
) => ForgotPasswordOutput(
  success: json['success'] as bool,
  message: json['message'] as String?,
  sessionToken: json['sessionToken'] as String?,
);

Map<String, dynamic> _$ForgotPasswordOutputToJson(
  ForgotPasswordOutput instance,
) => <String, dynamic>{
  'success': instance.success,
  'message': instance.message,
  'sessionToken': instance.sessionToken,
};

ResetPasswordInput _$ResetPasswordInputFromJson(Map<String, dynamic> json) =>
    ResetPasswordInput(
      sessionToken: json['sessionToken'] as String,
      newPassword: json['newPassword'] as String,
    );

Map<String, dynamic> _$ResetPasswordInputToJson(ResetPasswordInput instance) =>
    <String, dynamic>{
      'sessionToken': instance.sessionToken,
      'newPassword': instance.newPassword,
    };
