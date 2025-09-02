class SignInRequest {
  final String email;
  final String password;

  const SignInRequest({required this.email, required this.password});

  Map<String, dynamic> toJson() {
    return {'email': email, 'password': password};
  }
}

class SignUpRequest {
  final String firstName;
  final String lastName;
  final String email;
  final String password;

  const SignUpRequest({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password,
    };
  }
}

// Les modèles ResetPasswordRequest, ChangePasswordRequest et UpdateProfileRequest
// sont maintenant définis dans leurs fichiers individuels pour éviter la duplication
