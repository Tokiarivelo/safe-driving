import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../../viewmodels/home_view_model.dart';
import 'home_header.dart';
import 'home_logo.dart';
import '../menu_grid.dart';

class HomeContent extends StatelessWidget {
  const HomeContent({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      color: isDark ? AppColors.backgroundPrimary : AppColors.light,
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
    );
  }
}
