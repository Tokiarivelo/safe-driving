import '../core/interfaces/i_position_data_source.dart';
import '../core/interfaces/i_position_service.dart';
import '../models/location_models.dart';
import '../models/position_models.dart';

class PositionService implements IPositionService {
  final IPositionDataSource _ds;
  PositionService(this._ds);

  final Map<String, LatLngPoint> _currentCache = {};

  @override
  Future<LatLngPoint?> getCurrentPosition(String vehicleId) async {
    if (_currentCache.containsKey(vehicleId)) return _currentCache[vehicleId];
    final p = await _ds.getCurrentPosition(vehicleId);
    if (p != null) _currentCache[vehicleId] = p;
    return p;
  }

  @override
  Future<List<LatLngPoint>> getRecentPositions(String vehicleId, {int limit = 100}) {
    return _ds.getRecentPositions(vehicleId, limit: limit);
  }

  @override
  Future<List<LatLngPoint>> getRidePositions(String rideId, {int limit = 100}) {
    return _ds.getRidePositions(rideId, limit: limit);
  }

  @override
  Future<bool> reportPosition(PositionReport report) {
    // no cache, just forward
    return _ds.reportPosition(report);
  }
}
