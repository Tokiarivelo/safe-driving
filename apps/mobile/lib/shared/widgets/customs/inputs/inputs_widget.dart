import 'package:flutter/material.dart';
import '../../../../core/constants/colors/colors.dart';

class CustomInputField extends StatefulWidget {
  final String hint;
  final String? label;
  final IconData icon;
  final bool obscureText;
  final bool isPassword;
  final bool isConfirmPassword;
  final TextEditingController? controller;
  final String? errorMessage;
  final Function(String)? onChanged;
  final TextInputType? keyboardType;
  final bool showLabel;
  final EdgeInsets? padding;
  final Color? backgroundColor;

  const CustomInputField({
    super.key,
    required this.hint,
    required this.icon,
    this.label,
    this.obscureText = false,
    this.isPassword = false,
    this.isConfirmPassword = false,
    this.controller,
    this.errorMessage,
    this.onChanged,
    this.keyboardType,
    this.showLabel = false,
    this.padding,
    this.backgroundColor,
  });

  @override
  CustomInputFieldState createState() => CustomInputFieldState();
}

class CustomInputFieldState extends State<CustomInputField> {
  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;

  @override
  Widget build(BuildContext context) {
    bool isVisible = widget.isPassword
        ? _isPasswordVisible
        : widget.isConfirmPassword
        ? _isConfirmPasswordVisible
        : false;

    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final bool hasError =
        widget.errorMessage != null && widget.errorMessage!.isNotEmpty;

    return Padding(
      padding:
          widget.padding ??
          EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.showLabel && widget.label != null) ...[
            Padding(
              padding: const EdgeInsets.only(left: 8, bottom: 6),
              child: Text(
                widget.label!,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppColors.textColor,
                ),
              ),
            ),
          ],

          // Champ input avec style unifié
          Container(
            decoration: widget.showLabel
                ? BoxDecoration(
                    color: widget.backgroundColor ?? AppColors.softBackgroundColor,
                    borderRadius: BorderRadius.circular(2),
                    border: Border.all(
                      color: AppColors.borderInputField.withAlpha(100),
                      width: 1,
                    ),
                  )
                : null,
            child: TextField(
              style: TextStyle(
                fontSize: widget.showLabel ? 16 : 10,
                color: AppColors.textColor,
              ),
              keyboardType: widget.keyboardType,
              decoration: InputDecoration(
                filled: !widget.showLabel,
                fillColor: widget.showLabel
                    ? null
                    : AppColors.inputTextBackground,
                hintText: widget.hint,
                hintStyle: TextStyle(
                  color: widget.showLabel
                      ? AppColors.textColor.withAlpha(128)
                      : AppColors.placeHolderInput,
                  fontSize: widget.showLabel ? 14 : 10,
                ),
                prefixIcon: Icon(
                  widget.icon,
                  color: widget.showLabel
                      ? AppColors.textColor.withAlpha(200)
                      : AppColors.icon,
                  size: widget.showLabel ? 20 : 24,
                ),
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: widget.showLabel ? 14 : (isSmallScreen ? 12 : 16),
                ),
                border: widget.showLabel
                    ? InputBorder.none
                    : OutlineInputBorder(
                        borderSide: BorderSide(
                          color: hasError
                              ? AppColors.error
                              : AppColors.borderInputField,
                          width: hasError ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                enabledBorder: widget.showLabel
                    ? InputBorder.none
                    : OutlineInputBorder(
                        borderSide: BorderSide(
                          color: hasError
                              ? AppColors.error
                              : AppColors.borderInputField,
                          width: hasError ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                focusedBorder: widget.showLabel
                    ? InputBorder.none
                    : OutlineInputBorder(
                        borderSide: BorderSide(
                          color: hasError
                              ? AppColors.error
                              : AppColors.borderInputField,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                suffixIcon: widget.obscureText
                    ? IconButton(
                        icon: Icon(
                          isVisible ? Icons.visibility_off : Icons.visibility,
                        ),
                        color: AppColors.icon,
                        onPressed: () {
                          setState(() {
                            if (widget.isPassword) {
                              _isPasswordVisible = !_isPasswordVisible;
                            } else if (widget.isConfirmPassword) {
                              _isConfirmPasswordVisible =
                                  !_isConfirmPasswordVisible;
                            }
                          });
                        },
                      )
                    : null,
              ),
              obscureText: widget.obscureText && !isVisible,
              controller: widget.controller,
              onChanged: widget.onChanged,
            ),
          ),

          // Message d'erreur
          if (hasError)
            Padding(
              padding: const EdgeInsets.only(top: 4.0, left: 8.0),
              child: Text(
                widget.errorMessage!,
                style: const TextStyle(
                  color: AppColors.error,
                  fontSize: 10,
                  fontFamily: 'Inder',
                ),
              ),
            ),
        ],
      ),
    );
  }
}
