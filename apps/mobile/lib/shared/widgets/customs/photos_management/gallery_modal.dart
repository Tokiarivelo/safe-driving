import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:photo_view/photo_view_gallery.dart';
import 'package:photo_view/photo_view.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PhotoManagementModal extends StatefulWidget {
  final List<File> selectedImages;
  final Function(List<File>) onImagesChanged;

  const PhotoManagementModal({
    super.key,
    required this.selectedImages,
    required this.onImagesChanged,
  });

  @override
  PhotoManagementModalState createState() => PhotoManagementModalState();
}

class PhotoManagementModalState extends State<PhotoManagementModal> {
  late List<File> _localImages;
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _localImages = List.from(widget.selectedImages);
  }

  //modal UI
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      padding: const EdgeInsets.all(16.0),
      decoration: const BoxDecoration(
        color: AppColors.light,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          _buildHeader(),
          const SizedBox(height: 16),
          Expanded(
            child: _localImages.isEmpty ? _buildEmptyState() : _buildGallery(),
          ),
          const SizedBox(height: 16),
          if (_localImages.length > 1) _buildPageIndicator(),
          const SizedBox(height: 16),
          _buildActionButtons(),
        ],
      ),
    );
  }

  // Builds the header with title and close button
  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Ajouter de(s) photo(s)',
          style: const TextStyle(
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

  // Displays message when no photos are selected
  Widget _buildEmptyState() {
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
          const SizedBox(height: 8),
          Text(
            'Appuyez sur le bouton "Gallery" ou "Caméra" pour ajouter des photos',
            style: TextStyle(
              fontSize: 14,
              color: AppColors.textColor.withValues(alpha: 0.5),
              fontFamily: 'Inder',
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  // Builds the photo gallery view
  Widget _buildGallery() {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: kIsWeb ? _buildWebGallery() : _buildMobileGallery(),
        ),
        Positioned(
          top: 16,
          right: 16,
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.dark.withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(20),
            ),
            child: IconButton(
              icon: const Icon(Icons.delete, color: AppColors.light),
              onPressed: () => _deleteImageAt(_currentIndex),
            ),
          ),
        ),
      ],
    );
  }

  // Page indicator for multiple photos
  Widget _buildPageIndicator() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        _localImages.length,
        (index) => Container(
          margin: const EdgeInsets.symmetric(horizontal: 4),
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: index == _currentIndex
                ? AppColors.fillButtonBackground
                : AppColors.fillButtonBackground.withValues(alpha: 0.3),
          ),
        ),
      ),
    );
  }

  // Action buttons for managing photos
  Widget _buildActionButtons() {
    return Row(
      children: [
        Expanded(
          child: ButtonsWidget.primaryButton(
            text: 'Galerie',
            onPressed: () => _pickImage(ImageSource.gallery),
            fontSize: 14,
            padding: const EdgeInsets.symmetric(vertical: 12),
            icon: Icon(Icons.photo_library, size: 18, color: AppColors.light),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: ButtonsWidget.secondaryButton(
            text: 'Caméra',
            onPressed: () => _pickImage(ImageSource.camera),
            fontSize: 14,
            padding: const EdgeInsets.symmetric(vertical: 12),
            icon: Icon(
              Icons.camera_alt,
              size: 18,
              color: AppColors.buttonWithoutBackGround,
            ),
          ),
        ),
        const SizedBox(width: 12),

        if (_localImages.isNotEmpty)
          Expanded(
            child: ButtonsWidget.transparentButton(
              text: 'Tout supprimer',
              onPressed: _showDeleteAllConfirmation,
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 12),
              textColor: AppColors.error,
              borderColor: AppColors.error,
            ),
          ),
      ],
    );
  }

  // Picks an image from a specified source
  Future<void> _pickImage(ImageSource source) async {
    try {
      final pickedFile = await ImagePicker().pickImage(
        source: source,
        imageQuality: 85,
        maxWidth: 1920,
        maxHeight: 1080,
      );

      if (pickedFile != null && mounted) {
        setState(() {
          _localImages.add(File(pickedFile.path));
        });
        widget.onImagesChanged(_localImages);
        if (mounted) {
          SnackbarHelper.showSuccess(context, 'Photo ajoutée avec succès');
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

  // Deletes an image at the given index
  void _deleteImageAt(int index) {
    if (index >= 0 && index < _localImages.length) {
      setState(() {
        _localImages.removeAt(index);
        if (_currentIndex >= _localImages.length && _localImages.isNotEmpty) {
          _currentIndex = _localImages.length - 1;
        } else if (_localImages.isEmpty) {
          _currentIndex = 0;
        }
      });
      widget.onImagesChanged(_localImages);
    }
  }

  // Shows confirmation dialog for deleting all images
  void _showDeleteAllConfirmation() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Supprimer toutes les photos'),
          content: const Text(
            'Êtes-vous sûr de vouloir supprimer toutes les photos ?',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Annuler'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                _deleteAllImages();
              },
              child: const Text(
                'Supprimer',
                style: TextStyle(color: AppColors.error),
              ),
            ),
          ],
        );
      },
    );
  }

  // Deletes all selected images
  void _deleteAllImages() {
    setState(() {
      _localImages.clear();
      _currentIndex = 0;
    });
    widget.onImagesChanged(_localImages);
  }

  // Builds web-compatible gallery (for webview)
  Widget _buildWebGallery() {
    return Container(
      color: AppColors.softBackgroundColor,
      child: PageView.builder(
        controller: _pageController,
        itemCount: _localImages.length,
        onPageChanged: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        itemBuilder: (context, index) {
          return Container(
            color: AppColors.softBackgroundColor,
            child: Center(
              child: Image.network(
                _localImages[index].path,
                fit: BoxFit.contain,
                loadingBuilder: (context, child, loadingProgress) {
                  if (loadingProgress == null) {
                    return child;
                  }
                  return Center(
                    child: CircularProgressIndicator(
                      color: AppColors.fillButtonBackground,
                      value: loadingProgress.expectedTotalBytes != null
                          ? loadingProgress.cumulativeBytesLoaded /
                                loadingProgress.expectedTotalBytes!
                          : null,
                    ),
                  );
                },
                errorBuilder: (context, error, stackTrace) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.broken_image,
                        size: 64,
                        color: AppColors.textColor.withValues(alpha: 0.5),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Erreur de chargement image',
                        style: TextStyle(
                          color: AppColors.textColor.withValues(alpha: 0.7),
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Path: ${_localImages[index].path}',
                        style: TextStyle(
                          color: AppColors.textColor.withValues(alpha: 0.5),
                          fontSize: 10,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }

  // Builds mobile gallery with PhotoView
  Widget _buildMobileGallery() {
    return PhotoViewGallery.builder(
      itemCount: _localImages.length,
      builder: (context, index) {
        return PhotoViewGalleryPageOptions(
          imageProvider: FileImage(_localImages[index]),
          initialScale: PhotoViewComputedScale.contained,
          minScale: PhotoViewComputedScale.contained * 0.8,
          maxScale: PhotoViewComputedScale.covered * 2.0,
          heroAttributes: PhotoViewHeroAttributes(tag: 'photo_$index'),
          errorBuilder: (context, error, stackTrace) {
            return Container(
              color: AppColors.softBackgroundColor,
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.broken_image,
                      size: 64,
                      color: AppColors.textColor.withValues(alpha: 0.5),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Erreur de chargement',
                      style: TextStyle(
                        color: AppColors.textColor.withValues(alpha: 0.7),
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
      scrollPhysics: const BouncingScrollPhysics(),
      backgroundDecoration: BoxDecoration(color: AppColors.softBackgroundColor),
      pageController: _pageController,
      onPageChanged: (index) {
        setState(() {
          _currentIndex = index;
        });
      },
      loadingBuilder: (context, event) {
        if (event == null) {
          return Container(
            color: AppColors.softBackgroundColor,
            child: Center(
              child: CircularProgressIndicator(
                color: AppColors.fillButtonBackground,
              ),
            ),
          );
        }
        final value =
            event.cumulativeBytesLoaded / (event.expectedTotalBytes ?? 1);
        return Container(
          color: AppColors.softBackgroundColor,
          child: Center(
            child: CircularProgressIndicator(
              value: value,
              color: AppColors.fillButtonBackground,
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
