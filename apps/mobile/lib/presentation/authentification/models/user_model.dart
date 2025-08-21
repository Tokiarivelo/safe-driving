import 'role_model.dart';

class UserImage {
  final String id;
  final String url;
  final String type;
  final String userId;

  UserImage({
    required this.id,
    required this.url,
    required this.type,
    required this.userId,
  });

  factory UserImage.fromJson(Map<String, dynamic> json) {
    return UserImage(
      id: json['id'],
      url: json['url'],
      type: json['type'],
      userId: json['userId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'url': url, 'type': type, 'userId': userId};
  }
}

class User {
  final String id;
  final String email;
  final String firstName;
  final String? lastName;
  final String? phone;
  final bool isVerified;
  final List<Role> roles;
  final List<UserImage> images;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.email,
    required this.firstName,
    this.lastName,
    this.phone,
    required this.isVerified,
    required this.roles,
    required this.images,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      phone: json['phone'],
      isVerified: json['isVerified'] ?? false,
      roles: (json['Role'] as List<dynamic>? ?? [])
          .map((role) => Role.fromJson(role))
          .toList(),
      images: (json['images'] as List<dynamic>? ?? [])
          .map((image) => UserImage.fromJson(image))
          .toList(),
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'isVerified': isVerified,
      'Role': roles.map((role) => role.toJson()).toList(),
      'images': images.map((image) => image.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  String get fullName {
    return lastName != null ? '$firstName $lastName' : firstName;
  }

  bool hasRole(String roleName) {
    return roles.any((role) => role.name == roleName);
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
}
