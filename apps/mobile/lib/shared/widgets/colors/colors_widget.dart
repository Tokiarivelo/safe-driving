import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors.dart';

class ColorsWidget {
  static final BoxDecoration background = BoxDecoration(
  gradient: LinearGradient(
    // 90deg (for horizontal)
    begin: Alignment.centerLeft,  
    end: Alignment.centerRight,
    colors: [
      AppColors.color1,
      AppColors.color2, 
    ],
    // Positions 14% & 95%
    stops: [0.14, 0.95], 
  ),
);
}
