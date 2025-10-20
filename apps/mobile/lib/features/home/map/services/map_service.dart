import '../core/interfaces/i_map_data_source.dart';
import '../core/interfaces/i_map_service.dart';
import '../models/location_models.dart';

class MapService implements IMapService {
  final IMapDataSource _dataSource;
  MapService({IMapDataSource? dataSource})
    : _dataSource =
          dataSource ?? (throw ArgumentError('IMapDataSource required'));

  // Simple in-memory caches
  final Map<String, GeocodeResult> _geocodeCache = {};
  final Map<String, Map<String, dynamic>> _routeCache = {};

  String _routeKey(LatLngPoint a, LatLngPoint b) =>
      '${a.lat},${a.lng}|${b.lat},${b.lng}';

  @override
  Future<GeocodeResult?> forwardGeocode(String query) async {
    final key = query.trim().toLowerCase();
    if (_geocodeCache.containsKey(key)) return _geocodeCache[key];
    final res = await _dataSource.forwardGeocode(query);
    if (res != null) _geocodeCache[key] = res;
    return res;
  }

  @override
  Future<RouteGeometry?> route(LatLngPoint start, LatLngPoint end) async {
    final key = _routeKey(start, end);
    Map<String, dynamic>? data = _routeCache[key];
    data ??= await _dataSource.route(start, end);
    if (data == null) return null;
    _routeCache[key] = data;

    List<dynamic> coords = const [];
    double? distanceMeters;
    double? durationSeconds;

    List<LatLngPoint>? decodedPolylinePoints;
    if (data['routes'] is List) {
      final r0 = (data['routes'] as List).isNotEmpty
          ? (data['routes'] as List).first as Map
          : null;
      if (r0 != null) {
        final geomAny = r0['geometry'];
        if (geomAny is Map) {
          final geom = (geomAny).cast<String, dynamic>();
          coords = (geom['coordinates'] as List?) ?? const [];
        } else if (geomAny is String) {
          decodedPolylinePoints = _decodePolyline(
            geomAny,
          ).map((p) => LatLngPoint(p[0], p[1])).toList();
        }
        final summary =
            (r0['summary'] as Map?)?.cast<String, dynamic>() ??
            <String, dynamic>{};
        final d = summary['distance'];
        final t = summary['duration'];
        if (d is num) distanceMeters = d.toDouble();
        if (t is num) durationSeconds = t.toDouble();
      }
    } else if (data['features'] is List) {
      final f0 = (data['features'] as List).isNotEmpty
          ? (data['features'] as List).first as Map
          : null;
      if (f0 != null) {
        final geom =
            (f0['geometry'] as Map?)?.cast<String, dynamic>() ??
            <String, dynamic>{};
        coords = (geom['coordinates'] as List?) ?? const [];
        final props =
            (f0['properties'] as Map?)?.cast<String, dynamic>() ??
            <String, dynamic>{};
        final summary =
            (props['summary'] as Map?)?.cast<String, dynamic>() ??
            <String, dynamic>{};
        final d = summary['distance'];
        final t = summary['duration'];
        if (d is num) distanceMeters = d.toDouble();
        if (t is num) durationSeconds = t.toDouble();
      }
    }

    final points =
        decodedPolylinePoints ??
        coords
            .map(
              (c) => LatLngPoint(
                (c[1] as num).toDouble(),
                (c[0] as num).toDouble(),
              ),
            )
            .toList()
            .cast<LatLngPoint>();

    return RouteGeometry(
      points,
      distanceMeters: distanceMeters,
      durationSeconds: durationSeconds,
    );
  }

  List<List<double>> _decodePolyline(String encoded) {
    List<List<double>> coordinates = [];
    int index = 0;
    int len = encoded.length;
    int lat = 0;
    int lng = 0;

    while (index < len) {
      int b;
      int shift = 0;
      int result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20 && index < len);
      int dlat = ((result & 1) != 0) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20 && index < len);
      int dlng = ((result & 1) != 0) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      coordinates.add([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
  }
}
