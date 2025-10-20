import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../viewmodels/map_view_model.dart';

class RouteSummary extends StatelessWidget {
  const RouteSummary({super.key});

  String _formatDistanceKm(double meters) {
    final km = meters / 1000.0;
    if (km < 10) {
      return '${km.toStringAsFixed(1)} km';
    }
    return '${km.toStringAsFixed(0)} km';
  }

  String _formatDurationMin(double seconds) {
    final min = (seconds / 60.0).round();
    return '$min min';
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<MapViewModel>();
    if (vm.routePolyline == null || vm.routePolyline!.isEmpty) {
      return const SizedBox.shrink();
    }
    final dist = vm.route?.distanceMeters;
    final dur = vm.route?.durationSeconds;
    final distanceText = dist != null ? _formatDistanceKm(dist) : '';
    final durationText = dur != null ? _formatDurationMin(dur) : '';
    final text = (distanceText.isNotEmpty && durationText.isNotEmpty)
        ? context.l10n.mapRouteSummary(distanceText, durationText)
        : context.l10n.mapRouteSummary(distanceText + durationText, '');
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Row(
          children: [
            const Icon(Icons.alt_route, color: Colors.blue),
            const SizedBox(width: 6),
            Text(text),
          ],
        ),
      ),
    );
  }
}
