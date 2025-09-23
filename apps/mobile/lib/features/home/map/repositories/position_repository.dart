import '../core/interfaces/i_position_repository.dart';
import '../core/interfaces/i_position_service.dart';
import '../models/location_models.dart';
import '../models/position_models.dart';

class PositionRepository implements IPositionRepository {
  final IPositionService _service;
  PositionRepository(this._service);

  @override
  Future<LatLngPoint?> getCurrentPosition(String vehicleId) => _service.getCurrentPosition(vehicleId);

  @override
  Future<List<LatLngPoint>> getRecentPositions(String vehicleId, {int limit = 100}) =>
      _service.getRecentPositions(vehicleId, limit: limit);

  @override
  Future<List<LatLngPoint>> getRidePositions(String rideId, {int limit = 100}) =>
      _service.getRidePositions(rideId, limit: limit);

  @override
  Future<bool> reportPosition(PositionReport report) => _service.reportPosition(report);
}
