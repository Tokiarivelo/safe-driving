import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
import '../view_models/home_view_model.dart';

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
          childAspectRatio: 1.0,
        ),
        itemCount: viewModel.menuItems.length,
        itemBuilder: (context, index) {
          final item = viewModel.menuItems[index];
          return _buildGridMenuItem(
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

  Widget _buildGridMenuItem({
    required String iconPath,
    required String title,
    bool hasNotification = false,
    int notificationCount = 0,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(iconPath, width: 80, height: 40),
                  const SizedBox(height: 10),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: Text(
                      title,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),

            if (hasNotification)
              Positioned(
                top: 20,
                right: 30,
                child: Container(
                  width: 20,
                  height: 20,
                  decoration: const BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      notificationCount.toString(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
