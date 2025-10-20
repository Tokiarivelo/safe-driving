import '../../models/location_models.dart';

abstract class IPositionStream {
  Stream<LatLngPoint> subscribeCurrentPosition(String vehicleId);
}
