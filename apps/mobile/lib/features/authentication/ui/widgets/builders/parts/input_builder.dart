import 'package:flutter/material.dart';
import '../../../../../../core/constants/colors/colors.dart';
import '../../../../../../shared/widgets/customs/inputs/inputs_widget.dart';

class InputBuilder {
  static Widget buildInputFieldWithValidation({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
    TextEditingController? controller,
    String? errorMessage,
    Function(String)? onChanged,
    required bool isSmallScreen,
  }) {
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

  static Widget buildForgotPasswordLink({
    required String forgotText,
    required VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Align(
        alignment: Alignment.centerRight,
        child: Container(
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: AppColors.buttonWithoutBackGround),
            ),
          ),
          child: Text(
            forgotText,
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
}
