import 'dart:convert';
import 'package:http/http.dart' as http;

class OrsClient {
  OrsClient({required String baseUrl, String? apiKey, String? countryBoundary})
      : _base = baseUrl,
        _key = apiKey ?? '',
        _countryBoundary = countryBoundary;

  final String _base;
  final String _key;
  final String? _countryBoundary;

  Future<Map<String, dynamic>?> forwardGeocode(String text, {String? countryBoundary}) async {
    final qp = <String, String>{
      'text': text,
      'size': '1',
    };
    final boundary = (countryBoundary ?? _countryBoundary ?? '').trim();
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

  Future<Map<String, dynamic>?> route(double startLat, double startLng, double endLat, double endLng) async {
    final uri = Uri.parse('$_base/v2/directions/driving-car/geojson');
    final body = jsonEncode({
      'coordinates': [
        [startLng, startLat],
        [endLng, endLat]
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

  Future<Map<String, dynamic>?> reverseGeocode(double lat, double lon, {String? countryBoundary}) async {
    final qp = <String, String>{
      'point.lat': lat.toString(),
      'point.lon': lon.toString(),
      'size': '1',
    };
    final boundary = (countryBoundary ?? _countryBoundary ?? '').trim();
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
