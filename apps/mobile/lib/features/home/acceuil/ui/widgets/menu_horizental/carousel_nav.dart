import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/menu_horizental/custom_nav_bar_controller.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/menu_horizental/nav_item_widget.dart';

class CustomNavBarView extends StatefulWidget {
  final Color activeColor;
  final Color tabBackgroundColor;
  final CustomNavBarController? controller;
  final VoidCallback? onMessageTap;

  const CustomNavBarView({
    super.key,
    this.activeColor = AppColors.dark,
    this.tabBackgroundColor = AppColors.light,
    this.controller,
    this.onMessageTap,
  });

  @override
  State<CustomNavBarView> createState() => _CustomNavBarViewState();
}

class _CustomNavBarViewState extends State<CustomNavBarView> {
  late final CustomNavBarController _controller;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? CustomNavBarController();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final viewModel = Provider.of<NavigationViewModel>(context);
    _controller.setupViewModel(context, viewModel);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<NavigationViewModel>(context);

    if (viewModel.navItems.isEmpty) {
      return const SizedBox.shrink();
    }

    return SizedBox(
      height: 110,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              height: 90,
              decoration: BoxDecoration(
                color: AppColors.light,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.unclickable.withValues(alpha: 0.3),
                    blurRadius: 8,
                    spreadRadius: 1,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
            ),
          ),

          Positioned(
            left: MediaQuery.of(context).size.width / 2 - 40,
            bottom: 25,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(40),
                border: Border.all(color: widget.tabBackgroundColor, width: 2),
                boxShadow: [
                  BoxShadow(
                    color: widget.activeColor.withValues(alpha: 0.3),
                    blurRadius: 14,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
            ),
          ),

          Positioned.fill(
            child: SingleChildScrollView(
              controller: _controller.scrollController,
              scrollDirection: Axis.horizontal,
              physics: const ClampingScrollPhysics(),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
                child: Row(
                  children: List.generate(viewModel.navItems.length, (index) {
                    return _buildNavItem(viewModel, index);
                  }),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(NavigationViewModel viewModel, int index) {
    final item = viewModel.navItems[index];
    final isActive = viewModel.currentIndex == index;

    final isMessageButton = item.title.toLowerCase().contains('message');

    return NavItemWidget(
      key: _controller.itemKeys.length > index
          ? _controller.itemKeys[index]
          : null,
      item: item,
      isActive: isActive,
      activeColor: widget.activeColor,
      tabBackgroundColor: widget.tabBackgroundColor,
      onTap: () {
        if (isMessageButton && widget.onMessageTap != null) {
          widget.onMessageTap!();
        } else {
          _controller.onItemTap(index, viewModel, context);
        }
      },
    );
  }
}
