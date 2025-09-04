import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

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
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.dark.adapt(context),
            fontFamily: 'Inder',
          ),
        ),
        IconButton(
          icon: Icon(Icons.close, color: AppColors.dark.adapt(context)),
          onPressed: onClose ?? () => Navigator.of(context).pop(),
        ),
      ],
    );
  }
}
