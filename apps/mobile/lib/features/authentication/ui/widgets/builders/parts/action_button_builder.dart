import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';
import '../../../../../../core/constants/colors/colors.dart';
import 'logo_builder.dart';
import 'social_buttons_builder.dart';
import 'navigation_links_builder.dart';

class ActionButtonBuilder {
  static Widget buildActionButton({
    required String buttonText,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.fillButtonBackground,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        ),
        child: Text(
          buttonText,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.titleColor,
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  static Widget buildMainContent({
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required AuthStepContent stepData,
    required VoidCallback onButtonPress,
    required VoidCallback? onGoogleSignIn,
    required VoidCallback? onFacebookSignIn,
    required VoidCallback? onNavigateToRegister,
    required VoidCallback? onNavigateToLogin,
    required VoidCallback? onForgotPassword,
    required Widget inputFields,
    ValueKey<String>? key,
  }) {
    return _AnimatedAuthContent(
      isLogin: isLogin,
      isForgotPassword: isForgotPassword,
      isSmallScreen: isSmallScreen,
      stepData: stepData,
      onButtonPress: onButtonPress,
      onGoogleSignIn: onGoogleSignIn,
      onFacebookSignIn: onFacebookSignIn,
      onNavigateToRegister: onNavigateToRegister,
      onNavigateToLogin: onNavigateToLogin,
      onForgotPassword: onForgotPassword,
      inputFields: inputFields,
    );
  }
}

class _AnimatedAuthContent extends StatefulWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final AuthStepContent stepData;
  final VoidCallback onButtonPress;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onNavigateToRegister;
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onForgotPassword;
  final Widget inputFields;

  const _AnimatedAuthContent({
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    required this.stepData,
    required this.onButtonPress,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onNavigateToRegister,
    this.onNavigateToLogin,
    this.onForgotPassword,
    required this.inputFields,
  });

  @override
  State<_AnimatedAuthContent> createState() => _AnimatedAuthContentState();
}

class _AnimatedAuthContentState extends State<_AnimatedAuthContent>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _opacityAnimation;
  String _currentState = '';

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0.02, 0),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));

    _opacityAnimation = Tween<double>(begin: 0.7, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    _currentState = _getAuthState();
    _controller.forward();
  }

  @override
  void didUpdateWidget(_AnimatedAuthContent oldWidget) {
    super.didUpdateWidget(oldWidget);
    final newState = _getAuthState();
    if (newState != _currentState) {
      _currentState = newState;
      // Animation plus douce sans flash
      _controller.reset();
      Future.microtask(() {
        if (mounted) {
          _controller.forward();
        }
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  String _getAuthState() {
    if (widget.isForgotPassword) return 'forgot';
    if (widget.isLogin) return 'login';
    return 'register';
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _opacityAnimation,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            LogoBuilder.buildLogo(isSmallScreen: widget.isSmallScreen),
            SizedBox(height: widget.isSmallScreen ? 10 : 15),
            widget.inputFields,
            SizedBox(height: widget.isSmallScreen ? 12 : 16),
            ActionButtonBuilder.buildActionButton(
              buttonText: widget.stepData.actionButtonText,
              onPressed: widget.onButtonPress,
            ),
            SizedBox(height: widget.isSmallScreen ? 12 : 16),
            if (!widget.isForgotPassword) ...[
              Text(
                widget.stepData.socialText,
                style: const TextStyle(
                  fontFamily: 'Inder',
                  color: AppColors.textColor,
                ),
              ),
              SizedBox(height: widget.isSmallScreen ? 10 : 15),
              SocialButtonsBuilder.buildSocialButtons(
                onGoogleSignIn: widget.onGoogleSignIn,
                onFacebookSignIn: widget.onFacebookSignIn,
              ),
              SizedBox(height: widget.isSmallScreen ? 15 : 20),
              NavigationLinksBuilder.buildNavigationLink(
                stepData: widget.stepData,
                onTap: widget.isLogin
                    ? widget.onNavigateToRegister
                    : widget.onNavigateToLogin,
              ),
            ],
            if (widget.isForgotPassword) ...[
              const SizedBox(height: 10),
              NavigationLinksBuilder.buildBackToLoginButton(
                backText: widget.stepData.backToLoginText,
                onTap: widget.onNavigateToLogin,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
