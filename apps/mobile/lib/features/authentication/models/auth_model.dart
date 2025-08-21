import 'user/user_model.dart';

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

class CreateUserInput {
  final String email;
  final String firstName;
  final String? lastName;
  final String? phone;
  final String password;
  final List<String>? roleIds;

  CreateUserInput({
    required this.email,
    required this.firstName,
    this.lastName,
    this.phone,
    required this.password,
    this.roleIds,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'password': password,
      'roleIds': roleIds,
    };
  }
}

class RegisterInput {
  final String email;
  final String firstName;
  final String password;
  final String? lastName;
  final String? phone;

  RegisterInput({
    required this.email,
    required this.firstName,
    required this.password,
    this.lastName,
    this.phone,
  });

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {
      'email': email,
      'firstName': firstName,
      'password': password,
    };
    if (lastName != null) data['lastName'] = lastName;
    if (phone != null) data['phone'] = phone;
    return data;
  }
}

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
