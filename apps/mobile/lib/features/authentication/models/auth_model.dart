import 'package:safe_driving/features/authentication/models/user_model.dart';

class AuthResponse {
  final String token;
  final User user;

  AuthResponse({required this.token, required this.user});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      token: json['token'],
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {'token': token, 'user': user.toJson()};
  }
}

class RegisterInput {
  final String email;
  final String firstName;
  final String password;
  final String? lastName;
  final String? phone;
  final List<String>? roleIds;

  RegisterInput({
    required this.email,
    required this.firstName,
    required this.password,
    this.lastName,
    this.phone,
    this.roleIds,
  });

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {
      'email': email,
      'firstName': firstName,
      'password': password,
    };
    if (lastName != null) data['lastName'] = lastName;
    if (phone != null) data['phone'] = phone;
    if (roleIds != null) data['roleIds'] = roleIds;
    return data;
  }
}

typedef CreateUserInput = RegisterInput;

class UpdateUserInput {
  final String? firstName;
  final String? lastName;
  final String? phone;
  final List<String>? roleIds;

  UpdateUserInput({this.firstName, this.lastName, this.phone, this.roleIds});

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    if (firstName != null) data['firstName'] = firstName;
    if (lastName != null) data['lastName'] = lastName;
    if (phone != null) data['phone'] = phone;
    if (roleIds != null) data['roleIds'] = roleIds;
    return data;
  }
}
