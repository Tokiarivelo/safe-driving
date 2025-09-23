import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class HomeLogo extends StatelessWidget {
  const HomeLogo({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final assetPath = isDark
        ? 'lib/resources/assets/logo/logo_white.svg'
        : 'lib/resources/assets/logo/logo.svg';
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: SvgPicture.asset(
        assetPath,
        width: 150,
        height: 150,
        fit: BoxFit.contain,
        errorBuilder: (context, error, stackTrace) {
          return const Icon(
            Icons.directions_car,
            size: 64,
          );
        },
      ),
    );
  }
}
