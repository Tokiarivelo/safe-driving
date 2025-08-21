import 'package:graphql_flutter/graphql_flutter.dart';
import '../models/auth_models.dart';
import '../../../api/graphql/queries.dart';

const String resetPasswordMutation = r'''
mutation ResetPassword($password: String!) {
  resetPassword(password: $password) {
    success
  }
}
''';

class UserService {
  final GraphQLClient _client;

  UserService(this._client);

  Future<AuthResponse> login(String email, String password) async {
    final data = await _mutate(
      document: loginMutation,
      variables: {
        'data': {'email': email, 'password': password},
      },
      key: 'login',
    );

    final token = _extractToken(data['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(data['user']));
  }

  Future<AuthResponse> register(RegisterInput input) async {
    final data = await _mutate(
      document: registerMutation,
      variables: {'data': input.toJson()},
      key: 'register',
    );

    final token = _extractToken(data['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(data['user']));
  }

  Future<void> resetPassword(String password) async {
    await _mutate(
      document: resetPasswordMutation,
      variables: {'password': password},
      key: 'resetPassword',
    );
  }

  Future<User> getUser(String id) async {
    final data = await _query(getUserQuery, variables: {'id': id});
    return User.fromJson(data['user']);
  }

  Future<User> getCurrentUser() async {
    final data = await _query(
      getCurrentUserQuery,
      fetchPolicy: FetchPolicy.networkOnly,
    );
    return User.fromJson(data['me']);
  }

  Future<List<User>> getUsers({
    int? take,
    int? skip,
    Map<String, dynamic>? where,
  }) async {
    final data = await _query(
      getUsersQuery,
      variables: {'take': take, 'skip': skip, 'where': where},
    );

    final users = data['users'] as List;
    return users.map((u) => User.fromJson(u)).toList();
  }

  Future<User> createUser(CreateUserInput input) async {
    final data = await _mutate(
      document: createUserMutation,
      variables: {'input': input.toJson()},
      key: 'createUser',
    );
    return User.fromJson(data);
  }

  Future<User> updateUser(String id, UpdateUserInput input) async {
    final data = await _mutate(
      document: updateUserMutation,
      variables: {'id': id, 'input': input.toJson()},
      key: 'updateUser',
    );
    return User.fromJson(data);
  }

  Future<String> deleteUser(String id) async {
    final data = await _mutate(
      document: deleteUserMutation,
      variables: {'id': id},
      key: 'deleteUser',
    );
    return data['id'];
  }

  Future<List<Role>> getRoles() async {
    final data = await _query(getRolesQuery);
    final roles = data['roles'] as List;
    return roles.map((r) => Role.fromJson(r)).toList();
  }

  Future<bool> isEmailTaken(String email) async {
    final data = await _query(isEmailTakenQuery, variables: {'email': email});
    return data['isEmailTaken'] ?? false;
  }

  Future<Map<String, dynamic>> _query(
    String document, {
    Map<String, dynamic>? variables,
    FetchPolicy? fetchPolicy,
  }) async {
    final result = await _client.query(
      QueryOptions(
        document: gql(document),
        variables: variables ?? {},
        fetchPolicy: fetchPolicy,
      ),
    );
    _handleException(result.exception);
    return result.data!;
  }

  Future<dynamic> _mutate({
    required String document,
    Map<String, dynamic>? variables,
    required String key,
  }) async {
    final result = await _client.mutate(
      MutationOptions(document: gql(document), variables: variables ?? {}),
    );
    _handleException(result.exception);
    return result.data![key];
  }

  void _handleException(OperationException? exception) {
    if (exception != null) {
      throw Exception(exception.toString());
    }
  }

  String? _extractToken(dynamic tokensData) {
    if (tokensData is List && tokensData.isNotEmpty) {
      return tokensData.first['token'];
    } else if (tokensData is String) {
      return tokensData;
    }
    return null;
  }
}

class SessionService {
  String? _token;

  String? get token => _token;

  void saveToken(String token) => _token = token;

  void clear() => _token = null;

  bool get isAuthenticated => _token != null;
}
