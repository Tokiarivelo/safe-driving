import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/service/navigation_service.dart';
import 'package:safe_driving/features/home/acceuil/ui/screens/content_page.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/menu_horizental/custom_nav_bar.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';

class ExamplePage extends StatefulWidget {
  const ExamplePage({super.key});

  @override
  State<ExamplePage> createState() => _ExamplePageState();
}

class _ExamplePageState extends State<ExamplePage> {
  final List<Widget> _pages = ContentPages.getAllPages();
  final List<String> _pageTitles = NavigationService.getPageTitles();
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _initializeNavItems();
    });
  }

  void _initializeNavItems() {
    final viewModel = Provider.of<NavigationViewModel>(context, listen: false);
    viewModel.setNavItems(NavigationService.getDefaultNavItems(_pages));
    setState(() {
      _isInitialized = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<NavigationViewModel>(context);
    if (!_isInitialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      backgroundColor: AppColors.light,
      appBar: AppBar(
        title: Text(
          _pageTitles[viewModel.currentIndex],
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.dark,
          ),
        ),
        backgroundColor: AppColors.light,
        elevation: 0,
        centerTitle: true,
      ),
      body: PageView(
        controller: viewModel.pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: _pages,
        onPageChanged: (index) {
          viewModel.changeIndex(index);
        },
      ),
      bottomNavigationBar: const CustomNavBarView(
        activeColor: AppColors.dark,
        tabBackgroundColor: AppColors.light,
      ),
    );
  }
}
