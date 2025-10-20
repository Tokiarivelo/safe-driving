// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/l10n/l10n.dart';

class SidebarLogout extends StatelessWidget {
  final VoidCallback onLogout;

  const SidebarLogout({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
      child: InkWell(
        onTap: onLogout,
        child: Container(
          decoration: BoxDecoration(
            color: isDark
                ? AppColors.backgroundSecondary
                : AppColors.light.withValues(alpha: 0.8),
            border: Border(
              top: BorderSide(
                color: isDark ? AppColors.borderButtonDark : AppColors.dark,
                width: 0.5,
              ),
            ),
          ),
          padding: const EdgeInsets.only(top: 12.0),
          child: Row(
            children: [
              Icon(
                Icons.logout,
                color: isDark ? AppColors.light : AppColors.dark,
                size: 22,
              ),
              const SizedBox(width: 24.0),
              Text(
                context.l10n.logout,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: isDark ? AppColors.light : AppColors.dark,
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
