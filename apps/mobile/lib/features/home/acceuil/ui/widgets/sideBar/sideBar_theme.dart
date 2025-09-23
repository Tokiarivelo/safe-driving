// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../../viewmodels/sidebar_view_model.dart';

class SidebarTheme extends StatelessWidget {
  const SidebarTheme({super.key});

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<SidebarViewModel>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final l10n = context.l10n;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
            child: DropdownButton<AppTheme>(
              value: viewModel.currentTheme,
              onChanged: (AppTheme? newValue) {
                if (newValue != null) {
                  viewModel.setTheme(newValue);
                }
              },
              underline: const SizedBox(),
              isExpanded: true,
              icon: Icon(Icons.arrow_drop_down, color: isDark ? AppColors.light : AppColors.dark),
              dropdownColor: isDark ? AppColors.backgroundSecondary : AppColors.light,
              borderRadius: BorderRadius.circular(8),
              items: [
                _buildDropdownItem(
                  value: AppTheme.dark,
                  icon: Icons.nightlight_round,
                  title: l10n.themeDark,
                  isDark: isDark,
                ),
                _buildDropdownItem(
                  value: AppTheme.light,
                  icon: Icons.wb_sunny,
                  title: l10n.themeLight,
                  isDark: isDark,
                ),
                _buildDropdownItem(
                  value: AppTheme.system,
                  icon: Icons.settings,
                  title: l10n.themeSystem,
                  isDark: isDark,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
      ],
    );
  }

  DropdownMenuItem<AppTheme> _buildDropdownItem({
    required AppTheme value,
    required IconData icon,
    required String title,
    required bool isDark,
  }) {
    return DropdownMenuItem<AppTheme>(
      value: value,
      child: Row(
        children: [
          Icon(icon, color: isDark ? AppColors.light : AppColors.dark, size: 20),
          const SizedBox(width: 12),
          Text(title, style: TextStyle(color: isDark ? AppColors.light : AppColors.dark, fontSize: 14)),
        ],
      ),
    );
  }
}
