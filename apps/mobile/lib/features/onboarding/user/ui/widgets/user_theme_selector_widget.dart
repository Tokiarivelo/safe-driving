import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class UserThemeSelectorWidget extends StatelessWidget {
  final String selectedTheme;
  final List<String> themeOptions;
  final ValueChanged<String> onThemeSelected;

  const UserThemeSelectorWidget({
    super.key,
    required this.selectedTheme,
    required this.themeOptions,
    required this.onThemeSelected,
  });

  @override
  Widget build(BuildContext context) {
    // Supprimer toute option "Automatique"/"System" si elle arrive via les données
    final options = themeOptions.where((t) {
      final l = t.trim().toLowerCase();
      return !(l == 'automatique' || l == 'auto' || l == 'system' || l == 'système' || l == 'systeme' || l == 'automatic');
    }).toList();

    final theme = Theme.of(context);
    final bool isDark = theme.brightness == Brightness.dark;
    final borderColor = isDark ? AppColors.borderButtonDark : AppColors.borderButtonLight;

    return Row(
      children: [
        ...options.map(
          (opt) => Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: ChoiceChip(
              label: Text(opt),
              selected: selectedTheme == opt,
              onSelected: (_) => onThemeSelected(opt),
              selectedColor: AppColors.fillButtonBackground.adapt(context),
              side: BorderSide(color: borderColor),
              labelStyle: TextStyle(
                color: selectedTheme == opt
                    ? AppColors.light
                    : (isDark
                        ? theme.colorScheme.onSurface
                        : AppColors.buttonWithoutBackGround),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
