import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar.dart';

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
    return Stack(
      children: [
 
        if (isVisible)
          Positioned.fill(
            child: GestureDetector(
              onTap: onClose,
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 200),
                opacity: isVisible ? 0.4 : 0.0,
                child: Container(color: Colors.black),
              ),
            ),
          ),

        AnimatedPositioned(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOutCubic,
          left: isVisible ? 0 : -300,
          top: 0,
          bottom: 0,
          child: Material(
            elevation: 12,
            color: Colors.transparent,
            child: SizedBox(
              width: 280,
              child: Sidebar(
                onProfileTap: onProfileTap,
                onMenuItemSelected: onMenuItemSelected,
                onClose: onClose,
                onLogout: onLogout,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
