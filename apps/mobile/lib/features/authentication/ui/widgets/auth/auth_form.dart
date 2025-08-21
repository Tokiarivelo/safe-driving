import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../viewmodels/auth_widget_viewmodel.dart';
import 'auth_input_fields.dart';
import 'auth_validators.dart';

class AuthForm extends StatelessWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final Function(String email, String password)? onSignIn;
  final Function(
    String firstName,
    String lastName,
    String email,
    String password,
  )?
  onSignUp;
  final VoidCallback? onForgotPassword;

  const AuthForm({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    this.onSignIn,
    this.onSignUp,
    this.onForgotPassword,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthWidgetViewModel>(
      builder: (context, viewModel, child) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AuthInputFields(
              isLogin: isLogin,
              isForgotPassword: isForgotPassword,
              isSmallScreen: isSmallScreen,
              emailController: viewModel.emailController,
              passwordController: viewModel.passwordController,
              firstNameController: viewModel.firstNameController,
              lastNameController: viewModel.lastNameController,
              confirmPasswordController: viewModel.confirmPasswordController,
              emailError: viewModel.emailError,
              passwordError: viewModel.passwordError,
              firstNameError: viewModel.firstNameError,
              lastNameError: viewModel.lastNameError,
              confirmPasswordError: viewModel.confirmPasswordError,
              onEmailChanged: viewModel.validateEmail,
              onPasswordChanged: (value) =>
                  viewModel.validatePassword(value, isLogin),
              onFirstNameChanged: viewModel.validateFirstName,
              onLastNameChanged: viewModel.validateLastName,
              onConfirmPasswordChanged: viewModel.validateConfirmPassword,
              onForgotPassword: onForgotPassword,
              stepData: viewModel.getCurrentStepData(
                isLogin: isLogin,
                isForgotPassword: isForgotPassword,
              ),
            ),
            SizedBox(height: isSmallScreen ? 15 : 20),
            _buildSubmitButton(context, viewModel),
          ],
        );
      },
    );
  }

  Widget _buildSubmitButton(
    BuildContext context,
    AuthWidgetViewModel viewModel,
  ) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () => _handleButtonPress(context, viewModel),
        child: Text(_getButtonText()),
      ),
    );
  }

  String _getButtonText() {
    if (isForgotPassword) return 'Réinitialiser';
    return isLogin ? 'Se connecter' : 'S\'inscrire';
  }

  void _handleButtonPress(BuildContext context, AuthWidgetViewModel viewModel) {
    String? validationError;

    if (isForgotPassword) {
      validationError = viewModel.validateForgotPasswordForm(context);
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      onSignIn?.call(viewModel.emailController.text.trim(), "");
    } else if (isLogin) {
      validationError = viewModel.validateSignInForm(context);
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      onSignIn?.call(
        viewModel.emailController.text.trim(),
        viewModel.passwordController.text.trim(),
      );
    } else {
      validationError = viewModel.validateSignUpForm(context);
      if (validationError != null) {
        AuthValidators.showValidationError(context, validationError);
        return;
      }
      onSignUp?.call(
        viewModel.firstNameController.text.trim(),
        viewModel.lastNameController.text.trim(),
        viewModel.emailController.text.trim(),
        viewModel.passwordController.text.trim(),
      );
    }
  }
}
