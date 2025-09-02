import 'package:flutter/material.dart';
import '../../../../../shared/widgets/customs/colors/colors_widget.dart';

class AuthLayout extends StatelessWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final Widget Function() headerBuilder;
  final Widget Function() contentBuilder;

  const AuthLayout({
    super.key,
    required this.isLogin,
    required this.isForgotPassword,
    required this.headerBuilder,
    required this.contentBuilder,
  });

  @override
  Widget build(BuildContext context) {
    final bool isRegister = !isLogin && !isForgotPassword;
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return Container(
      height: double.infinity,
      decoration: ColorsWidget.background,
      child: SafeArea(
        child: isRegister
            ? _buildRegisterLayout(isSmallScreen)
            : _buildLoginLayout(isSmallScreen),
      ),
    );
  }

  Widget _buildRegisterLayout(bool isSmallScreen) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            height: isSmallScreen ? 100 : 140,
            padding: const EdgeInsets.symmetric(vertical: 10.0),
            child: Center(child: headerBuilder()),
          ),
          Padding(padding: EdgeInsets.zero, child: contentBuilder()),
        ],
      ),
    );
  }

  Widget _buildLoginLayout(bool isSmallScreen) {
    return Column(
      children: [
        Container(
          height: isSmallScreen ? 100 : 130,
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          child: Center(child: headerBuilder()),
        ),
        Expanded(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 0.0),
              child: contentBuilder(),
            ),
          ),
        ),
      ],
    );
  }
}
