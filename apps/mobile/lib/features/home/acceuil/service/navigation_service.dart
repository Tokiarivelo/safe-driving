import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/models/nav_item.dart';

class NavigationService {
  static List<NavItem> getDefaultNavItems(List<Widget> pages) {
    return [
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/search.svg',
        title: 'Rechercher',
        badgeCount: 0,
        page: pages[0],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/chat.svg',
        title: 'Messages',
        badgeCount: 0,
        page: pages[1],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/course.svg',
        title: 'Courses',
        badgeCount: 0,
        page: pages[2],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/qr.svg',
        title: 'Scanner',
        badgeCount: 0,
        page: pages[3],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/notif.svg',
        title: 'Notifications',
        badgeCount: 0,
        page: pages[4],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/trajet.svg',
        title: 'Trajet',
        badgeCount: 0,
        page: pages[5],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/profil.svg',
        title: 'Profil',
        badgeCount: 0,
        page: pages[6],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/offre.svg',
        title: 'Offres',
        badgeCount: 0,
        page: pages[7],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/setting.svg',
        title: 'Paramètre',
        badgeCount: 0,
        page: pages[8],
      ),
      NavItem(
        iconPath: 'lib/resources/assets/home/icons/help.svg',
        title: 'Assistance',
        badgeCount: 0,
        page: pages[9],
      ),
    ];
  }

  static List<String> getPageTitles() {
    return [
      'Rechercher',
      'Messages',
      'Mes courses',
      'Scanner QR',
      'Notifications',
      'Trajet en cours',
      'Profil',
      'Offres & promotions',
      'Paramètres',
      'Assistance',
    ];
  }
}
