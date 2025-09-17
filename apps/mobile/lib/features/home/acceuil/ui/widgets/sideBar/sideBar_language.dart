// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../../viewmodels/sidebar_view_model.dart';

class SidebarLanguage extends StatelessWidget {
  final Function(int) onMenuItemSelected;

  const SidebarLanguage({super.key, required this.onMenuItemSelected});

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<SidebarViewModel>(context);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 27.0, vertical: 5.0),
      child: Container(
        decoration: BoxDecoration(
          color: viewModel.selectedIndex == 2
              ? AppColors.color1.withValues(alpha: 0.2)
              : AppColors.light.withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(8),
          border: viewModel.selectedIndex == 2
              ? Border.all(color: AppColors.color1, width: 1)
              : null,
        ),
        child: Row(
          children: [
            Expanded(
              child: DropdownButtonHideUnderline(
                child: DropdownButton<AppLanguage>(
                  value: viewModel.currentLanguage,
                  onChanged: (AppLanguage? newValue) {
                    if (newValue != null) {
                      viewModel.setLanguage(newValue);
                      viewModel.selectMenuItem(2);
                      onMenuItemSelected(2);
                    }
                  },
                  isExpanded: true,
                  icon: Icon(
                    Icons.arrow_drop_down,
                    color: viewModel.selectedIndex == 2
                        ? AppColors.dark
                        : AppColors.dark,
                  ),
                  dropdownColor: AppColors.light,
                  borderRadius: BorderRadius.circular(8),
                  style: TextStyle(color: AppColors.dark, fontSize: 16),
                  items: [
                    _buildDropdownItem(
                      value: AppLanguage.french,
                      flag: '🇫🇷',
                      title: 'Français',
                    ),
                    _buildDropdownItem(
                      value: AppLanguage.english,
                      flag: '🇬🇧',
                      title: 'English',
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  DropdownMenuItem<AppLanguage> _buildDropdownItem({
    required AppLanguage value,
    required String flag,
    required String title,
  }) {
    return DropdownMenuItem<AppLanguage>(
      value: value,
      child: Row(
        children: [
          Text(flag, style: const TextStyle(fontSize: 18)),
          const SizedBox(width: 12),
          Text(title, style: const TextStyle(fontSize: 14)),
        ],
      ),
    );
  }
}
