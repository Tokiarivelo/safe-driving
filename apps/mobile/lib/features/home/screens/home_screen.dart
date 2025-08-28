import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../view_models/home_view_model.dart';
import '../widgets/home_header.dart';
import '../widgets/home_logo.dart';
import '../widgets/menu_grid.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => HomeViewModel(),
      child: Scaffold(
        backgroundColor: AppColors.light,
        body: SafeArea(
          child: Column(
            children: [
              const HomeHeader(),
              const SizedBox(height: 45),
              const HomeLogo(),
              const SizedBox(height: 5),
              Expanded(
                child: Consumer<HomeViewModel>(
                  builder: (context, viewModel, child) {
                    return MenuGrid(viewModel: viewModel);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
