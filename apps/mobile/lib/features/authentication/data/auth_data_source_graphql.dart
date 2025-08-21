import 'auth_data_source_interface.dart';
import '../models/auth_models.dart';
import '../services/service/core/graphql_client_service.dart';
import '../services/service/token_helper.dart';

class AuthDataSourceGraphQL implements AuthDataSource {
  final GraphQLClientService _graphQLClient;

  AuthDataSourceGraphQL(this._graphQLClient);

  @override
  Future<AuthResponse> login(String email, String password) async {
    const String mutation = '''
      mutation SignIn(\$data: SignInInput!) {
        signIn(data: \$data) {
          success
          user {
            id
            email
            firstName
            lastName
            phoneNumber
            roles
            createdAt
            updatedAt
            isEmailVerified
            isActive
          }
          tokens {
            accessToken
            refreshToken
            expiresAt
          }
          message
          errorCode
        }
      }
    ''';

    final result = await _graphQLClient.mutate(
      document: mutation,
      variables: {
        'data': {'email': email, 'password': password},
      },
      key: 'signIn',
    );

    final token = TokenHelper.extractToken(result['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(result['user']));
  }

  @override
  Future<AuthResponse> register(RegisterInput input) async {
    const String mutation = '''
      mutation SignUp(\$data: SignUpInput!) {
        signUp(data: \$data) {
          success
          user {
            id
            email
            firstName
            lastName
            phoneNumber
            roles
            createdAt
            updatedAt
            isEmailVerified
            isActive
          }
          tokens {
            accessToken
            refreshToken
            expiresAt
          }
          message
          errorCode
        }
      }
    ''';

    final result = await _graphQLClient.mutate(
      document: mutation,
      variables: {'data': input.toJson()},
      key: 'signUp',
    );

    final token = TokenHelper.extractToken(result['tokens']);
    if (token == null) throw Exception('No access token received.');

    return AuthResponse(token: token, user: User.fromJson(result['user']));
  }

  @override
  Future<void> resetPassword(String password) async {
    const String mutation = '''
      mutation ResetPassword(\$data: ResetPasswordInput!) {
        resetPassword(data: \$data) {
          success
          message
          errorCode
        }
      }
    ''';

    await _graphQLClient.mutate(
      document: mutation,
      variables: {
        'data': {'password': password},
      },
      key: 'resetPassword',
    );
  }

  @override
  Future<User> getCurrentUser() async {
    const String query = '''
      query GetCurrentUser {
        getCurrentUser {
          id
          email
          firstName
          lastName
          phoneNumber
          roles
          createdAt
          updatedAt
          isEmailVerified
          isActive
        }
      }
    ''';

    final result = await _graphQLClient.query(query, variables: {});
    return User.fromJson(result['getCurrentUser']);
  }

  @override
  Future<User> updateUser(String id, UpdateUserInput input) async {
    const String mutation = '''
      mutation UpdateProfile(\$data: UpdateProfileInput!) {
        updateProfile(data: \$data) {
          id
          email
          firstName
          lastName
          phoneNumber
          roles
          createdAt
          updatedAt
          isEmailVerified
          isActive
        }
      }
    ''';

    final result = await _graphQLClient.mutate(
      document: mutation,
      variables: {'data': input.toJson()},
      key: 'updateProfile',
    );

    return User.fromJson(result['updateProfile']);
  }

  @override
  Future<bool> isEmailTaken(String email) async {
    const String query = '''
      query IsEmailTaken(\$email: String!) {
        isEmailTaken(email: \$email)
      }
    ''';

    final result = await _graphQLClient.query(
      query,
      variables: {'email': email},
    );

    return result['isEmailTaken'] as bool;
  }
}
