import 'package:flutter/cupertino.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../../../shared/widgets/customs/buttons/specialized/icon_with_badge.dart';

class MenuButtonBuilder {
  static Widget buildMenuButton({
    required String iconPath,
    required String title,
    required VoidCallback onPressed,
    bool hasNotification = false,
    int notificationCount = 0,
    Color? backgroundColor,
  }) {
    return IconButtonWithBadge(
      iconPath: iconPath,
      title: title,
      onPressed: onPressed,
      hasNotification: hasNotification,
      notificationCount: notificationCount,
      backgroundColor: backgroundColor ?? AppColors.light,
    );
  }

  static Widget messageButton(int count, VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/chat.svg',
      title: 'Messages',
      onPressed: onPressed,
      hasNotification: count > 0,
      notificationCount: count,
    );
  }

  static Widget notificationButton(int count, VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/notif.svg',
      title: 'Notifications',
      onPressed: onPressed,
      hasNotification: count > 0,
      notificationCount: count,
    );
  }

  static Widget searchButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/search.svg',
      title: 'Rechercher un transport',
      onPressed: onPressed,
    );
  }

  static Widget courseButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/course.svg',
      title: 'Mes courses',
      onPressed: onPressed,
    );
  }

  static Widget qrButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/qr.svg',
      title: 'Scanner Qr code',
      onPressed: onPressed,
    );
  }

  static Widget tripButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/trajet.svg',
      title: 'Trajet en cours',
      onPressed: onPressed,
    );
  }

  static Widget profileButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/profil.svg',
      title: 'Profile',
      onPressed: onPressed,
    );
  }

  static Widget offersButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/offre.svg',
      title: 'Offres & promotions',
      onPressed: onPressed,
    );
  }

  static Widget settingsButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/setting.svg',
      title: 'Paramètre',
      onPressed: onPressed,
    );
  }

  static Widget helpButton(VoidCallback onPressed) {
    return buildMenuButton(
      iconPath: 'lib/resources/assets/home/icons/help.svg',
      title: 'Assistance',
      onPressed: onPressed,
    );
  }
}
