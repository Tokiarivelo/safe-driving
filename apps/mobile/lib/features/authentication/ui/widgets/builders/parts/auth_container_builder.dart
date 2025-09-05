import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

class AuthContainerBuilder {
  static Widget buildAuthContainer({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    required bool isSmallScreen,
    required Widget child,
  }) {
    final bool isRegister = !isLogin && !isForgotPassword;
    final screenHeight = MediaQuery.of(context).size.height;
    final headerHeight = isRegister
        ? (isSmallScreen ? 100 : 140)
        : (isSmallScreen ? 100 : 130);

    return Container(
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.zero,
      height: screenHeight - headerHeight - MediaQuery.of(context).padding.top,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        border: Border(
          top: BorderSide(
            color: ColorsWidget.subtleBorderColor(context),
            width: 1.0,
          ),
        ),

        color: ColorsWidget.surface(context),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).brightness == Brightness.dark
                ? AppColors.dark.withValues(alpha: 0.18)
                : AppColors.dark.withValues(alpha: 0.08),
            blurRadius: 3,
            spreadRadius: 2,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SingleChildScrollView(child: child),
    );
  }
}
