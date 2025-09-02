import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/user/models/user_onboarding_data.dart';

class UserTransportSelectorWidget extends StatelessWidget {
  final List<String> selectedTransports;
  final ValueChanged<MapEntry<String, bool>> onSelectionChanged;

  const UserTransportSelectorWidget({
    super.key,
    required this.selectedTransports,
    required this.onSelectionChanged,
  });

  @override
  Widget build(BuildContext context) {
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
        children: UserOnboardingData.transportModes.map((mode) {
          final isSelected = selectedTransports.contains(mode);
          return FilterChip(
            avatar: Icon(UserOnboardingData.transportIcons[mode], size: 18),
            label: Text(mode),
            selected: isSelected,
            onSelected: (selected) =>
                onSelectionChanged(MapEntry(mode, selected)),
            selectedColor: AppColors.fillButtonBackground,
            checkmarkColor: AppColors.light,
          );
        }).toList(),
      ),
    );
  }
}
