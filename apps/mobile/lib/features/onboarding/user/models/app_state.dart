class AppState {
  final String theme;
  final String language;
  final bool gpsEnabled;
  final bool notificationsEnabled;
  final List<String> transportPreferences;
  final bool onboardingCompleted;
  final int currentOnboardingStep;
  final Map<String, dynamic> userPreferences;
  final DateTime? lastUpdated;

  AppState({
    this.theme = 'light',
    this.language = 'fr',
    this.gpsEnabled = false,
    this.notificationsEnabled = false,
    this.transportPreferences = const [],
    this.onboardingCompleted = false,
    this.currentOnboardingStep = 0,
    this.userPreferences = const {},
    this.lastUpdated,
  });

  factory AppState.fromJson(Map<String, dynamic> json) {
    return AppState(
      theme: json['theme'] ?? 'light',
      language: json['language'] ?? 'fr',
      gpsEnabled: json['gpsEnabled'] ?? false,
      notificationsEnabled: json['notificationsEnabled'] ?? false,
      transportPreferences: List<String>.from(json['transportPreferences'] ?? []),
      onboardingCompleted: json['onboardingCompleted'] ?? false,
      currentOnboardingStep: json['currentOnboardingStep'] ?? 0,
      userPreferences: Map<String, dynamic>.from(json['userPreferences'] ?? {}),
      lastUpdated: json['lastUpdated'] != null 
          ? DateTime.parse(json['lastUpdated'])
          : null,
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
      'currentOnboardingStep': currentOnboardingStep,
      'userPreferences': userPreferences,
      'lastUpdated': lastUpdated?.toIso8601String(),
    };
  }

  AppState copyWith({
    String? theme,
    String? language,
    bool? gpsEnabled,
    bool? notificationsEnabled,
    List<String>? transportPreferences,
    bool? onboardingCompleted,
    int? currentOnboardingStep,
    Map<String, dynamic>? userPreferences,
    DateTime? lastUpdated,
  }) {
    return AppState(
      theme: theme ?? this.theme,
      language: language ?? this.language,
      gpsEnabled: gpsEnabled ?? this.gpsEnabled,
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      transportPreferences: transportPreferences ?? this.transportPreferences,
      onboardingCompleted: onboardingCompleted ?? this.onboardingCompleted,
      currentOnboardingStep: currentOnboardingStep ?? this.currentOnboardingStep,
      userPreferences: userPreferences ?? this.userPreferences,
      lastUpdated: lastUpdated ?? this.lastUpdated,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is AppState &&
        other.theme == theme &&
        other.language == language &&
        other.gpsEnabled == gpsEnabled &&
        other.notificationsEnabled == notificationsEnabled &&
        other.onboardingCompleted == onboardingCompleted &&
        other.currentOnboardingStep == currentOnboardingStep;
  }

  @override
  int get hashCode {
    return Object.hash(
      theme,
      language,
      gpsEnabled,
      notificationsEnabled,
      onboardingCompleted,
      currentOnboardingStep,
    );
  }
}
