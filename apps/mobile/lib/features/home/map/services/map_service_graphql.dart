import 'dart:async';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import '../core/interfaces/i_driver_service.dart';
import '../models/driver_models.dart';
import 'package:safe_driving/api/graph-ql/docs/driver_api.dart';

class MapServiceGraphQL implements IDriverService {
  final GraphQLClientWrapper _client;
  final bool useMockData;

  MapServiceGraphQL(this._client, {this.useMockData = false});

  @override
  Future<List<DriverDTO>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
  }) async {
    // Use the new nearbyDrivers query with mock support
    final res = await _client.executeQuery(
      document: DriverGqlApi.nearbyDrivers,
      variables: {
        'lat': lat,
        'lng': lng,
        'radiusMeters': (radiusKm * 1000).toInt(), // Convert km to meters
        'limit': 50,
        'mock': useMockData,
      },
    );

    final data = res['nearbyDrivers'];
    if (data == null) return const [];

    final list = (data['drivers'] as List?) ?? const [];
    return list.whereType<Map>().map((m) {
      final id = m['id']?.toString() ?? '';
      final name = m['name']?.toString() ?? '';
      final vehicle = m['vehicle']?.toString() ?? 'Unknown';
      final status = m['status']?.toString() ?? 'AVAILABLE';
      final lat = (m['lat'] as num?)?.toDouble() ?? 0;
      final lng = (m['lng'] as num?)?.toDouble() ?? 0;

      // Map the new format to the existing DriverDTO format
      return DriverDTO(
        id: id,
        name: name,
        rating: 4.5, // Default rating for mock drivers
        statusText: status,
        vehicleModel: vehicle,
        seats: 4, // Default seats
        phone: '+1234567890', // Default phone
        lat: lat,
        lng: lng,
      );
    }).toList();
  }

  @override
  Stream<List<DriverDTO>> watchDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
    Duration? interval,
  }) async* {
    final d = interval ?? const Duration(seconds: 5);
    while (true) {
      try {
        final data = await getDriversNearby(
          lat: lat,
          lng: lng,
          radiusKm: radiusKm,
          filters: filters,
        );
        yield data;
      } catch (_) {
        yield const <DriverDTO>[];
      }
      await Future.delayed(d);
    }
  }

  @override
  Future<DriverDTO?> getDriver(String id) async {
    final res = await _client.executeQuery(
      document: DriverGqlApi.driverById,
      variables: {'id': id},
    );
    final m = res['driver'];
    if (m is Map) {
      return DriverDTO(
        id: m['id']?.toString() ?? '',
        name: m['name']?.toString() ?? '',
        rating: (m['rating'] as num?)?.toDouble() ?? 0,
        statusText: m['statusText']?.toString() ?? '',
        vehicleModel: m['vehicleModel']?.toString() ?? '',
        seats: (m['seats'] as num?)?.toInt() ?? 0,
        phone: m['phone']?.toString() ?? '',
        lat: (m['latitude'] as num?)?.toDouble() ?? 0,
        lng: (m['longitude'] as num?)?.toDouble() ?? 0,
      );
    }
    return null;
  }
}
