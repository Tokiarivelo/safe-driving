class MenuItemModel {
  final String iconPath;
  final String title;
  final bool hasNotification;
  final int notificationCount;

  MenuItemModel({
    required this.iconPath,
    required this.title,
    this.hasNotification = false,
    this.notificationCount = 0,
  });

  MenuItemModel copyWith({
    String? iconPath,
    String? title,
    bool? hasNotification,
    int? notificationCount,
  }) {
    return MenuItemModel(
      iconPath: iconPath ?? this.iconPath,
      title: title ?? this.title,
      hasNotification: hasNotification ?? this.hasNotification,
      notificationCount: notificationCount ?? this.notificationCount,
    );
  }
}
