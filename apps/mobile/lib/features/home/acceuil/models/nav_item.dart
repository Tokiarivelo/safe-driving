import 'package:flutter/widgets.dart';

class NavItem {
  final String iconPath;
  final String title;
  final int badgeCount;
  final Widget page;

  NavItem({
    required this.iconPath,
    required this.title,
    this.badgeCount = 0,
    required this.page,
  });
}
