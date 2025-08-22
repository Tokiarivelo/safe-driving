abstract class OnboardingStepBase {
  final int stepNumber;
  final String title;
  final String? description;
  final bool isCompleted;
  final bool isActive;

  const OnboardingStepBase({
    required this.stepNumber,
    required this.title,
    this.description,
    this.isCompleted = false,
    this.isActive = false,
  });

  int get totalSteps;

  bool get isFirstStep => stepNumber == 1;

  bool get isLastStep => stepNumber == totalSteps;

  double get progress => stepNumber / totalSteps;

  OnboardingStepBase copyWith({
    int? stepNumber,
    String? title,
    String? description,
    bool? isCompleted,
    bool? isActive,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is OnboardingStepBase &&
        other.stepNumber == stepNumber &&
        other.title == title &&
        other.description == description &&
        other.isCompleted == isCompleted &&
        other.isActive == isActive;
  }

  @override
  int get hashCode {
    return stepNumber.hashCode ^
        title.hashCode ^
        description.hashCode ^
        isCompleted.hashCode ^
        isActive.hashCode;
  }
}
