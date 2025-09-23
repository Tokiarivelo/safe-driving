import 'package:flutter/material.dart';

class AppColors {
  //for principal background (brand accents)
  static const Color color1 = Color(0xFFEA3A7E);
  static const Color color2 = Color(0xFFFF7746);

  // Dark theme palette (prioritaire)
  static const Color backgroundPrimary = Color(0xFF121212); // Noir adouci
  static const Color backgroundSecondary = Color(0xFF1E1E1E); // Gris très foncé
  static const Color backgroundSoft = Color(
    0xFF2C2C2C,
  ); // Pour containers/cards

  // Buttons
  static const Color fillButtonBackground = Color(
    0xFFDC318D,
  ); // Accent utilisé en clair
  static const Color buttonWithoutBackGround = Color(0xFF822072); // Clair
  static const Color buttonWithoutBackGroundDark = Color(0xFF9C4D97); // Sombre
  static const Color borderButtonDark = Color(
    0xFF444444,
  ); // Bordure subtile sombre
  static const Color borderButtonLight = Color(
    0xFFE0E0E0,
  ); // Bordure subtile claire

  //classic background (light)
  static const Color secondBackgroundColor = Color(0xFFFAF9F6);
  static const Color softBackgroundColor = Color.fromARGB(255, 240, 226, 234);
  static const Color inputTextBackground = Color.fromARGB(120, 239, 213, 230);
  static const Color inputTextBackgroundDark = Color(
    0xFF2A2A2A,
  ); // Fond sombre input

  //classic colors
  static const Color icon = Color(0xFFE33486);
  static const Color iconDark = Color(0xFFFF669A); // Accent icônes sombre
  static const Color titleColor = Color(0xFFFFFFFF);
  static const Color textColor = Color(0xFF822072); // Clair
  static const Color textColorDark = Color(0xFFEAEAEA); // Sombre
  static const Color light = Color(0xFFFFFFFF);

  //for input
  static const Color borderInputField = Color(
    0xFFEA3A7E,
  ); // Accent rose pour focus
  static const Color placeHolderInput = Color(0xFFB15C8B);
  static const Color placeHolderInputDark = Color(0xFFBFAEC2);
  static const Color error = Color(0xFFFF5252); // Rouge vif

  //utils
  static Color blur = const Color.fromARGB(120, 0, 0, 0); // Flou noir
  static Color progress = const Color.fromARGB(255, 41, 218, 17); // Vert clair
  static Color upload = Colors.green;
  static Color transparent = Colors.transparent;
  static const Color forSmoothProgression = Color(0xFF822072);
  static const Color dark = Color.fromARGB(255, 0, 0, 0); // Legacy black
  static const Color unclickable = Color(0xFF666666); // Désactivé gris clair
  static const Color success = Color.fromARGB(255, 76, 175, 80);

  //for snackbars
  static const Color snackbarSuccess = Color(0xFF4CAF50);
  static const Color snackbarWarning = Color(0xFFFFC107);
  static const Color snackbarInfo = Color(0xFF2196F3);

  // Logo colors for theming
  static const Color logoWhite = Color(0xFFFFFFFF);
  static const Color logoDark = Color(0xFF121212);
}

extension AdaptiveColor on Color {
  Color adapt(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    if (!isDark) return this;

    final luminance = computeLuminance();
    if (luminance > 0.5) {
      return _darken(this, 0.25);
    } else {
      return _lighten(this, 0.15);
    }
  }
}

Color _darken(Color color, double amount) {
  assert(amount >= 0 && amount <= 1);
  final hsl = HSLColor.fromColor(color);
  final hslDark = hsl.withLightness((hsl.lightness - amount).clamp(0.0, 1.0));
  return hslDark.toColor();
}

Color _lighten(Color color, double amount) {
  assert(amount >= 0 && amount <= 1);
  final hsl = HSLColor.fromColor(color);
  final hslLight = hsl.withLightness((hsl.lightness + amount).clamp(0.0, 1.0));
  return hslLight.toColor();
}
