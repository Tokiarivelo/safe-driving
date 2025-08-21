import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/features/authentication/models/auth_model.dart';
import 'package:safe_driving/features/authentication/models/user/user_model.dart';
import '../../../../../api/graphql/queries.dart';
import '../core/graphql_client_service.dart';

class UserService {
  final GraphQLClientService _graphQLClient;

  UserService(this._graphQLClient);

  Future<User> getUser(String id) async {
    final data = await _graphQLClient.query(
      getUserQuery,
      variables: {'id': id},
    );
    return User.fromJson(data['user']);
  }

  Future<User> getCurrentUser() async {
    final data = await _graphQLClient.query(
      getCurrentUserQuery,
      fetchPolicy: FetchPolicy.networkOnly,
    );
    return User.fromJson(data['me']);
  }

  Future<User> createUser(CreateUserInput input) async {
    final data = await _graphQLClient.mutate(
      document: createUserMutation,
      variables: {'input': input.toJson()},
      key: 'createUser',
    );
    return User.fromJson(data);
  }

  Future<User> updateUser(String id, UpdateUserInput input) async {
    final data = await _graphQLClient.mutate(
      document: updateUserMutation,
      variables: {'id': id, 'input': input.toJson()},
      key: 'updateUser',
    );
    return User.fromJson(data);
  }

  Future<String> deleteUser(String id) async {
    final data = await _graphQLClient.mutate(
      document: deleteUserMutation,
      variables: {'id': id},
      key: 'deleteUser',
    );
    return data['id'];
  }
}
