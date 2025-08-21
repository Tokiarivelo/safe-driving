import 'package:flutter/material.dart';
import 'input_field_with_validation.dart';
import '../builders/auth_ui_builder.dart';
import '../../models/auth_models.dart';

class AuthInputFields extends StatelessWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final bool isSmallScreen;
  final TextEditingController emailController;
  final TextEditingController passwordController;
  final TextEditingController firstNameController;
  final TextEditingController lastNameController;
  final TextEditingController confirmPasswordController;
  final String emailError;
  final String passwordError;
  final String firstNameError;
  final String lastNameError;
  final String confirmPasswordError;
  final Function(String) onEmailChanged;
  final Function(String) onPasswordChanged;
  final Function(String) onFirstNameChanged;
  final Function(String) onLastNameChanged;
  final Function(String) onConfirmPasswordChanged;
  final VoidCallback? onForgotPassword;
  final AuthStepContent stepData;

  const AuthInputFields({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.isSmallScreen,
    required this.emailController,
    required this.passwordController,
    required this.firstNameController,
    required this.lastNameController,
    required this.confirmPasswordController,
    required this.emailError,
    required this.passwordError,
    required this.firstNameError,
    required this.lastNameError,
    required this.confirmPasswordError,
    required this.onEmailChanged,
    required this.onPasswordChanged,
    required this.onFirstNameChanged,
    required this.onLastNameChanged,
    required this.onConfirmPasswordChanged,
    this.onForgotPassword,
    required this.stepData,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (!isForgotPassword) ...{
          InputFieldWithValidation(
            hint: isLogin ? "Email ou Nom d'utilisateur" : "Nom",
            icon: isLogin ? Icons.person_outline : Icons.badge_outlined,
            controller: isLogin ? emailController : firstNameController,
            errorMessage: isLogin ? null : firstNameError,
            onChanged: (value) {
              if (!isLogin) {
                onFirstNameChanged(value);
              }
            },
            isSmallScreen: isSmallScreen,
          ),
          if (!isLogin)
            InputFieldWithValidation(
              hint: "Prénom",
              icon: Icons.badge_outlined,
              controller: lastNameController,
              errorMessage: lastNameError,
              onChanged: onLastNameChanged,
              isSmallScreen: isSmallScreen,
            ),
          if (!isLogin)
            InputFieldWithValidation(
              hint: "Email",
              icon: Icons.email_outlined,
              controller: emailController,
              errorMessage: emailError,
              onChanged: onEmailChanged,
              isSmallScreen: isSmallScreen,
            ),
          InputFieldWithValidation(
            hint: "Mot de passe",
            icon: Icons.lock_outlined,
            obscureText: true,
            isPassword: true,
            controller: passwordController,
            errorMessage: passwordError,
            onChanged: onPasswordChanged,
            isSmallScreen: isSmallScreen,
          ),
          if (!isLogin)
            InputFieldWithValidation(
              hint: "Comfirmer le mot de passe",
              icon: Icons.lock_outlined,
              obscureText: true,
              isConfirmPassword: true,
              controller: confirmPasswordController,
              errorMessage: confirmPasswordError,
              onChanged: onConfirmPasswordChanged,
              isSmallScreen: isSmallScreen,
            ),
          SizedBox(height: MediaQuery.of(context).size.height < 700 ? 2 : 5),
          if (isLogin) _buildForgotPasswordLink(),
        },
        if (isForgotPassword) ...{
          InputFieldWithValidation(
            hint: "Adresse email",
            icon: Icons.email_outlined,
            controller: emailController,
            errorMessage: emailError,
            onChanged: onEmailChanged,
            isSmallScreen: isSmallScreen,
          ),
        },
      ],
    );
  }

  Widget _buildForgotPasswordLink() {
    return AuthUIBuilder.buildForgotPasswordLink(
      forgotText: stepData.forgotPasswordText,
      onTap: onForgotPassword,
    );
  }
}
