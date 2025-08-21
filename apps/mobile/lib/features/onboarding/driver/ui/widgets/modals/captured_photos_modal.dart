import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/secondary_button.dart';
import '../base/unified_photos_modal.dart';
import '../headers/modal_header.dart';
import '../states/empty_state_widget.dart';

class CapturedPhotosModal extends UnifiedPhotosModal {
  const CapturedPhotosModal({
    super.key,
    required super.selectedImages,
    required super.onImagesChanged,
  });

  @override
  CapturedPhotosModalState createState() => CapturedPhotosModalState();
}

class CapturedPhotosModalState
    extends UnifiedPhotosModalState<CapturedPhotosModal> {
  @override
  Widget buildHeader() {
    return const ModalHeader(title: "Photo(s) capturée(s)");
  }

  @override
  Widget buildEmptyState() {
    return const EmptyStateWidget.noPhotos();
  }

  @override
  Widget buildActionButtons() {
    if (localImages.isEmpty) {
      return const SizedBox.shrink();
    }
    return SecondaryButton.transparentButton(
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
