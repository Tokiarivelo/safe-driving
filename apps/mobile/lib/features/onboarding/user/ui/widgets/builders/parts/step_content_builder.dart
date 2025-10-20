part of '../user_ui_builder.dart';

Widget _buildStepContent({
  required String title,
  required String subtitle,
  Widget? additionalContent,
  List<Widget>? buttons,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Builder(
        builder: (context) => Text(
          title,
          style: TextStyle(
            color: AppColors.buttonWithoutBackGround.adapt(context),
            fontWeight: FontWeight.w800,
            fontSize: 18,
          ),
          textAlign: TextAlign.center,
        ),
      ),
      if (subtitle.isNotEmpty) ...[
        const SizedBox(height: 8),
        Builder(
          builder: (context) => Text(
            subtitle,
            style: TextStyle(
              color: AppColors.buttonWithoutBackGround
                  .adapt(context)
                  .withValues(alpha: 0.75),
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ],
      if (additionalContent != null) ...[
        const SizedBox(height: 16),
        additionalContent,
      ],
      if (buttons != null) ...[const SizedBox(height: 16), ...buttons],
    ],
  );
}
