import 'dart:async';
import '../core/interfaces/i_position_stream.dart';
import '../models/location_models.dart';

class NoopPositionStream implements IPositionStream {
  @override
  Stream<LatLngPoint> subscribeCurrentPosition(String vehicleId) =>
      const Stream.empty();
}
