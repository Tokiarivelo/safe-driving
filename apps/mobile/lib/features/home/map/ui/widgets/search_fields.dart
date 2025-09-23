import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../viewmodels/map_view_model.dart';

class SearchFields extends StatelessWidget {
  const SearchFields({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<MapViewModel>();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: vm.searchController,
            onChanged: vm.onStartChanged,
            decoration: InputDecoration(
              hintText: context.l10n.mapFromPlaceholder,
              filled: true,
              fillColor: isDark ? AppColors.backgroundSecondary : AppColors.inputTextBackground,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(
                  color: isDark ? AppColors.borderButtonDark : AppColors.borderButtonLight,
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(
                  color: isDark ? AppColors.borderButtonDark : AppColors.borderButtonLight,
                ),
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.search),
                onPressed: vm.searchStart,
              ),
            ),
            onSubmitted: (_) => vm.searchStart(),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: TextField(
            controller: vm.destinationController,
            decoration: InputDecoration(
              hintText: context.l10n.mapToPlaceholder,
              filled: true,
              fillColor: isDark ? AppColors.backgroundSecondary : AppColors.inputTextBackground,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(
                  color: isDark ? AppColors.borderButtonDark : AppColors.borderButtonLight,
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(
                  color: isDark ? AppColors.borderButtonDark : AppColors.borderButtonLight,
                ),
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.directions),
                onPressed: vm.searchDestination,
              ),
            ),
            onSubmitted: (_) => vm.searchDestination(),
          ),
        ),
      ],
    );
  }
}
