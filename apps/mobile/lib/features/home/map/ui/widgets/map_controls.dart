import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../viewmodels/map_view_model.dart';

class MapControls extends StatelessWidget {
  const MapControls({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<MapViewModel>();
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        FloatingActionButton.small(
          onPressed: vm.locateMe,
          tooltip: context.l10n.mapLocate,
          child: const Icon(Icons.my_location),
        ),
        const SizedBox(height: 8),
        FloatingActionButton.small(
          onPressed: vm.clear,
          tooltip: context.l10n.mapClear,
          child: const Icon(Icons.clear),
        ),
      ],
    );
  }
}
