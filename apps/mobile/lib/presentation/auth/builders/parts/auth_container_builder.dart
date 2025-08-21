import 'package:flutter/material.dart';
import '../../../../core/constants/colors/colors.dart';

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
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 4,
            spreadRadius: 4,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SingleChildScrollView(child: child),
    );
  }
}
