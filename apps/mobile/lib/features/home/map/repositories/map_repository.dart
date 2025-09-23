import '../core/interfaces/i_map_repository.dart';
import '../core/interfaces/i_map_service.dart';
import '../core/interfaces/i_driver_service.dart';
import '../core/interfaces/i_position_service.dart';
import '../models/location_models.dart';
import '../models/driver_models.dart';
import '../models/filter_model.dart';
import '../models/position_models.dart';

class MapRepository implements IMapRepository {
  final IMapService _service;
  final IPositionService? _positionService;
  final IDriverService? _driverService;

  MapRepository({
    required IMapService service,
    IPositionService? positionService,
    IDriverService? driverService,
  })  : _service = service,
        _positionService = positionService,
        _driverService = driverService;

  @override
  Future<GeocodeResult?> searchAddress(String query) async {
    final res = await _service.forwardGeocode(query);
    return res;
  }

  @override
  Future<RouteGeometry?> getRoute(LatLngPoint start, LatLngPoint end) async {
    final res = await _service.route(start, end);
    return res;
  }

  @override
  Future<void> updateUserPosition(String userId, double lat, double lng, double accuracy) async {
    if (_positionService == null) return;
    await _positionService.reportPosition(
      PositionReport(
        vehicleId: userId,
        latitude: lat,
        longitude: lng,
        accuracy: accuracy,
        recordedAt: DateTime.now(),
        provider: 'device',
      ),
    );
  }

  Driver _toDomain(DriverDTO d) => Driver(
        id: d.id,
        name: d.name,
        rating: d.rating,
        statusText: d.statusText,
        vehicleModel: d.vehicleModel,
        seats: d.seats,
        phone: d.phone,
        lat: d.lat,
        lng: d.lng,
      );

  @override
  Future<List<Driver>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    FilterModel? filters,
  }) async {
    if (_driverService == null) return const <Driver>[];
    final data = await _driverService.getDriversNearby(
      lat: lat,
      lng: lng,
      radiusKm: radiusKm,
      filters: filters?.toMap(),
    );
    return data.map(_toDomain).toList();
  }

  @override
  Stream<List<Driver>> watchDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    FilterModel? filters,
  }) {
    if (_driverService == null) {
      return const Stream<List<Driver>>.empty();
    }
    return _driverService
        .watchDriversNearby(lat: lat, lng: lng, radiusKm: radiusKm, filters: filters?.toMap())
        .map((list) => list.map(_toDomain).toList());
  }

  @override
  Future<Driver?> getDriver(String driverId) async {
    if (_driverService == null) return null;
    final d = await _driverService.getDriver(driverId);
    if (d == null) return null;
    return _toDomain(d);
  }
}
