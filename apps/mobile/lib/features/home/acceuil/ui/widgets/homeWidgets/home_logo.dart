import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class HomeLogo extends StatelessWidget {
  const HomeLogo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: SvgPicture.asset(
        'lib/resources/assets/logo/logo.svg',
        width: 150,
        height: 150,
        fit: BoxFit.contain,
        errorBuilder: (context, error, stackTrace) {
          return Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppColors.snackbarInfo.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.directions_car,
              size: 50,
              color: AppColors.snackbarInfo,
            ),
          );
        },
      ),
    );
  }
}
