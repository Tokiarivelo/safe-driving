import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import '../widgets/user_interactive_menu_widget.dart';

class UserOnboardingScreen extends StatelessWidget {
  const UserOnboardingScreen({super.key});

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
