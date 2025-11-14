import '../api/graph-ql/graphql_client.dart';
import '../api/graph-ql/modules/drivers/drivers_queries.dart';
import '../api/graph-ql/types/driver_types.dart';

class DriversService {
  final GraphQLClientWrapper _client = GraphQLClientWrapper.instance;

  /// Fetch nearby drivers around a given coordinate
  ///
  /// [lat] - Center latitude
  /// [lng] - Center longitude
  /// [radiusMeters] - Search radius in meters (default: 1500)
  /// [limit] - Maximum number of drivers to return (default: 50)
  /// [mock] - Whether to return mock data (default: false)
  ///
  /// Returns a [NearbyDriversResult] containing the count and list of drivers
  Future<NearbyDriversResult?> getNearbyDrivers({
    required double lat,
    required double lng,
    int radiusMeters = 1500,
    int limit = 50,
    bool mock = false,
  }) async {
    try {
      final result = await _client.executeQuery(
        document: nearbyDriversQuery,
        variables: {
          'lat': lat,
          'lng': lng,
          'radiusMeters': radiusMeters,
          'limit': limit,
          'mock': mock,
        },
        useErrorHandling: true,
      );

      if (result['success'] == false) {
        print('Error fetching nearby drivers: ${result['message']}');
        return null;
      }

      final nearbyDriversData = result['nearbyDrivers'];
      if (nearbyDriversData == null) {
        print('No nearbyDrivers data in response');
        return null;
      }

      return NearbyDriversResult.fromJson(
        nearbyDriversData as Map<String, dynamic>,
      );
    } catch (e) {
      print('Exception in getNearbyDrivers: $e');
      return null;
    }
  }
}
