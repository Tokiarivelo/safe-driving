import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SidebarLogout extends StatelessWidget {
  final VoidCallback onLogout;

  const SidebarLogout({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
      child: InkWell(
        onTap: onLogout,
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.light.withValues(alpha: 0.8),
            border: Border(top: BorderSide(color: AppColors.dark, width: 0.5)),
          ),
          padding: EdgeInsets.only(top: 12.0),
          child: Row(
            children: [
              Icon(Icons.logout, color: AppColors.dark, size: 22),
              const SizedBox(width: 24.0),
              Text(
                'Logout',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: AppColors.dark,
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
