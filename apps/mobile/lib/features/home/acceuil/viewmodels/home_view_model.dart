import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/api/graph-ql/mutations.dart';
import '../models/menu_item_model.dart';
import 'package:safe_driving/app/routes.dart';
import 'package:safe_driving/l10n/l10n.dart';

enum DriverAvailability { available, paused, unavailable }

class HomeViewModel with ChangeNotifier {
  static const String _prefsDriverStatusKey = 'driver_availability_status';

  final bool isDriver;
  final List<MenuItemModel> _menuItems = [];
  DriverAvailability _driverStatus = DriverAvailability.available;

  HomeViewModel({required this.isDriver});

  List<MenuItemModel> get menuItems => _menuItems;
  DriverAvailability get driverStatus => _driverStatus;

  Future<void> init() async {
    _buildMenuItems();
    if (isDriver) {
      await _loadDriverStatusFromPrefs();
      _applyStatusToMenu();
    }
    notifyListeners();
  }

  void _buildMenuItems() {
    _menuItems.clear();
    if (isDriver) {
      // 0: Status button
      _menuItems.add(
        MenuItemModel(
          iconPath: _statusIconPath,
          title: _statusTitleFr,
        ),
      );
      // 1: Search rides
      _menuItems.add(
        MenuItemModel(
          iconPath: 'lib/resources/assets/home/icons/search.svg',
          title: 'Rechercher des courses',
        ),
      );
      // Rest of common items (without Offres & promotions)
      _menuItems.addAll([
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
          iconPath: 'lib/resources/assets/home/icons/setting.svg',
          title: 'Paramètre',
        ),
        MenuItemModel(
          iconPath: 'lib/resources/assets/home/icons/help.svg',
          title: 'Assistance',
        ),
      ]);
    } else {
      // Default menu for normal user (unchanged)
      _menuItems.addAll([
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
      ]);
    }
  }

  String get _statusTitleFr {
    switch (_driverStatus) {
      case DriverAvailability.available:
        return 'Libre';
      case DriverAvailability.paused:
        return 'En pause';
      case DriverAvailability.unavailable:
        return 'Indisponible';
    }
  }

  String get _statusIconPath {
    switch (_driverStatus) {
      case DriverAvailability.available:
        return 'lib/resources/assets/home/icons/status_available.svg';
      case DriverAvailability.paused:
        return 'lib/resources/assets/home/icons/status_paused.svg';
      case DriverAvailability.unavailable:
        return 'lib/resources/assets/home/icons/status_unavailable.svg';
    }
  }

  Future<void> _loadDriverStatusFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_prefsDriverStatusKey);
      switch (raw) {
        case 'PAUSED':
          _driverStatus = DriverAvailability.paused;
          break;
        case 'UNAVAILABLE':
          _driverStatus = DriverAvailability.unavailable;
          break;
        case 'AVAILABLE':
        default:
          _driverStatus = DriverAvailability.available;
      }
    } catch (_) {
      _driverStatus = DriverAvailability.available;
    }
  }

  Future<void> _saveDriverStatusToPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_prefsDriverStatusKey, _statusToBackend());
    } catch (_) {}
  }

  String _statusToBackend() {
    switch (_driverStatus) {
      case DriverAvailability.available:
        return 'AVAILABLE';
      case DriverAvailability.paused:
        return 'PAUSED';
      case DriverAvailability.unavailable:
        return 'UNAVAILABLE';
    }
  }

  void _applyStatusToMenu() {
    if (!isDriver || _menuItems.isEmpty) return;
    _menuItems[0] = _menuItems[0].copyWith(
      title: _statusTitleFr,
      iconPath: _statusIconPath,
    );
  }

  Future<void> _persistStatusBackend() async {
    try {
      final status = _statusToBackend();
      await GraphQLClientWrapper.instance.executeMutation(
        document: upsertUserPreferenceMutation,
        variables: {'input': {'driverAvailability': status}},
      );
    } catch (_) {
      // best-effort
    }
  }

  Future<void> _setStatus(DriverAvailability status) async {
    _driverStatus = status;
    _applyStatusToMenu();
    notifyListeners();
    await _saveDriverStatusToPrefs();
    await _persistStatusBackend();
  }

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

  void _showStatusPicker(BuildContext context) {
    final l10n = context.l10n;
    showModalBottomSheet(
      context: context,
      builder: (ctx) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: SvgPicture.asset(
                  'lib/resources/assets/home/icons/status_available.svg',
                  width: 24,
                  height: 24,
                ),
                title: Text(l10n.homeDriverStatusAvailable),
                onTap: () {
                  Navigator.pop(ctx);
                  _setStatus(DriverAvailability.available);
                },
              ),
              ListTile(
                leading: SvgPicture.asset(
                  'lib/resources/assets/home/icons/status_paused.svg',
                  width: 24,
                  height: 24,
                ),
                title: Text(l10n.homeDriverStatusPaused),
                onTap: () {
                  Navigator.pop(ctx);
                  _setStatus(DriverAvailability.paused);
                },
              ),
              ListTile(
                leading: SvgPicture.asset(
                  'lib/resources/assets/home/icons/status_unavailable.svg',
                  width: 24,
                  height: 24,
                ),
                title: Text(l10n.homeDriverStatusUnavailable),
                onTap: () {
                  Navigator.pop(ctx);
                  _setStatus(DriverAvailability.unavailable);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void onMenuItemTap(int index, BuildContext context) {
    if (_menuItems[index].hasNotification) {
      resetNotificationCount(index);
    }
    if (isDriver) {
      if (index == 0) {
        _showStatusPicker(context);
        return;
      }
      if (index == 1) {
        Navigator.pushNamed(context, AppRoutes.searchTransport);
        return;
      }
    } else {
      if (index == 0) {
        Navigator.pushNamed(context, AppRoutes.searchTransport);
        return;
      }
    }
  }
}
