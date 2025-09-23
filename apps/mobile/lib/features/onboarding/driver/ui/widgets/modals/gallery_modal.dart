import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/services/web_upload_registry.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/camera_interface.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/secondary_button.dart';
import '../base/unified_photos_modal.dart';
import '../headers/modal_header.dart';
import '../states/empty_state_widget.dart';

class PhotoManagementModal extends UnifiedPhotosModal {
  const PhotoManagementModal({
    super.key,
    required super.selectedImages,
    required super.onImagesChanged,
  });

  @override
  PhotoManagementModalState createState() => PhotoManagementModalState();
}

class PhotoManagementModalState
    extends UnifiedPhotosModalState<PhotoManagementModal> {
  bool _hasShownUploadSnack = false;
  @override
  Widget buildHeader() {
    return const ModalHeader(title: 'Ajouter de(s) photo(s)');
  }

  @override
  Widget buildEmptyState() {
    return const EmptyStateWidget.addPhotos();
  }

  @override
  Widget buildActionButtons() {
    return Row(
      children: [
        Expanded(
          child: PrimaryButton.primaryButton(
            text: 'Galerie',
            onPressed: () => _pickImage(ImageSource.gallery),
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
            onPressed: () => _showCameraInterface(),
            fontSize: 14,
            padding: const EdgeInsets.symmetric(vertical: 16),
            icon: Icon(
              Icons.camera_alt,
              size: 18,
              color: Theme.of(context).brightness == Brightness.dark
                  ? AppColors.light.adapt(context)
                  : Theme.of(context).colorScheme.onSurface,
            ),
          ),
        ),
        const SizedBox(width: 12),

        if (localImages.isNotEmpty)
          Expanded(
            child: SecondaryButton.transparentButton(
              text: 'Tout supprimer',
              onPressed: showDeleteAllConfirmation,
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 12),
              textColor: AppColors.error.adapt(context),
              borderColor: AppColors.error.adapt(context),
            ),
          ),
      ],
    );
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final pickedFile = await ImagePicker().pickImage(
        source: source,
        imageQuality: 85,
        maxWidth: 1920,
        maxHeight: 1080,
      );

      if (pickedFile != null && mounted) {
        // En Web, on enregistre les bytes en mémoire pour l'upload réel via HTTP PUT
        if (kIsWeb) {
          try {
            final bytes = await pickedFile.readAsBytes();
            final mime = pickedFile.mimeType;
            WebUploadRegistry.register(
              pickedFile.path,
              bytes,
              contentType: (mime == null || mime.isEmpty)
                  ? _inferContentTypeFromName(pickedFile.name)
                  : mime,
            );
          } catch (_) {}
        }
        addImage(File(pickedFile.path));
        if (mounted && !_hasShownUploadSnack) {
          SnackbarHelper.showSuccess(context, 'Photo ajoutée avec succès');
          _hasShownUploadSnack = true;
        }
      }
    } catch (e) {
      if (mounted) {
        SnackbarHelper.showError(
          context,
          'Erreur lors de la sélection de l\'image',
        );
      }
    }
  }

  String _inferContentTypeFromName(String fileName) {
    final lower = fileName.toLowerCase();
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.heic')) return 'image/heic';

    return 'image/jpeg';
  }

  void _showCameraInterface() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => CameraInterface(
        onPictureTaken: (imagePath) {
          if (imagePath != null) {
            if (kIsWeb) {
              try {
                if (imagePath.startsWith('data:')) {
                  final comma = imagePath.indexOf(',');
                  if (comma > 0) {
                    final header = imagePath.substring(0, comma);
                    final match = RegExp(
                      r'data:(.*?);base64',
                    ).firstMatch(header);
                    String contentType = match?.group(1) ?? 'image/png';
                    final base64Data = imagePath.substring(comma + 1);
                    final bytes = base64Decode(base64Data);
                    WebUploadRegistry.register(
                      imagePath,
                      bytes,
                      contentType: contentType,
                    );
                  }
                }
              } catch (_) {}
            }

            addImage(File(imagePath));
            Navigator.of(context).pop();
            if (!_hasShownUploadSnack) {
              SnackbarHelper.showSuccess(context, 'Photo prise avec succès');
              _hasShownUploadSnack = true;
            }
          } else {
            SnackbarHelper.showError(
              context,
              'Erreur lors de la prise de photo',
            );
          }
        },
      ),
    );
  }
}
