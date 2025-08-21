import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';

import '../../../../../../core/constants/colors/colors.dart';

class NavigationLinksBuilder {
  static Widget buildNavigationLink({
    required AuthStepContent stepData,
    required VoidCallback? onTap,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          stepData.navigationPrefix,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.textColor,
            fontSize: 12,
          ),
        ),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: AppColors.buttonWithoutBackGround,
                  width: 1.5,
                ),
              ),
            ),
            child: Text(
              stepData.navigationLink,
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: 9,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }

  static Widget buildBackToLoginButton({
    required String backText,
    required VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
          const SizedBox(width: 8),
          Text(
            backText,
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
            ),
          ),
        ],
      ),
    );
  }
}
