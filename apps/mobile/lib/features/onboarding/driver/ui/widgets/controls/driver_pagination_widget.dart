import 'package:flutter/material.dart';

class DriverPaginationStyle {
  final Color? primaryColor;
  final Color? backgroundColor;
  final BoxDecoration? backgroundDecoration;
  final Color? textColor;
  final double? progressBarHeight;
  final String? title;
  final IconData? backIcon;
  final List<IconData>? actions;

  const DriverPaginationStyle({
    this.primaryColor,
    this.backgroundColor,
    this.backgroundDecoration,
    this.textColor,
    this.progressBarHeight,
    this.title,
    this.backIcon,
    this.actions,
  });
}

class DriverPaginationWidget extends StatefulWidget {
  final int totalSteps;
  final Widget Function(
    int currentStep,
    VoidCallback nextStep,
    VoidCallback previousStep,
  )
  contentBuilder;
  final VoidCallback? onCompleted;
  final DriverPaginationStyle? style;
  final String? title;
  final VoidCallback? onBack;
  final Function(int)? onStepChanged;
  final bool hideAppBar;
  final PageController? pageController;

  const DriverPaginationWidget({
    super.key,
    required this.totalSteps,
    required this.contentBuilder,
    this.onCompleted,
    this.style,
    this.title,
    this.onBack,
    this.onStepChanged,
    this.hideAppBar = false,
    this.pageController,
  });

  @override
  DriverPaginationWidgetState createState() => DriverPaginationWidgetState();
}

class DriverPaginationWidgetState extends State<DriverPaginationWidget>
    with TickerProviderStateMixin {
  int _currentStep = 1;
  bool _showProgressBar = false;

  late AnimationController _progressController;
  late AnimationController _contentController;
  late AnimationController _barAnimationController;
  late AnimationController _clickAnimationController;
  late Animation<double> _progressAnimation;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();

    _pageController = widget.pageController ?? PageController();

    // Animation controllers
    _progressController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _contentController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _barAnimationController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _clickAnimationController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );

    // Animations
    _progressAnimation =
        Tween<double>(
          begin: 0.0,
          end: _currentStep / widget.totalSteps,
        ).animate(
          CurvedAnimation(parent: _progressController, curve: Curves.easeInOut),
        );

    // Démarrer les animations initiales
    _progressController.forward();
    _contentController.forward();
  }

  @override
  void dispose() {
    _progressController.dispose();
    _contentController.dispose();
    _barAnimationController.dispose();
    _clickAnimationController.dispose();
    if (widget.pageController == null) {
      _pageController.dispose();
    }
    super.dispose();
  }

  void _updateProgressAnimation() {
    _progressAnimation =
        Tween<double>(
          begin: _progressAnimation.value,
          end: _currentStep / widget.totalSteps,
        ).animate(
          CurvedAnimation(parent: _progressController, curve: Curves.easeInOut),
        );
    _progressController.reset();
    _progressController.forward();
  }

  void _toggleProgressBar() {
    // Animation de clic avec bounce
    _clickAnimationController.forward().then((_) {
      _clickAnimationController.reverse();
    });

    setState(() {
      _showProgressBar = !_showProgressBar;
    });

    if (_showProgressBar) {
      _barAnimationController.forward();
    } else {
      _barAnimationController.reverse();
    }
  }

  void _goToStep(int step) {
    if (step >= 1 && step <= widget.totalSteps) {
      setState(() {
        _currentStep = step;
      });

      // Animation du PageController et du contenu en parallèle
      _pageController.animateToPage(
        step - 1,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );

      _updateProgressAnimation();
      widget.onStepChanged?.call(_currentStep);
    }
  }

  void _nextStep() {
    if (_currentStep < widget.totalSteps) {
      _goToStep(_currentStep + 1);
    } else if (widget.onCompleted != null) {
      widget.onCompleted!();
    }
  }

  void _previousStep() {
    if (_currentStep > 1) {
      _goToStep(_currentStep - 1);
    }
  }

  void goToStep(int step) {
    _goToStep(step);
  }

  int get currentStep => _currentStep;
  bool get showProgressBar => _showProgressBar;
  PageController get pageController => _pageController;

  void nextStep() => _nextStep();
  void previousStep() => _previousStep();
  void toggleProgressBar() => _toggleProgressBar();

  @override
  Widget build(BuildContext context) {
    return widget.contentBuilder(_currentStep, _nextStep, _previousStep);
  }
}
