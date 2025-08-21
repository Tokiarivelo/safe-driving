import 'dart:ui';

import 'package:flutter/material.dart';
import '../../../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../../models/auth_models.dart';
import '../builders/auth_ui_builder.dart';
import 'auth_validators.dart';
import 'auth_input_fields.dart';
import 'animated_auth_content.dart';

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
    final bool isRegister = !widget.isLogin && !widget.isForgotPassword;
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return Container(
      height: double.infinity,
      decoration: ColorsWidget.background,
      child: SafeArea(
        child: isRegister
            ? SingleChildScrollView(
                child: Column(
                  children: [
                    Container(
                      height: isSmallScreen ? 100 : 140,
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      child: Center(child: _buildHeaderText()),
                    ),
                    Padding(
                      padding: EdgeInsets.zero,
                      child: _buildAuthContainer(),
                    ),
                  ],
                ),
              )
            : Column(
                children: [
                  Container(
                    height: isSmallScreen ? 100 : 130,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20.0,
                      vertical: 10.0,
                    ),
                    child: Center(child: _buildHeaderText()),
                  ),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 0.0),
                        child: _buildAuthContainer(),
                      ),
                    ),
                  ),
                ],
              ),
      ),
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
        borderRadius: BorderRadius.circular(30),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 1, sigmaY: 1),
          child: Padding(
            padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
            child: AnimatedAuthContent(
              key: ValueKey(
                'auth-${widget.isLogin}-${widget.isForgotPassword}',
              ),
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

    return AuthInputFields(
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
      onEmailChanged: (value) {
        setState(() {
          _emailError = AuthValidators.getEmailValidationError(value);
        });
      },
      onPasswordChanged: (value) {
        setState(() {
          _passwordError = AuthValidators.getPasswordValidationError(value);
          if (!widget.isLogin && _confirmPasswordController.text.isNotEmpty) {
            _confirmPasswordError =
                AuthValidators.getConfirmPasswordValidationError(
                  value,
                  _confirmPasswordController.text,
                );
          }
        });
      },
      onFirstNameChanged: (value) {
        setState(() {
          _firstNameError = AuthValidators.getUsernameValidationError(value);
        });
      },
      onLastNameChanged: (value) {
        setState(() {
          _lastNameError = AuthValidators.getUsernameValidationError(value);
        });
      },
      onConfirmPasswordChanged: (value) {
        setState(() {
          _confirmPasswordError =
              AuthValidators.getConfirmPasswordValidationError(
                _passwordController.text,
                value,
              );
        });
      },
      onForgotPassword: widget.onForgotPassword,
      stepData: _getCurrentStepData(),
    );
  }

  AuthStepContent _getCurrentStepData() {
    final String stepKey = widget.isForgotPassword
        ? 'forgotPassword'
        : widget.isLogin
        ? 'login'
        : 'register';

    return AuthStepContentMap.stepContents[stepKey]!;
  }

  void _handleButtonPress() {
    if (widget.isForgotPassword) {
      final validationError = AuthValidators.validateForgotPassword(
        email: _emailController.text,
        context: context,
      );
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      widget.onSignIn?.call(_emailController.text.trim(), "");
    } else if (widget.isLogin) {
      final validationError = AuthValidators.validateSignIn(
        email: _emailController.text,
        password: _passwordController.text,
        context: context,
      );
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      widget.onSignIn?.call(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    } else {
      final validationError = AuthValidators.validateSignUp(
        firstName: _firstNameController.text,
        lastName: _lastNameController.text,
        email: _emailController.text,
        password: _passwordController.text,
        confirmPassword: _confirmPasswordController.text,
        context: context,
      );
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      widget.onSignUp?.call(
        _firstNameController.text.trim(),
        _lastNameController.text.trim(),
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    }
  }
}
