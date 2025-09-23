import '../../models/location_models.dart';

abstract class IMapDataSource {
  Future<GeocodeResult?> forwardGeocode(String query);
  Future<Map<String, dynamic>?> route(LatLngPoint start, LatLngPoint end);
}
