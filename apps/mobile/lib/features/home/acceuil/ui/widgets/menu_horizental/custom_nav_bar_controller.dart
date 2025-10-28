import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/acceuil/service/scroll_service.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';

class CustomNavBarController {
  final ScrollController _scrollController = ScrollController();
  final List<GlobalKey> _itemKeys = [];
  NavigationViewModel? _viewModel;
  BuildContext? _context;

  ScrollController get scrollController => _scrollController;
  List<GlobalKey> get itemKeys => _itemKeys;

  void setupViewModel(BuildContext context, NavigationViewModel viewModel) {
    if (_itemKeys.length != viewModel.navItems.length) {
      _itemKeys.clear();
      for (int i = 0; i < viewModel.navItems.length; i++) {
        _itemKeys.add(GlobalKey());
      }
    }

    if (_viewModel != viewModel) {
      _viewModel?.removeListener(_onViewModelChanged);
      _viewModel = viewModel;
      _viewModel?.addListener(_onViewModelChanged);
    }
  }

  void _onViewModelChanged() {
    WidgetsBinding.instance.addPostFrameCallback((_) => scrollToActiveItem());
  }

  void scrollToActiveItem() {
    if (_viewModel == null || _context == null) return;
    if (_itemKeys.isEmpty || _viewModel!.currentIndex >= _itemKeys.length) {
      return;
    }
  }

  void dispose() {
    _viewModel?.removeListener(_onViewModelChanged);
    _scrollController.dispose();
  }

  List<int> getDisplayOrder(NavigationViewModel viewModel) {
    final int n = viewModel.navItems.length;
    if (n == 0) return [];

    int centerSlot = 2;
    if (centerSlot >= n) centerSlot = n ~/ 2;

    int start = viewModel.currentIndex - centerSlot;
    start = ((start % n) + n) % n;

    return List<int>.generate(n, (i) => (start + i) % n);
  }

  void onItemTap(
    int index,
    NavigationViewModel viewModel,
    BuildContext context,
  ) {
    viewModel.changeIndex(index);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      scrollToActiveItem();
    });
  }

  void onScroll() {
    if (_context == null || _viewModel == null) return;

    final index = ScrollService.detectActiveIndex(
      scrollController: _scrollController,
      itemKeys: _itemKeys,
      context: _context!,
    );

    if (index != _viewModel!.currentIndex) {
      _viewModel!.changeIndex(index);
    }
  }
}
