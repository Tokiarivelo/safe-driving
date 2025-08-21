import 'package:flutter/material.dart';
import 'input_builder.dart';

class AuthInputBuilder {
  static Widget buildInputFields({
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required TextEditingController emailController,
    required TextEditingController passwordController,
    required TextEditingController firstNameController,
    required TextEditingController lastNameController,
    required TextEditingController confirmPasswordController,
    required String emailError,
    required String passwordError,
    required String firstNameError,
    required String lastNameError,
    required String confirmPasswordError,
    required Function(String) onEmailChanged,
    required Function(String) onPasswordChanged,
    required Function(String) onFirstNameChanged,
    required Function(String) onLastNameChanged,
    required Function(String) onConfirmPasswordChanged,
    required VoidCallback? onForgotPassword,
  }) {
    String fieldsState;
    if (isForgotPassword) {
      fieldsState = 'forgot-fields';
    } else if (isLogin) {
      fieldsState = 'login-fields';
    } else {
      fieldsState = 'register-fields';
    }

    return Column(
      key: ValueKey(fieldsState),
      children: [
        if (!isForgotPassword) ...[
          InputBuilder.buildInputFieldWithValidation(
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
            InputBuilder.buildInputFieldWithValidation(
              hint: "Prénom",
              icon: Icons.badge_outlined,
              controller: lastNameController,
              errorMessage: lastNameError,
              onChanged: onLastNameChanged,
              isSmallScreen: isSmallScreen,
            ),
          if (!isLogin)
            InputBuilder.buildInputFieldWithValidation(
              hint: "Email",
              icon: Icons.email_outlined,
              controller: emailController,
              errorMessage: emailError,
              onChanged: onEmailChanged,
              isSmallScreen: isSmallScreen,
            ),
          InputBuilder.buildInputFieldWithValidation(
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
            InputBuilder.buildInputFieldWithValidation(
              hint: "Confirmer le mot de passe",
              icon: Icons.lock_outlined,
              obscureText: true,
              isConfirmPassword: true,
              controller: confirmPasswordController,
              errorMessage: confirmPasswordError,
              onChanged: onConfirmPasswordChanged,
              isSmallScreen: isSmallScreen,
            ),
          SizedBox(height: isSmallScreen ? 2 : 5),
          if (isLogin) _buildForgotPasswordLink(onForgotPassword),
        ],
        if (isForgotPassword) ...[
          InputBuilder.buildInputFieldWithValidation(
            hint: "Adresse email",
            icon: Icons.email_outlined,
            controller: emailController,
            errorMessage: emailError,
            onChanged: onEmailChanged,
            isSmallScreen: isSmallScreen,
          ),
        ],
      ],
    );
  }

  static Widget _buildForgotPasswordLink(VoidCallback? onTap) {
    return InputBuilder.buildForgotPasswordLink(
      forgotText: "Mot de passe oublié ?",
      onTap: onTap,
    );
  }
}
