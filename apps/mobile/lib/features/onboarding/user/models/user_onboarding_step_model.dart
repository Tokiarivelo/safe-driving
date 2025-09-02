import 'package:flutter/material.dart';
import '../../../../shared/shared_onboarding/models/onboarding_step_base.dart';

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

class StepInfo {
  final String title;
  final IconData? icon;
  final String? emoji;

  const StepInfo({required this.title, this.icon, this.emoji});
}

/// User onboarding step model extending the base class
class UserOnboardingStepModel extends OnboardingStepBase {
  final String subtitle;
  final List<String> buttonTitles;
  final Map<String, dynamic>? additionalContent;
  final UserStepType stepType;
  final bool isOptional;

  const UserOnboardingStepModel({
    required super.stepNumber,
    required super.title,
    required this.subtitle,
    super.description,
    super.isCompleted,
    super.isActive,
    this.buttonTitles = const [],
    this.additionalContent,
    required this.stepType,
    this.isOptional = false,
  });

  @override
  int get totalSteps => 5; // Aligned with UserOnboardingData.totalSteps

  @override
  UserOnboardingStepModel copyWith({
    int? stepNumber,
    String? title,
    String? subtitle,
    String? description,
    bool? isCompleted,
    bool? isActive,
    List<String>? buttonTitles,
    Map<String, dynamic>? additionalContent,
    UserStepType? stepType,
    bool? isOptional,
  }) {
    return UserOnboardingStepModel(
      stepNumber: stepNumber ?? this.stepNumber,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      isActive: isActive ?? this.isActive,
      buttonTitles: buttonTitles ?? this.buttonTitles,
      additionalContent: additionalContent ?? this.additionalContent,
      stepType: stepType ?? this.stepType,
      isOptional: isOptional ?? this.isOptional,
    );
  }
}

/// User step types enum
enum UserStepType {
  role,
  welcome,
  location,
  notifications,
  preferences,
  summary,
}
