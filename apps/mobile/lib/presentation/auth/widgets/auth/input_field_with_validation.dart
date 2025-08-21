import 'package:flutter/material.dart';
import '../../builders/auth_ui_builder.dart';

class InputFieldWithValidation extends StatelessWidget {
  final String hint;
  final IconData icon;
  final bool obscureText;
  final bool isPassword;
  final bool isConfirmPassword;
  final TextEditingController? controller;
  final String? errorMessage;
  final Function(String)? onChanged;
  final bool isSmallScreen;

  const InputFieldWithValidation({
    super.key,
    required this.hint,
    required this.icon,
    this.obscureText = false,
    this.isPassword = false,
    this.isConfirmPassword = false,
    this.controller,
    this.errorMessage,
    this.onChanged,
    required this.isSmallScreen,
  });

  @override
  Widget build(BuildContext context) {
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
}
