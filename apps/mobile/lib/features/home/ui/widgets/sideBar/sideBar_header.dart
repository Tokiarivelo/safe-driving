import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/ui/widgets/sideBar/sidebar_profile.dart';

class SidebarHeader extends StatelessWidget {
  final VoidCallback onProfileTap;
  final VoidCallback onClose;

  const SidebarHeader({
    super.key,
    required this.onProfileTap,
    required this.onClose,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: onProfileTap,
            child: Container(
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
                    color: AppColors.light.withValues(alpha: 0.2),
                  ),
                  child: const Icon(
                    Icons.person,
                    color: AppColors.light,
                    size: 30,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(child: SidebarProfile()),
          IconButton(
            icon: Icon(Icons.close, color: AppColors.dark),
            onPressed: onClose,
          ),
        ],
      ),
    );
  }
}
