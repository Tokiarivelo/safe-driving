import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../viewmodels/auth_widget_viewmodel.dart';
import '../builders/auth_ui_builder.dart';
import 'auth_layout.dart';
import 'auth_form.dart';
import 'auth_social_buttons.dart';
import 'auth_navigation_links.dart';

class AuthWidget extends StatefulWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final VoidCallback? onForgotPassword;
  final Function(String email, String password)? onSignIn;
  final Function(
    String firstName,
    String lastName,
    String email,
    String password,
  )? onSignUp;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onNavigateToRegister;

  const AuthWidget({
    super.key,
    this.isLogin = false,
    this.isForgotPassword = false,
    this.onForgotPassword,
    this.onSignIn,
    this.onSignUp,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onNavigateToLogin,
    this.onNavigateToRegister,
  });

  @override
  AuthWidgetState createState() => AuthWidgetState();
}

class AuthWidgetState extends State<AuthWidget> {
  late AuthWidgetViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = AuthWidgetViewModel();
  }

  @override
  void dispose() {
    _viewModel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return ChangeNotifierProvider.value(
      value: _viewModel,
      child: Consumer<AuthWidgetViewModel>(
        builder: (context, viewModel, child) {
          return AuthLayout(
            isLogin: widget.isLogin,
            isForgotPassword: widget.isForgotPassword,
            headerBuilder: () => _buildHeader(viewModel),
            contentBuilder: () => _buildContent(isSmallScreen),
          );
        },
      ),
    );
  }

  Widget _buildHeader(AuthWidgetViewModel viewModel) {
    return AuthUIBuilder.buildHeaderText(
      stepData: viewModel.getCurrentStepData(
        isLogin: widget.isLogin,
        isForgotPassword: widget.isForgotPassword,
      ),
      isForgotPassword: widget.isForgotPassword,
    );
  }

  Widget _buildContent(bool isSmallScreen) {
    return AuthUIBuilder.buildAuthContainer(
      context: context,
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
      isSmallScreen: isSmallScreen,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 1, sigmaY: 1),
          child: Padding(
            padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AuthForm(
                  isLogin: widget.isLogin,
                  isForgotPassword: widget.isForgotPassword,
                  isSmallScreen: isSmallScreen,
                  onSignIn: widget.onSignIn,
                  onSignUp: widget.onSignUp,
                  onForgotPassword: widget.onForgotPassword,
                ),
                AuthSocialButtons(
                  isLogin: widget.isLogin,
                  isForgotPassword: widget.isForgotPassword,
                  isSmallScreen: isSmallScreen,
                  onGoogleSignIn: widget.onGoogleSignIn,
                  onFacebookSignIn: widget.onFacebookSignIn,
                ),
                AuthNavigationLinks(
                  isLogin: widget.isLogin,
                  isForgotPassword: widget.isForgotPassword,
                  isSmallScreen: isSmallScreen,
                  onNavigateToLogin: widget.onNavigateToLogin,
                  onNavigateToRegister: widget.onNavigateToRegister,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
