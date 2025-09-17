// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class SidebarProfile extends StatelessWidget {
  const SidebarProfile({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'John Doe',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.dark,
            ),
          ),
          SizedBox(height: 8),
          Text(
            '« Pensionné de la route depuis 10 ans, votre confort et votre sécurité sont ma priorité. »',
            style: TextStyle(
              fontSize: 14,
              fontStyle: FontStyle.italic,
              color: AppColors.dark,
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
