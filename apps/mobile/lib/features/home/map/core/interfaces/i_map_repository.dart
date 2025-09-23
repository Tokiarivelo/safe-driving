import '../../models/location_models.dart';

abstract class IMapRepository {
  Future<GeocodeResult?> searchAddress(String query);
  Future<RouteGeometry?> getRoute(LatLngPoint start, LatLngPoint end);
}
