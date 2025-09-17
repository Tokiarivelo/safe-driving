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

  // Produce a payload matching UserUpdateInput (StringFieldUpdateOperationsInput wrappers)
  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};

    if (firstName != null) data['firstName'] = {'set': firstName};
    if (lastName != null) data['lastName'] = {'set': lastName};
    if (email != null) data['email'] = {'set': email};
    if (phoneNumber != null) data['phone'] = {'set': phoneNumber};

    // Note: userId is not included; server uses @CurrentUser to target the record
    return data;
  }
}
