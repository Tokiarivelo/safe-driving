import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SidebarButton extends StatelessWidget {
  final VoidCallback onTap;
  final bool isVisible;

  const SidebarButton({
    super.key,
    required this.onTap,
    required this.isVisible,
  });

  @override
  Widget build(BuildContext context) {
    if (!isVisible) return const SizedBox.shrink();

    return Positioned(
      left: 20,
      top: 20,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              colors: [AppColors.color1, AppColors.color2],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            border: Border.all(color: AppColors.light, width: 2),
          ),
          child: const Icon(Icons.person, color: AppColors.light, size: 30),
        ),
      ),
    );
  }
}
