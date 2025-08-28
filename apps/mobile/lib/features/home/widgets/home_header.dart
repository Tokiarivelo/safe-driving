import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 20.0),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            child: ShaderMask(
              shaderCallback: (bounds) => LinearGradient(
                colors: [AppColors.color1, AppColors.color2],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ).createShader(bounds),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.light, width: 2),
                  color: AppColors.dark.withValues(
                    alpha: 0.2,
                  ), // ton fond normal
                ),
                child: const Icon(
                  Icons.person,
                  color: AppColors.dark,
                  size: 30,
                ),
              ),
            ),
          ),
          const SizedBox(width: 15),
          const Expanded(
            child: Text(
              'Safe Driving',
              style: TextStyle(
                color: AppColors.dark,
                fontSize: 24,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.right,
            ),
          ),
        ],
      ),
    );
  }
}
