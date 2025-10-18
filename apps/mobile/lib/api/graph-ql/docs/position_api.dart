class PositionGqlApi {
  static const String reportPosition = r'''
    mutation ReportPosition($input: PositionReportInput!) {
      reportPosition(input: $input) {
        vehicleId
        latitude
        longitude
        altitude
        speed
        heading
        accuracy
        provider
        battery
        recordedAt
        updatedAt
      }
    }
  ''';

  static const String currentPosition = r'''
    query CurrentPosition($vehicleId: String!) {
      currentPosition(vehicleId: $vehicleId) {
        vehicleId
        latitude
        longitude
        recordedAt
        updatedAt
      }
    }
  ''';

  static const String recentPositions = r'''
    query RecentPositions($vehicleId: String!, $limit: Float) {
      recentPositions(vehicleId: $vehicleId, limit: $limit) {
        id
        vehicleId
        latitude
        longitude
        recordedAt
      }
    }
  ''';

  static const String recentRidePositions = r'''
    query RecentRidePositions($rideId: String!, $limit: Float) {
      recentRidePositions(rideId: $rideId, limit: $limit) {
        id
        vehicleId
        latitude
        longitude
        recordedAt
      }
    }
  ''';
}
