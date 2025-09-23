import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:safe_driving/features/home/map/models/location_models.dart';
import 'package:safe_driving/features/home/map/core/map_config.dart';

class OrsClient {
  OrsClient({String? baseUrl, String? apiKey});

  String get _base => MapConfig.orsBaseUrl;
  String get _key => MapConfig.orsApiKey;

  Future<Map<String, dynamic>?> forwardGeocode(String text) async {
    final qp = <String, String>{
      'text': text,
      'size': '1',
    };
    final boundary = MapConfig.orsCountryBoundary.trim();
    if (boundary.isNotEmpty) {
      qp['boundary.country'] = boundary;
    }
    if (_key.isNotEmpty) {
      qp['api_key'] = _key;
    }
    final uri = Uri.parse('$_base/geocode/search').replace(queryParameters: qp);
    final res = await http.get(uri);
    if (res.statusCode == 200) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    return null;
  }

  Future<Map<String, dynamic>?> route(LatLngPoint start, LatLngPoint end) async {
    final uri = Uri.parse('$_base/v2/directions/driving-car/geojson');
    final body = jsonEncode({
      'coordinates': [
        [start.lng, start.lat],
        [end.lng, end.lat]
      ]
    });
    final headers = <String, String>{'content-type': 'application/json'};
    final key = _key;
    if (key.isNotEmpty) {
      headers['authorization'] = key;
    }
    final res = await http.post(uri, headers: headers, body: body);
    if (res.statusCode == 200) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    return null;
  }

  Future<Map<String, dynamic>?> reverseGeocode(double lat, double lon) async {
    final qp = <String, String>{
      'point.lat': lat.toString(),
      'point.lon': lon.toString(),
      'size': '1',
    };
    final boundary = MapConfig.orsCountryBoundary.trim();
    if (boundary.isNotEmpty) {
      qp['boundary.country'] = boundary;
    }
    if (_key.isNotEmpty) {
      qp['api_key'] = _key;
    }
    final uri = Uri.parse('$_base/geocode/reverse').replace(queryParameters: qp);
    final res = await http.get(uri);
    if (res.statusCode == 200) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    return null;
  }
}
