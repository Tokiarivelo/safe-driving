// import 'package:flutter/widgets.dart';

class MenuItemModel {
  // final IconData icon;
  final String iconPath;
  final String title;
  final bool hasNotification;
  final int notificationCount;
  // final Color color;

  MenuItemModel({
    // required this.icon,
    required this.iconPath,
    required this.title,
    this.hasNotification = false,
    this.notificationCount = 0,
    // required this.color,
  });

  MenuItemModel copyWith({
    // IconData? icon,
    String? iconPath,
    String? title,
    bool? hasNotification,
    int? notificationCount,
    // Color? color,
  }) {
    return MenuItemModel(
      // icon: icon ?? this.icon,
      iconPath: iconPath ?? this.iconPath,
      title: title ?? this.title,
      hasNotification: hasNotification ?? this.hasNotification,
      notificationCount: notificationCount ?? this.notificationCount,
      // color: color ?? this.color,
    );
  }
}
