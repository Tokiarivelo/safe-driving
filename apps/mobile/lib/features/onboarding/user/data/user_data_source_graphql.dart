import 'user_data_source_interface.dart';
import '../../../../api/graph-ql/graphql_client.dart';

class UserDataSourceGraphQL implements IUserDataSource {
  final GraphQLClientWrapper _client;

  UserDataSourceGraphQL(this._client);

  @override
  Future<Map<String, dynamic>> savePreferences({
    required String userId,
    required Map<String, dynamic> preferences,
  }) async {
    final _ = _client;
    throw UnimplementedError('savePreferences not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> getOnboardingData(String userId) async {
    throw UnimplementedError('getOnboardingData not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> updateOnboardingData({
    required String userId,
    required dynamic data,
  }) async {
    throw UnimplementedError('updateOnboardingData not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> completeOnboarding(String userId) async {
    throw UnimplementedError('completeOnboarding not implemented yet');
  }
}
