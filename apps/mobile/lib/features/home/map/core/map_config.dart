import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:latlong2/latlong.dart';

// Compile-time defines (set via --dart-define). These cannot be looked up dynamically.
const String _tileUrlTemplateDef = String.fromEnvironment('TILE_URL_TEMPLATE');
const String _tileSubdomainsDef = String.fromEnvironment('TILE_SUBDOMAINS');
const String _orsBaseUrlDef = String.fromEnvironment('ORS_BASE_URL');
const String _orsApiKeyDef = String.fromEnvironment('ORS_API_KEY');
const String _orsCountryBoundaryDef = String.fromEnvironment(
  'ORS_COUNTRY_BOUNDARY',
);
const String _mapDefaultCenterDef = String.fromEnvironment(
  'MAP_DEFAULT_CENTER',
);
const String _mapInitialZoomDef = String.fromEnvironment('MAP_INITIAL_ZOOM');

class MapConfig {
  MapConfig._();

  // Central default values
  static const String _defaultTileTemplate =
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  static const String _defaultTileSubdomains = 'a,b,c';
  static const String _defaultOrsBaseUrl = 'https://api.openrouteservice.org';
  static const String _defaultCountryBoundary = '';
  static const String _defaultCenter = '-18.8792,47.5079'; // Antananarivo
  static const String _defaultInitialZoom = '13';

  static bool get _dotenvReady {
    try {
      return dotenv.isInitialized;
    } catch (_) {
      return false;
    }
  }

  static String _get(
    String key, {
    required String defineValue,
    required String fallback,
  }) {
    String? v;
    if (_dotenvReady) {
      try {
        v = dotenv.env[key];
      } catch (_) {
        v = null;
      }
    }
    if (v != null && v.trim().isNotEmpty) return v.trim();
    if (defineValue.trim().isNotEmpty) return defineValue.trim();
    return fallback;
  }

  // Public getters
  static String get tileUrlTemplate => _get(
    'TILE_URL_TEMPLATE',
    defineValue: _tileUrlTemplateDef,
    fallback: _defaultTileTemplate,
  );

  static List<String> get tileSubdomains {
    final s = _get(
      'TILE_SUBDOMAINS',
      defineValue: _tileSubdomainsDef,
      fallback: _defaultTileSubdomains,
    );
    return s
        .split(',')
        .map((e) => e.trim())
        .where((e) => e.isNotEmpty)
        .toList(growable: false);
  }

  static String get orsBaseUrl => _get(
    'ORS_BASE_URL',
    defineValue: _orsBaseUrlDef,
    fallback: _defaultOrsBaseUrl,
  );

  static String get orsApiKey =>
      _get('ORS_API_KEY', defineValue: _orsApiKeyDef, fallback: '');

  static String get orsCountryBoundary => _get(
    'ORS_COUNTRY_BOUNDARY',
    defineValue: _orsCountryBoundaryDef,
    fallback: _defaultCountryBoundary,
  );

  static LatLng get defaultCenter {
    final raw = _get(
      'MAP_DEFAULT_CENTER',
      defineValue: _mapDefaultCenterDef,
      fallback: _defaultCenter,
    );
    try {
      final parts = raw.split(',').map((e) => e.trim()).toList();
      if (parts.length >= 2) {
        final lat = double.parse(parts[0]);
        final lng = double.parse(parts[1]);
        return LatLng(lat, lng);
      }
    } catch (_) {}
    return const LatLng(-18.8792, 47.5079);
  }

  static double get initialZoom {
    final raw = _get(
      'MAP_INITIAL_ZOOM',
      defineValue: _mapInitialZoomDef,
      fallback: _defaultInitialZoom,
    );
    try {
      return double.parse(raw);
    } catch (_) {
      return 13.0;
    }
  }
}
