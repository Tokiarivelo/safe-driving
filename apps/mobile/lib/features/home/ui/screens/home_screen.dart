import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/homeWidgets/animated_sidebar.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/homeWidgets/home_content.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/homeWidgets/sidebar_button.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/home_view_model.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isSidebarVisible = false;

  void _handleProfileTap() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Profil cliqué!'),
        duration: Duration(milliseconds: 300),
      ),
    );
  }

  void _handleMenuItemSelected(int index) {
    debugPrint('Menu item selected: $index');
  }

  void _handleLogout() {
    debugPrint('Déconnexion demandée');
    setState(() {
      _isSidebarVisible = false;
    });
  }

  void _openSidebar() {
    setState(() {
      _isSidebarVisible = true;
    });
  }

  void _closeSidebar() {
    setState(() {
      _isSidebarVisible = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => HomeViewModel(),
      child: Scaffold(
        backgroundColor: AppColors.dark,
        body: SafeArea(
          child: Stack(
            children: [
              // Contenu principal
              const Positioned.fill(child: HomeContent()),
              // Sidebar animmation
              AnimatedSidebar(
                isVisible: _isSidebarVisible,
                onProfileTap: _handleProfileTap,
                onMenuItemSelected: _handleMenuItemSelected,
                onClose: _closeSidebar,
                onLogout: _handleLogout,
              ),
              // Bouton sidebar
              SidebarButton(onTap: _openSidebar, isVisible: !_isSidebarVisible),
            ],
          ),
        ),
      ),
    );
  }
}
