import 'package:flutter/material.dart';

import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/secondary_button.dart';

class PhotoActionButtons extends StatelessWidget {
  final VoidCallback onPickFromGallery;
  final VoidCallback onTakePhoto;
  final VoidCallback? onDeleteAll;
  final bool hasImages;

  const PhotoActionButtons({
    super.key,
    required this.onPickFromGallery,
    required this.onTakePhoto,
    this.onDeleteAll,
    this.hasImages = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: PrimaryButton.primaryButton(
            text: 'Galerie',
            onPressed: onPickFromGallery,
            fontSize: 14,
            padding: const EdgeInsets.symmetric(vertical: 16),
            icon: Icon(
              Icons.photo_library,
              size: 18,
              color: AppColors.dark.adapt(context),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: SecondaryButton.secondaryButton(
            text: 'Caméra',
            onPressed: onTakePhoto,
            fontSize: 14,
            padding: const EdgeInsets.symmetric(vertical: 16),
            icon: Icon(
              Icons.camera_alt,
              size: 18,
              color: AppColors.light.adapt(context),
            ),
          ),
        ),
        if (hasImages && onDeleteAll != null) ...[
          const SizedBox(width: 12),
          Expanded(
            child: SecondaryButton.transparentButton(
              text: 'Tout supprimer',
              onPressed: onDeleteAll!,
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 16),
              icon: Icon(
                Icons.delete_sweep,
                size: 18,
                color: AppColors.buttonWithoutBackGround.adapt(context),
              ),
            ),
          ),
        ],
      ],
    );
  }
}
