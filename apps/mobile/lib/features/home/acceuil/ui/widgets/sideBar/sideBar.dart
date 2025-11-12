// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/sidebar_view_model.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar_menu.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar_theme.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar_logout.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar_header.dart';

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
      create: (context) => SidebarViewModel(
        themeController: context.read<ThemeController>(),
        localeProvider: context.read<LocaleProvider>(),
      ),
      child: Container(
        width: 280,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          boxShadow: [
            BoxShadow(
              color: (Theme.of(context).brightness == Brightness.dark)
                  ? AppColors.dark.withValues(alpha: 0.5)
                  : AppColors.light.withValues(alpha: 0.2),
              blurRadius: 10,
              offset: const Offset(2, 0),
            ),
          ],
          borderRadius: const BorderRadius.only(
            topRight: Radius.circular(12),
            bottomRight: Radius.circular(12),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SidebarHeader(onProfileTap: onProfileTap, onClose: onClose),
            const SizedBox(height: 15),
            Divider(
              color: (Theme.of(context).brightness == Brightness.dark)
                  ? AppColors.borderButtonDark
                  : AppColors.dark,
              height: 1,
            ),
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
