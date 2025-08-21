import 'package:flutter/material.dart';
import '../../shared/models/onboarding_step_base.dart';

class DriverOnboardingStepModel extends OnboardingStepBase {
  final String subtitle;
  final IconData? icon;
  final Map<String, dynamic>? additionalContent;
  final List<String> buttonTitles;
  final bool isOptional;
  final DriverStepType stepType;

  const DriverOnboardingStepModel({
    required super.stepNumber,
    required super.title,
    required this.subtitle,
    super.description,
    super.isCompleted,
    super.isActive,
    this.icon,
    this.additionalContent,
    this.buttonTitles = const [],
    this.isOptional = false,
    required this.stepType,
  });

  @override
  int get totalSteps => 14; // Driver onboarding has 14 steps

  @override
  DriverOnboardingStepModel copyWith({
    int? stepNumber,
    String? title,
    String? subtitle,
    String? description,
    bool? isCompleted,
    bool? isActive,
    IconData? icon,
    Map<String, dynamic>? additionalContent,
    List<String>? buttonTitles,
    bool? isOptional,
    DriverStepType? stepType,
  }) {
    return DriverOnboardingStepModel(
      stepNumber: stepNumber ?? this.stepNumber,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      isActive: isActive ?? this.isActive,
      icon: icon ?? this.icon,
      additionalContent: additionalContent ?? this.additionalContent,
      buttonTitles: buttonTitles ?? this.buttonTitles,
      isOptional: isOptional ?? this.isOptional,
      stepType: stepType ?? this.stepType,
    );
  }
}

enum DriverStepType {
  welcome,
  personalInfo,
  vehicleInfo,
  documents,
  photos,
  selfie,
  gps,
  notifications,
  preferences,
  summary,
  legal,
  completion,
}

class DriverFormField {
  final String key;
  final String label;
  final String hint;
  final IconData icon;
  final TextInputType inputType;
  final String? Function(String?)? validator;
  final bool isRequired;

  const DriverFormField({
    required this.key,
    required this.label,
    required this.hint,
    required this.icon,
    this.inputType = TextInputType.text,
    this.validator,
    this.isRequired = true,
  });
}
