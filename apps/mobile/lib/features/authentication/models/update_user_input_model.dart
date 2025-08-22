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
