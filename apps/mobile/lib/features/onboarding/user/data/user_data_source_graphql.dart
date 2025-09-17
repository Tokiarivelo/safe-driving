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
          variables: {},
        );
        final types = vtResp['vehicleTypes'] as List<dynamic>? ?? const [];
        final names = transports.map(_normalize).toSet();
        final matchedIds = <String>[];
        for (final t in types) {
          if (t is Map) {
            final n = _normalize((t['name'] as String?) ?? '');
            if (names.contains(n)) {
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
    return r.trim();
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
