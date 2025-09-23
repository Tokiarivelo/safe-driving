import 'package:flutter/material.dart';
import '../models/menu_item_model.dart';
import 'package:safe_driving/app/routes.dart';

class HomeViewModel with ChangeNotifier {
  final List<MenuItemModel> _menuItems = [
    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/search.svg',
      title: 'Rechercher un transport',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/chat.svg',
      title: 'Messages',
      hasNotification: true,
      notificationCount: 3,
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/course.svg',
      title: 'Mes courses',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/qr.svg',
      title: 'Scanner Qr code',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/notif.svg',
      title: 'Notifications',
      hasNotification: true,
      notificationCount: 12,
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/trajet.svg',
      title: 'Trajet en cours',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/profil.svg',
      title: 'Profile',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/offre.svg',
      title: 'Offres & promotions',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/setting.svg',
      title: 'Paramètre',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/help.svg',
      title: 'Assistance',
    ),
  ];

  List<MenuItemModel> get menuItems => _menuItems;
  void updateNotificationCount(int index, int count) {
    if (index >= 0 && index < _menuItems.length) {
      _menuItems[index] = _menuItems[index].copyWith(
        notificationCount: count,
        hasNotification: count > 0,
      );
      notifyListeners();
    }
  }

  void resetNotificationCount(int index) {
    if (index >= 0 && index < _menuItems.length) {
      _menuItems[index] = _menuItems[index].copyWith(
        notificationCount: 0,
        hasNotification: false,
      );
      notifyListeners();
    }
  }

  void onMenuItemTap(int index, BuildContext context) {
    if (_menuItems[index].hasNotification) {
      resetNotificationCount(index);
    }
    if (index == 0) {
      Navigator.pushNamed(context, AppRoutes.map);
    }
  }
}
