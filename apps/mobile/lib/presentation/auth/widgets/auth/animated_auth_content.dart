import 'package:flutter/material.dart';
import '../../../../shared/widgets/customs/animations/animation_widget.dart';
import '../../models/auth_models.dart';
import '../../builders/auth_ui_builder.dart';

class AnimatedAuthContent extends StatefulWidget {
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

  const AnimatedAuthContent({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    required this.stepData,
    required this.onButtonPress,
    required this.onGoogleSignIn,
    required this.onFacebookSignIn,
    required this.onNavigateToRegister,
    required this.onNavigateToLogin,
    required this.onForgotPassword,
    required this.inputFields,
  });

  @override
  State<AnimatedAuthContent> createState() => _AnimatedAuthContentState();
}

class _AnimatedAuthContentState extends State<AnimatedAuthContent> {
  @override
  Widget build(BuildContext context) {
    return slideRightSmoothAnimation(
      key: ValueKey('content-${widget.isLogin}-${widget.isForgotPassword}'),
      child: AuthUIBuilder.buildMainContent(
        isLogin: widget.isLogin,
        isForgotPassword: widget.isForgotPassword,
        isSmallScreen: widget.isSmallScreen,
        stepData: widget.stepData,
        onButtonPress: widget.onButtonPress,
        onGoogleSignIn: widget.onGoogleSignIn,
        onFacebookSignIn: widget.onFacebookSignIn,
        onNavigateToRegister: widget.onNavigateToRegister,
        onNavigateToLogin: widget.onNavigateToLogin,
        onForgotPassword: widget.onForgotPassword,
        inputFields: widget.inputFields,
      ),
    );
  }
}
