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
