import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/presentation/onboarding/driver/ui/widgets/base_photos_modal.dart';

class CapturedPhotosModal extends BasePhotosModal {
  const CapturedPhotosModal({
    super.key,
    required super.selectedImages,
    required super.onImagesChanged,
  });

  @override
  CapturedPhotosModalState createState() => CapturedPhotosModalState();
}

class CapturedPhotosModalState
    extends BasePhotosModalState<CapturedPhotosModal> {
  @override
  Widget buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          "Photo(s) capturée(s)",
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.textColor,
            fontFamily: 'Inder',
          ),
        ),
        IconButton(
          icon: const Icon(Icons.close, color: AppColors.textColor),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ],
    );
  }

  @override
  Widget buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.photo_library_outlined,
            size: 64,
            color: AppColors.textColor.withValues(alpha: 0.5),
          ),
          const SizedBox(height: 16),
          Text(
            'Aucune photo sélectionnée',
            style: TextStyle(
              fontSize: 18,
              color: AppColors.textColor.withValues(alpha: 0.7),
              fontFamily: 'Inder',
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget buildActionButtons() {
    if (localImages.isEmpty) {
      return const SizedBox.shrink();
    }
    return ButtonsWidget.transparentButton(
      text: localImages.length > 1 ? 'Tout supprimer' : 'Supprimer',
      onPressed: showDeleteAllConfirmation,
      fontSize: 14,
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
      textColor: AppColors.buttonWithoutBackGround,
      borderColor: AppColors.light,
      elevation: 2,
      icon: const Icon(Icons.delete, color: AppColors.buttonWithoutBackGround),
    );
  }
}
