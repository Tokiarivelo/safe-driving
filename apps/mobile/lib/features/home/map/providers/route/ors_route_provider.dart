import 'package:safe_driving/api/ors/ors_client.dart';
import '../../core/interfaces/i_route_provider.dart';
import '../../models/location_models.dart';
import '../../core/map_config.dart';

class OrsRouteProvider implements IRouteProvider {
  final OrsClient _client;
  OrsRouteProvider({OrsClient? client})
      : _client =
            client ?? OrsClient(baseUrl: MapConfig.orsBaseUrl, apiKey: MapConfig.orsApiKey, countryBoundary: MapConfig.orsCountryBoundary);

  @override
  Future<Map<String, dynamic>?> forwardGeocodeRaw(String query) => _client.forwardGeocode(query);

  @override
  Future<Map<String, dynamic>?> reverseGeocodeRaw(double lat, double lon) => _client.reverseGeocode(lat, lon);

  @override
  Future<Map<String, dynamic>?> route(LatLngPoint start, LatLngPoint end) =>
      _client.route(start.lat, start.lng, end.lat, end.lng);
}
