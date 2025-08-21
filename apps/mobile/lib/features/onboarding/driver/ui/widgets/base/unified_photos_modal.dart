import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

abstract class UnifiedPhotosModal extends StatefulWidget {
  final List<File> selectedImages;
  final Function(List<File>) onImagesChanged;

  const UnifiedPhotosModal({
    super.key,
    required this.selectedImages,
    required this.onImagesChanged,
  });
}

abstract class UnifiedPhotosModalState<T extends UnifiedPhotosModal>
    extends State<T> {
  late List<File> _localImages;
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _localImages = List.from(widget.selectedImages);
  }

  Widget buildHeader();
  Widget buildEmptyState();
  Widget buildActionButtons();

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
          buildHeader(),
          const SizedBox(height: 16),
          Expanded(
            child: _localImages.isEmpty ? buildEmptyState() : _buildGallery(),
          ),
          const SizedBox(height: 16),
          if (_localImages.length > 1) _buildPageIndicator(),
          const SizedBox(height: 16),
          buildActionButtons(),
        ],
      ),
    );
  }

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
              onPressed: () => deleteImageAt(_currentIndex),
            ),
          ),
        ),
      ],
    );
  }

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
                  if (loadingProgress == null) return child;
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
                  return _buildImageError(index);
                },
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildMobileGallery() {
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
              child: Image.file(
                _localImages[index],
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) {
                  return _buildImageError(index);
                },
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildImageError(int index) {
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
  }

  void deleteImageAt(int index) {
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

  void showDeleteAllConfirmation() {
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
                deleteAllImages();
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

  void deleteAllImages() {
    setState(() {
      _localImages.clear();
      _currentIndex = 0;
    });
    widget.onImagesChanged(_localImages);
  }

  void addImage(File image) {
    setState(() {
      _localImages.add(image);
    });
    widget.onImagesChanged(_localImages);
  }

  List<File> get localImages => _localImages;
  int get currentIndex => _currentIndex;
  PageController get pageController => _pageController;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
