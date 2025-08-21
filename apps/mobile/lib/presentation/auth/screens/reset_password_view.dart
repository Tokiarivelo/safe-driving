import 'package:flutter/material.dart';
import '../../../core/constants/colors/colors.dart';
import '../../../core/constants/utils/form/form_utils.dart';
import '../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../../shared/widgets/customs/inputs/inputs_widget.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../builders/auth_ui_builder.dart';
import '../../../shared/state_management/state.dart';
import 'dart:ui';
import 'package:flutter_svg/svg.dart';

class ResetPasswordView extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onResetSuccess;
  final String? email;
  final String? resetToken;

  const ResetPasswordView({
    super.key,
    this.onNavigateToLogin,
    this.onResetSuccess,
    this.email,
    this.resetToken,
  });

  @override
  State<ResetPasswordView> createState() => _ResetPasswordViewState();
}

class _ResetPasswordViewState extends State<ResetPasswordView> {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  String _passwordError = "";
  String _confirmPasswordError = "";

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleResetPassword() async {
    final newPassword = _passwordController.text.trim();
    final confirmPassword = _confirmPasswordController.text.trim();
    
    if (newPassword.isEmpty) {
      SnackbarHelper.showError(context, "Veuillez saisir votre nouveau mot de passe");
      return;
    }
    
    if (confirmPassword.isEmpty) {
      SnackbarHelper.showError(context, "Veuillez confirmer votre nouveau mot de passe");
      return;
    }

    if (newPassword != confirmPassword) {
      SnackbarHelper.showError(
        context,
        'Les mots de passe ne correspondent pas',
      );
      return;
    }

    if (newPassword.length < 8) {
      SnackbarHelper.showError(
        context,
        'Le mot de passe doit contenir au moins 8 caractères',
      );
      return;
    }

    if (!mounted) return;

    final auth = context.authVM;
    final success = await auth.resetPassword(newPassword);

    if (!mounted) return;

    if (success) {
      SnackbarHelper.showSuccess(
        context,
        'Mot de passe réinitialisé avec succès',
      );
      if (widget.onResetSuccess != null) {
        widget.onResetSuccess!();
      } else if (widget.onNavigateToLogin != null) {
        widget.onNavigateToLogin!();
      }
    } else {
      SnackbarHelper.showError(
        context,
        auth.errorMessage ??
            'Erreur lors de la réinitialisation du mot de passe',
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final stepData = AuthUIBuilder.getStepData(
      isLogin: false,
      isForgotPassword: false,
      isResetPassword: true,
    );

    return Container(
      height: double.infinity,
      decoration: ColorsWidget.background,
      child: SafeArea(
        child: Column(
          children: [
            Container(
              height: isSmallScreen ? 100 : 130,
              padding: const EdgeInsets.symmetric(
                horizontal: 20.0,
                vertical: 10.0,
              ),
              child: Center(
                child: AuthUIBuilder.buildHeaderText(
                  stepData: stepData,
                  isForgotPassword: false,
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  child: _buildResetPasswordContainer(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResetPasswordContainer() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final headerHeight = isSmallScreen ? 140 : 180;
    final availableHeight = screenHeight -
        headerHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 0),
      constraints: BoxConstraints(
        minHeight: availableHeight * 0.9,
        maxHeight: availableHeight * 0.95,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 6,
            spreadRadius: 6,
            offset: const Offset(0, -2),
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
            child: Padding(
              padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
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
                  SizedBox(height: isSmallScreen ? 15 : 20),
                  _buildPasswordInputField(),
                  SizedBox(height: isSmallScreen ? 10 : 15),
                  _buildConfirmPasswordInputField(),
                  SizedBox(height: isSmallScreen ? 20 : 25),
                  AuthUIBuilder.buildActionButton(
                    buttonText: "Réinitialiser le mot de passe",
                    onPressed: _handleResetPassword,
                  ),
                  SizedBox(height: isSmallScreen ? 15 : 20),
                  AuthUIBuilder.buildBackToLoginButton(
                    backText: "Retour à la connexion",
                    onTap: widget.onNavigateToLogin,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPasswordInputField() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    
    return CustomInputField(
      hint: "Nouveau mot de passe",
      icon: Icons.lock_outlined,
      obscureText: true,
      isPassword: true,
      controller: _passwordController,
      errorMessage: _passwordError,
      onChanged: (value) {
        setState(() {
          _passwordError = RegexFormatter.getPasswordValidationMessage(value);
          if (_confirmPasswordController.text.isNotEmpty) {
            _confirmPasswordError = value != _confirmPasswordController.text
                ? "Les mots de passe ne correspondent pas"
                : "";
          }
        });
      },
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
    );
  }

  Widget _buildConfirmPasswordInputField() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    
    return CustomInputField(
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
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
    );
  }
}
