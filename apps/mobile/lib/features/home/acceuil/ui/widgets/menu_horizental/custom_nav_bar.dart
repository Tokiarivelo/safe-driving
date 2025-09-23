import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/menu_horizental/nav_item_widget.dart';

class CustomNavBarView extends StatefulWidget {
  final Color activeColor;
  final Color tabBackgroundColor;

  const CustomNavBarView({
    super.key,
    this.activeColor = AppColors.dark,
    this.tabBackgroundColor = AppColors.light,
  });

  @override
  State<CustomNavBarView> createState() => _CustomNavBarViewState();
}

class _CustomNavBarViewState extends State<CustomNavBarView> {
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(
      viewportFraction: 1 / 5,
      initialPage: 1000,
    );
  }

  int _realIndex(int index, int length) => index % length;

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<NavigationViewModel>(context);
    final items = viewModel.navItems;
    if (items.isEmpty) return const SizedBox.shrink();

    return Stack(
      clipBehavior: Clip.none,
      children: [
        _buildBackground(),
        Positioned(
          top: -20,
          left: 0,
          right: 0,
          child: SizedBox(
            height: 120,
            child: PageView.builder(
              controller: _pageController,
              scrollDirection: Axis.horizontal,
              onPageChanged: (index) {
                final realIndex = _realIndex(index, items.length);
                viewModel.changeIndex(realIndex);
              },
              itemBuilder: (context, index) {
                final realIndex = _realIndex(index, items.length);
                final item = items[realIndex];
                final isActive = viewModel.currentIndex == realIndex;

                return Transform.translate(
                  offset: isActive ? const Offset(0, -1) : Offset.zero,
                  child: NavItemWidget(
                    item: item,
                    isActive: isActive,
                    activeColor: widget.activeColor,
                    tabBackgroundColor: widget.tabBackgroundColor,
                    onTap: () {
                      _pageController.animateToPage(
                        index,
                        duration: const Duration(milliseconds: 400),
                        curve: Curves.easeOut,
                      );
                      viewModel.changeIndex(realIndex);
                    },
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBackground() {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return Container(
      height: 75,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2A2A2A) : AppColors.light, 
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.black.withValues(alpha: 0.4)
                : AppColors.unclickable.withValues(alpha: 0.3),
            blurRadius: isDark ? 6 : 8,
            spreadRadius: isDark ? 0 : 1,
            offset: const Offset(0, -2), // Ombre vers le haut pour la navigation bar
          ),
        ],
      ),
    );
  }
}
