import '../../core/interfaces/i_device_location_service.dart';
import '../../services/position_persistence_service.dart';
import '../../repositories/map_repository.dart';
import 'package:latlong2/latlong.dart';

mixin MapLocationMixin {
  late final IDeviceLocationService deviceLocationService;
  late final PositionPersistenceService positionPersistence;
  late final MapRepository repository;
  LatLng? currentLocation;
  LatLng center = const LatLng(-18.8792, 47.5079);
  bool permissionDenied = false;
  String? errorMessage;
  String? Function()? userIdGetter;
  void notifyListeners();

  Future<void> initLocation() async {
    try {
      final p = await deviceLocationService.getCurrentPosition();
      await updatePositionInternal(p.latitude, p.longitude, p.accuracy ?? 0);
      deviceLocationService.getPositionStream(distanceFilterMeters: 10).listen((d) {
        updatePositionInternal(d.latitude, d.longitude, d.accuracy ?? 0);
      });
    } catch (_) {}
  }

  Future<void> locateMe() async {
    try {
      final p = await deviceLocationService.getCurrentPosition();
      await updatePositionInternal(p.latitude, p.longitude, p.accuracy ?? 0);
    } catch (_) {}
  }

  Future<void> updatePositionInternal(double lat, double lng, double accuracy) async {
    currentLocation = LatLng(lat, lng);
    center = currentLocation!;
    try {
      final id = userIdGetter?.call();
      if (id != null && id.isNotEmpty) {
        await repository.updateUserPosition(id, lat, lng, accuracy);
      }
      await positionPersistence.saveLast(lat, lng);
    } catch (_) {}
    notifyListeners();
  }
}
