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
          Container(width: 50, height: 50),
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
