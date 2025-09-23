import 'dart:async';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import '../core/interfaces/i_driver_service.dart';
import '../models/driver_models.dart';
import 'package:safe_driving/api/graph-ql/docs/driver_api.dart';

class MapServiceGraphQL implements IDriverService {
  final GraphQLClientWrapper _client;
  MapServiceGraphQL(this._client);

  @override
  Future<List<DriverDTO>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
  }) async {
    final res = await _client.executeQuery(
      document: DriverGqlApi.driversNearby,
      variables: {
        'lat': lat,
        'lng': lng,
        'radiusKm': radiusKm,
        'filters': filters,
      },
    );
    final list = (res['driversNearby'] as List?) ?? const [];
    return list.whereType<Map>().map((m) {
      final id = m['id']?.toString() ?? '';
      final name = m['name']?.toString() ?? '';
      final rating = (m['rating'] as num?)?.toDouble() ?? 0;
      final statusText = m['statusText']?.toString() ?? '';
      final vehicleModel = m['vehicleModel']?.toString() ?? '';
      final seats = (m['seats'] as num?)?.toInt() ?? 0;
      final phone = m['phone']?.toString() ?? '';
      final lat = (m['latitude'] as num?)?.toDouble() ?? 0;
      final lng = (m['longitude'] as num?)?.toDouble() ?? 0;
      return DriverDTO(
        id: id,
        name: name,
        rating: rating,
        statusText: statusText,
        vehicleModel: vehicleModel,
        seats: seats,
        phone: phone,
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
        final data = await getDriversNearby(lat: lat, lng: lng, radiusKm: radiusKm, filters: filters);
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