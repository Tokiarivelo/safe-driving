import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LogoBuilder {
  static Widget buildLogo({required bool isSmallScreen}) {
    return Transform.scale(
      scale: isSmallScreen ? 0.8 : 1,
      child: SvgPicture.asset(
        'lib/resources/assets/logo/logo.svg',
        height: isSmallScreen ? 80 : 100,
        width: 500,
      ),
    );
  }
}
