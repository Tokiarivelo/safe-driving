import 'dart:ui';

import 'package:flutter/material.dart';
import '../../../models/auth_step_content_model.dart';
import '../builders/auth_ui_builder.dart';
import '../builders/parts/auth_input_builder.dart';
import '../builders/parts/auth_validation_handler.dart';
import 'auth_layout.dart';

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
  )?
  onSignUp;
  final Function(String password, String confirmPassword)? onResetPassword;
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
    this.onResetPassword,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onNavigateToLogin,
    this.onNavigateToRegister,
  });

  @override
  AuthWidgetState createState() => AuthWidgetState();
}

class AuthWidgetState extends State<AuthWidget> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  String _emailError = "";
  String _passwordError = "";
  String _firstNameError = "";
  String _lastNameError = "";
  String _confirmPasswordError = "";

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AuthLayout(
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
      headerBuilder: () => _buildHeaderText(),
      contentBuilder: () => _buildAuthContainer(),
    );
  }

  Widget _buildHeaderText() {
    return AuthUIBuilder.buildHeaderText(
      stepData: _getCurrentStepData(),
      isForgotPassword: widget.isForgotPassword,
    );
  }

  Widget _buildAuthContainer() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return AuthUIBuilder.buildAuthContainer(
      context: context,
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
      isSmallScreen: isSmallScreen,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 1, sigmaY: 1),
          child: Padding(
            padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
            child: AuthUIBuilder.buildMainContent(
              isLogin: widget.isLogin,
              isForgotPassword: widget.isForgotPassword,
              isSmallScreen: isSmallScreen,
              stepData: _getCurrentStepData(),
              onButtonPress: _handleButtonPress,
              onGoogleSignIn: widget.onGoogleSignIn,
              onFacebookSignIn: widget.onFacebookSignIn,
              onNavigateToRegister: widget.onNavigateToRegister,
              onNavigateToLogin: widget.onNavigateToLogin,
              onForgotPassword: widget.onForgotPassword,
              inputFields: _buildInputFields(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInputFields() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return AuthInputBuilder.buildInputFields(
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
      isSmallScreen: isSmallScreen,
      emailController: _emailController,
      passwordController: _passwordController,
      firstNameController: _firstNameController,
      lastNameController: _lastNameController,
      confirmPasswordController: _confirmPasswordController,
      emailError: _emailError,
      passwordError: _passwordError,
      firstNameError: _firstNameError,
      lastNameError: _lastNameError,
      confirmPasswordError: _confirmPasswordError,
      onEmailChanged: (value) => setState(() {
        _emailError = AuthValidationHandler.validateField(value, 'email');
      }),
      onPasswordChanged: (value) => setState(() {
        _passwordError = AuthValidationHandler.validateField(value, 'password');
        if (!widget.isLogin && _confirmPasswordController.text.isNotEmpty) {
          _confirmPasswordError = AuthValidationHandler.validateConfirmPassword(
            value,
            _confirmPasswordController.text,
          );
        }
      }),
      onFirstNameChanged: (value) => setState(() {
        _firstNameError = AuthValidationHandler.validateField(value, 'username');
      }),
      onLastNameChanged: (value) => setState(() {
        _lastNameError = AuthValidationHandler.validateField(value, 'username');
      }),
      onConfirmPasswordChanged: (value) => setState(() {
        _confirmPasswordError = AuthValidationHandler.validateConfirmPassword(
          _passwordController.text,
          value,
        );
      }),
      onForgotPassword: widget.onForgotPassword,
    );
  }

  void _handleButtonPress() {
    final isValid = AuthValidationHandler.validateForm(
      context: context,
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
      email: _emailController.text.trim(),
      password: _passwordController.text.trim(),
      firstName: _firstNameController.text.trim(),
      lastName: _lastNameController.text.trim(),
      confirmPassword: _confirmPasswordController.text.trim(),
    );

    if (!isValid) return;

    if (widget.isForgotPassword) {
      widget.onSignIn?.call(_emailController.text.trim(), "");
    } else if (widget.isLogin) {
      widget.onSignIn?.call(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    } else {
      widget.onSignUp?.call(
        _firstNameController.text.trim(),
        _lastNameController.text.trim(),
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    }
  }

  AuthStepContent _getCurrentStepData() {
    return AuthUIBuilder.getStepData(
      isLogin: widget.isLogin,
      isForgotPassword: widget.isForgotPassword,
    );
  }
}

