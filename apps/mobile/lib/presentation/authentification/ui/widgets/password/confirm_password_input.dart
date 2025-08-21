import 'package:flutter/material.dart';
import '../../../../../shared/widgets/customs/inputs/inputs_widget.dart';

class ConfirmPasswordInput extends StatelessWidget {
  final TextEditingController controller;
  final String errorMessage;
  final Function(String) onChanged;
  final bool isSmallScreen;

  const ConfirmPasswordInput({
    super.key,
    required this.controller,
    required this.errorMessage,
    required this.onChanged,
    required this.isSmallScreen,
  });

  @override
  Widget build(BuildContext context) {
    return CustomInputField(
      hint: "Confirmer le mot de passe",
      icon: Icons.lock_outlined,
      obscureText: true,
      isConfirmPassword: true,
      controller: controller,
      errorMessage: errorMessage,
      onChanged: onChanged,
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
    );
  }
}
