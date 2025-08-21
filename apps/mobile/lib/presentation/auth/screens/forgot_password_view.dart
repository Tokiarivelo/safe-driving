import 'package:flutter/material.dart';
import '../../../core/constants/colors/colors.dart';
import '../../../core/constants/utils/form/form_utils.dart';
import '../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../../shared/widgets/customs/inputs/inputs_widget.dart';
import '../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../builders/auth_ui_builder.dart';
import 'dart:ui';
import 'package:flutter_svg/svg.dart';

class ForgotPasswordView extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final Function(String email)? onSendCodeSuccess;

  const ForgotPasswordView({
    super.key,
    this.onNavigateToLogin,
    this.onSendCodeSuccess,
  });

  @override
  State<ForgotPasswordView> createState() => _ForgotPasswordViewState();
}

class _ForgotPasswordViewState extends State<ForgotPasswordView> {
  final TextEditingController _emailController = TextEditingController();
  String _emailError = "";

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleSendCode() async {
    final email = _emailController.text.trim();
    
    if (email.isEmpty) {
      SnackbarHelper.showError(context, "Veuillez saisir votre adresse email");
      return;
    }
    
    if (!RegexFormatter.isValidEmail(email)) {
      SnackbarHelper.showError(context, "Veuillez saisir une adresse email valide");
      return;
    }

    if (!mounted) return;

    SnackbarHelper.showSuccess(
      context,
      'Un code de réinitialisation a été envoyé à votre adresse email',
    );
    
    if (widget.onSendCodeSuccess != null) {
      widget.onSendCodeSuccess!(email);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final stepData = AuthUIBuilder.getStepData(
      isLogin: false,
      isForgotPassword: true,
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
                  isForgotPassword: true,
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  child: _buildForgotPasswordContainer(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildForgotPasswordContainer() {
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
                  _buildEmailInputField(),
                  SizedBox(height: isSmallScreen ? 20 : 25),
                  AuthUIBuilder.buildActionButton(
                    buttonText: "Envoyer le code",
                    onPressed: _handleSendCode,
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

  Widget _buildEmailInputField() {
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    
    return CustomInputField(
      hint: "Adresse email",
      icon: Icons.email_outlined,
      controller: _emailController,
      errorMessage: _emailError,
      onChanged: (value) {
        setState(() {
          _emailError = RegexFormatter.getEmailValidationMessage(value);
        });
      },
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
    );
  }
}
