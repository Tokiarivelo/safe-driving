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
  final double? fieldHeight;

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
    this.fieldHeight,
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
                        (Theme.of(context).brightness == Brightness.dark
                            ? AppColors.backgroundSecondary
                            : AppColors.softBackgroundColor),
                    borderRadius: BorderRadius.circular(2),
                    border: Border.all(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? AppColors.light.withValues(alpha: 0.2)
                          : AppColors.borderInputField,
                      width: 1,
                    ),
                  )
                : null,
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: widget.fieldHeight ?? (widget.showLabel ? 52 : 44),
              ),
              child: TextFormField(
                style: TextStyle(
                  fontSize: widget.showLabel ? 16 : 10,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
                readOnly: widget.readOnly,
                enabled: widget.enabled,
                keyboardType: widget.keyboardType,
                maxLines: 1,
                textAlignVertical: TextAlignVertical.center,
                enableSuggestions: false,
                autocorrect: false,
                autofillHints: const <String>[],
                smartDashesType: SmartDashesType.disabled,
                smartQuotesType: SmartQuotesType.disabled,
                textCapitalization: TextCapitalization.none,
                decoration: InputDecoration(
                  isDense: true,
                  filled: !widget.showLabel,
                  fillColor: widget.showLabel
                      ? null
                      : (Theme.of(context).brightness == Brightness.dark
                          ? AppColors.backgroundSecondary
                          : AppColors.inputTextBackground),
                  hintText: widget.hint,
                  hintStyle: widget.showLabel
                      ? AppTextStyles.hint14(context).copyWith(
                          color: Theme.of(context)
                              .colorScheme
                              .onSurface
                              .withValues(alpha: 0.7),
                        )
                      : AppTextStyles.hint10(context).copyWith(
                          color: Theme.of(context)
                              .colorScheme
                              .onSurface
                              .withValues(alpha: 0.7),
                        ),
                  prefixIcon: Icon(
                    widget.icon,
                    color: Theme.of(context).brightness == Brightness.dark
                        ? AppColors.light
                        : (widget.showLabel ? AppColors.textColor : AppColors.icon),
                    size: widget.showLabel ? 20 : 24,
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 0,
                  ),
                  errorMaxLines: 2,
                  errorStyle: AppTextStyles.error10(context),
                  border: widget.showLabel
                      ? InputBorder.none
                      : OutlineInputBorder(
                          borderSide: BorderSide(
                            color: Theme.of(context).brightness == Brightness.dark
                                ? AppColors.light.withValues(alpha: 0.2)
                                : AppColors.borderInputField,
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(5),
                        ),
                  enabledBorder: widget.showLabel
                      ? InputBorder.none
                      : OutlineInputBorder(
                          borderSide: BorderSide(
                            color: Theme.of(context).brightness == Brightness.dark
                                ? AppColors.light.withValues(alpha: 0.2)
                                : AppColors.borderInputField,
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(5),
                        ),
                  focusedBorder: widget.showLabel
                      ? InputBorder.none
                      : OutlineInputBorder(
                          borderSide: BorderSide(
                            color: Theme.of(context).brightness == Brightness.dark
                                ? AppColors.light.withValues(alpha: 0.4)
                                : AppColors.borderInputField,
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(5),
                        ),
                  errorBorder: widget.showLabel
                      ? InputBorder.none
                      : OutlineInputBorder(
                          borderSide: BorderSide(
                            color: AppColors.error.adapt(context),
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(5),
                        ),
                  focusedErrorBorder: widget.showLabel
                      ? InputBorder.none
                      : OutlineInputBorder(
                          borderSide: BorderSide(
                            color: AppColors.error.adapt(context),
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
                          color: Theme.of(context).brightness == Brightness.dark
                              ? AppColors.light
                              : AppColors.icon,
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
          ),

        
          AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            height: hasError ? 20 : 0,
            child: hasError
                ? Padding(
                    padding: const EdgeInsets.only(top: 4.0, left: 8.0),
                    child: Text(
                      widget.errorMessage!,
                      style: AppTextStyles.error10(context),
                      overflow: TextOverflow.ellipsis,
                    ),
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
