import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class DriverMarkerWidget extends StatelessWidget {
  final VoidCallback onTap;
  const DriverMarkerWidget({super.key, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 24,
        height: 24,
        decoration: const BoxDecoration(color: kRedDriver, shape: BoxShape.circle),
        child: const Icon(Icons.local_taxi, color: Colors.white, size: 14),
      ),
    );
  }
}