abstract class IDeviceLocationService {
  Future<DevicePosition> getCurrentPosition();
  Stream<DevicePosition> getPositionStream({double distanceFilterMeters});
}

class DevicePosition {
  final double latitude;
  final double longitude;
  final double? accuracy;
  DevicePosition(this.latitude, this.longitude, {this.accuracy});
}
