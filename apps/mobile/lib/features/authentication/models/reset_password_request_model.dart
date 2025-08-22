class ResetPasswordRequest {
  final String email;

  const ResetPasswordRequest({
    required this.email,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
    };
  }
}
