import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class DriverMarkerWidget extends StatelessWidget {
  final VoidCallback onTap;
  final String? status;
  
  const DriverMarkerWidget({
    super.key, 
    required this.onTap,
    this.status,
  });
  
  Color _getMarkerColor() {
    switch (status) {
      case 'AVAILABLE':
        return const Color(0xFF22c55e); // green-500
      case 'BUSY':
        return const Color(0xFFef4444); // red-500
      default:
        return const Color(0xFF6b7280); // gray-500
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final markerColor = _getMarkerColor();
    
    return GestureDetector(
      onTap: onTap,
      child: Icon(
        Icons.location_pin,
        color: markerColor,
        size: 40,
        shadows: const [
          Shadow(
            color: Colors.black26,
            offset: Offset(0, 2),
            blurRadius: 4,
          ),
        ],
      ),
    );
  }
}
