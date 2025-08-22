class UserOnboardingData {
  final String? userId;
  final Map<String, dynamic>? preferences;
  final Map<String, dynamic>? settings;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const UserOnboardingData({
    this.userId,
    this.preferences,
    this.settings,
    this.createdAt,
    this.updatedAt,
  });

  UserOnboardingData copyWith({
    String? userId,
    Map<String, dynamic>? preferences,
    Map<String, dynamic>? settings,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserOnboardingData(
      userId: userId ?? this.userId,
      preferences: preferences ?? this.preferences,
      settings: settings ?? this.settings,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  factory UserOnboardingData.fromJson(Map<String, dynamic> json) {
    return UserOnboardingData(
      userId: json['userId'],
      preferences: json['preferences'],
      settings: json['settings'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'preferences': preferences,
      'settings': settings,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is UserOnboardingData &&
        other.userId == userId &&
        other.preferences.toString() == preferences.toString() &&
        other.settings.toString() == settings.toString() &&
        other.createdAt == createdAt &&
        other.updatedAt == updatedAt;
  }

  @override
  int get hashCode {
    return userId.hashCode ^
        preferences.hashCode ^
        settings.hashCode ^
        createdAt.hashCode ^
        updatedAt.hashCode;
  }
}
