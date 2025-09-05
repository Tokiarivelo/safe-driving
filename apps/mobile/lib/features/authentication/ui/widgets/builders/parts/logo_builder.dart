import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LogoBuilder {
  static Widget buildLogo({required bool isSmallScreen}) {
    return Builder(
      builder: (context) {
        final isDark = Theme.of(context).brightness == Brightness.dark;
        final asset = isDark
            ? 'lib/resources/assets/logo/logo_white.svg'
            : 'lib/resources/assets/logo/logo.svg';
        return Transform.scale(
          scale: isSmallScreen ? 0.8 : 1,
          child: SvgPicture.asset(
            asset,
            height: isSmallScreen ? 80 : 100,
            width: 500,
          ),
        );
      },
    );
  }
}
