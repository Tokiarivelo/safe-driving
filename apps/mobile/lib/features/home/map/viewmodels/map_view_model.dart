import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import '../repositories/map_repository.dart';
import '../core/interfaces/i_map_tile_provider.dart';
import '../core/interfaces/i_device_location_service.dart';
import '../services/filters_service.dart';
import '../services/position_persistence_service.dart';
import 'mixins/map_location_mixin.dart';
import 'mixins/map_search_mixin.dart';
import 'mixins/map_drivers_mixin.dart';
import 'mixins/map_filters_mixin.dart';

class MapViewModel extends ChangeNotifier with MapLocationMixin, MapSearchMixin, MapDriversMixin, MapFiltersMixin {
  final MapRepository _repository;
  final IMapTileProvider _tileProvider;
  final SessionService _session;


  String get tileUrlTemplate => _tileProvider.tileUrlTemplate;
  List<String> get tileSubdomains => _tileProvider.tileSubdomains;

  String? _uiMessage;
  String? _errorMessage;

  MapViewModel({
    required MapRepository repository,
    required IMapTileProvider tileProvider,
    required SessionService session,
    required IDeviceLocationService deviceLocationService,
    required FiltersService filtersService,
    required PositionPersistenceService positionPersistence,
  })  : _repository = repository,
        _tileProvider = tileProvider,
        _session = session {
    this.repository = _repository;
    this.deviceLocationService = deviceLocationService;
    this.filtersService = filtersService;
    this.positionPersistence = positionPersistence;
    userIdGetter = () => _session.userId;
  }

  Future<void> init() async {
    await loadFilters();
    await initLocation();
    radiusKm = filters.radiusKm;
    await startDrivers();
  }

  @override
  Future<void> onFiltersChanged() async {
    radiusKm = filters.radiusKm;
    await startDrivers();
  }

  void setCenter(LatLng value) {
    center = value;
    notifyListeners();
  }

  String? takeMessage() {
    final m = _uiMessage;
    _uiMessage = null;
    return m;
  }

  String? takeError() {
    final e = _errorMessage;
    _errorMessage = null;
    return e;
  }

  @override
  void dispose() {
    stopDrivers();
    searchController.dispose();
    destinationController.dispose();
    super.dispose();
  }
}
