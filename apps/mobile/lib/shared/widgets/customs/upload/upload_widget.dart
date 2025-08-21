import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class UploadWidget extends StatefulWidget {
  final String title;
  final String description;
  final String buttonText;
  final String? addMorePhotosText;
  final bool hasPhotoAdded;
  final VoidCallback? onTap;

  const UploadWidget({
    super.key,
    this.title = '',
    this.description = '',
    this.buttonText = '',
    this.addMorePhotosText,
    this.hasPhotoAdded = false,
    this.onTap,
  });

  @override
  UploadWidgetState createState() => UploadWidgetState();
}

class UploadWidgetState extends State<UploadWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Titre à l'extérieur du carré avec background softBackgroundColor
        if (widget.title.isNotEmpty) ...[
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.softBackgroundColor,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              widget.title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: AppColors.textColor,
                fontFamily: 'Inder',
              ),
            ),
          ),
          const SizedBox(height: 8),
        ],
        // Carré avec bordure pointillée
        CustomPaint(
          painter: DashedBorderPainter(
            color: AppColors.fillButtonBackgorund,
            strokeWidth: 2,
            dashWidth: 8,
            dashSpace: 4,
          ),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(32),
            margin: const EdgeInsets.all(2), // Pour que la bordure soit visible
            child: widget.hasPhotoAdded
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
        // Icône flèche vers le haut
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.upload,
          ),
          padding: const EdgeInsets.all(16),
          child: const Icon(
            Icons.keyboard_arrow_up,
            color: AppColors.light,
            size: 32,
          ),
        ),
        const SizedBox(height: 16),
        // Description avec même style que titre
        if (widget.description.isNotEmpty) ...[
          Text(
            widget.description,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
        ],
        // Bouton avec même style que "Valider"
        if (widget.buttonText.isNotEmpty)
          ButtonsWidget.primaryButton(
            text: widget.buttonText,
            onPressed: widget.onTap ?? () {},
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
        // Logo bouton add (icône +)
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.upload,
          ),
          padding: const EdgeInsets.all(16),
          child: const Icon(Icons.add, color: AppColors.light, size: 32),
        ),
        const SizedBox(height: 16),
        // "Ajout plus de photos"
        if (widget.addMorePhotosText != null &&
            widget.addMorePhotosText!.isNotEmpty) ...[
          Text(
            widget.addMorePhotosText!,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
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
