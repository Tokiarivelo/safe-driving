import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../models/onboarding_step_base.dart';

class StepIndicator extends StatelessWidget {
  final OnboardingStepBase currentStep;
  final Color? activeColor;
  final Color? inactiveColor;
  final Color? completedColor;
  final double? indicatorHeight;
  final TextStyle? textStyle;

  const StepIndicator({
    super.key,
    required this.currentStep,
    this.activeColor,
    this.inactiveColor,
    this.completedColor,
    this.indicatorHeight,
    this.textStyle,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final defaultActiveColor = activeColor ?? theme.primaryColor;
    final defaultInactiveColor = inactiveColor ?? theme.disabledColor;
    final defaultCompletedColor = completedColor ?? Colors.green;
    final defaultHeight = indicatorHeight ?? 6.0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Step progress text
        Text(
          'Étape ${currentStep.stepNumber} sur ${currentStep.totalSteps}',
          style: textStyle ?? theme.textTheme.bodyMedium,
        ),
        const SizedBox(height: 8),

        // Progress bar
        LinearProgressIndicator(
          value: currentStep.progress,
          backgroundColor: defaultInactiveColor.withValues(alpha: 0.3),
          valueColor: AlwaysStoppedAnimation<Color>(
            currentStep.isCompleted
                ? defaultCompletedColor
                : defaultActiveColor,
          ),
          minHeight: defaultHeight,
        ),

        const SizedBox(height: 8),

        Text(
          currentStep.title,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),

        if (currentStep.description != null) ...[
          const SizedBox(height: 4),
          Text(
            currentStep.description!,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.textTheme.bodySmall?.color?.withValues(alpha: 0.7),
            ),
          ),
        ],
      ],
    );
  }
}

class HorizontalStepIndicator extends StatelessWidget {
  final OnboardingStepBase currentStep;
  final Color? activeColor;
  final Color? inactiveColor;
  final Color? completedColor;
  final double? dotSize;
  final double? spacing;

  const HorizontalStepIndicator({
    super.key,
    required this.currentStep,
    this.activeColor,
    this.inactiveColor,
    this.completedColor,
    this.dotSize,
    this.spacing,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final defaultActiveColor = activeColor ?? theme.primaryColor;
    final defaultInactiveColor = inactiveColor ?? theme.disabledColor;
    final defaultCompletedColor = completedColor ?? Colors.green;
    final defaultDotSize = dotSize ?? 12.0;
    final defaultSpacing = spacing ?? 16.0;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(currentStep.totalSteps, (index) {
        final stepNumber = index + 1;
        final isActive = stepNumber == currentStep.stepNumber;
        final isCompleted = stepNumber < currentStep.stepNumber;

        Color dotColor;
        if (isCompleted) {
          dotColor = defaultCompletedColor;
        } else if (isActive) {
          dotColor = defaultActiveColor;
        } else {
          dotColor = defaultInactiveColor;
        }

        return Container(
          margin: EdgeInsets.symmetric(horizontal: defaultSpacing / 2),
          width: defaultDotSize,
          height: defaultDotSize,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: dotColor,
            border: isActive
                ? Border.all(color: defaultActiveColor, width: 2)
                : null,
          ),
          child: isCompleted
              ? Icon(
                  Icons.check,
                  size: defaultDotSize * 0.6,
                  color: AppColors.light,
                )
              : null,
        );
      }),
    );
  }
}
