class UpdateProfileRequest {
  final String userId;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? phoneNumber;

  const UpdateProfileRequest({
    required this.userId,
    this.firstName,
    this.lastName,
    this.email,
    this.phoneNumber,
  });

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{
      'userId': userId,
    };
    
    if (firstName != null) data['firstName'] = firstName;
    if (lastName != null) data['lastName'] = lastName;
    if (email != null) data['email'] = email;
    if (phoneNumber != null) data['phoneNumber'] = phoneNumber;
    
    return data;
  }
}
