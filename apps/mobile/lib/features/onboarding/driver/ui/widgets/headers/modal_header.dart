import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

/// Reusable header widget for modals
class ModalHeader extends StatelessWidget {
  final String title;
  final VoidCallback? onClose;

  const ModalHeader({super.key, required this.title, this.onClose});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.textColor,
            fontFamily: 'Inder',
          ),
        ),
        IconButton(
          icon: const Icon(Icons.close, color: AppColors.textColor),
          onPressed: onClose ?? () => Navigator.of(context).pop(),
        ),
      ],
    );
  }
}
