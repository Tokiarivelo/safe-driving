import 'package:graphql_flutter/graphql_flutter.dart';
import '../models/auth/auth_model.dart';
import '../graphql/queries.dart';

class UserService {
  final GraphQLClient _client;

  UserService(this._client);

  // Authentication methods
  Future<AuthResponse> login(String email, String password) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(loginMutation),
        variables: {
          'email': email,
          'password': password,
        },
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return AuthResponse.fromJson(result.data!['login']);
  }

  Future<AuthResponse> register(CreateUserInput input) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(registerMutation),
        variables: {'input': input.toJson()},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return AuthResponse.fromJson(result.data!['register']);
  }

  // User queries
  Future<User> getUser(String id) async {
    final result = await _client.query(
      QueryOptions(
        document: gql(getUserQuery),
        variables: {'id': id},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return User.fromJson(result.data!['user']);
  }

  Future<User> getCurrentUser() async {
    final result = await _client.query(
      QueryOptions(
        document: gql(getCurrentUserQuery),
        fetchPolicy: FetchPolicy.networkOnly,
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return User.fromJson(result.data!['me']);
  }

  Future<List<User>> getUsers({
    int? take,
    int? skip,
    Map<String, dynamic>? where,
  }) async {
    final result = await _client.query(
      QueryOptions(
        document: gql(getUsersQuery),
        variables: {
          'take': take,
          'skip': skip,
          'where': where,
        },
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    final usersData = result.data!['users'] as List;
    return usersData.map((user) => User.fromJson(user)).toList();
  }

  // User mutations
  Future<User> createUser(CreateUserInput input) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(createUserMutation),
        variables: {'input': input.toJson()},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return User.fromJson(result.data!['createUser']);
  }

  Future<User> updateUser(String id, UpdateUserInput input) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(updateUserMutation),
        variables: {
          'id': id,
          'input': input.toJson(),
        },
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return User.fromJson(result.data!['updateUser']);
  }

  Future<String> deleteUser(String id) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(deleteUserMutation),
        variables: {'id': id},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['deleteUser']['id'];
  }

  // Role operations
  Future<List<Role>> getRoles() async {
    final result = await _client.query(
      QueryOptions(
        document: gql(getRolesQuery),
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    final rolesData = result.data!['roles'] as List;
    return rolesData.map((role) => Role.fromJson(role)).toList();
  }

  // Password operations
  Future<Map<String, dynamic>> changePassword(
    String currentPassword,
    String newPassword,
  ) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(changePasswordMutation),
        variables: {
          'currentPassword': currentPassword,
          'newPassword': newPassword,
        },
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['changePassword'];
  }

  Future<Map<String, dynamic>> forgotPassword(String email) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(forgotPasswordMutation),
        variables: {'email': email},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['forgotPassword'];
  }

  Future<Map<String, dynamic>> resetPassword(
    String token,
    String newPassword,
  ) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(resetPasswordMutation),
        variables: {
          'token': token,
          'newPassword': newPassword,
        },
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['resetPassword'];
  }

  // Email verification
  Future<Map<String, dynamic>> verifyEmail(String token) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(verifyEmailMutation),
        variables: {'token': token},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['verifyEmail'];
  }

  Future<Map<String, dynamic>> resendVerification(String email) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(resendVerificationMutation),
        variables: {'email': email},
      ),
    );

    if (result.hasException) {
      throw Exception(result.exception.toString());
    }

    return result.data!['resendVerification'];
  }
}
