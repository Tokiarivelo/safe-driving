// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sidebar_profile.dart';

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
    final isDark = Theme.of(context).brightness == Brightness.dark;
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
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [AppColors.color1, AppColors.color2],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                border: Border.all(color: AppColors.light, width: 2),
              ),
              child: const Icon(
                Icons.person,
                color: AppColors.light,
                size: 30,
              ),
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(child: SidebarProfile()),
          IconButton(
            icon: Icon(Icons.close, color: isDark ? AppColors.light : AppColors.dark),
            onPressed: onClose,
          ),
        ],
      ),
    );
  }
}
