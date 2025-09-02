class AppState {
  final String theme;
  final String language;
  final bool gpsEnabled;
  final bool notificationsEnabled;
  final List<String> transportPreferences;
  final bool onboardingCompleted;

  const AppState({
    this.theme = 'light',
    this.language = 'fr',
    this.gpsEnabled = false,
    this.notificationsEnabled = false,
    this.transportPreferences = const [],
    this.onboardingCompleted = false,
  });

  AppState copyWith({
    String? theme,
    String? language,
    bool? gpsEnabled,
    bool? notificationsEnabled,
    List<String>? transportPreferences,
    bool? onboardingCompleted,
  }) {
    return AppState(
      theme: theme ?? this.theme,
      language: language ?? this.language,
      gpsEnabled: gpsEnabled ?? this.gpsEnabled,
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      transportPreferences: transportPreferences ?? this.transportPreferences,
      onboardingCompleted: onboardingCompleted ?? this.onboardingCompleted,
    );
  }

  factory AppState.fromJson(Map<String, dynamic> json) {
    return AppState(
      theme: json['theme'] ?? 'light',
      language: json['language'] ?? 'fr',
      gpsEnabled: json['gpsEnabled'] ?? false,
      notificationsEnabled: json['notificationsEnabled'] ?? false,
      transportPreferences: List<String>.from(
        json['transportPreferences'] ?? [],
      ),
      onboardingCompleted: json['onboardingCompleted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'theme': theme,
      'language': language,
      'gpsEnabled': gpsEnabled,
      'notificationsEnabled': notificationsEnabled,
      'transportPreferences': transportPreferences,
      'onboardingCompleted': onboardingCompleted,
    };
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is AppState &&
        other.theme == theme &&
        other.language == language &&
        other.gpsEnabled == gpsEnabled &&
        other.notificationsEnabled == notificationsEnabled &&
        other.transportPreferences.toString() ==
            transportPreferences.toString() &&
        other.onboardingCompleted == onboardingCompleted;
  }

  @override
  int get hashCode {
    return theme.hashCode ^
        language.hashCode ^
        gpsEnabled.hashCode ^
        notificationsEnabled.hashCode ^
        transportPreferences.hashCode ^
        onboardingCompleted.hashCode;
  }
}
