import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/home_view_model.dart';
import 'menu_button_builder.dart';

class MenuGrid extends StatelessWidget {
  final HomeViewModel viewModel;

  const MenuGrid({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 16.0,
          mainAxisSpacing: 16.0,
          childAspectRatio: 0.85,
        ),
        itemCount: viewModel.menuItems.length,
        itemBuilder: (context, index) {
          final item = viewModel.menuItems[index];
          return _buildMenuButton(
            iconPath: item.iconPath,
            title: item.title,
            hasNotification: item.hasNotification,
            notificationCount: item.notificationCount,
            onTap: () => viewModel.onMenuItemTap(index, context),
          );
        },
      ),
    );
  }

  Widget _buildMenuButton({
    required String iconPath,
    required String title,
    bool hasNotification = false,
    int notificationCount = 0,
    required VoidCallback onTap,
  }) {
    return MenuButtonBuilder.buildMenuButton(
      iconPath: iconPath,
      title: title,
      onPressed: onTap,
      hasNotification: hasNotification,
      notificationCount: notificationCount,
    );
  }
}
