import 'dart:async';
import '../../repositories/map_repository.dart';
import '../../models/driver_models.dart';
import 'package:latlong2/latlong.dart';

mixin MapDriversMixin {
  late final MapRepository repository;
  List<Driver> drivers = const [];
  StreamSubscription<List<Driver>>? _driversSub;
  LatLng? currentLocation;
  late double radiusKm;
  void notifyListeners();

  Future<void> startDrivers() async {
    final u = currentLocation;
    if (u == null) return;
    _driversSub?.cancel();
    _driversSub = repository
        .watchDriversNearby(
          lat: u.latitude,
          lng: u.longitude,
          radiusKm: radiusKm,
        )
        .listen((list) {
          drivers = list;
          notifyListeners();
        });
  }

  void stopDrivers() {
    _driversSub?.cancel();
    _driversSub = null;
  }

  Future<Driver?> getDriver(String id) => repository.getDriver(id);
}
