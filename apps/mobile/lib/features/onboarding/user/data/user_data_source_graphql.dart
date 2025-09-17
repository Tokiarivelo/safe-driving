import 'user_data_source_interface.dart';
import '../../../../api/graph-ql/graphql_client.dart';
import '../../../../api/graph-ql/queries.dart';
import '../../../../api/graph-ql/mutations.dart';
import '../models/user_onboarding_data.dart';
import '../../../../api/graph-ql/queries.dart';
import '../../../../api/graph-ql/mutations.dart';
import '../models/user_onboarding_data.dart';

class UserDataSourceGraphQL implements IUserDataSource {
  final GraphQLClientWrapper _client;

  UserDataSourceGraphQL(this._client);

  @override
  Future<Map<String, dynamic>> savePreferences({
    required String userId,
    required Map<String, dynamic> preferences,
  }) async {
    final input = <String, dynamic>{'userId': userId};
    if (preferences.containsKey('gpsEnabled')) {
      input['activateLocation'] = preferences['gpsEnabled'] == true;
    }
    if (preferences.containsKey('notifEnabled')) {
      input['activateNotifications'] = preferences['notifEnabled'] == true;
    }
    if (preferences.containsKey('selectedTheme')) {
      final theme = preferences['selectedTheme'] as String?;
      if (theme != null) {
        input['theme'] = _toBackendTheme(theme);
      }
    }
    if (preferences.containsKey('selectedLanguage')) {
      final language = preferences['selectedLanguage'] as String?;
      if (language != null && language.isNotEmpty) {
        input['language'] = language;
      }
    }
    if (preferences.containsKey('selectedTransports')) {
      final transports = (preferences['selectedTransports'] as List?)?.cast<String>() ?? const <String>[];
      if (transports.isNotEmpty) {
        final vtResp = await _client.executeQuery(
          document: getVehicleTypesQuery,
          variables: const {},
        );
        final types = vtResp['vehicleTypes'] as List<dynamic>? ?? const [];

        final requested = transports.map(_canonicalTransportName).toSet();
        final matchedIds = <String>[];
        for (final t in types) {
          if (t is Map) {
            final typeName = (t['name'] as String?) ?? '';
            final canonical = _canonicalTransportName(typeName);
            if (requested.contains(canonical)) {
              final id = t['id'] as String?;
              if (id != null && id.isNotEmpty) matchedIds.add(id);
            }
          }
        }
        if (matchedIds.isNotEmpty) {
          input['preferedvelicles'] = matchedIds;
        }
      }
    }
    final response = await _client.executeMutation(
      document: upsertUserPreferenceMutation,
      variables: {'input': input},
    );
    return response['upsertUserPreference'] is Map<String, dynamic>
        ? response['upsertUserPreference'] as Map<String, dynamic>
        : <String, dynamic>{'success': response['success'] ?? false};
  }

  String _normalize(String s) {
    var r = s.toLowerCase();
    r = r.replaceAll('à', 'a').replaceAll('á', 'a').replaceAll('â', 'a').replaceAll('ä', 'a');
    r = r.replaceAll('ç', 'c');
    r = r.replaceAll('è', 'e').replaceAll('é', 'e').replaceAll('ê', 'e').replaceAll('ë', 'e');
    r = r.replaceAll('î', 'i').replaceAll('ï', 'i');
    r = r.replaceAll('ô', 'o').replaceAll('ö', 'o');
    r = r.replaceAll('û', 'u').replaceAll('ü', 'u');
    r = r.replaceAll('-', ' ').replaceAll('_', ' ');
    r = r.replaceAll(RegExp(r'\s+'), ' ');
    return r.trim();
  }

  String _canonicalTransportName(String s) {
    var n = _normalize(s);
    // remove spaces for comparison like "tuk tuk" vs "tuktuk"
    final compact = n.replaceAll(' ', '');
    // Map common localized names and synonyms to canonical keys
    // voiture/car/auto -> voiture
    if (compact == 'car' || compact == 'auto' || compact == 'automobile') return 'voiture';
    if (n == 'voiture') return 'voiture';

    // moto/motorcycle -> moto
    if (compact == 'motorcycle' || compact == 'motorbike') return 'moto';
    if (n == 'moto') return 'moto';

    // vélo/bike/bicycle -> velo
    if (compact == 'bike' || compact == 'bicycle') return 'velo';
    if (n == 'velo' || n == 'vélo') return 'velo';

    // tuk tuk variants -> tuktuk
    if (compact == 'tuktuk' || compact == 'tuk') return 'tuktuk';
    if (n.contains('tuk')) return 'tuktuk';

    // fallback to compact token
    return compact;
  }

  @override
  Future<Map<String, dynamic>> getOnboardingData(String userId) async {
    final response = await _client.executeQuery(
      document: getUserPreferencesQuery,
      variables: {},
    );
    final pref = response['userPreference'] as Map<String, dynamic>?;
    if (pref == null) {
      return <String, dynamic>{
        'gpsEnabled': false,
        'notifEnabled': false,
        'selectedTheme': 'Clair',
        'selectedTransports': <String>[],
        'selectedLanguage': 'fr',
      };
    }
    final transportsRaw = pref['preferedvelicles'];
    final transports = transportsRaw is List
        ? transportsRaw
            .map((e) => e is Map<String, dynamic> ? (e['name'] as String? ?? '') : '')
            .where((s) => s.isNotEmpty)
            .cast<String>()
            .toList()
        : <String>[];
    return <String, dynamic>{
      'gpsEnabled': pref['activateLocation'] == true,
      'notifEnabled': pref['activateNotifications'] == true,
      'selectedTheme': _toAppLabelTheme(pref['theme'] as String?),
      'selectedTransports': transports,
      'selectedLanguage': (pref['language'] as String?) ?? 'fr',
    };
    final response = await _client.executeQuery(
      document: getUserPreferencesQuery,
      variables: {},
    );
    final pref = response['userPreference'] as Map<String, dynamic>?;
    if (pref == null) {
      return <String, dynamic>{
        'gpsEnabled': false,
        'notifEnabled': false,
        'selectedTheme': 'Clair',
        'selectedTransports': <String>[],
        'selectedLanguage': 'fr',
      };
    }
    final transportsRaw = pref['preferedvelicles'];
    final transports = transportsRaw is List
        ? transportsRaw
            .map((e) => e is Map<String, dynamic> ? (e['name'] as String? ?? '') : '')
            .where((s) => s.isNotEmpty)
            .cast<String>()
            .toList()
        : <String>[];
    return <String, dynamic>{
      'gpsEnabled': pref['activateLocation'] == true,
      'notifEnabled': pref['activateNotifications'] == true,
      'selectedTheme': _toAppLabelTheme(pref['theme'] as String?),
      'selectedTransports': transports,
      'selectedLanguage': (pref['language'] as String?) ?? 'fr',
    };
  }

  @override
  Future<Map<String, dynamic>> updateOnboardingData({
    required String userId,
    required UserOnboardingData data,
    required UserOnboardingData data,
  }) async {
    throw UnimplementedError('updateOnboardingData not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> completeOnboarding(String userId) async {
    final input = <String, dynamic>{
      'userId': userId,
      'cguAccepted': true,
      'privacyPolicyAccepted': true,
    };
    final response = await _client.executeMutation(
      document: upsertUserPreferenceMutation,
      variables: {'input': input},
    );
    return response['upsertUserPreference'] is Map<String, dynamic>
        ? response['upsertUserPreference'] as Map<String, dynamic>
        : <String, dynamic>{'success': response['success'] ?? false};
  }

  String _toBackendTheme(String label) {
    final l = label.toLowerCase();
    if (l.contains('sombre') || l.contains('dark')) return 'dark';
    if (l.contains('auto')) return 'system';
    return 'light';
  }

  String _toAppLabelTheme(String? backend) {
    final b = (backend ?? '').toLowerCase();
    if (b == 'dark') return 'Sombre';
    if (b == 'system') return 'Automatique';
    return 'Clair';
    final input = <String, dynamic>{
      'userId': userId,
      'cguAccepted': true,
      'privacyPolicyAccepted': true,
    };
    final response = await _client.executeMutation(
      document: upsertUserPreferenceMutation,
      variables: {'input': input},
    );
    return response['upsertUserPreference'] is Map<String, dynamic>
        ? response['upsertUserPreference'] as Map<String, dynamic>
        : <String, dynamic>{'success': response['success'] ?? false};
  }

  String _toBackendTheme(String label) {
    final l = label.toLowerCase();
    if (l.contains('sombre') || l.contains('dark')) return 'dark';
    if (l.contains('auto')) return 'system';
    return 'light';
  }

  String _toAppLabelTheme(String? backend) {
    final b = (backend ?? '').toLowerCase();
    if (b == 'dark') return 'Sombre';
    if (b == 'system') return 'Automatique';
    return 'Clair';
  }
}
