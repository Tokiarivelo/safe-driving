import 'package:flutter/material.dart';
import '../../viewmodels/home_view_model.dart';
import 'menu_button_builder.dart';
import 'package:safe_driving/l10n/l10n.dart';

class MenuGrid extends StatelessWidget {
  final HomeViewModel viewModel;

  const MenuGrid({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(35.0),
      child: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 16.0,
          mainAxisSpacing: 6.0,
          childAspectRatio: 0.85,
        ),
        itemCount: viewModel.menuItems.length,
        itemBuilder: (context, index) {
          final item = viewModel.menuItems[index];
          final title = _localizedTitle(context, item.title);
          return _buildMenuButton(
            iconPath: item.iconPath,
            title: title,
            hasNotification: item.hasNotification,
            notificationCount: item.notificationCount,
            onTap: () => viewModel.onMenuItemTap(index, context),
          );
        },
      ),
    );
  }

  Widget _buildMenuButton({
    required String iconPath,
    required String title,
    bool hasNotification = false,
    int notificationCount = 0,
    required VoidCallback onTap,
  }) {
    return MenuButtonBuilder.buildMenuButton(
      iconPath: iconPath,
      title: title,
      onPressed: onTap,
      hasNotification: hasNotification,
      notificationCount: notificationCount,
    );
  }

  String _localizedTitle(BuildContext context, String title) {
    final l10n = context.l10n;
    switch (title) {
      case 'Rechercher un transport':
        return l10n.homeSearchTransport;
      case 'Rechercher des courses':
        return l10n.homeSearchRides;
      case 'Libre':
        return l10n.homeDriverStatusAvailable;
      case 'En pause':
        return l10n.homeDriverStatusPaused;
      case 'Indisponible':
        return l10n.homeDriverStatusUnavailable;
      case 'Messages':
        return l10n.homeMessages;
      case 'Mes courses':
        return l10n.homeMyRides;
      case 'Scanner Qr code':
      case 'Scanner QR':
        return l10n.homeScanQr;
      case 'Trajet en cours':
        return l10n.homeCurrentTrip;
      case 'Profile':
      case 'Profil':
        return l10n.homeProfile;
      case 'Offres & promotions':
        return l10n.homeOffers;
      case 'Paramètre':
      case 'Paramètres':
        return l10n.homeSettings;
      case 'Assistance':
        return l10n.homeHelp;
      default:
        return title;
    }
  }
}
