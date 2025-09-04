import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class ColorsWidget {
  // Fond principal (en-têtes et écrans):
  // - Clair: dégradé marque (inchangé)
  // - Sombre: dégradé gris foncé équilibré (éviter le noir pur)
  static BoxDecoration background(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    if (isDark) {
      // Gris foncé équilibré (pas noir pur), avec légère nuance directionnelle
      const b1 = Color(0xFF121212);
      const b2 = Color(0xFF1E1E1E);
      return const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [b1, b2],
          stops: [0.0, 1.0],
        ),
      );
    }

    // Mode clair: dégradé marque
    final c1 = AppColors.color1.adapt(context);
    final c2 = AppColors.color2.adapt(context);
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [c1, c2],
        stops: const [0.14, 0.95],
      ),
    );
  }

  // Couleur de surface générique (conteneurs):
  // - Sombre: gris très foncé pour éviter l’effet "noir absolu"
  static Color surface(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    if (isDark) {
      return const Color(0xFF181818);
    }
    return Theme.of(context).colorScheme.surface;
  }

  // Couleur de texte/éléments au-dessus du background principal
  // - Sombre: proche du blanc
  // - Clair: texte par défaut de l’app
  static Color onBackground(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return isDark ? const Color(0xFFF5F5F5) : AppColors.textColor.adapt(context);
  }

  // Couleur de bordure "subtile" à utiliser pour des boutons/containers
  // - Clair: bordure plus légère/élégante
  // - Sombre: proche du blanc mais légère
  static Color subtleBorderColor(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    if (isDark) {
      return const Color(0xFFFFFFFF).withValues(alpha: 0.25);
    }
    return AppColors.buttonWithoutBackGround.adapt(context).withValues(alpha: 0.3);
  }

  static BorderSide subtleButtonBorder(BuildContext context) {
    return BorderSide(color: subtleBorderColor(context), width: 1.0);
  }
}
