// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../../viewmodels/sidebar_view_model.dart';
import '../sideBar/sideBar_language.dart';

class SidebarMenu extends StatelessWidget {
  final Function(int) onMenuItemSelected;

  const SidebarMenu({super.key, required this.onMenuItemSelected});

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<SidebarViewModel>(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildMenuItem(
          context: context,
          index: 0,
          icon: Icons.settings,
          title: 'Account Settings',
          isSelected: viewModel.selectedIndex == 0,
          onTap: () {
            viewModel.selectMenuItem(0);
            onMenuItemSelected(0);
          },
        ),

        _buildMenuItem(
          context: context,
          index: 1,
          icon: Icons.tune,
          title: 'Preference',
          isSelected: viewModel.selectedIndex == 1,
          onTap: () {
            viewModel.selectMenuItem(1);
            onMenuItemSelected(1);
          },
        ),
        SidebarLanguage(onMenuItemSelected: onMenuItemSelected),
      ],
    );
  }

  Widget _buildMenuItem({
    required BuildContext context,
    required int index,
    required IconData icon,
    required String title,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 5.0),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          decoration: BoxDecoration(
            gradient: isSelected
                ? const LinearGradient(
                    colors: [AppColors.color1, AppColors.color2],
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                  )
                : null,
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Icon(
                icon,
                color: isSelected
                    ? AppColors.dark
                    : (Theme.of(context).brightness == Brightness.dark
                        ? AppColors.light
                        : AppColors.dark),
                size: 22,
              ),
              const SizedBox(width: 12),
              Text(
                title,
                style: TextStyle(
                  color: isSelected
                      ? AppColors.dark
                      : (Theme.of(context).brightness == Brightness.dark
                          ? AppColors.light
                          : AppColors.dark),
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
