import '../../models/location_models.dart';
import '../../models/position_models.dart';

abstract class IPositionService {
  Future<bool> reportPosition(PositionReport report);
  Future<LatLngPoint?> getCurrentPosition(String vehicleId);
  Future<List<LatLngPoint>> getRecentPositions(
    String vehicleId, {
    int limit = 100,
  });
  Future<List<LatLngPoint>> getRidePositions(String rideId, {int limit = 100});
}
