import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/constants/dimens.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class TopFilterBar extends StatelessWidget {
  final VoidCallback onFiltersPressed;
  final bool expanded;
  const TopFilterBar({super.key, required this.onFiltersPressed, this.expanded = false});
  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 2,
      color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.9),
      borderRadius: BorderRadius.circular(Radii.r25),
      child: Container(
        height: 50,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: kAccentPink, width: 2),
            ),
            child: CircleAvatar(
              backgroundColor: kLightGray,
              child: Icon(Icons.person, color: Theme.of(context).colorScheme.onSurfaceVariant),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: InkWell(
              onTap: onFiltersPressed,
              child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text('Filtres', style: AppTextStyles.subtitle14(context)),
                const SizedBox(width: 6),
                AnimatedRotation(
                  turns: expanded ? 0.5 : 0,
                  duration: const Duration(milliseconds: 200),
                  child: Icon(Icons.keyboard_arrow_down, color: Theme.of(context).colorScheme.onSurface),
                )
              ]),
            ),
          ),
          IconButton(
            onPressed: () {},
            padding: const EdgeInsets.all(12),
            icon: Icon(Icons.menu, color: Theme.of(context).colorScheme.onSurface, size: 24),
          )
        ]),
      ),
    );
  }
}