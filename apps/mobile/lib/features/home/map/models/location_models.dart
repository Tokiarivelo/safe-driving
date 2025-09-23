class LatLngPoint {
  final double lat;
  final double lng;
  const LatLngPoint(this.lat, this.lng);
}

class RouteGeometry {
  final List<LatLngPoint> points;
  final double? distanceMeters;
  final double? durationSeconds;
  const RouteGeometry(this.points, {this.distanceMeters, this.durationSeconds});
}

class GeocodeResult {
  final String label;
  final double lat;
  final double lng;
  const GeocodeResult({
    required this.label,
    required this.lat,
    required this.lng,
  });
}
