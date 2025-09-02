import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

/// Empty state widget for when no photos are selected
class EmptyStateWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;

  const EmptyStateWidget({
    super.key,
    required this.icon,
    required this.title,
    this.subtitle,
  });

  const EmptyStateWidget.noPhotos({super.key})
    : icon = Icons.photo_library_outlined,
      title = 'Aucune photo sélectionnée',
      subtitle = null;

  const EmptyStateWidget.addPhotos({super.key})
    : icon = Icons.photo_library_outlined,
      title = 'Aucune photo sélectionnée',
      subtitle =
          'Appuyez sur le bouton "Gallery" ou "Caméra" pour ajouter des photos';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 64,
            color: AppColors.textColor.withValues(alpha: 0.5),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              color: AppColors.textColor.withValues(alpha: 0.7),
              fontFamily: 'Inder',
            ),
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 8),
            Text(
              subtitle!,
              style: TextStyle(
                fontSize: 14,
                color: AppColors.textColor.withValues(alpha: 0.5),
                fontFamily: 'Inder',
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ],
      ),
    );
  }
}
