import 'package:flutter/material.dart';
import '../../../../core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

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
  final bool readOnly;
  final bool enabled;

  final String? Function(String?)? validator;

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
    this.readOnly = false,
    this.enabled = true,
    this.validator,
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
      padding: widget.padding ??
          EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.showLabel && widget.label != null) ...[
            Padding(
              padding: const EdgeInsets.only(left: 8, bottom: 6),
              child: Text(widget.label!, style: AppTextStyles.label14(context)),
            ),
          ],

          // Champ input avec style unifié
          Container(
            decoration: widget.showLabel
                ? BoxDecoration(
                    color: (widget.backgroundColor?.adapt(context)) ??
                        AppColors.softBackgroundColor.adapt(context),
                    borderRadius: BorderRadius.circular(2),
                    border: Border.all(
                      color:
                          AppColors.borderInputField.adapt(context).withAlpha(100),
                      width: 1,
                    ),
                  )
                : null,
            child: TextFormField(
              style: TextStyle(
                fontSize: widget.showLabel ? 16 : 10,
                color: AppColors.textColor.adapt(context),
              ),
              readOnly: widget.readOnly,
              enabled: widget.enabled,
              keyboardType: widget.keyboardType,
              decoration: InputDecoration(
                filled: !widget.showLabel,
                fillColor: widget.showLabel
                    ? null
                    : AppColors.inputTextBackground.adapt(context),
                hintText: widget.hint,
                hintStyle: widget.showLabel
                    ? AppTextStyles.hint14(context).copyWith(
                        color:
                            AppColors.textColor.adapt(context).withAlpha(128),
                      )
                    : AppTextStyles.hint10(context),
                prefixIcon: Icon(
                  widget.icon,
                  color: widget.showLabel
                      ? AppColors.textColor.adapt(context).withAlpha(200)
                      : AppColors.icon.adapt(context),
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
                              ? AppColors.error.adapt(context)
                              : AppColors.borderInputField.adapt(context),
                          width: hasError ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                enabledBorder: widget.showLabel
                    ? InputBorder.none
                    : OutlineInputBorder(
                        borderSide: BorderSide(
                          color: hasError
                              ? AppColors.error.adapt(context)
                              : AppColors.borderInputField.adapt(context),
                          width: hasError ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                focusedBorder: widget.showLabel
                    ? InputBorder.none
                    : OutlineInputBorder(
                        borderSide: BorderSide(
                          color: hasError
                              ? AppColors.error.adapt(context)
                              : AppColors.borderInputField.adapt(context),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                suffixIcon: widget.obscureText
                    ? IconButton(
                        icon: Icon(
                          isVisible
                              ? Icons.visibility_off
                              : Icons.visibility,
                        ),
                        color: AppColors.icon.adapt(context),
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
              autovalidateMode: AutovalidateMode.onUserInteraction,
              validator: widget.validator,
            ),
          ),

          // Message d'erreur
          if (hasError)
            Padding(
              padding: const EdgeInsets.only(top: 4.0, left: 8.0),
              child: Text(widget.errorMessage!,
                  style: AppTextStyles.error10(context)),
            ),
        ],
      ),
    );
  }
}
