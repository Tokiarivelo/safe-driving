import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/ui/screens/message_screens.dart';

class ContentPages {
  static List<Widget> getAllPages() {
    return [
      _buildSearchContent(),
      _buildMessagesContent(),
      _buildCoursesContent(),
      _buildScannerContent(),
      _buildNotificationsContent(),
      _buildTripContent(),
      _buildProfileContent(),
      _buildOffersContent(),
      _buildSettingsContent(),
      _buildHelpContent(),
    ];
  }

  static Widget _buildMessagesContent() {
    return const MessageScreen();
  }

  static Widget _buildNotificationsContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          Card(
            child: ListTile(
              leading: Icon(
                Icons.notifications_active,
                color: AppColors.color1,
              ),
              title: Text('Nouveau message'),
              subtitle: Text('Vous avez reçu un nouveau message'),
              trailing: Text('10:30'),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.local_offer, color: AppColors.color1),
              title: Text('Nouvelle offre'),
              subtitle: Text('Une nouvelle offre est disponible'),
              trailing: Text('09:15'),
            ),
          ),
        ],
      ),
    );
  }

  static Widget _buildSearchContent() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Rechercher un transport...',
              prefixIcon: Icon(Icons.search, color: AppColors.color1),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Text('Résultats de recherche apparaîtront ici'),
        ],
      ),
    );
  }

  static Widget _buildCoursesContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          Card(
            child: ListTile(
              leading: Icon(Icons.shopping_cart, color: AppColors.color1),
              title: Text('Course du 02/09'),
              subtitle: Text('15 articles • 45€'),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.shopping_cart, color: AppColors.color1),
              title: Text('Course du 01/09'),
              subtitle: Text('8 articles • 28€'),
            ),
          ),
        ],
      ),
    );
  }

  static Widget _buildScannerContent() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.color1, width: 2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.qr_code_scanner,
              size: 80,
              color: AppColors.color1,
            ),
          ),
          const SizedBox(height: 20),
          const Text('Scanner un QR code'),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.color1,
              foregroundColor: AppColors.light,
            ),
            child: const Text('Démarrer le scan'),
          ),
        ],
      ),
    );
  }

  static Widget _buildTripContent() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.directions_car, size: 64, color: AppColors.color1),
          SizedBox(height: 16),
          Text(
            'Trajet en cours',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            'Aucun trajet en cours',
            style: TextStyle(fontSize: 16, color: Colors.grey),
          ),
        ],
      ),
    );
  }

  static Widget _buildProfileContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundColor: AppColors.color1,
            child: Icon(Icons.person, size: 50, color: AppColors.light),
          ),
          SizedBox(height: 16),
          Text(
            'Votre Profil',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          ListTile(
            leading: Icon(Icons.person, color: AppColors.color1),
            title: Text('Informations personnelles'),
            trailing: Icon(Icons.arrow_forward_ios, size: 16),
          ),
          ListTile(
            leading: Icon(Icons.history, color: AppColors.color1),
            title: Text('Historique des trajets'),
            trailing: Icon(Icons.arrow_forward_ios, size: 16),
          ),
        ],
      ),
    );
  }

  static Widget _buildOffersContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          Card(
            child: ListTile(
              leading: Icon(Icons.local_offer, color: AppColors.color1),
              title: Text('Offre spéciale'),
              subtitle: Text('-20% sur votre prochain trajet'),
              trailing: Icon(Icons.arrow_forward_ios, size: 16),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.card_giftcard, color: AppColors.color1),
              title: Text('Cadeau de bienvenue'),
              subtitle: Text('2 trajets offerts'),
              trailing: Icon(Icons.arrow_forward_ios, size: 16),
            ),
          ),
        ],
      ),
    );
  }

  static Widget _buildSettingsContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          ListTile(
            leading: Icon(Icons.person, color: AppColors.color1),
            title: Text('Profil'),
            trailing: Icon(Icons.arrow_forward_ios, size: 16),
          ),
          ListTile(
            leading: Icon(Icons.notifications, color: AppColors.color1),
            title: Text('Notifications'),
            trailing: Icon(Icons.arrow_forward_ios, size: 16),
          ),
          ListTile(
            leading: Icon(Icons.security, color: AppColors.color1),
            title: Text('Sécurité'),
            trailing: Icon(Icons.arrow_forward_ios, size: 16),
          ),
        ],
      ),
    );
  }

  static Widget _buildHelpContent() {
    return const SingleChildScrollView(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          Card(
            child: ListTile(
              leading: Icon(Icons.help, color: AppColors.color1),
              title: Text('FAQ'),
              subtitle: Text('Questions fréquentes'),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.support_agent, color: AppColors.color1),
              title: Text('Support'),
              subtitle: Text('Contactez-nous'),
            ),
          ),
        ],
      ),
    );
  }
}
