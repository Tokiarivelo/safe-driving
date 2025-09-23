import 'dart:async';
import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import '../models/models.dart';
import '../repositories/map_repository.dart';
import '../repositories/position_repository.dart';
import 'package:geolocator/geolocator.dart';
import '../core/map_config.dart';

import '../core/interfaces/i_map_tile_provider.dart';

class MapViewModel extends ChangeNotifier {
  final MapRepository _repository;
  final PositionRepository? _positionRepository;
  final IMapTileProvider _tileProvider;
  final TextEditingController searchController = TextEditingController();
  final TextEditingController destinationController = TextEditingController();

  LatLng center = MapConfig.defaultCenter;
  LatLng? currentLocation;
  List<LatLng> markers = [];
  List<LatLng>? routePolyline;
  RouteGeometry? route;

  String get tileUrlTemplate => _tileProvider.tileUrlTemplate;
  List<String> get tileSubdomains => _tileProvider.tileSubdomains;

  bool isLoading = false;
  bool permissionDenied = false;
  String? _uiMessage;
  String? _errorMessage;
  Timer? _debounce;

  MapViewModel({
    required MapRepository repository,
    PositionRepository? positionRepository,
    required IMapTileProvider tileProvider,
  }) : _repository = repository,
       _positionRepository = positionRepository,
       _tileProvider = tileProvider;

  Future<void> init() async {
    try {
      final hasPermission = await _ensureLocationPermission();
      if (hasPermission) {
        final pos = await Geolocator.getCurrentPosition(
          locationSettings: const LocationSettings(
            accuracy: LocationAccuracy.best,
          ),
        );
        currentLocation = LatLng(pos.latitude, pos.longitude);
        center = currentLocation!;
      } else {
        permissionDenied = true;
      }
    } catch (_) {
      // ignore init errors
    }
    notifyListeners();
  }

  Future<bool> _ensureLocationPermission() async {
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    if (permission == LocationPermission.deniedForever ||
        permission == LocationPermission.denied) {
      return false;
    }
    return permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse;
  }

  Future<void> locateMe() async {
    try {
      final hasPermission = await _ensureLocationPermission();
      if (!hasPermission) {
        permissionDenied = true;
        notifyListeners();
        return;
      }
      final pos = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.best,
        ),
      );
      currentLocation = LatLng(pos.latitude, pos.longitude);
      center = currentLocation!;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    }
  }

  void onMapTap(LatLng point) {
    markers = [...markers, point];
    notifyListeners();
  }

  void onStartChanged(String _) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      searchStart(isDebounced: true);
    });
  }

  Future<void> searchStart({bool isDebounced = false}) async {
    final query = searchController.text.trim();
    if (query.isEmpty) return;
    if (!isDebounced) {
      _setLoading(true);
    }
    try {
      final res = await _repository.searchAddress(query);
      if (res != null) {
        center = LatLng(res.lat, res.lng);

        markers = [center, ...markers];
      } else {
        _uiMessage = 'NO_RESULTS';
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      if (!isDebounced) {
        _setLoading(false);
      }
      notifyListeners();
    }
  }

  Future<void> searchDestination() async {
    final start = searchController.text.trim();
    final dest = destinationController.text.trim();
    if (dest.isEmpty) return;
    _setLoading(true);
    try {
      LatLngPoint? startPoint;
      if (start.isEmpty) {
        if (currentLocation != null) {
          startPoint = LatLngPoint(
            currentLocation!.latitude,
            currentLocation!.longitude,
          );
        }
      } else {
        final startRes = await _repository.searchAddress(start);
        if (startRes != null) {
          startPoint = LatLngPoint(startRes.lat, startRes.lng);
        }
      }

      final destRes = await _repository.searchAddress(dest);
      if (destRes != null) {
        final destPoint = LatLngPoint(destRes.lat, destRes.lng);
        if (startPoint != null) {
          route = await _repository.getRoute(startPoint, destPoint);
          routePolyline = route?.points
              .map((p) => LatLng(p.lat, p.lng))
              .toList();
        }
        center = LatLng(destRes.lat, destRes.lng);
        markers = [center];
      } else {
        _uiMessage = 'NO_RESULTS';
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _setLoading(false);
      notifyListeners();
    }
  }

  void clear() {
    markers = [];
    routePolyline = null;
    route = null;
    notifyListeners();
  }

  Future<bool> reportMyLocation({required String vehicleId}) async {
    try {
      if (_positionRepository == null) return false;
      if (currentLocation == null) {
        await locateMe();
      }
      if (currentLocation == null) return false;
      final ok = await _positionRepository.reportPosition(
        PositionReport(
          vehicleId: vehicleId,
          latitude: currentLocation!.latitude,
          longitude: currentLocation!.longitude,
          recordedAt: DateTime.now(),
          provider: 'device',
        ),
      );
      if (ok) {
        _uiMessage = 'LOCATION_REPORTED';
        notifyListeners();
      }
      return ok;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<void> loadRidePath(String rideId, {int limit = 200}) async {
    try {
      if (_positionRepository == null) return;
      _setLoading(true);
      final points = await _positionRepository.getRidePositions(
        rideId,
        limit: limit,
      );
      routePolyline = points.map((p) => LatLng(p.lat, p.lng)).toList();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _setLoading(false);
      notifyListeners();
    }
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

  void _setLoading(bool v) {
    if (isLoading != v) {
      isLoading = v;
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _debounce?.cancel();
    searchController.dispose();
    destinationController.dispose();
    super.dispose();
  }
}
