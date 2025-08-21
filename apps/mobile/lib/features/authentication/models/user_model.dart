import 'package:safe_driving/features/authentication/models/role_model.dart';
import 'package:safe_driving/features/authentication/models/user_image_model.dart';

class User {
  final String id;
  final String email;
  final String? firstName;
  final String? lastName;
  final String? phoneNumber;
  final String? phone;
  final List<String> roleNames;
  final List<Role> roles;
  final List<UserImage> images;
  final DateTime createdAt;
  final DateTime? updatedAt;
  final bool isEmailVerified;
  final bool isVerified;
  final bool isActive;

  const User({
    required this.id,
    required this.email,
    this.firstName,
    this.lastName,
    this.phoneNumber,
    this.phone,
    this.roleNames = const [],
    this.roles = const [],
    this.images = const [],
    required this.createdAt,
    this.updatedAt,
    required this.isEmailVerified,
    this.isVerified = false,
    required this.isActive,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      phoneNumber: json['phoneNumber'],
      phone: json['phone'],
      roleNames: List<String>.from(json['roles'] ?? []),
      roles: (json['Role'] as List<dynamic>? ?? [])
          .map((role) => Role.fromJson(role))
          .toList(),
      images: (json['images'] as List<dynamic>? ?? [])
          .map((image) => UserImage.fromJson(image))
          .toList(),
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'])
          : null,
      isEmailVerified: json['isEmailVerified'] ?? false,
      isVerified: json['isVerified'] ?? false,
      isActive: json['isActive'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phoneNumber': phoneNumber,
      'phone': phone,
      'roles': roleNames,
      'Role': roles.map((role) => role.toJson()).toList(),
      'images': images.map((image) => image.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'isEmailVerified': isEmailVerified,
      'isVerified': isVerified,
      'isActive': isActive,
    };
  }

  String get fullName {
    if (firstName != null && lastName != null) {
      return '$firstName $lastName';
    }
    return firstName ?? email;
  }

  bool hasRole(String roleName) {
    return roleNames.contains(roleName) ||
        roles.any((role) => role.name == roleName);
  }

  bool get isAdmin => hasRole('ADMIN');
  bool get isSuperAdmin => hasRole('SUPERADMIN');
  bool get isDriver => hasRole('DRIVER');
  bool get isUser => hasRole('USER');

  String? get profileImageUrl {
    try {
      return images.firstWhere((image) => image.type == 'profile').url;
    } catch (e) {
      return null;
    }
  }

  User copyWith({
    String? id,
    String? email,
    String? firstName,
    String? lastName,
    String? phoneNumber,
    String? phone,
    List<String>? roleNames,
    List<Role>? roles,
    List<UserImage>? images,
    DateTime? createdAt,
    DateTime? updatedAt,
    bool? isEmailVerified,
    bool? isVerified,
    bool? isActive,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      phone: phone ?? this.phone,
      roleNames: roleNames ?? this.roleNames,
      roles: roles ?? this.roles,
      images: images ?? this.images,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      isVerified: isVerified ?? this.isVerified,
      isActive: isActive ?? this.isActive,
    );
  }
}
