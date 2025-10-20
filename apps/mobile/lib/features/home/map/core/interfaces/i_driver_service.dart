import '../../models/driver_models.dart';

abstract class IDriverService {
  Future<List<DriverDTO>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
  });

  Stream<List<DriverDTO>> watchDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
    Duration? interval,
  });

  Future<DriverDTO?> getDriver(String id);
}
