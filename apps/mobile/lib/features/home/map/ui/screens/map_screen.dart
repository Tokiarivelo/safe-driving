import 'package:flutter/material.dart';
import '../../viewmodels/map_view_model.dart';
import 'package:provider/provider.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../core/map_config.dart';
import '../widgets/map_controls.dart';
import '../widgets/route_summary.dart';

class MapScreen extends StatelessWidget {
  const MapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ServiceLocator.instance.get<MapViewModel>()..init(),
      child: const _MapScreenView(),
    );
  }
}

class _MapScreenView extends StatefulWidget {
  const _MapScreenView();

  @override
  State<_MapScreenView> createState() => _MapScreenViewState();
}

class _MapScreenViewState extends State<_MapScreenView> {
  bool _permissionSnackShown = false;

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<MapViewModel>();

    // Side effects after rebuild to show snackbars once per message/error
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final err = vm.takeError();
      if (err != null && err.isNotEmpty) {
        SnackbarHelper.showError(context, context.l10n.networkError);
      }
      final msg = vm.takeMessage();
      if (msg != null) {
        if (msg == 'NO_RESULTS') {
          SnackbarHelper.showInfo(context, context.l10n.mapNoResults);
        } else {
          SnackbarHelper.showInfo(context, msg);
        }
      }
      if (vm.permissionDenied && !_permissionSnackShown) {
        _permissionSnackShown = true;
        SnackbarHelper.showWarning(context, context.l10n.mapPermissionDenied);
      }
    });

    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            options: MapOptions(
              initialCenter: vm.center,
              initialZoom: MapConfig.initialZoom,
            ),
            children: [
              TileLayer(
                urlTemplate: vm.tileUrlTemplate,
                subdomains: vm.tileSubdomains,
                userAgentPackageName: 'com.safe_driving.app',
              ),
              MarkerLayer(markers: [
                if (vm.currentLocation != null)
                  Marker(
                    width: 40,
                    height: 40,
                    point: vm.currentLocation!,
                    child: const Icon(Icons.my_location, color: Colors.blue),
                  ),
              ]),
              if (vm.routePolyline != null)
                PolylineLayer(polylines: [
                  Polyline(points: vm.routePolyline!, color: Colors.blue, strokeWidth: 4),
                ]),
            ],
          ),


          // Back button (top-left)
          Positioned(
            left: 12,
            top: 12,
            child: SafeArea(
              child: Material(
                color: Colors.black54,
                shape: const CircleBorder(),
                child: IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () => Navigator.of(context).maybePop(),
                  tooltip: 'Back',
                ),
              ),
            ),
          ),

          // Route summary pill (if any)
          const Positioned(
            right: 12,
            bottom: 92,
            child: RouteSummary(),
          ),

          // Loading overlay
          if (vm.isLoading)
            Container(
              color: Colors.black26,
              child: const Center(child: CircularProgressIndicator()),
            ),
        ],
      ),

      // Map controls (locate, clear)
      floatingActionButton: const MapControls(),
    );
  }
}
