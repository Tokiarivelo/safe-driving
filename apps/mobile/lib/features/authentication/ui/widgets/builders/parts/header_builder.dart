import 'package:flutter/material.dart';
import '../../../../models/auth_step_content_model.dart';
import '../../../../../../core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class HeaderBuilder {
  static Widget buildHeaderText({
    required BuildContext context,
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
          style: AppTextStyles.h1Light(context),
        ),
        const SizedBox(height: 8),
        Text(
          stepData.subtitle,
          textAlign: TextAlign.center,
          style: AppTextStyles.caption12(context).copyWith(
            color: AppColors.titleColor.adapt(context).withAlpha(220),
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
              color: AppColors.titleColor.adapt(context).withAlpha(220),
            ),
          ),
        ],
      ],
    );
  }
}
