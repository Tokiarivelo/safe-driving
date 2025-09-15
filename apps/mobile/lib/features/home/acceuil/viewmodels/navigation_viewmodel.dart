import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/models/nav_item.dart';

class NavigationViewModel with ChangeNotifier {
  int _currentIndex = 0;
  final PageController _pageController = PageController();
  List<NavItem> _navItems = [];

  int get currentIndex => _currentIndex;
  PageController get pageController => _pageController;
  List<NavItem> get navItems => _navItems;

  void setNavItems(List<NavItem> items) {
    if (_navItems != items) {
      _navItems = items;
      notifyListeners();
    }
  }

  void changeIndex(int index) {
    if (_currentIndex != index && index >= 0 && index < _navItems.length) {
      _currentIndex = index;
      _pageController.jumpToPage(index);
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
