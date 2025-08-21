import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class UserStepIndicator extends StatelessWidget {
  final int currentStep;
  final int totalSteps;
  final VoidCallback? onTap;

  const UserStepIndicator({
    super.key,
    required this.currentStep,
    required this.totalSteps,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 60,
        height: 60,
        child: Stack(
          alignment: Alignment.center,
          children: [
            CircularProgressIndicator(
              value: currentStep / totalSteps,
              backgroundColor: AppColors.light,
              valueColor: AlwaysStoppedAnimation(AppColors.progress),
              strokeWidth: 4,
            ),
            Text(
              '$currentStep/$totalSteps',
              style: const TextStyle(
                color: AppColors.light,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
