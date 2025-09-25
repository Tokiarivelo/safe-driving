// import 'package:flutter/material.dart';
// import 'package:safe_driving/core/constants/colors/colors.dart';
// // import 'package:safe_driving/shared/widgets/customs/buttons/specialized/icon_with_badge.dart';

// class HorizontalScrollMenu extends StatefulWidget {
//   final int currentIndex;
//   final Function(int) onItemSelected;

//   const HorizontalScrollMenu({
//     super.key,
//     required this.currentIndex,
//     required this.onItemSelected,
//   });

//   @override
//   State<HorizontalScrollMenu> createState() => _HorizontalScrollMenuState();
// }

// class _HorizontalScrollMenuState extends State<HorizontalScrollMenu> {
//   final ScrollController _scrollController = ScrollController();

//   final List<Map<String, dynamic>> _menuItems = [
//     {
//       'icon': 'lib/resources/assets/home/icons/setting.svg',
//       'title': 'Paramètre',
//     },
//     {'icon': 'lib/resources/assets/home/icons/help.svg', 'title': 'Assistance'},
//     {
//       'icon': 'lib/resources/assets/home/icons/search.svg',
//       'title': 'Rechercher',
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/chat.svg',
//       'title': 'Message',
//       'hasNotification': true,
//       'count': 3,
//     },
//     {
//       'icon': 'lib/resources/assets/home/icons/course.svg',
//       'title': 'Mes courses',
//     },
//     {'icon': 'lib/resources/assets/home/icons/qr.svg', 'title': 'Scanner'},
//   ];

//   @override
//   void initState() {
//     super.initState();
//     WidgetsBinding.instance.addPostFrameCallback((_) {
//       _scrollToSelectedItem();
//     });
//   }

//   @override
//   void didUpdateWidget(covariant HorizontalScrollMenu oldWidget) {
//     super.didUpdateWidget(oldWidget);
//     if (oldWidget.currentIndex != widget.currentIndex) {
//       _scrollToSelectedItem();
//     }
//   }

//   void _scrollToSelectedItem() {
//     final double itemWidth = 80.0;
//     final double centerPosition =
//         (widget.currentIndex * itemWidth) -
//         (MediaQuery.of(context).size.width / 2) +
//         (itemWidth / 2);

//     _scrollController.animateTo(
//       centerPosition,
//       duration: const Duration(milliseconds: 300),
//       curve: Curves.easeInOut,
//     );
//   }

//   @override
//   void dispose() {
//     _scrollController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 90,
//       decoration: BoxDecoration(
//         color: AppColors.light,
//         boxShadow: [
//           BoxShadow(
//             color: Colors.black.withValues(alpha: 0.1),
//             blurRadius: 10,
//             offset: const Offset(0, -2),
//           ),
//         ],
//       ),
//       child: ListView.builder(
//         controller: _scrollController,
//         scrollDirection: Axis.horizontal,
//         padding: const EdgeInsets.symmetric(horizontal: 16),
//         itemCount: _menuItems.length,
//         itemBuilder: (context, index) {
//           final item = _menuItems[index];
//           final isSelected = widget.currentIndex == index;

//           return _buildMenuItem(
//             icon: item['icon'],
//             title: item['title'],
//             hasNotification: item['hasNotification'] ?? false,
//             notificationCount: item['count'] ?? 0,
//             isSelected: isSelected,
//             onTap: () => widget.onItemSelected(index),
//           );
//         },
//       ),
//     );
//   }

//   Widget _buildMenuItem({
//     required String icon,
//     required String title,
//     required bool isSelected,
//     required VoidCallback onTap,
//     bool hasNotification = false,
//     int notificationCount = 0,
//   }) {
//     return Container(
//       width: 80,
//       margin: const EdgeInsets.symmetric(horizontal: 4),
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           Stack(
//             clipBehavior: Clip.none,
//             children: [
//               Container(
//                 width: 60,
//                 height: 60,
//                 decoration: BoxDecoration(
//                   color: isSelected
//                       ? AppColors.color1.withValues(alpha: 0.15)
//                       : Colors.transparent,
//                   borderRadius: BorderRadius.circular(30),
//                   border: Border.all(
//                     color: isSelected ? AppColors.color1 : Colors.transparent,
//                     width: 2,
//                   ),
//                 ),
//                 child: IconButton(
//                   onPressed: onTap,
//                   icon: Icon(
//                     _getIconFromPath(icon),
//                     color: isSelected ? AppColors.color1 : AppColors.dark,
//                     size: 28,
//                   ),
//                 ),
//               ),

//               if (hasNotification && notificationCount > 0)
//                 Positioned(
//                   top: -2,
//                   right: -2,
//                   child: Container(
//                     width: 20,
//                     height: 20,
//                     decoration: const BoxDecoration(
//                       color: Colors.red,
//                       shape: BoxShape.circle,
//                     ),
//                     child: Center(
//                       child: Text(
//                         notificationCount > 9
//                             ? '9+'
//                             : notificationCount.toString(),
//                         style: const TextStyle(
//                           color: Colors.white,
//                           fontSize: 10,
//                           fontWeight: FontWeight.bold,
//                         ),
//                       ),
//                     ),
//                   ),
//                 ),
//             ],
//           ),

//           const SizedBox(height: 4),

//           // Titre
//           Text(
//             title,
//             textAlign: TextAlign.center,
//             style: TextStyle(
//               fontSize: 11,
//               fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
//               color: isSelected ? AppColors.color1 : AppColors.dark,
//             ),
//             maxLines: 2,
//             overflow: TextOverflow.ellipsis,
//           ),
//         ],
//       ),
//     );
//   }

//   IconData _getIconFromPath(String iconPath) {
//     final Map<String, IconData> iconMap = {
//       'setting.svg': Icons.settings,
//       'help.svg': Icons.help,
//       'search.svg': Icons.search,
//       'chat.svg': Icons.chat,
//       'course.svg': Icons.shopping_cart,
//       'qr.svg': Icons.qr_code_scanner,
//     };

//     final String iconName = iconPath.split('/').last;
//     return iconMap[iconName] ?? Icons.error;
//   }
// }
