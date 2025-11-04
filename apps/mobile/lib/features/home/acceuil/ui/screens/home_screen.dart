import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
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

  @override
  void initState() {
    super.initState();
    _initUser();
  }

  Future<void> _initUser() async {
    final sessionService = SessionService();
    final userId = await sessionService.getUserId();

    if (userId != null) {
      final viewModel = ServiceLocator.instance.get<MessageViewmodels>();
      viewModel.setCurrentUserId(userId);
      await viewModel.loadConversations();
    }
  }

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

  void _handleLogout() async {
    debugPrint('Déconnexion en cours...');

    // final sessionService = SessionService();
    // final viewModel = ServiceLocator.instance.get<MessageViewmodels>();

    // viewModel.clearData();
    // await sessionService.clear();
    // await sessionService.initialize();
    // if (mounted) {
    //   Navigator.pushNamedAndRemoveUntil(context, '/auth', (route) => false);
    // }

    debugPrint('✅ Déconnexion réussie et données nettoyées');
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
      create: (context) => HomeViewModel(
        isDriver: context.read<AuthViewModel>().currentUser?.isDriver ?? false,
      )..init(),
      child: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              // Contenu principal
              const Positioned.fill(child: HomeContent()),
              // Sidebar animation
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
