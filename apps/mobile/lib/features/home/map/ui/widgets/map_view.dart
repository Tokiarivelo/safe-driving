import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/map/viewmodels/map_view_model.dart';
import 'package:safe_driving/features/home/map/models/filter_model.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import '../../models/driver_models.dart';
import 'pulsing_marker_widget.dart';
import 'top_filter_bar.dart';
import 'detailed_filters_panel.dart';
import 'driver_popup.dart';

class MapView extends StatefulWidget {
  final LatLng? initialCenter;
  final bool openFilters;
  const MapView({super.key, this.initialCenter, this.openFilters = false});
  @override
  State<MapView> createState() => _MapViewState();
}

class _MapViewState extends State<MapView> with WidgetsBindingObserver {
  bool showFilters = false;
  double radiusKm = 5;
  Driver? _selected;
  String? _vehicleType;
  int _passengers = 2;
  bool _babySeat = false;
  String? _lang;
  bool _animals = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    showFilters = widget.openFilters;
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      final vm = context.read<MapViewModel>();
      vm.locateMe();
    }
  }


  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ServiceLocator.instance.get<MapViewModel>()..init(),
      child: Builder(builder: (context) {
        final vm = context.watch<MapViewModel>();
        if (widget.initialCenter != null && vm.center != widget.initialCenter) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            context.read<MapViewModel>().setCenter(widget.initialCenter!);
          });
        }
        final userPoint = vm.currentLocation;
        final circleRadiusMeters = (radiusKm * 1000).toDouble();
        return Scaffold(
          body: Stack(children: [
            FlutterMap(
              options: MapOptions(
                initialCenter: vm.center,
                initialZoom: 13,
              ),
              children: [
                TileLayer(
                  urlTemplate: vm.tileUrlTemplate,
                  subdomains: vm.tileSubdomains,
                  userAgentPackageName: 'com.safe_driving.app',
                ),
                if (userPoint != null)
                  CircleLayer(circles: [
                    CircleMarker(point: userPoint, radius: circleRadiusMeters, useRadiusInMeter: true, color: kBluePulse.withValues(alpha: 0.15), borderColor: kBluePulse.withValues(alpha: 0.3), borderStrokeWidth: 2),
                  ]),
                MarkerLayer(markers: [
                  if (userPoint != null)
                    Marker(width: 80, height: 80, point: userPoint, child: const PulsingMarkerWidget()),
                  for (final d in vm.drivers)
                    Marker(
                      width: 30,
                      height: 30,
                      point: LatLng(d.lat, d.lng),
                      child: GestureDetector(
                        onTap: () async {
                          final full = await vm.getDriver(d.id);
                          setState(() => _selected = full ?? d);
                        },
                        child: Container(
                          width: 24,
                          height: 24,
                          decoration: const BoxDecoration(color: kRedDriver, shape: BoxShape.circle),
                          child: const Icon(Icons.local_taxi, color: Colors.white, size: 14),
                        ),
                      ),
                    ),
                ]),
              ],
            ),
            Positioned(
              top: 50,
              left: 20,
              right: 20,
                child: TopFilterBar(
                onFiltersPressed: () {
                  final vm = context.read<MapViewModel>();
                  setState(() {
                    showFilters = !showFilters;
                    if (showFilters) {
                      radiusKm = vm.filters.radiusKm;
                    }
                  });
                },
                expanded: showFilters,
              ),
            ),
            if (showFilters)
              Positioned(
                right: 20,
                top: 100,
                child: DetailedFiltersPanel(
                  radiusKm: radiusKm,
                  onRadiusChanged: (v) => setState(() => radiusKm = v),
                  onReset: () {
                    final f = FilterModel.defaults();
                    context.read<MapViewModel>().resetFilters();
                    setState(() { radiusKm = f.radiusKm; _vehicleType = null; _passengers = 2; _babySeat = false; _lang = null; _animals = false; });
                  },
                  onApply: () {
                    final f = vm.filters.copyWith(radiusKm: radiusKm, vehicleType: _vehicleType, passengers: _passengers, babySeat: _babySeat, lang: _lang, animals: _animals);
                    context.read<MapViewModel>().applyFilters(f);
                    setState(() => showFilters = false);
                  },
                  vehicleType: _vehicleType,
                  onVehicleTypeChanged: (v) => setState(() => _vehicleType = v),
                  passengers: _passengers,
                  onPassengersChanged: (v) => setState(() => _passengers = v),
                  babySeat: _babySeat,
                  onBabySeatChanged: (v) => setState(() => _babySeat = v),
                  lang: _lang,
                  onLangChanged: (v) => setState(() => _lang = v),
                  animals: _animals,
                  onAnimalsChanged: (v) => setState(() => _animals = v),
                ),
              ),
            if (_selected != null)
              Positioned(
                left: 20,
                bottom: 40,
                right: 20,
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                    child: DriverPopup(
                      name: _selected!.name,
                      rating: _selected!.rating,
                      statusText: _selected!.statusText,
                      vehicleModel: _selected!.vehicleModel,
                      seats: _selected!.seats,
                      phone: _selected!.phone,
                    ),
                  ),
                ),
              ),
          ]),
        );
      }),
    );
  }
}
