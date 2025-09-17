import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class MessageTab extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const MessageTab({
    super.key,
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? AppColors.color1 : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isActive ? AppColors.light : AppColors.unclickable,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
