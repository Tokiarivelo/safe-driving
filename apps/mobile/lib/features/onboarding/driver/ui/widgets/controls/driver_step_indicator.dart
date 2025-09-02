import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class DriverStepIndicator extends StatelessWidget {
  final int currentStep; // 1-based index (1..totalSteps)
  final int totalSteps;

  const DriverStepIndicator({
    super.key,
    required this.currentStep,
    required this.totalSteps,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [_buildCircularProgress()],
    );
  }

  Widget _buildCircularProgress() {
    // Progress should start at 0% on the first step and reach 100% on the last step.
    // currentStep is 1-based, so use (currentStep - 1) / (totalSteps - 1).
    double progress;
    if (totalSteps <= 1) {
      progress = 0.0;
    } else {
      progress = (currentStep - 1) / (totalSteps - 1);
    }
    // Clamp just in case
    progress = progress.clamp(0.0, 1.0);

    return SizedBox(
      width: 50,
      height: 50,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background circle
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.light.withValues(alpha: 0.2),
            ),
          ),
          // Progress circle
          SizedBox(
            width: 50,
            height: 50,
            child: CircularProgressIndicator(
              value: progress,
              strokeWidth: 3,
              backgroundColor: AppColors.light.withValues(alpha: 0.3),
              valueColor: const AlwaysStoppedAnimation<Color>(AppColors.light),
            ),
          ),
          // Step text (displayed from 2 to 13 as per spec)
          Text(
            '${currentStep + 1}',
            style: const TextStyle(
              color: AppColors.light,
              fontSize: 16,
              fontWeight: FontWeight.bold,
              fontFamily: 'Inder',
            ),
          ),
        ],
      ),
    );
  }
}
