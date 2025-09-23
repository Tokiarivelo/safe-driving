// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SidebarProfile extends StatelessWidget {
  const SidebarProfile({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? AppColors.light : AppColors.dark;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'John Doe',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '« Pensionné de la route depuis 10 ans, votre confort et votre sécurité sont ma priorité. »',
            style: TextStyle(
              fontSize: 14,
              fontStyle: FontStyle.italic,
              color: textColor,
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
