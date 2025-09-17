// import 'package:flutter/material.dart';

// class CarouselNav extends StatefulWidget {
//   final List<String> items;
//   const CarouselNav({super.key, required this.items});

//   @override
//   State<CarouselNav> createState() => _CarouselNavState();
// }

// class _CarouselNavState extends State<CarouselNav> {
//   late PageController _pageController;
//   int _currentIndex = 0;

//   @override
//   void initState() {
//     super.initState();
//     _pageController = PageController(
//       viewportFraction: 1 / 5,
//       initialPage: 1000,
//     );
//   }

//   @override
//   void dispose() {
//     _pageController.dispose();
//     super.dispose();
//   }

//   int _realIndex(int index) {
//     return index % widget.items.length;
//   }

//   @override
//   Widget build(BuildContext context) {
//     return SizedBox(
//       child: PageView.builder(
//         controller: _pageController,
//         scrollDirection: Axis.horizontal,
//         onPageChanged: (index) {
//           setState(() {
//             _currentIndex = _realIndex(index);
//           });
//         },
//         itemBuilder: (context, index) {
//           final realIndex = _realIndex(index);
//           final isActive = realIndex == _currentIndex;

//           return AnimatedScale(
//             scale: isActive ? 1.2 : 1.0,
//             duration: const Duration(milliseconds: 300),
//             child: GestureDetector(
//               onTap: () {
//                 _pageController.animateToPage(
//                   index,
//                   duration: const Duration(milliseconds: 400),
//                   curve: Curves.easeOut,
//                 );
//               },
//               child: Container(
//                 decoration: BoxDecoration(
//                   color: isActive ? Colors.blueAccent : Colors.grey[300],
//                   borderRadius: BorderRadius.circular(30),
//                   boxShadow: isActive
//                       ? [
//                           BoxShadow(
//                             color: Colors.black26,
//                             blurRadius: 10,
//                             offset: const Offset(0, 4),
//                           ),
//                         ]
//                       : [],
//                 ),
//                 alignment: Alignment.center,
//                 child: Text(
//                   widget.items[realIndex],
//                   style: TextStyle(
//                     color: isActive ? Colors.white : Colors.black,
//                     fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
//                   ),
//                 ),
//               ),
//             ),
//           );
//         },
//       ),
//     );
//   }
// }

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
  final VoidCallback? onMessageTap; // Nouveau callback

  const CustomNavBarView({
    super.key,
    this.activeColor = AppColors.dark,
    this.tabBackgroundColor = AppColors.light,
    this.controller,
    this.onMessageTap, // Callback optionnel
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
          // Fond de la barre
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

          // Indicateur central fixe
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
                    color: widget.activeColor.withOpacity(0.3),
                    blurRadius: 14,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
            ),
          ),

          // Barre de navigation scrollable
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

    // Vérifier si c'est le bouton Message
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
          // Si c'est le bouton Message et qu'un callback est fourni
          widget.onMessageTap!();
        } else {
          // Comportement normal pour les autres boutons
          _controller.onItemTap(index, viewModel, context);
        }
      },
    );
  }
}
