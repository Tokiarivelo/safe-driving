import 'package:flutter/material.dart';

/// Fonction pour le slide smooth
Widget slideSmoothAnimation({required Widget child}) {
  return TweenAnimationBuilder<double>(
    duration: const Duration(milliseconds: 400),
    curve: Curves.easeInOut,
    tween: Tween<double>(begin: 0.0, end: 1.0),
    builder: (context, value, child) {
      return Transform.translate(
        offset: Offset(0.0, (1 - value) * 20),
        child: Opacity(opacity: value, child: child),
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
