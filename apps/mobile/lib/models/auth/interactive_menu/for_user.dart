import 'package:flutter/material.dart';

class StepInfo {
  final String title;
  final IconData? icon;
  final String? emoji;

  const StepInfo({required this.title, this.icon, this.emoji});
}

class AppState {
  final bool gpsEnabled;
  final bool notifEnabled;
  final String selectedTheme;
  final List<String> selectedTransports;
  final String selectedLanguage;

  const AppState({
    this.gpsEnabled = false,
    this.notifEnabled = false,
    this.selectedTheme = 'Clair',
    this.selectedTransports = const [],
    this.selectedLanguage = 'Français',
  });

  AppState copyWith({
    bool? gpsEnabled,
    bool? notifEnabled,
    String? selectedTheme,
    List<String>? selectedTransports,
    String? selectedLanguage,
  }) {
    return AppState(
      gpsEnabled: gpsEnabled ?? this.gpsEnabled,
      notifEnabled: notifEnabled ?? this.notifEnabled,
      selectedTheme: selectedTheme ?? this.selectedTheme,
      selectedTransports: selectedTransports ?? this.selectedTransports,
      selectedLanguage: selectedLanguage ?? this.selectedLanguage,
    );
  }
}
