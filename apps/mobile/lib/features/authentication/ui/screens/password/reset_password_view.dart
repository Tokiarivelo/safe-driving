import 'package:flutter/material.dart';
import '../../../../../core/utils/form/form_utils.dart';
import '../../../../../shared/widgets/customs/colors/colors_widget.dart';
import '../../widgets/builders/auth_ui_builder.dart';
import '../../widgets/password/reset_password_container.dart';
import '../../widgets/password/reset_success_handler.dart';

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
  final TextEditingController _confirmPasswordController =
      TextEditingController();
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

    await ResetSuccessHandler.handleResetPassword(
      context: context,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      onResetSuccess: widget.onResetSuccess,
      onNavigateToLogin: widget.onNavigateToLogin,
    );
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
    return ResetPasswordContainer(
      passwordController: _passwordController,
      confirmPasswordController: _confirmPasswordController,
      passwordError: _passwordError,
      confirmPasswordError: _confirmPasswordError,
      onPasswordChanged: (value) {
        setState(() {
          _passwordError = RegexFormatter.getPasswordValidationMessage(value);
          if (_confirmPasswordController.text.isNotEmpty) {
            _confirmPasswordError = value != _confirmPasswordController.text
                ? "Les mots de passe ne correspondent pas"
                : "";
          }
        });
      },
      onConfirmPasswordChanged: (value) {
        setState(() {
          _confirmPasswordError = value != _passwordController.text
              ? "Les mots de passe ne correspondent pas"
              : "";
        });
      },
      onResetPassword: _handleResetPassword,
      onNavigateToLogin: widget.onNavigateToLogin,
    );
  }
}
