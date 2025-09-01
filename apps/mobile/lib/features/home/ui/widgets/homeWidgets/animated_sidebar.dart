import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/ui/widgets/sideBar/sideBar.dart';

class AnimatedSidebar extends StatelessWidget {
  final bool isVisible;
  final VoidCallback onProfileTap;
  final Function(int) onMenuItemSelected;
  final VoidCallback onClose;
  final VoidCallback onLogout;

  const AnimatedSidebar({
    super.key,
    required this.isVisible,
    required this.onProfileTap,
    required this.onMenuItemSelected,
    required this.onClose,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedPositioned(
      duration: const Duration(milliseconds: 300),
      left: isVisible ? 0 : -280,
      top: 0,
      bottom: 0,
      child: Sidebar(
        onProfileTap: onProfileTap,
        onMenuItemSelected: onMenuItemSelected,
        onClose: onClose,
        onLogout: onLogout,
      ),
    );
  }
}
