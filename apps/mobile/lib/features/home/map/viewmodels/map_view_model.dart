import 'dart:async';
import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/core/constants/constants.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import '../models/models.dart';
import '../models/filter_model.dart';
import '../models/driver_models.dart';
import '../repositories/map_repository.dart';
import '../core/map_config.dart';
import '../core/interfaces/i_map_tile_provider.dart';


class MapViewModel extends ChangeNotifier {
  final MapRepository _repository;
  final IMapTileProvider _tileProvider;
  final SessionService _session;

  final TextEditingController searchController = TextEditingController();
  final TextEditingController destinationController = TextEditingController();

  LatLng center = MapConfig.defaultCenter;
  LatLng? currentLocation;
  List<LatLng> markers = [];
  List<LatLng>? routePolyline;
  RouteGeometry? route;

  List<Driver> drivers = const [];
  FilterModel filters = FilterModel.defaults();

  String get tileUrlTemplate => _tileProvider.tileUrlTemplate;
  List<String> get tileSubdomains => _tileProvider.tileSubdomains;

  bool isLoading = false;
  bool permissionDenied = false;
  String? _uiMessage;
  String? _errorMessage;

  StreamSubscription<Position>? _posSub;
  Timer? _driverTimer;
  Timer? _debounce;

  MapViewModel({
    required MapRepository repository,
    required IMapTileProvider tileProvider,
    required SessionService session,
  })  : _repository = repository,
        _tileProvider = tileProvider,
        _session = session;

  Future<void> init() async {
    filters = await FilterModel.fromPrefs();
    try {
      final ok = await _ensureLocationPermission();
      if (ok) {
        final pos = await Geolocator.getCurrentPosition(
          locationSettings: const LocationSettings(accuracy: LocationAccuracy.best, distanceFilter: 10),
        );
        await updatePosition(pos);
        _posSub?.cancel();
        _posSub = Geolocator.getPositionStream(locationSettings: const LocationSettings(accuracy: LocationAccuracy.best, distanceFilter: 10)).listen((p) {
          updatePosition(p);
        });
      } else {
        permissionDenied = true;
      }
    } catch (e) {
      _errorMessage = e.toString();
    }
    _startDriversPolling();
    notifyListeners();
  }

  Future<bool> _ensureLocationPermission() async {
    var p = await Geolocator.checkPermission();
    if (p == LocationPermission.denied) {
      p = await Geolocator.requestPermission();
    }
    if (p == LocationPermission.deniedForever || p == LocationPermission.denied) return false;
    return p == LocationPermission.always || p == LocationPermission.whileInUse;
  }

  Future<void> updatePosition(Position p) async {
    currentLocation = LatLng(p.latitude, p.longitude);
    center = currentLocation!;
    try {
      final id = _session.userId;
      if (id != null && id.isNotEmpty) {
        await _repository.updateUserPosition(id, p.latitude, p.longitude, p.accuracy);
      }
      final prefs = await SharedPreferences.getInstance();
      await prefs.setDouble(kPrefLastLat, p.latitude);
      await prefs.setDouble(kPrefLastLng, p.longitude);
      await prefs.setString(kPrefLastUpdatedAt, DateTime.now().toIso8601String());
    } catch (e) {
      _errorMessage = e.toString();
    }
    notifyListeners();
  }

  void applyFilters(FilterModel f) async {
    filters = f;
    await FilterModel.toPrefs(f);
    await _fetchDrivers();
    notifyListeners();
  }

  void resetFilters() async {
    filters = FilterModel.defaults();
    await FilterModel.toPrefs(filters);
    await _fetchDrivers();
    notifyListeners();
  }

  void subscribeToDriverUpdates() {
    _startDriversPolling();
  }

  Future<void> _fetchDrivers() async {
    final u = currentLocation;
    if (u == null) return;
    try {
      final list = await _repository.getDriversNearby(lat: u.latitude, lng: u.longitude, radiusKm: filters.radiusKm, filters: filters);
      drivers = list;
    } catch (e) {
      drivers = const [];
      _errorMessage = e.toString();
    }
    notifyListeners();
  }

  void _startDriversPolling() {
    _driverTimer?.cancel();
    _driverTimer = Timer.periodic(const Duration(seconds: 5), (_) {
      _fetchDrivers();
    });
  }

  Future<Driver?> getDriver(String driverId) async {
    try {
      return await _repository.getDriver(driverId);
    } catch (_) {
      return null;
    }
  }

  Future<void> locateMe() async {
    try {
      final ok = await _ensureLocationPermission();
      if (!ok) {
        permissionDenied = true;
        notifyListeners();
        return;
      }
      final pos = await Geolocator.getCurrentPosition(locationSettings: const LocationSettings(accuracy: LocationAccuracy.best, distanceFilter: 10));
      await updatePosition(pos);
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    }
  }

  void clear() {
    markers = [];
    routePolyline = null;
    route = null;
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
      isLoading = true;
      notifyListeners();
    }
    try {
      final res = await _repository.searchAddress(query);
      if (res != null) {
        center = LatLng(res.lat, res.lng);
        markers = [center, ...markers];
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      if (!isDebounced) {
        isLoading = false;
      }
      notifyListeners();
    }
  }

  Future<void> searchDestination() async {
    final start = searchController.text.trim();
    final dest = destinationController.text.trim();
    if (dest.isEmpty) return;
    isLoading = true;
    notifyListeners();
    try {
      LatLngPoint? startPoint;
      if (start.isEmpty) {
        if (currentLocation != null) {
          startPoint = LatLngPoint(currentLocation!.latitude, currentLocation!.longitude);
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
          routePolyline = route?.points.map((p) => LatLng(p.lat, p.lng)).toList();
        }
        center = LatLng(destRes.lat, destRes.lng);
        markers = [center];
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      isLoading = false;
      notifyListeners();
    }
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
    _posSub?.cancel();
    _driverTimer?.cancel();
    searchController.dispose();
    destinationController.dispose();
    super.dispose();
  }
}
