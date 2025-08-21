import 'package:safe_driving/shared/services/graphql_client_service.dart';

import '../models/auth_request.dart';
import 'auth_data_source_interface.dart';

class AuthDataSource implements IAuthDataSource {
  final GraphQLClientService _graphQLService;

  AuthDataSource(this._graphQLService);

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'data': request.toJson()},
    );

    // Retourner les données de la mutation signIn
    if (result.containsKey('signIn')) {
      return result['signIn'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'data': request.toJson()},
    );

    // Retourner les données de la mutation signUp
    if (result.containsKey('signUp')) {
      return result['signUp'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'data': request.toJson()},
    );

    // Retourner les données de la mutation resetPassword
    if (result.containsKey('resetPassword')) {
      return result['resetPassword'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'refreshToken': refreshToken},
    );

    // Retourner les données de la mutation refreshToken
    if (result.containsKey('refreshToken')) {
      return result['refreshToken'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {},
    );

    // Retourner les données de la mutation signInWithGoogle
    if (result.containsKey('signInWithGoogle')) {
      return result['signInWithGoogle'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {},
    );

    // Retourner les données de la mutation signInWithFacebook
    if (result.containsKey('signInWithFacebook')) {
      return result['signInWithFacebook'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeQuery(
      document: query,
      variables: {},
    );

    return result['getCurrentUser'] ?? {};
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'data': request.toJson()},
    );

    // Retourner les données de la mutation updateProfile
    if (result.containsKey('updateProfile')) {
      return result['updateProfile'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'data': request.toJson()},
    );

    // Retourner les données de la mutation changePassword
    if (result.containsKey('changePassword')) {
      return result['changePassword'];
    }
    return result;
  }

  @override
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

    final result = await _graphQLService.executeMutation(
      document: mutation,
      variables: {'userId': userId, 'password': password},
    );

    // Retourner les données de la mutation deleteAccount
    if (result.containsKey('deleteAccount')) {
      return result['deleteAccount'];
    }
    return result;
  }
}
