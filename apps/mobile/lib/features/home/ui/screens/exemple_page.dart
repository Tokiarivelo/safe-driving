// example_page.dart
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/ui/widgets/menu_horizental/horizontal_scroll_menu.dart';

class ExamplePage extends StatefulWidget {
  const ExamplePage({super.key});

  @override
  State<ExamplePage> createState() => _ExamplePageState();
}

class _ExamplePageState extends State<ExamplePage> {
  int _currentIndex = 0;
  final PageController _pageController = PageController();

  // Titres des pages pour l'app bar
  final List<String> _pageTitles = [
    'Paramètres',
    'Assistance',
    'Rechercher',
    'Messages',
    'Mes courses',
    'Scanner',
  ];

  // Contenu simplifié pour chaque page
  final List<Widget> _pageContents = [
    _buildSettingsContent(),
    _buildHelpContent(),
    _buildSearchContent(),
    _buildMessagesContent(),
    _buildCoursesContent(),
    _buildScannerContent(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.light,
      appBar: AppBar(
        title: Text(
          _pageTitles[_currentIndex],
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.dark,
          ),
        ),
        backgroundColor: AppColors.light,
        elevation: 0,
        centerTitle: true,
      ),
      body: PageView(
        controller: _pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: _pageContents,
      ),
      bottomNavigationBar: HorizontalScrollMenu(
        currentIndex: _currentIndex,
        onItemSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
          _pageController.jumpToPage(index);
        },
      ),
    );
  }

  // Méthodes pour le contenu de chaque page
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

  static Widget _buildSearchContent() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Rechercher...',
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

  static Widget _buildMessagesContent() {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        _buildMessageTile('Jean Dupont', 'Salut, ça va?', '10:30', true),
        _buildMessageTile(
          'Marie Curie',
          'Merci pour le trajet!',
          '09:15',
          false,
        ),
        _buildMessageTile(
          'Transport SA',
          'Nouvelle offre disponible',
          'Hier',
          true,
        ),
      ],
    );
  }

  static Widget _buildMessageTile(
    String name,
    String message,
    String time,
    bool unread,
  ) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: AppColors.color1,
        child: Text(name[0], style: const TextStyle(color: Colors.white)),
      ),
      title: Text(
        name,
        style: TextStyle(
          fontWeight: unread ? FontWeight.bold : FontWeight.normal,
        ),
      ),
      subtitle: Text(message),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(time, style: const TextStyle(fontSize: 12)),
          if (unread)
            const Icon(Icons.circle, color: AppColors.color1, size: 12),
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
            child: const Text('Démarrer le scan'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
