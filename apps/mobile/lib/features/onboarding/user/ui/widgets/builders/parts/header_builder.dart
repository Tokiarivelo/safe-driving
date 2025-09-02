part of '../user_ui_builder.dart';

Widget _buildHeader() {
  return Padding(
    padding: const EdgeInsets.only(top: 20, bottom: 10),
    child: Center(
      child: SvgPicture.asset(
        'assets/logo/logo_white.svg',
        width: 85,
        height: 85,
      ),
    ),
  );
}

