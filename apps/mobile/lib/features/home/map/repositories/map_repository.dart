import '../core/interfaces/i_map_repository.dart';
import '../core/interfaces/i_map_service.dart';
import '../models/location_models.dart';

class MapRepository implements IMapRepository {
  final IMapService _service;

  MapRepository({IMapService? service}) : _service = service ?? (throw ArgumentError('IMapService required'));

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
}
