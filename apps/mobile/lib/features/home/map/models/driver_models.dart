class DriverDTO {
  final String id;
  final String name;
  final double rating;
  final String statusText;
  final String vehicleModel;
  final int seats;
  final String phone;
  final double lat;
  final double lng;
  const DriverDTO({
    required this.id,
    required this.name,
    required this.rating,
    required this.statusText,
    required this.vehicleModel,
    required this.seats,
    required this.phone,
    required this.lat,
    required this.lng,
  });
}

class Driver {
  final String id;
  final String name;
  final double rating;
  final String statusText;
  final String vehicleModel;
  final int seats;
  final String phone;
  final double lat;
  final double lng;
  const Driver({
    required this.id,
    required this.name,
    required this.rating,
    required this.statusText,
    required this.vehicleModel,
    required this.seats,
    required this.phone,
    required this.lat,
    required this.lng,
  });
}
