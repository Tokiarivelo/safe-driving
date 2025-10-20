import '../data/local/position_local_data_source.dart';

class PositionPersistenceService {
  final PositionLocalDataSource _ds;
  PositionPersistenceService(this._ds);
  Future<void> saveLast(double lat, double lng) => _ds.saveLast(lat, lng);
}
