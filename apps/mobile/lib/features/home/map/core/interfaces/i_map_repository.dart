import '../../models/location_models.dart';
import '../../models/driver_models.dart';
import '../../models/filter_model.dart';

abstract class IMapRepository {
  Future<GeocodeResult?> searchAddress(String query);
  Future<RouteGeometry?> getRoute(LatLngPoint start, LatLngPoint end);

  Future<void> updateUserPosition(
    String userId,
    double lat,
    double lng,
    double accuracy,
  );

  Future<List<Driver>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    FilterModel? filters,
  });

  Stream<List<Driver>> watchDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    FilterModel? filters,
  });

  Future<Driver?> getDriver(String driverId);
}
