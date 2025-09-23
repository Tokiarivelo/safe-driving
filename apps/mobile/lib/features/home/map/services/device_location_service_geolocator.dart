import 'package:geolocator/geolocator.dart';
import '../core/interfaces/i_device_location_service.dart';

class DeviceLocationServiceGeolocator implements IDeviceLocationService {
  @override
  Future<DevicePosition> getCurrentPosition() async {
    final p = await Geolocator.getCurrentPosition(locationSettings: const LocationSettings(accuracy: LocationAccuracy.best, distanceFilter: 10));
    return DevicePosition(p.latitude, p.longitude, accuracy: p.accuracy);
    }

  @override
  Stream<DevicePosition> getPositionStream({double distanceFilterMeters = 10}) {
    return Geolocator.getPositionStream(locationSettings: LocationSettings(accuracy: LocationAccuracy.best, distanceFilter: distanceFilterMeters.toInt())).map((p) => DevicePosition(p.latitude, p.longitude, accuracy: p.accuracy));
  }
}
