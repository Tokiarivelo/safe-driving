import 'package:safe_driving/presentation/authentification/models/auth_model.dart';
import 'package:safe_driving/presentation/authentification/models/user_model.dart';
import 'package:safe_driving/presentation/authentification/services/service/core/graphql_client_service.dart';

import '../../../../../api/graphql/queries.dart';

import 'token_helper.dart';

class AuthService {
  final GraphQLClientService _graphQLClient;

  AuthService(this._graphQLClient);

  Future<AuthResponse> login(String email, String password) async {
    final data = await _graphQLClient.mutate(
      document: loginMutation,
      variables: {
        'data': {'email': email, 'password': password},
      },
      key: 'login',
    );

    final token = TokenHelper.extractToken(data['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(data['user']));
  }

  Future<AuthResponse> register(RegisterInput input) async {
    final data = await _graphQLClient.mutate(
      document: registerMutation,
      variables: {'data': input.toJson()},
      key: 'register',
    );

    final token = TokenHelper.extractToken(data['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(data['user']));
  }

  Future<void> resetPassword(String password) async {
    await _graphQLClient.mutate(
      document: resetPasswordMutation,
      variables: {'password': password},
      key: 'resetPassword',
    );
  }
}
