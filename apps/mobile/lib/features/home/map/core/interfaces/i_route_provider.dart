import '../../models/location_models.dart';

abstract class IRouteProvider {
  Future<Map<String, dynamic>?> route(LatLngPoint start, LatLngPoint end);
  Future<Map<String, dynamic>?> forwardGeocodeRaw(String query);
  Future<Map<String, dynamic>?> reverseGeocodeRaw(double lat, double lon);
}
