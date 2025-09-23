import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import '../core/interfaces/i_position_data_source.dart';
import '../models/location_models.dart';
import '../models/position_models.dart';
import 'package:safe_driving/api/graph-ql/docs/position_api.dart';

class PositionDataSourceGraphQL implements IPositionDataSource {
  final GraphQLClientWrapper _client;
  PositionDataSourceGraphQL(this._client);

  @override
  Future<bool> reportPosition(PositionReport report) async {
    final res = await _client.executeMutation(
      document: PositionGqlApi.reportPosition,
      variables: {'input': report.toJson()},
    );
    return res['reportPosition'] != null;
  }

  @override
  Future<LatLngPoint?> getCurrentPosition(String vehicleId) async {
    final res = await _client.executeQuery(
      document: PositionGqlApi.currentPosition,
      variables: {'vehicleId': vehicleId},
    );
    final data = res['currentPosition'];
    if (data is Map) {
      final lat = (data['latitude'] as num?)?.toDouble();
      final lng = (data['longitude'] as num?)?.toDouble();
      if (lat != null && lng != null) return LatLngPoint(lat, lng);
    }
    return null;
  }

  @override
  Future<List<LatLngPoint>> getRecentPositions(
    String vehicleId, {
    int limit = 100,
  }) async {
    final res = await _client.executeQuery(
      document: PositionGqlApi.recentPositions,
      variables: {'vehicleId': vehicleId, 'limit': limit.toDouble()},
    );
    final list = (res['recentPositions'] as List?) ?? const [];
    return list
        .whereType<Map>()
        .map(
          (m) => LatLngPoint(
            (m['latitude'] as num).toDouble(),
            (m['longitude'] as num).toDouble(),
          ),
        )
        .toList();
  }

  @override
  Future<List<LatLngPoint>> getRidePositions(
    String rideId, {
    int limit = 100,
  }) async {
    final res = await _client.executeQuery(
      document: PositionGqlApi.recentRidePositions,
      variables: {'rideId': rideId, 'limit': limit.toDouble()},
    );
    final list = (res['recentRidePositions'] as List?) ?? const [];
    return list
        .whereType<Map>()
        .map(
          (m) => LatLngPoint(
            (m['latitude'] as num).toDouble(),
            (m['longitude'] as num).toDouble(),
          ),
        )
        .toList();
  }
}
