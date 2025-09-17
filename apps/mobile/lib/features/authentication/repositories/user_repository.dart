import 'package:safe_driving/features/authentication/models/user_model.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import '../models/app_state.dart';
import '../models/user_onboarding_data.dart';

import '../../../api/graph-ql/queries.dart';
import '../../../api/graph-ql/mutations.dart';

class UserRepository {
  final GraphQLClientWrapper _graphQLClient;

  UserRepository(this._graphQLClient);

  Future<List<User>> getUsers({
    int? take,
    int? skip,
    Map<String, dynamic>? where,
  }) async {
    final data = await _graphQLClient.executeQuery(
      document: getUsersQuery,
      variables: {'take': take, 'skip': skip, 'where': where},
    );

    final users = data['users'] as List;
    return users.map((u) => User.fromJson(u)).toList();
  }

  Future<bool> isEmailTaken(String email) async {
    final data = await _graphQLClient.executeQuery(
      document: isEmailTakenQuery,
      variables: {'email': email},
    );
    final users = data['users'];
    if (users is List) {
      return users.isNotEmpty;
    }
    return false;
  }

  Future<AppState> getUserPreferences(String userId) async {
    final data = await _graphQLClient.executeQuery(
      document: getUserPreferencesQuery,
      variables: {'userId': userId},
    );
    return AppState.fromJson(data['userPreferences']);
  }

  Future<UserOnboardingData> getUserOnboardingData(String userId) async {
    final data = await _graphQLClient.executeQuery(
      document: getUserOnboardingDataQuery,
      variables: {'userId': userId},
    );
    return UserOnboardingData.fromJson(data['userOnboardingData']);
  }

  Future<void> saveThemePreference(String theme) async {
    await _graphQLClient.executeMutation(
      document: saveThemePreferenceMutation,
      variables: {'theme': theme},
    );
  }

  Future<void> saveLanguagePreference(String language) async {
    await _graphQLClient.executeMutation(
      document: saveLanguagePreferenceMutation,
      variables: {'language': language},
    );
  }

  Future<void> saveGpsPreference(bool enabled) async {
    await _graphQLClient.executeMutation(
      document: saveGpsPreferenceMutation,
      variables: {'enabled': enabled},
    );
  }

  Future<void> saveNotificationPreference(bool enabled) async {
    await _graphQLClient.executeMutation(
      document: saveNotificationPreferenceMutation,
      variables: {'enabled': enabled},
    );
  }

  Future<void> saveTransportPreferences(List<String> transports) async {
    await _graphQLClient.executeMutation(
      document: saveTransportPreferencesMutation,
      variables: {'transports': transports},
    );
  }

  Future<void> completeOnboarding(AppState appState) async {
    await _graphQLClient.executeMutation(
      document: completeOnboardingMutation,
      variables: {'appState': appState.toJson()},
    );
  }
}
