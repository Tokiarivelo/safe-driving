import '../../models/location_models.dart';

abstract class IMapService {
  Future<GeocodeResult?> forwardGeocode(String query);
  Future<RouteGeometry?> route(LatLngPoint start, LatLngPoint end);
}
