import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class FilterButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const FilterButton({super.key, required this.label, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(color: kLightGray, borderRadius: BorderRadius.circular(16)),
        child: Text(label),
      ),
    );
  }
}
