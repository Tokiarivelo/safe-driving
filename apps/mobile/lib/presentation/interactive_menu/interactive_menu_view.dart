// interactive_menu_view.dart

import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/colors/colors_widget.dart';
import 'package:safe_driving/shared/widgets/customs/interactive_menu_widget.dart';

class InteractiveMenuView extends StatelessWidget {
  const InteractiveMenuView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: ColorsWidget.background,
        child: SafeArea(child: InteractiveMenuWidget()),
      ),
    );
  }
}
