import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../viewmodels/home_view_model.dart';
import '../widgets/homeWidgets/home_content.dart';
import '../widgets/homeWidgets/sidebar_button.dart';
import '../widgets/homeWidgets/animated_sidebar.dart';

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
    print('Menu item selected: $index');
  }

  void _handleLogout() {
    print('Déconnexion demandée');
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
              const Expanded(child: HomeContent()),
              AnimatedSidebar(
                isVisible: _isSidebarVisible,
                onProfileTap: _handleProfileTap,
                onMenuItemSelected: _handleMenuItemSelected,
                onClose: _closeSidebar,
                onLogout: _handleLogout,
              ),
              SidebarButton(onTap: _openSidebar, isVisible: !_isSidebarVisible),
            ],
          ),
        ),
      ),
    );
  }
}
