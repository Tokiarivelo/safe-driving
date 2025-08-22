import 'package:flutter/material.dart';
import '../../../../models/auth_step_content_model.dart';
import '../../../../../../core/constants/colors/colors.dart';

class HeaderBuilder {
  static Widget buildHeaderText({
    required AuthStepContent stepData,
    required bool isForgotPassword,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          stepData.title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 20,
            color: AppColors.titleColor,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          stepData.subtitle,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            color: AppColors.titleColor.withAlpha(220),
          ),
        ),
        if (!isForgotPassword && stepData.subSubtitle.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            stepData.subSubtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inder',
              fontSize: 12,
              fontWeight: FontWeight.w200,
              color: AppColors.titleColor.withAlpha(220),
            ),
          ),
        ],
      ],
    );
  }
}
