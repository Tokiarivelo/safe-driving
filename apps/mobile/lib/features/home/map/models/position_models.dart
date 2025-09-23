class PositionReport {
  final String vehicleId;
  final double latitude;
  final double longitude;
  final double? altitude;
  final double? speed;
  final double? heading;
  final double? accuracy;
  final String? provider;
  final int? battery;
  final DateTime? recordedAt;
  final String? clientTempId;
  final String? createdBy;

  const PositionReport({
    required this.vehicleId,
    required this.latitude,
    required this.longitude,
    this.altitude,
    this.speed,
    this.heading,
    this.accuracy,
    this.provider,
    this.battery,
    this.recordedAt,
    this.clientTempId,
    this.createdBy,
  });

  Map<String, dynamic> toJson() => {
        'vehicleId': vehicleId,
        'latitude': latitude,
        'longitude': longitude,
        if (altitude != null) 'altitude': altitude,
        if (speed != null) 'speed': speed,
        if (heading != null) 'heading': heading,
        if (accuracy != null) 'accuracy': accuracy,
        if (provider != null) 'provider': provider,
        if (battery != null) 'battery': battery,
        if (recordedAt != null) 'recordedAt': recordedAt!.toIso8601String(),
        if (clientTempId != null) 'clientTempId': clientTempId,
        if (createdBy != null) 'createdBy': createdBy,
      };
}
