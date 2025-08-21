import 'package:safe_driving/features/authentication/models/user/user_model.dart';

import '../../../../api/graphql/queries.dart';
import '../../services/service/core/graphql_client_service.dart';

class UserRepository {
  final GraphQLClientService _graphQLClient;

  UserRepository(this._graphQLClient);

  Future<List<User>> getUsers({
    int? take,
    int? skip,
    Map<String, dynamic>? where,
  }) async {
    final data = await _graphQLClient.query(
      getUsersQuery,
      variables: {'take': take, 'skip': skip, 'where': where},
    );

    final users = data['users'] as List;
    return users.map((u) => User.fromJson(u)).toList();
  }

  Future<bool> isEmailTaken(String email) async {
    final data = await _graphQLClient.query(
      isEmailTakenQuery,
      variables: {'email': email},
    );
    return data['isEmailTaken'] ?? false;
  }
}
