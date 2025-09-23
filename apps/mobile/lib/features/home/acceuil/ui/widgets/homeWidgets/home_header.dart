import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 20.0),
      child: Row(
        children: [
          const SizedBox(width: 50, height: 50),
          const SizedBox(width: 15),
          Expanded(
            child: Text(
              'Safe Driving',
              style: TextStyle(
                color: isDark ? AppColors.light : AppColors.dark,
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
