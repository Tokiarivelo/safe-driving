import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import '../core/interfaces/i_driver_service.dart';
import '../models/driver_models.dart';

class MapServiceSocketIO implements IDriverService {
  final Map<String, DriverDTO> _mem = {};
  final StreamController<List<DriverDTO>> _ctrl = StreamController<List<DriverDTO>>.broadcast();
io.Socket? _socket;
  double _centerLat = 0;
  double _centerLng = 0;
  double _radiusKm = 5;
  bool _hasCenter = false;

  void _connect() {
    if (_socket != null) return;
    final endpoint = GraphQLConfig.endpoint;
    final u = Uri.parse(endpoint);
    final scheme = u.scheme.isEmpty ? 'http' : u.scheme;
    var host = u.host.isEmpty ? 'localhost' : u.host;
    final port = u.hasPort ? u.port : (scheme == 'https' ? 443 : 80);
    if (!kIsWeb && (host == 'localhost' || host == '127.0.0.1')) host = '10.0.2.2';
    final base = Uri(scheme: scheme, host: host, port: port).toString();
_socket = io.io(base, {'transports': ['websocket']});
    _socket!.on('connect', (_) {
      _socket!.emit('drivers:list', {'pattern': 'driver:*'});
    });
    _socket!.on('drivers:list:result', (payload) {
      _mem.clear();
      final items = payload is Map ? payload['items'] as List? : null;
      for (final it in (items ?? const [])) {
        if (it is Map) {
          final key = it['key']?.toString() ?? '';
          final val = it['value'];
          double? lat;
          double? lng;
          if (val is Map) {
            final coords = val['coords'];
            if (coords is List && coords.length >= 2) {
              final a = coords[0];
              final b = coords[1];
              if (a is num && b is num) {
                lat = a.toDouble();
                lng = b.toDouble();
              }
            } else {
              final la = val['lat'];
              final lo = val['lon'];
              if (la is num && lo is num) {
                lat = la.toDouble();
                lng = lo.toDouble();
              }
            }
          }
          if (key.isNotEmpty && lat != null && lng != null) {
            _mem[key] = DriverDTO(
              id: key,
              name: '',
              rating: 0,
              statusText: '',
              vehicleModel: '',
              seats: 0,
              phone: '',
              lat: lat,
              lng: lng,
            );
          }
        }
      }
      _emit();
    });
    _socket!.on('drivers:update', (payload) {
      if (payload is! Map) return;
      final key = payload['key']?.toString() ?? '';
      final value = payload['value'];
      if (key.isEmpty) return;
      if (value is Map) {
        final coords = value['coords'];
        if (coords is List && coords.length >= 2) {
          final a = coords[0];
          final b = coords[1];
          if (a is num && b is num) {
            final lat = a.toDouble();
            final lng = b.toDouble();
            _mem[key] = DriverDTO(
              id: key,
              name: '',
              rating: 0,
              statusText: '',
              vehicleModel: '',
              seats: 0,
              phone: '',
              lat: lat,
              lng: lng,
            );
            _emit();
          }
        }
      }
    });
  }

  void _emit() {
    if (!_ctrl.hasListener) return;
    if (!_hasCenter) {
      _ctrl.add(_mem.values.toList());
      return;
    }
    final r = _radiusKm * 1000.0;
    final out = <DriverDTO>[];
    for (final d in _mem.values) {
      if (_dist(_centerLat, _centerLng, d.lat, d.lng) <= r) out.add(d);
    }
    _ctrl.add(out);
  }

  double _dist(double lat1, double lon1, double lat2, double lon2) {
    const R = 6371000.0;
    final dLat = _deg2rad(lat2 - lat1);
    final dLon = _deg2rad(lon2 - lon1);
    final a = math.sin(dLat / 2) * math.sin(dLat / 2) +
        math.cos(_deg2rad(lat1)) * math.cos(_deg2rad(lat2)) *
            math.sin(dLon / 2) * math.sin(dLon / 2);
    final c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a));
    return R * c;
  }

  double _deg2rad(double deg) => deg * math.pi / 180.0;

  @override
  Future<List<DriverDTO>> getDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
  }) async {
    _centerLat = lat;
    _centerLng = lng;
    _radiusKm = radiusKm;
    _hasCenter = true;
    _connect();
    _emit();
    return _mem.values.toList();
  }

  @override
  Stream<List<DriverDTO>> watchDriversNearby({
    required double lat,
    required double lng,
    required double radiusKm,
    Map<String, dynamic>? filters,
    Duration? interval,
  }) {
    _centerLat = lat;
    _centerLng = lng;
    _radiusKm = radiusKm;
    _hasCenter = true;
    _connect();
    _emit();
    return _ctrl.stream;
  }

  @override
  Future<DriverDTO?> getDriver(String id) async {
    return _mem[id];
  }
}