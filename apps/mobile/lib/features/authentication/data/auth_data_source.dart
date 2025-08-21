import '../services/service/core/graphql_client_service.dart';
import '../models/auth_requests.dart';

class AuthDataSource {
  final GraphQLClientService _graphQLService;

  AuthDataSource(this._graphQLService);

  Future<Map<String, dynamic>> signIn(SignInRequest request) async {
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'data': request.toJson()},
      key: 'signIn',
    );

    return result;
  }

  Future<Map<String, dynamic>> signUp(SignUpRequest request) async {
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'data': request.toJson()},
      key: 'signUp',
    );

    return result;
  }

  Future<Map<String, dynamic>> resetPassword(
    ResetPasswordRequest request,
  ) async {
    const String mutation = '''
      mutation ResetPassword(\$data: ResetPasswordInput!) {
        resetPassword(data: \$data) {
          success
          message
          errorCode
        }
      }
    ''';

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'data': request.toJson()},
      key: 'resetPassword',
    );

    return result;
  }

  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    const String mutation = '''
      mutation RefreshToken(\$refreshToken: String!) {
        refreshToken(refreshToken: \$refreshToken) {
          success
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'refreshToken': refreshToken},
      key: 'refreshToken',
    );

    return result;
  }

  Future<Map<String, dynamic>> signInWithGoogle() async {
    const String mutation = '''
      mutation SignInWithGoogle {
        signInWithGoogle {
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {},
      key: 'signInWithGoogle',
    );

    return result;
  }

  Future<Map<String, dynamic>> signInWithFacebook() async {
    const String mutation = '''
      mutation SignInWithFacebook {
        signInWithFacebook {
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {},
      key: 'signInWithFacebook',
    );

    return result;
  }

  Future<Map<String, dynamic>> getCurrentUser() async {
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

    final result = await _graphQLService.query(query, variables: {});

    return result['getCurrentUser'] ?? {};
  }

  Future<Map<String, dynamic>> updateProfile(
    UpdateProfileRequest request,
  ) async {
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

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'data': request.toJson()},
      key: 'updateProfile',
    );

    return result;
  }

  Future<Map<String, dynamic>> changePassword(
    ChangePasswordRequest request,
  ) async {
    const String mutation = '''
      mutation ChangePassword(\$data: ChangePasswordInput!) {
        changePassword(data: \$data) {
          success
          message
          errorCode
        }
      }
    ''';

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'data': request.toJson()},
      key: 'changePassword',
    );

    return result;
  }

  Future<Map<String, dynamic>> deleteAccount(
    String userId,
    String password,
  ) async {
    const String mutation = '''
      mutation DeleteAccount(\$userId: String!, \$password: String!) {
        deleteAccount(userId: \$userId, password: \$password) {
          success
          message
          errorCode
        }
      }
    ''';

    final result = await _graphQLService.mutate(
      document: mutation,
      variables: {'userId': userId, 'password': password},
      key: 'deleteAccount',
    );

    return result;
  }
}
