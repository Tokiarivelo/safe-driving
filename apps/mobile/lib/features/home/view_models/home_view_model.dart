import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/models/menu_item_model.dart';

class HomeViewModel with ChangeNotifier {
  List<MenuItemModel> _menuItems = [
    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/search.png',
      title: 'Rechercher un transport',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/chat.png',
      title: 'Messages',
      hasNotification: true,
      notificationCount: 3,
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/course.png',
      title: 'Mes courses',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/qr.png',
      title: 'Scanner Qr code',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/notif.png',
      title: 'Notifications',
      hasNotification: true,
      notificationCount: 12,
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/trajet.png',
      title: 'Trajet en cours',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/profil.png',
      title: 'Profile',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/offre.png',
      title: 'Offres & promotions',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/setting.png',
      title: 'Paramètre',
    ),

    MenuItemModel(
      iconPath: 'lib/resources/assets/home/icons/help.png',
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
  }
}
