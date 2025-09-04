part of '../user_ui_builder.dart';

Widget _buildSummarySection({
  required String title,
  required List<Widget> items,
}) {
  return Builder(
    builder: (context) => Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: ColorsWidget.subtleBorderColor(context),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          ...items,
        ],
      ),
    ),
  );
}
