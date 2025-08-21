import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

/// Fonction pour le slide smooth améliorée
Widget slideSmoothAnimation({required Widget child}) {
  return TweenAnimationBuilder<double>(
<<<<<<< HEAD
    duration: const Duration(milliseconds: 600),
=======
    duration: const Duration(milliseconds: 250),
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
    curve: Curves.easeOutCubic,
    tween: Tween<double>(begin: 0.0, end: 1.0),
    builder: (context, value, child) {
      final clampedOpacity = value.clamp(0.05, 1.0);
      return Transform.translate(
        offset: Offset(0.0, (1 - value) * 15),
        child: Opacity(opacity: clampedOpacity, child: child),
      );
    },
    child: child,
  );
}

class SlidingExpansionTile extends StatefulWidget {
  final Widget title;
  final Widget? trailing;
  final List<Widget> children;
  final bool initiallyExpanded;
  final ValueChanged<bool>? onExpansionChanged;
  final Color? backgroundColor;
  final Color? collapsedBackgroundColor;
  final EdgeInsetsGeometry? tilePadding;
  final ShapeBorder? shape;
  final ShapeBorder? collapsedShape;
  final Duration animationDuration;
  final Curve curve;

  const SlidingExpansionTile({
    super.key,
    required this.title,
    this.trailing,
    required this.children,
    this.initiallyExpanded = false,
    this.onExpansionChanged,
    this.backgroundColor,
    this.collapsedBackgroundColor,
    this.tilePadding,
    this.shape,
    this.collapsedShape,
    this.animationDuration = const Duration(milliseconds: 300),
    this.curve = Curves.easeInOut,
  });

  @override
  State<SlidingExpansionTile> createState() => _SlidingExpansionTileState();
}

class _SlidingExpansionTileState extends State<SlidingExpansionTile>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _slideAnimation;
  late Animation<double> _fadeAnimation;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _isExpanded = widget.initiallyExpanded;

    _controller = AnimationController(
      duration: widget.animationDuration,
      vsync: this,
    );

    _slideAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: widget.curve));

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(0.3, 1.0, curve: widget.curve),
      ),
    );

    if (_isExpanded) {
      _controller.value = 1.0;
    }
  }

  @override
  void didUpdateWidget(SlidingExpansionTile oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Force l'animation si l'état d'expansion a changé (l'état doit etre à jour)
    if (widget.initiallyExpanded != oldWidget.initiallyExpanded) {
      setState(() {
        _isExpanded = widget.initiallyExpanded;
      });
      if (_isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleExpansionChanged(bool expanded) {
    if (expanded != _isExpanded) {
      setState(() {
        _isExpanded = expanded;
      });

      if (expanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }

      widget.onExpansionChanged?.call(expanded);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: _isExpanded
            ? widget.backgroundColor
            : widget.collapsedBackgroundColor,
        borderRadius: BorderRadius.circular(12),
        border: widget.shape is RoundedRectangleBorder
            ? (widget.shape as RoundedRectangleBorder).side != BorderSide.none
                  ? Border.fromBorderSide(
                      (widget.shape as RoundedRectangleBorder).side,
                    )
                  : null
            : null,
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () => _handleExpansionChanged(!_isExpanded),
            borderRadius: BorderRadius.circular(12),
            child: Container(
              constraints: const BoxConstraints(
                minHeight: 56,
              ), // Hauteur minimale
              padding:
                  widget.tilePadding ??
                  const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                children: [
                  Expanded(child: widget.title),
                  if (widget.trailing != null)
                    widget.trailing!
                  else
                    AnimatedRotation(
                      turns: _isExpanded ? 0.5 : 0,
                      duration: widget.animationDuration,
                      child: const Icon(Icons.expand_more),
                    ),
                ],
              ),
            ),
          ),
          // Animated content
          AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return ClipRRect(
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(12),
                  bottomRight: Radius.circular(12),
                ),
                child: SizeTransition(
                  sizeFactor: _slideAnimation,
                  axisAlignment: -1.0,
                  child: SlideTransition(
                    position: Tween<Offset>(
                      begin: const Offset(0, -0.1),
                      end: Offset.zero,
                    ).animate(_slideAnimation),
                    child: FadeTransition(
                      opacity: _fadeAnimation,
                      child: Column(children: widget.children),
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}

class SlideInTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final Offset beginOffset;
  final bool animate;

  const SlideInTransition({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 300),
    this.curve = Curves.easeOutCubic,
    this.beginOffset = const Offset(0, 0.1),
    this.animate = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!animate) return child;

    return TweenAnimationBuilder<Offset>(
      duration: duration,
      curve: curve,
      tween: Tween<Offset>(begin: beginOffset, end: Offset.zero),
      builder: (context, offset, child) {
        return Transform.translate(
          offset: Offset(offset.dx * 20, offset.dy * 20),
          child: Opacity(opacity: 1 - offset.dy.abs(), child: child),
        );
      },
      child: child,
    );
  }
}

class SmoothSlideTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final SlideDirection direction;
  final double distance;
  final bool animate;

  const SmoothSlideTransition({
    super.key,
    required this.child,
<<<<<<< HEAD
    this.duration = const Duration(milliseconds: 300),
=======
    this.duration = const Duration(milliseconds: 250),
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
    this.curve = Curves.easeOutCubic,
    this.direction = SlideDirection.fromRight,
    this.distance = 15.0,
    this.animate = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!animate) return child;

    Offset beginOffset;
    switch (direction) {
      case SlideDirection.fromLeft:
        beginOffset = Offset(-distance, 0);
        break;
      case SlideDirection.fromRight:
        beginOffset = Offset(distance, 0);
        break;
      case SlideDirection.fromTop:
        beginOffset = Offset(0, -distance);
        break;
      case SlideDirection.fromBottom:
        beginOffset = Offset(0, distance);
        break;
    }

<<<<<<< HEAD
    return AnimatedSwitcher(
      duration: duration,
      switchInCurve: curve,
      layoutBuilder: (Widget? currentChild, List<Widget> previousChildren) {
        return Stack(
          children: <Widget>[
            ...previousChildren,
            if (currentChild != null) currentChild,
          ],
        );
      },
      child: TweenAnimationBuilder<Offset>(
        key: ValueKey<SlideDirection>(direction),
        duration: duration,
        curve: curve,
        tween: Tween<Offset>(begin: beginOffset, end: Offset.zero),
        builder: (context, offset, child) {
          return Transform.translate(offset: offset, child: child);
        },
        child: child,
      ),
    );
  }
}

/// Version pour les transitions de route qui utilise l'animation externe
class RouteSlideTransition extends StatelessWidget {
  final Widget child;
  final Animation<double> animation;
  final SlideDirection direction;
  final double distance;
  final Curve curve;

  const RouteSlideTransition({
    super.key,
    required this.child,
    required this.animation,
    this.direction = SlideDirection.fromRight,
    this.distance = 1.0,
    this.curve = Curves.easeOutCubic,
  });

  @override
  Widget build(BuildContext context) {
    Offset beginOffset;
    switch (direction) {
      case SlideDirection.fromLeft:
        beginOffset = Offset(-distance, 0);
        break;
      case SlideDirection.fromRight:
        beginOffset = Offset(distance, 0);
        break;
      case SlideDirection.fromTop:
        beginOffset = Offset(0, -distance);
        break;
      case SlideDirection.fromBottom:
        beginOffset = Offset(0, distance);
        break;
    }

    final curvedAnimation = CurvedAnimation(parent: animation, curve: curve);

    final offsetTween = Tween<Offset>(begin: beginOffset, end: Offset.zero);

    return SlideTransition(
      position: offsetTween.animate(curvedAnimation),
=======
    return TweenAnimationBuilder<double>(
      duration: duration,
      curve: curve,
      tween: Tween<double>(begin: 0.0, end: 1.0),
      builder: (context, value, child) {
        // Éviter les valeurs extrêmes qui créent des flashs blancs
        final clampedOpacity = value.clamp(0.1, 1.0);
        final smoothValue = Curves.easeOutCubic.transform(value);

        return Transform.translate(
          offset: Offset(
            beginOffset.dx * (1 - smoothValue),
            beginOffset.dy * (1 - smoothValue),
          ),
          child: Opacity(opacity: clampedOpacity, child: child),
        );
      },
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
      child: child,
    );
  }
}

enum SlideDirection { fromLeft, fromRight, fromTop, fromBottom }

class PaginationAnimations {
  static Widget buildProgressBarAnimation({
    required Animation<double> animation,
    required Widget child,
  }) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final clampedOpacity = animation.value.clamp(0.0, 1.0);
        final translateY = (1 - clampedOpacity) * 30 - 5;

        return Transform.translate(
          offset: Offset(0, translateY),
          child: Opacity(opacity: clampedOpacity, child: child),
        );
      },
      child: child,
    );
  }

  static Widget buildClickAnimation({
    required Animation<double> animation,
    required Widget child,
  }) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        return Transform.scale(scale: animation.value, child: child);
      },
      child: child,
    );
  }

  static Widget buildDotAnimation({
    required bool isActive,
    required bool isCurrent,
    required VoidCallback onTap,
    required double size,
  }) {
    return ClipOval(
      child: Material(
<<<<<<< HEAD
        color: AppColors.transparent,
=======
        color: Colors.transparent,
>>>>>>> 569ec74 (feat: creating of interactive menu Driver. Refactorisation. creation of animations for pagenavigation. extraction of all text for model)
        child: InkWell(
          onTap: onTap,
          splashColor: AppColors.fillButtonBackgorund.withAlpha(77),
          highlightColor: AppColors.placeHolderInput.withAlpha(51),
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isActive ? AppColors.progress : AppColors.light,
              border: Border.all(
                color: AppColors.light,
                width: isCurrent ? 2.0 : (isActive ? 1.0 : 0.5),
              ),
              boxShadow: isCurrent
                  ? [
                      BoxShadow(
                        color: AppColors.light,
                        blurRadius: 2,
                        spreadRadius: 1,
                      ),
                    ]
                  : null,
            ),
          ),
        ),
      ),
    );
  }
}
