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
    return Row(
      children: [
        ...themeOptions.map(
          (theme) => Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: ChoiceChip(
              label: Text(theme),
              selected: selectedTheme == theme,
              onSelected: (_) => onThemeSelected(theme),
              selectedColor: AppColors.fillButtonBackground,
              labelStyle: TextStyle(
                color: selectedTheme == theme
                    ? AppColors.light
                    : AppColors.buttonWithoutBackGround,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

