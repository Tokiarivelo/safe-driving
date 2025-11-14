class Driver {
  final String id;
  final String name;
  final String? vehicle;
  final double lat;
  final double lng;
  final String? status;

  Driver({
    required this.id,
    required this.name,
    this.vehicle,
    required this.lat,
    required this.lng,
    this.status,
  });

  factory Driver.fromJson(Map<String, dynamic> json) {
    return Driver(
      id: json['id'] as String,
      name: json['name'] as String,
      vehicle: json['vehicle'] as String?,
      lat: (json['lat'] as num).toDouble(),
      lng: (json['lng'] as num).toDouble(),
      status: json['status'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'vehicle': vehicle,
      'lat': lat,
      'lng': lng,
      'status': status,
    };
  }
}

class NearbyDriversResult {
  final int count;
  final List<Driver> drivers;

  NearbyDriversResult({
    required this.count,
    required this.drivers,
  });

  factory NearbyDriversResult.fromJson(Map<String, dynamic> json) {
    return NearbyDriversResult(
      count: json['count'] as int,
      drivers: (json['drivers'] as List)
          .map((d) => Driver.fromJson(d as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'count': count,
      'drivers': drivers.map((d) => d.toJson()).toList(),
    };
  }
}
