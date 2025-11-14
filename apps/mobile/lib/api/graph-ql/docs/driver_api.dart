class DriverGqlApi {
  static const String driversNearby = r'''
    query DriversNearby($lat: Float!, $lng: Float!, $radiusKm: Float!, $filters: DriverFilterInput) {
      driversNearby(lat: $lat, lng: $lng, radiusKm: $radiusKm, filters: $filters) {
        id
        name
        rating
        statusText
        vehicleModel
        seats
        phone
        latitude
        longitude
      }
    }
  ''';

  static const String nearbyDrivers = r'''
    query NearbyDrivers($lat: Float!, $lng: Float!, $radiusMeters: Int, $limit: Int, $mock: Boolean) {
      nearbyDrivers(lat: $lat, lng: $lng, radiusMeters: $radiusMeters, limit: $limit, mock: $mock) {
        count
        drivers {
          id
          name
          vehicle
          lat
          lng
          status
        }
      }
    }
  ''';

  static const String driverById = r'''
    query DriverById($id: String!) {
      driver(id: $id) {
        id
        name
        rating
        statusText
        vehicleModel
        seats
        phone
        latitude
        longitude
      }
    }
  ''';
}
