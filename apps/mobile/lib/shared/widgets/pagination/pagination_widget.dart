import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../customs/animations/animation_widget.dart';

// Classe pour personnaliser le style du widget de pagination
class PaginationStyle {
  final Color? primaryColor;
  final Color? backgroundColor;
  final BoxDecoration? backgroundDecoration;
  final Color? textColor;
  final double? progressBarHeight;
  final String? title;
  final IconData? backIcon;
  final List<IconData>? actions;

  const PaginationStyle({
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

class PaginationWidget extends StatefulWidget {
  final int totalSteps;
  final Widget Function(
    int currentStep,
    VoidCallback nextStep,
    VoidCallback previousStep,
  )
  contentBuilder;
  final VoidCallback? onCompleted;
  final PaginationStyle? style;
  final String? title;
  final VoidCallback? onBack;
  final Function(int)? onStepChanged;
  final bool hideAppBar;
  final PageController? pageController;

  const PaginationWidget({
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
  PaginationWidgetState createState() => PaginationWidgetState();
}

class PaginationWidgetState extends State<PaginationWidget>
    with TickerProviderStateMixin {
  int _currentStep = 1;
  bool _showProgressBar = false;

  late AnimationController _progressController;
  late AnimationController _contentController;
  late AnimationController _barAnimationController;
  late AnimationController _clickAnimationController;
  late Animation<double> _progressAnimation;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _barSlideAnimation;
  late Animation<double> _clickScaleAnimation;
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

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _contentController, curve: Curves.easeInOut),
    );

    _slideAnimation =
        Tween<Offset>(begin: const Offset(0, 0.3), end: Offset.zero).animate(
          CurvedAnimation(
            parent: _contentController,
            curve: Curves.easeOutCubic,
          ),
        );

    _barSlideAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _barAnimationController, curve: Curves.easeInOut),
    );

    _clickScaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(
        parent: _clickAnimationController,
        curve: Curves.easeInOut,
      ),
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
      // Animation de fermeture plus fluide avec courbe élastique
<<<<<<< HEAD
      _barAnimationController.reverse().then((_) {});
=======
      _barAnimationController.reverse().then((_) {
        // Animation complète
      });
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
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

  Widget buildCircularProgress() {
    return AnimatedBuilder(
      animation: _clickScaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _clickScaleAnimation.value,
          child: GestureDetector(
            onTap: _toggleProgressBar,
            child: Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.forSmoothProgression,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.blur,
                    blurRadius: 8,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Center(
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 300),
                  child: _showProgressBar
                      ? Transform.translate(
                          offset: const Offset(0, -4), // Ajustement vertical
                          child: const Text(
                            '—',
                            key: ValueKey('dash'),
                            style: TextStyle(
                              color: AppColors.light,
                              fontSize: 45,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        )
                      : Text(
                          '$_currentStep/${widget.totalSteps}',
                          key: ValueKey('progress'),
                          style: const TextStyle(
                            color: AppColors.light,
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget buildDotDashProgress() {
    return PaginationAnimations.buildProgressBarAnimation(
      animation: _barSlideAnimation,
      child: LayoutBuilder(
        builder: (context, constraints) {
          final availableWidth = constraints.maxWidth - 16;
          const dotSize = 10.0;
          const minDashWidth = 18.0;
          const maxDashWidth = 24.0;

          double dashWidth =
              (availableWidth - (widget.totalSteps * dotSize)) /
              (widget.totalSteps - 1);
          dashWidth = dashWidth.clamp(minDashWidth, maxDashWidth);

          return SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: _buildStepDotsAndDashes(dotSize, dashWidth),
              ),
            ),
          );
        },
      ),
    );
  }

  List<Widget> _buildStepDotsAndDashes(double dotSize, double dashWidth) {
    final List<Widget> widgets = [];
    for (int index = 0; index < widget.totalSteps; index++) {
      final stepNumber = index + 1;
      final isActive = stepNumber <= _currentStep;
      final isCurrent = stepNumber == _currentStep;
      final dashIsActive = stepNumber < _currentStep;

      widgets.add(
        Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: 24,
                  child: isCurrent
                      ? Container(
                          margin: const EdgeInsets.only(bottom: 2),
                          child: Text(
                            'Étape $stepNumber',
                            style: const TextStyle(
                              color: AppColors.light,
                              fontSize: 10,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        )
                      : const SizedBox.shrink(),
                ),
                PaginationAnimations.buildDotAnimation(
                  isActive: isActive,
                  isCurrent: isCurrent,
                  size: dotSize,
                  onTap: () => _goToStep(stepNumber),
                ),
              ],
            ),
            if (index < widget.totalSteps - 1)
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 4.0),
                child: Container(
                  margin: EdgeInsets.only(bottom: (dotSize / 2)),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    width: dashWidth,
                    height: 2,
                    decoration: BoxDecoration(
                      color: dashIsActive
                          ? AppColors.progress
                          : AppColors.light,
                    ),
                  ),
                ),
              ),
          ],
        ),
      );
    }
    return widgets;
  }

  Widget buildAnimatedContent(Widget child) {
    return AnimatedBuilder(
      animation: _fadeAnimation,
      child: child,
      builder: (context, child) {
        return FadeTransition(
          opacity: _fadeAnimation,
          child: SlideTransition(position: _slideAnimation, child: child),
        );
      },
    );
  }

  Widget buildPageView({
    required Widget Function(int index) itemBuilder,
    required int itemCount,
    Function(int)? onPageChanged,
  }) {
    return PageView.builder(
      controller: _pageController,
      onPageChanged: (index) {
<<<<<<< HEAD
        // Plus de reset/forward lors du changement de page via swipe
        // car cela cause les clignotements: comportement bizarre de flutter
=======
        // Ne pas faire de reset/forward lors du changement de page via swipe
        // car cela cause les clignotements
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
        setState(() {
          _currentStep = index + 1;
        });
        _updateProgressAnimation();
        widget.onStepChanged?.call(_currentStep);
        onPageChanged?.call(index);
      },
      itemCount: itemCount,
      itemBuilder: (context, index) {
        // Pas d'animation sur le contenu du PageView pour éviter les conflits
        return itemBuilder(index);
      },
    );
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
