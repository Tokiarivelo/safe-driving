import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class PhotoGalleryView extends StatelessWidget {
  final List<File> images;
  final PageController pageController;
  final int currentIndex;
  final Function(int) onPageChanged;
  final Function(int) onDeleteImage;

  const PhotoGalleryView({
    super.key,
    required this.images,
    required this.pageController,
    required this.currentIndex,
    required this.onPageChanged,
    required this.onDeleteImage,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: kIsWeb ? _buildWebGallery(context) : _buildMobileGallery(),
        ),
        Positioned(
          top: 16,
          right: 16,
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.dark.adapt(context).withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(20),
            ),
            child: IconButton(
              icon: Icon(Icons.delete, color: AppColors.light.adapt(context)),
              onPressed: () => onDeleteImage(currentIndex),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildWebGallery(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 300,
      decoration: BoxDecoration(
        color: AppColors.softBackgroundColor.adapt(context),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Center(
        child: Text(
          'Aperçu des photos non disponible sur le web',
          style: TextStyle(
            fontSize: 16,
            color: AppColors.textColor.adapt(context).withValues(alpha: 0.7),
            fontFamily: 'Inder',
          ),
        ),
      ),
    );
  }

  Widget _buildMobileGallery() {
    return SizedBox(
      height: 300,
      child: PageView.builder(
        controller: pageController,
        onPageChanged: onPageChanged,
        itemCount: images.length,
        itemBuilder: (context, index) {
          return Container(
            margin: const EdgeInsets.symmetric(horizontal: 4),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: AppColors.dark.adapt(context).withValues(alpha: 0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.file(
                images[index],
                fit: BoxFit.cover,
                width: double.infinity,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: AppColors.softBackgroundColor.adapt(context),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.error_outline,
                          size: 48,
                          color: AppColors.textColor
                              .adapt(context)
                              .withValues(alpha: 0.5),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Erreur de chargement',
                          style: TextStyle(
                            color: AppColors.textColor
                                .adapt(context)
                                .withValues(alpha: 0.7),
                            fontFamily: 'Inder',
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }
}
