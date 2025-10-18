import '../models/location_models.dart';
import '../core/interfaces/i_map_data_source.dart';
import '../core/interfaces/i_route_provider.dart';

class MapDataSource implements IMapDataSource {
  final IRouteProvider _routeProvider;
  MapDataSource({required IRouteProvider routeProvider})
    : _routeProvider = routeProvider;

  @override
  Future<GeocodeResult?> forwardGeocode(String query) async {
    final data = await _routeProvider.forwardGeocodeRaw(query);
    if (data == null) return null;

    final features = (data['features'] as List?) ?? const [];
    if (features.isEmpty) return null;
    final f = (features.first as Map).cast<String, dynamic>();
    final props =
        (f['properties'] as Map?)?.cast<String, dynamic>() ??
        <String, dynamic>{};
    final geom =
        (f['geometry'] as Map?)?.cast<String, dynamic>() ?? <String, dynamic>{};
    final List<dynamic> c = (geom['coordinates'] as List?) ?? const [];
    if (c.length < 2) return null;
    return GeocodeResult(
      label: (props['label'] as String?) ?? query,
      lat: (c[1] as num).toDouble(),
      lng: (c[0] as num).toDouble(),
    );
  }

  @override
  Future<Map<String, dynamic>?> route(
    LatLngPoint start,
    LatLngPoint end,
  ) async {
    return _routeProvider.route(start, end);
  }
}
