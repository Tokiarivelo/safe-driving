part of '../user_ui_builder.dart';

Widget _buildTransportModeChips({
  required List<String> modes,
  required List<String> selectedModes,
  required Map<String, IconData> icons,
  required Function(String, bool) onSelectionChanged,
}) {
  return Container(
    decoration: BoxDecoration(
      border: Border.all(
        color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
        width: 1,
      ),
      borderRadius: BorderRadius.circular(8),
    ),
    padding: const EdgeInsets.all(8),
    child: Wrap(
      spacing: 8,
      children: modes.map((mode) {
        final isSelected = selectedModes.contains(mode);
        return FilterChip(
          avatar: Icon(icons[mode], size: 18),
          label: Text(mode),
          selected: isSelected,
          onSelected: (selected) => onSelectionChanged(mode, selected),
          selectedColor: AppColors.fillButtonBackground,
          checkmarkColor: AppColors.light,
        );
      }).toList(),
    ),
  );
}
