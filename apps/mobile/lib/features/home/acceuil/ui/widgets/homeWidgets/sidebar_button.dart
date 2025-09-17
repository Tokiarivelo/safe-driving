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
        child: SizedBox(
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
                color: AppColors.dark.withValues(alpha: 0.2),
              ),
              child: const Icon(Icons.person, color: AppColors.dark, size: 30),
            ),
          ),
        ),
      ),
    );
  }
}
