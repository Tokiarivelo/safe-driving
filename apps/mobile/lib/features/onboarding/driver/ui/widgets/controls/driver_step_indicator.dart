import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class DriverStepIndicator extends StatelessWidget {
  final int currentStep;
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
      children: [
        _buildCircularProgress(),
        const SizedBox(width: 8),
        Expanded(
          child: Transform.translate(
            offset: const Offset(0, -5),
            child: Container(
              alignment: Alignment.centerLeft,
              child: _buildDotDashProgress(),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCircularProgress() {
    final progress = (currentStep + 1) / totalSteps;

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
          // Step text
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

  Widget _buildDotDashProgress() {
    return Row(
      children: List.generate(totalSteps, (index) {
        final isActive = index <= currentStep;
        final isLast = index == totalSteps - 1;

        return Row(
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isActive
                    ? AppColors.light
                    : AppColors.light.withValues(alpha: 0.3),
              ),
            ),
            if (!isLast)
              Container(
                width: 16,
                height: 2,
                margin: const EdgeInsets.symmetric(horizontal: 2),
                decoration: BoxDecoration(
                  color: isActive
                      ? AppColors.light
                      : AppColors.light.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(1),
                ),
              ),
          ],
        );
      }),
    );
  }
}
