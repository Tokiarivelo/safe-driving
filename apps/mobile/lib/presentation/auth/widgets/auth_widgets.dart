import 'dart:ui';

import 'package:flutter/material.dart';
import '../../../core/constants/utils/form/form_utils.dart';
import '../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../../shared/widgets/customs/animations/animation_widget.dart';
import '../models/auth_models.dart';
import '../builders/auth_ui_builder.dart';

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
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20.0,
                        vertical: 10.0,
                      ),
                      child: Center(child: _buildHeaderText()),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10.0, 0, 10.0, 20.0),
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
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
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
        borderRadius: BorderRadius.circular(8),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 1, sigmaY: 1),
          child: Padding(
            padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
            child: _AnimatedAuthContent(
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

  Widget _buildInputFieldWithValidation({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
    TextEditingController? controller,
    String? errorMessage,
    Function(String)? onChanged,
  }) {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return AuthUIBuilder.buildInputFieldWithValidation(
      hint: hint,
      icon: icon,
      obscureText: obscureText,
      isPassword: isPassword,
      isConfirmPassword: isConfirmPassword,
      controller: controller,
      errorMessage: errorMessage,
      onChanged: onChanged,
      isSmallScreen: isSmallScreen,
    );
  }

  Widget _buildInputFields() {
    return Column(
      children: [
        if (!widget.isForgotPassword) ...[
          _buildInputFieldWithValidation(
            hint: widget.isLogin ? "Email ou Nom d'utilisateur" : "Nom",
            icon: widget.isLogin ? Icons.person_outline : Icons.badge_outlined,
            controller: widget.isLogin
                ? _emailController
                : _firstNameController,
            errorMessage: widget.isLogin ? null : _firstNameError,
            onChanged: (value) {
              if (!widget.isLogin) {
                setState(() {
                  _firstNameError = RegexFormatter.getUsernameValidationMessage(
                    value,
                  );
                });
              }
            },
          ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Prénom",
              icon: Icons.badge_outlined,
              controller: _lastNameController,
              errorMessage: _lastNameError,
              onChanged: (value) {
                setState(() {
                  _lastNameError = RegexFormatter.getUsernameValidationMessage(
                    value,
                  );
                });
              },
            ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Email",
              icon: Icons.email_outlined,
              controller: _emailController,
              errorMessage: _emailError,
              onChanged: (value) {
                setState(() {
                  _emailError = RegexFormatter.getEmailValidationMessage(value);
                });
              },
            ),
          _buildInputFieldWithValidation(
            hint: "Mot de passe",
            icon: Icons.lock_outlined,
            obscureText: true,
            isPassword: true,
            controller: _passwordController,
            errorMessage: _passwordError,
            onChanged: (value) {
              setState(() {
                _passwordError = RegexFormatter.getPasswordValidationMessage(
                  value,
                );
                if (!widget.isLogin &&
                    _confirmPasswordController.text.isNotEmpty) {
                  _confirmPasswordError =
                      value != _confirmPasswordController.text
                      ? "Les mots de passe ne correspondent pas"
                      : "";
                }
              });
            },
          ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Comfirmer le mot de passe",
              icon: Icons.lock_outlined,
              obscureText: true,
              isConfirmPassword: true,
              controller: _confirmPasswordController,
              errorMessage: _confirmPasswordError,
              onChanged: (value) {
                setState(() {
                  _confirmPasswordError = value != _passwordController.text
                      ? "Les mots de passe ne correspondent pas"
                      : "";
                });
              },
            ),
          SizedBox(height: MediaQuery.of(context).size.height < 700 ? 2 : 5),
          if (widget.isLogin) _buildForgotPasswordLink(),
        ],
        if (widget.isForgotPassword) ...[
          _buildInputFieldWithValidation(
            hint: "Adresse email",
            icon: Icons.email_outlined,
            controller: _emailController,
            errorMessage: _emailError,
            onChanged: (value) {
              setState(() {
                _emailError = RegexFormatter.getEmailValidationMessage(value);
              });
            },
          ),
        ],
      ],
    );
  }

  Widget _buildForgotPasswordLink() {
    return AuthUIBuilder.buildForgotPasswordLink(
      forgotText: _getCurrentStepData().forgotPasswordText,
      onTap: widget.onForgotPassword,
    );
  }

  void _handleButtonPress() {
    if (widget.isForgotPassword) {
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre adresse email");
        return;
      }
      if (!RegexFormatter.isValidEmail(_emailController.text.trim())) {
        _showErrorSnackBar("Veuillez saisir une adresse email valide");
        return;
      }
      // Pour forgot password, on utilise onSignIn avec l'email et un mot de passe vide
      widget.onSignIn?.call(
        _emailController.text.trim(),
        "", // Mot de passe vide pour forgot password
      );
    } else if (widget.isLogin) {
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre email ou nom d'utilisateur");
        return;
      }
      if (_passwordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre mot de passe");
        return;
      }
      widget.onSignIn?.call(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    } else {
      if (_firstNameController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre prénom");
        return;
      }
      if (_lastNameController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre nom de famille");
        return;
      }
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre adresse email");
        return;
      }
      if (!RegexFormatter.isValidEmail(_emailController.text.trim())) {
        _showErrorSnackBar("Veuillez saisir une adresse email valide");
        return;
      }
      if (_passwordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir un mot de passe");
        return;
      }
      if (_passwordController.text.trim().length < 8) {
        _showErrorSnackBar(
          "Le mot de passe doit contenir au moins 8 caractères",
        );
        return;
      }
      if (_confirmPasswordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez confirmer votre mot de passe");
        return;
      }
      if (_passwordController.text.trim() !=
          _confirmPasswordController.text.trim()) {
        _showErrorSnackBar("Les mots de passe ne correspondent pas");
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

  StepAuthContent _getCurrentStepData() {
    final String stepKey = widget.isForgotPassword
        ? 'forgotPassword'
        : widget.isLogin
        ? 'login'
        : 'register';

    return StepAuthDataText.stepContents[stepKey]!;
  }

  void _showErrorSnackBar(String message) {
    SnackbarHelper.showError(context, message);
  }
}

// Classe wrapper pour l'animation slideRightSmooth
class _AnimatedAuthContent extends StatefulWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final StepAuthContent stepData;
  final VoidCallback onButtonPress;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onNavigateToRegister;
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onForgotPassword;
  final Widget inputFields;

  const _AnimatedAuthContent({
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
  State<_AnimatedAuthContent> createState() => _AnimatedAuthContentState();
}

class _AnimatedAuthContentState extends State<_AnimatedAuthContent> {
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
