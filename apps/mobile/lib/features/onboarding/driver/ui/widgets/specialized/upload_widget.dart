import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/gallery_modal.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class UploadWidget extends StatefulWidget {
  final String title;
  final String description;
  final String buttonText;
  final String? addMorePhotosText;
  final bool hasPhotoAdded;
  final VoidCallback? onTap;
  final Function(List<File>)? onPhotosChanged;

  const UploadWidget({
    super.key,
    this.title = '',
    this.description = '',
    this.buttonText = '',
    this.addMorePhotosText,
    this.hasPhotoAdded = false,
    this.onTap,
    this.onPhotosChanged,
  });

  @override
  UploadWidgetState createState() => UploadWidgetState();
}

class UploadWidgetState extends State<UploadWidget> {
  List<File> _selectedImages = [];

  void _showPhotoModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => PhotoManagementModal(
        selectedImages: _selectedImages,
        onImagesChanged: (images) {
          setState(() {
            _selectedImages = images;
          });
          if (widget.onPhotosChanged != null) {
            widget.onPhotosChanged!(images);
          }
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.title.isNotEmpty) ...[
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.softBackgroundColor.adapt(context),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              widget.title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor.adapt(context),
              fontFamily: 'Inder',
            ),
            ),
          ),
          const SizedBox(height: 8),
        ],

        CustomPaint(
          painter: DashedBorderPainter(
            color: AppColors.fillButtonBackground.adapt(context),
            strokeWidth: 2,
            dashWidth: 8,
            dashSpace: 4,
          ),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(32),
            margin: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: AppColors.softBackgroundColor.adapt(context),
              borderRadius: BorderRadius.circular(12),
            ),
            child: _selectedImages.isNotEmpty
                ? _buildPhotoAddedState()
                : _buildInitialState(),
          ),
        ),
      ],
    );
  }

  // État initial sans photo
  Widget _buildInitialState() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.upload.adapt(context),
          ),
          padding: const EdgeInsets.all(16),
          child: Icon(
            Icons.cloud_upload_outlined,
            color: AppColors.light.adapt(context),
            size: 32,
          ),
        ),
        const SizedBox(height: 16),
        if (widget.description.isNotEmpty) ...[
          Text(
            widget.description,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w400,
              color: AppColors.textColor.adapt(context).withAlpha(202),
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
        ],
        if (widget.buttonText.isNotEmpty)
          PrimaryButton.primaryButton(
            text: widget.buttonText,
            onPressed: _showPhotoModal,
            fontSize: 16,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
      ],
    );
  }

  // État avec photo ajoutée
  Widget _buildPhotoAddedState() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.color1.adapt(context),
          ),
          padding: const EdgeInsets.all(16),
          child: Icon(Icons.check, color: AppColors.light.adapt(context), size: 32),
        ),
        const SizedBox(height: 16),
        Text(
          "${_selectedImages.length} photo${_selectedImages.length > 1 ? 's' : ''} sélectionnée${_selectedImages.length > 1 ? 's' : ''}",
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppColors.textColor.adapt(context),
            fontFamily: 'Inder',
          ),
        ),
        const SizedBox(height: 12),
        if (widget.addMorePhotosText != null &&
            widget.addMorePhotosText!.isNotEmpty) ...[
          GestureDetector(
            onTap: _showPhotoModal,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.fillButtonBackground.adapt(context),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                widget.addMorePhotosText!,
                style: TextStyle(
                  color: AppColors.light.adapt(context),
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
        ] else ...[
          GestureDetector(
            onTap: _showPhotoModal,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.fillButtonBackground.adapt(context),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                "Gérer les photos",
                style: TextStyle(
                  color: AppColors.light.adapt(context),
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

// Custom painter pour créer une bordure pointillée
class DashedBorderPainter extends CustomPainter {
  final Color color;
  final double strokeWidth;
  final double dashWidth;
  final double dashSpace;

  DashedBorderPainter({
    required this.color,
    required this.strokeWidth,
    required this.dashWidth,
    required this.dashSpace,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..addRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(
            strokeWidth / 2,
            strokeWidth / 2,
            size.width - strokeWidth,
            size.height - strokeWidth,
          ),
          const Radius.circular(12),
        ),
      );

    _drawDashedPath(canvas, path, paint);
  }

  void _drawDashedPath(Canvas canvas, Path path, Paint paint) {
    final pathMetrics = path.computeMetrics();
    for (final pathMetric in pathMetrics) {
      double distance = 0.0;
      while (distance < pathMetric.length) {
        final nextDistance = distance + dashWidth;
        final extractPath = pathMetric.extractPath(distance, nextDistance);
        canvas.drawPath(extractPath, paint);
        distance = nextDistance + dashSpace;
      }
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
