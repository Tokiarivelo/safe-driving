import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/sidebar_view_model.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sidebar_menu.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sidebar_theme.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sidebar_logout.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sidebar_header.dart';

class Sidebar extends StatelessWidget {
  final VoidCallback onProfileTap;
  final Function(int) onMenuItemSelected;
  final VoidCallback onClose;
  final VoidCallback onLogout;

  const Sidebar({
    super.key,
    required this.onProfileTap,
    required this.onMenuItemSelected,
    required this.onClose,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => SidebarViewModel(),
      child: Container(
        width: 280,
        decoration: BoxDecoration(
          color: AppColors.light.withValues(alpha: 0.95),
          boxShadow: [
            BoxShadow(
              color: AppColors.light.withValues(alpha: 0.2),
              blurRadius: 10,
              offset: const Offset(2, 0),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SidebarHeader(onProfileTap: onProfileTap, onClose: onClose),
            const SizedBox(height: 15),
            const Divider(color: AppColors.dark, height: 1),
            const SizedBox(height: 20),
            SidebarMenu(onMenuItemSelected: onMenuItemSelected),
            const SidebarTheme(),
            const Spacer(),
            const SizedBox(height: 20),
            SidebarLogout(onLogout: onLogout),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
