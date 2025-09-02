import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class UserProgressWidget extends StatelessWidget {
  final int currentStep;
  final int totalSteps;
  final String stepTitle;

  const UserProgressWidget({
    super.key,
    required this.currentStep,
    required this.totalSteps,
    required this.stepTitle,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          SizedBox(
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
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              stepTitle,
              style: const TextStyle(color: AppColors.light, fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }
}
