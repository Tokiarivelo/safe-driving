import 'package:flutter/material.dart';
import 'package:safe_driving/l10n/l10n.dart';
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
          Builder(
            builder: (context) => InputBuilder.buildInputFieldWithValidation(
              hint: isLogin
                  ? context.l10n.emailOrUsername
                  : context.l10n.firstName,
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
          ),
          if (!isLogin)
            Builder(
              builder: (context) => InputBuilder.buildInputFieldWithValidation(
                hint: context.l10n.lastName,
                icon: Icons.badge_outlined,
                controller: lastNameController,
                errorMessage: lastNameError,
                onChanged: onLastNameChanged,
                isSmallScreen: isSmallScreen,
              ),
            ),
          if (!isLogin)
            Builder(
              builder: (context) => InputBuilder.buildInputFieldWithValidation(
                hint: context.l10n.email,
                icon: Icons.email_outlined,
                controller: emailController,
                errorMessage: emailError,
                onChanged: onEmailChanged,
                isSmallScreen: isSmallScreen,
              ),
            ),
          Builder(
            builder: (context) => InputBuilder.buildInputFieldWithValidation(
              hint: context.l10n.password,
              icon: Icons.lock_outlined,
              obscureText: true,
              isPassword: true,
              controller: passwordController,
              errorMessage: passwordError,
              onChanged: onPasswordChanged,
              isSmallScreen: isSmallScreen,
            ),
          ),
          if (!isLogin)
            Builder(
              builder: (context) => InputBuilder.buildInputFieldWithValidation(
                hint: context.l10n.confirmPassword,
                icon: Icons.lock_outlined,
                obscureText: true,
                isConfirmPassword: true,
                controller: confirmPasswordController,
                errorMessage: confirmPasswordError,
                onChanged: onConfirmPasswordChanged,
                isSmallScreen: isSmallScreen,
              ),
            ),
          SizedBox(height: isSmallScreen ? 2 : 5),
          if (isLogin) _buildForgotPasswordLink(onForgotPassword),
        ],
        if (isForgotPassword) ...[
          Builder(
            builder: (context) => InputBuilder.buildInputFieldWithValidation(
              hint: context.l10n.email,
              icon: Icons.email_outlined,
              controller: emailController,
              errorMessage: emailError,
              onChanged: onEmailChanged,
              isSmallScreen: isSmallScreen,
            ),
          ),
        ],
      ],
    );
  }

  static Widget _buildForgotPasswordLink(VoidCallback? onTap) {
    return Builder(
      builder: (context) => InputBuilder.buildForgotPasswordLink(
        forgotText: context.l10n.forgotPassword,
        onTap: onTap,
      ),
    );
  }
}
