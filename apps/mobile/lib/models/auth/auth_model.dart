class Role {
  final String id;
  final String name;

  Role({required this.id, required this.name});

  factory Role.fromJson(Map<String, dynamic> json) {
    return Role(id: json['id'], name: json['name']);
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name};
  }
}

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

// RegisterInput for registration
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

// Auth Steps Data
class StepAuthDataText {
  static final Map<String, StepAuthContent> stepContents = {
    'forgotPassword': StepAuthContent(
      title: "🔒 Mot de passe oublié ?",
      subtitle:
          "Pas de panique, ça arrive à tout le monde. Entrez votre adresse e-mail dans le formulaire et nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.",
      subSubtitle: "",
      actionButtonText: "Reset Password",
      socialText: "",
      navigationPrefix: "",
      navigationLink: "",
      backToLoginText: "Back to login",
      forgotPasswordText: "",
      additionalContent: {
        "inputs": [
          {"hint": "Email", "icon": "email_outlined", "type": "email"},
        ],
      },
    ),
    'register': StepAuthContent(
      title: "🚀 Prêt à rejoindre Safe Driving ?",
      subtitle: "Explorez la ville comme jamais auparavant.",
      subSubtitle:
          "Créez votre compte et laissez notre assistant intelligent vous guider pour une expérience fluide, rapide et sécurisée.",
      actionButtonText: "S'inscrire",
      socialText: "- ou s'inscrire avec -",
      navigationPrefix: "Vous avez déjà un compte ? ",
      navigationLink: "Se connecter",
      backToLoginText: "",
      forgotPasswordText: "",
      additionalContent: {
        "inputs": [
          {"hint": "Nom", "icon": "badge_outlined", "type": "text"},
          {"hint": "Prénom", "icon": "badge_outlined", "type": "text"},
          {"hint": "Email", "icon": "email_outlined", "type": "email"},
          {"hint": "Mot de passe", "icon": "lock_outlined", "type": "password"},
          {
            "hint": "Confirmer le mot de passe",
            "icon": "lock_outlined",
            "type": "confirmPassword",
          },
        ],
      },
    ),
    'login': StepAuthContent(
      title: "👋 Bienvenue sur Safe Driving",
      subtitle: "Voyagez l'esprit léger.",
      subSubtitle:
          "Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en temps réel.",
      actionButtonText: "Se connecter",
      socialText: "- ou continuer avec -",
      navigationPrefix: "Pas encore de compte ? ",
      navigationLink: "S'inscrire",
      backToLoginText: "",
      forgotPasswordText: "Mot de passe oublié ?",
      additionalContent: {
        "inputs": [
          {
            "hint": "Email ou Nom d'utilisateur",
            "icon": "person_outline",
            "type": "email",
          },
          {"hint": "Mot de passe", "icon": "lock_outlined", "type": "password"},
        ],
      },
    ),
  };
}

class StepAuthContent {
  final String title;
  final String subtitle;
  final String subSubtitle;
  final String actionButtonText;
  final String socialText;
  final String navigationPrefix;
  final String navigationLink;
  final String backToLoginText;
  final String forgotPasswordText;
  final Map<String, dynamic>? additionalContent;

  StepAuthContent({
    required this.title,
    required this.subtitle,
    required this.subSubtitle,
    required this.actionButtonText,
    required this.socialText,
    required this.navigationPrefix,
    required this.navigationLink,
    required this.backToLoginText,
    required this.forgotPasswordText,
    this.additionalContent,
  });
}
