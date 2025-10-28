// import 'package:flutter/material.dart';
// import 'package:safe_driving/core/constants/colors/colors.dart';
// import 'package:safe_driving/shared/widgets/customs/buttons/specialized/icon_with_badge.dart';

// class BottomNavMenu extends StatefulWidget {
//   final int currentIndex;
//   final Function(int) onItemSelected;

//   const BottomNavMenu({
//     super.key,
//     required this.currentIndex,
//     required this.onItemSelected,
//   });

//   @override
//   State<BottomNavMenu> createState() => _BottomNavMenuState();
// }

// class _BottomNavMenuState extends State<BottomNavMenu> {
//   final List<Map<String, dynamic>> _menuItems = [
//     {
//       'icon': 'lib/resources/assets/home/icons/setting.svg',
//       'title': 'Paramètre',
//       'hasNotification': false,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/help.svg',
//       'title': 'Assistance',
//       'hasNotification': false,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/search.svg',
//       'title': 'Rechercher',
//       'hasNotification': false,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/chat.svg',
//       'title': 'Message',
//       'hasNotification': true,
//       'notificationCount': 3,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/course.svg',
//       'title': 'Mes courses',
//       'hasNotification': false,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/qr.svg',
//       'title': 'Scanner',
//       'hasNotification': false,
//     },
//   ];

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 80,
//       decoration: BoxDecoration(
//         color: AppColors.light,
//         boxShadow: [
//           BoxShadow(
//             color: Colors.black.withOpacity(0.1),
//             blurRadius: 10,
//             offset: const Offset(0, -2),
//           ),
//         ],
//         borderRadius: const BorderRadius.only(
//           topLeft: Radius.circular(20),
//           topRight: Radius.circular(20),
//         ),
//       ),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.spaceAround,
//         children: List.generate(
//           _menuItems.length,
//           (index) => _buildNavItem(
//             icon: _menuItems[index]['icon'],
//             title: _menuItems[index]['title'],
//             hasNotification: _menuItems[index]['hasNotification'] ?? false,
//             notificationCount: _menuItems[index]['notificationCount'] ?? 0,
//             isSelected: widget.currentIndex == index,
//             onTap: () => widget.onItemSelected(index),
//           ),
//         ),
//       ),
//     );
//   }

//   Widget _buildNavItem({
//     required String icon,
//     required String title,
//     required bool isSelected,
//     required VoidCallback onTap,
//     bool hasNotification = false,
//     int notificationCount = 0,
//   }) {
//     return GestureDetector(
//       onTap: onTap,
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           // Container avec animation de rotation
//           _AnimatedIconContainer(
//             iconPath: icon,
//             isSelected: isSelected,
//             hasNotification: hasNotification,
//             notificationCount: notificationCount,
//           ),
//           const SizedBox(height: 4),
//           Text(
//             title,
//             style: TextStyle(
//               fontSize: 10,
//               fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
//               color: isSelected ? AppColors.color1 : AppColors.dark,
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

// class _AnimatedIconContainer extends StatefulWidget {
//   final String iconPath;
//   final bool isSelected;
//   final bool hasNotification;
//   final int notificationCount;

//   const _AnimatedIconContainer({
//     required this.iconPath,
//     required this.isSelected,
//     required this.hasNotification,
//     required this.notificationCount,
//   });

//   @override
//   State<_AnimatedIconContainer> createState() => _AnimatedIconContainerState();
// }

// class _AnimatedIconContainerState extends State<_AnimatedIconContainer>
//     with SingleTickerProviderStateMixin {
//   late AnimationController _controller;
//   late Animation<double> _animation;

//   @override
//   void initState() {
//     super.initState();
//     _controller = AnimationController(
//       duration: const Duration(milliseconds: 300),
//       vsync: this,
//     );
//     _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
//   }

//   @override
//   void didUpdateWidget(covariant _AnimatedIconContainer oldWidget) {
//     super.didUpdateWidget(oldWidget);
//     if (widget.isSelected && !oldWidget.isSelected) {
//       _controller.forward(from: 0);
//     }
//   }

//   @override
//   void dispose() {
//     _controller.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Stack(
//       clipBehavior: Clip.none,
//       children: [
//         Container(
//           width: 50,
//           height: 50,
//           decoration: BoxDecoration(
//             color: widget.isSelected
//                 ? AppColors.color1.withOpacity(0.1)
//                 : Colors.transparent,
//             borderRadius: BorderRadius.circular(12),
//           ),
//           child: RotationTransition(
//             turns: _animation,
//             child: IconButtonWithBadge(
//               iconPath: widget.iconPath,
//               title: '',
//               onPressed: () {},
//               hasNotification: widget.hasNotification,
//               notificationCount: widget.notificationCount,
//               iconSize: 24,
//               badgeSize: 16,
//               backgroundColor: Colors.transparent,
//               padding: EdgeInsets.zero,
//             ),
//           ),
//         ),
//       ],
//     );
//   }
// }
