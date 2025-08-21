import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import '../../../core/constants/colors/colors.dart';
import '../../../core/constants/utils/form/form_utils.dart';
import '../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../../shared/widgets/customs/inputs/inputs_widget.dart';
import '../models/auth_models.dart';

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

class AuthWidgetState extends State<AuthWidget> with TickerProviderStateMixin {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  late AnimationController _animationController;
  late Animation<double> _animation;

  String _emailError = "";
  String _passwordError = "";
  String _firstNameError = "";
  String _lastNameError = "";
  String _confirmPasswordError = "";

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
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
    final String stepKey = widget.isForgotPassword
        ? 'forgotPassword'
        : widget.isLogin
        ? 'login'
        : 'register';

    final StepAuthContent currentStep = StepAuthDataText.stepContents[stepKey]!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          currentStep.title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 20,
            color: AppColors.titleColor,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          currentStep.subtitle,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            color: AppColors.titleColor.withAlpha(220),
          ),
        ),
        if (!widget.isForgotPassword && currentStep.subSubtitle.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            currentStep.subSubtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inder',
              fontSize: 12,
              fontWeight: FontWeight.w200,
              color: AppColors.titleColor.withAlpha(220),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildAuthContainer() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final bool isRegister = !widget.isLogin && !widget.isForgotPassword;
    final headerHeight = isRegister
        ? (isSmallScreen ? 140 : 200)
        : (isSmallScreen ? 140 : 180);
    final availableHeight =
        screenHeight -
        headerHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 0),
      constraints: BoxConstraints(
        minHeight: isRegister ? 400 : availableHeight * 0.9,
        maxHeight: isRegister ? double.infinity : availableHeight * 0.95,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 6,
            spreadRadius: 6,
            offset: isRegister ? const Offset(0, -4) : const Offset(0, -2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.secondBackgroundColor.withAlpha(100),
              borderRadius: BorderRadius.circular(20),
            ),
            child: AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return Transform.translate(
                  offset: Offset(0, (1 - _animation.value) * 20),
                  child: Opacity(
                    opacity: 0.3 + (_animation.value * 0.7),
                    child: Padding(
                      padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
                      child: child,
                    ),
                  ),
                );
              },
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Transform.scale(
                    scale: isSmallScreen ? 0.8 : 1,
                    child: SvgPicture.asset(
                      'assets/logo/logo.svg',
                      height: isSmallScreen ? 80 : 100,
                      width: 500,
                    ),
                  ),
                  SizedBox(height: isSmallScreen ? 10 : 15),
                  _buildInputFields(),
                  SizedBox(height: isSmallScreen ? 12 : 16),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: _buildActionButton(),
                  ),
                  SizedBox(height: isSmallScreen ? 12 : 16),
                  if (!widget.isForgotPassword) ...[
                    Text(
                      _getCurrentStepData().socialText,
                      style: const TextStyle(
                        fontFamily: 'Inder',
                        color: AppColors.textColor,
                      ),
                    ),
                    SizedBox(height: isSmallScreen ? 10 : 15),
                    _buildSocialButtons(),
                    SizedBox(height: isSmallScreen ? 15 : 20),
                    _buildNavigationLink(),
                  ],
                  if (widget.isForgotPassword) ...[
                    const SizedBox(height: 10),
                    _buildBackToLoginButton(),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(5),
        border: Border.all(color: AppColors.buttonWithoutBackGround),
      ),
      child: GestureDetector(
        onTap: onTap,
        child: Image.asset(imagePath, height: 40),
      ),
    );
  }

  Widget _buildSocialButtons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildSocialButton(
          onTap: widget.onGoogleSignIn,
          imagePath: 'assets/img/social/google.png',
        ),
        _buildSocialButton(
          onTap: widget.onFacebookSignIn,
          imagePath: 'assets/img/social/facebook.png',
        ),
      ],
    );
  }

  Widget _buildBackToLoginButton() {
    return GestureDetector(
      onTap: () {
        widget.onNavigateToLogin?.call();
      },
      child: Row(
        children: [
          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
          GestureDetector(
            onTap: () {
              widget.onNavigateToLogin?.call();
            },
            child: Text(
              _getCurrentStepData().backToLoginText,
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
          ),
        ],
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

    return CustomInputField(
      hint: hint,
      icon: icon,
      obscureText: obscureText,
      isPassword: isPassword,
      isConfirmPassword: isConfirmPassword,
      controller: controller,
      errorMessage: errorMessage,
      onChanged: onChanged,
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
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
            hint: "Nouveau mot de passe",
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
                if (_confirmPasswordController.text.isNotEmpty) {
                  _confirmPasswordError =
                      value != _confirmPasswordController.text
                      ? "Les mots de passe ne correspondent pas"
                      : "";
                }
              });
            },
          ),
          _buildInputFieldWithValidation(
            hint: "Confirmer le mot de passe",
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
        ],
      ],
    );
  }

  Widget _buildForgotPasswordLink() {
    return GestureDetector(
      onTap: widget.onForgotPassword,
      child: Align(
        alignment: Alignment.centerRight,
        child: Container(
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: AppColors.buttonWithoutBackGround),
            ),
          ),
          child: Text(
            _getCurrentStepData().forgotPasswordText,
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
              fontWeight: FontWeight.bold,
              fontSize: 10,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton() {
    return ElevatedButton(
      onPressed: () => _handleButtonPress(),
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.fillButtonBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
      ),
      child: Text(
        _getCurrentStepData().actionButtonText,
        style: const TextStyle(
          fontFamily: 'Inder',
          color: AppColors.titleColor,
          fontSize: 13,
        ),
      ),
    );
  }

  void _handleButtonPress() {
    if (widget.isForgotPassword) {
      if (_passwordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre nouveau mot de passe");
        return;
      }
      if (_confirmPasswordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez confirmer votre nouveau mot de passe");
        return;
      }
      if (_passwordController.text.trim() !=
          _confirmPasswordController.text.trim()) {
        _showErrorSnackBar("Les mots de passe ne correspondent pas");
        return;
      }
      if (_passwordController.text.trim().length < 8) {
        _showErrorSnackBar(
          "Le mot de passe doit contenir au moins 8 caractères",
        );
        return;
      }
      widget.onResetPassword?.call(
        _passwordController.text.trim(),
        _confirmPasswordController.text.trim(),
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

  Widget _buildNavigationLink() {
    final currentStep = _getCurrentStepData();
    final isLogin = widget.isLogin;
    final onTap = isLogin
        ? widget.onNavigateToRegister
        : widget.onNavigateToLogin;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          currentStep.navigationPrefix,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.textColor,
            fontSize: 12,
          ),
        ),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: AppColors.buttonWithoutBackGround,
                  width: 1.5,
                ),
              ),
            ),
            child: Text(
              currentStep.navigationLink,
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: 9,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
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
