import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import '../../viewmodels/user_onboarding_viewmodel.dart';
import '../widgets/user_interactive_menu_widget.dart';

class UserOnboardingScreen extends StatefulWidget {
  const UserOnboardingScreen({super.key});

  @override
  State<UserOnboardingScreen> createState() => _UserOnboardingScreenState();
}

class _UserOnboardingScreenState extends State<UserOnboardingScreen> {
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    // Initialize expanded tiles (open "Bienvenue" by default) and load any saved prefs
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted || _initialized) return;
      final vm = context.read<UserOnboardingViewModel>();
      vm.init();
      await vm.loadPreferences();
      if (!mounted) return;
      setState(() => _initialized = true);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: ColorsWidget.background(context),
        child: const SafeArea(child: UserInteractiveMenuWidget()),
      ),
    );
  }
}
