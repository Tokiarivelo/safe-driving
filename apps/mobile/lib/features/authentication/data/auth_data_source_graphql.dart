import 'package:safe_driving/features/authentication/models/change_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/reset_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/update_profile_request_model.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import '../../../api/graph-ql/mutations.dart';
import '../../../api/graph-ql/modules/auth/auth_mutations.dart' as auth_mut;
import '../../../api/graph-ql/modules/auth/auth_queries.dart' as auth_q;

import 'auth_data_source_interface.dart';
import '../models/auth_request.dart';

class AuthDataSourceGraphQL implements IAuthDataSource {
  final GraphQLClientWrapper _graphQLClient;

  AuthDataSourceGraphQL(this._graphQLClient);

  @override
  Future<Map<String, dynamic>> signIn(SignInRequest request) async {
    final result = await _graphQLClient.executeMutation(
      document: signInMutation,
      variables: {'data': request.toJson()},
    );
    if (result.containsKey('login')) {
      return result['login'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> signUp(SignUpRequest request) async {
    final result = await _graphQLClient.executeMutation(
      document: signUpMutation,
      variables: {'data': request.toJson()},
    );
    if (result.containsKey('register')) {
      return result['register'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> resetPassword(
    ResetPasswordRequest request,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: auth_mut.forgotPasswordMutation,
      variables: {'email': request.email},
    );
    if (result.containsKey('forgotPassword')) {
      return result['forgotPassword'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> resetPasswordConfirm(
    String sessionToken,
    String newPassword,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: auth_mut.resetPasswordMutation,
      variables: {'sessionToken': sessionToken, 'newPassword': newPassword},
    );
    if (result.containsKey('resetPassword')) {
      return {'success': result['resetPassword'] == true};
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    final result = await _graphQLClient.executeMutation(
      document: refreshTokenMutation,
      variables: {'refreshToken': refreshToken},
    );

    if (result.containsKey('refreshToken')) {
      final data = result['refreshToken'];
      if (data is Map<String, dynamic>) {
        final access =
            (data['accessToken'] as String?) ?? (data['token'] as String?);
        if (access != null && access.isNotEmpty) {
          return {
            'success': true,
            'tokens': {'accessToken': access, 'refreshToken': refreshToken},
          };
        }
      }
    }

    if (result.containsKey('token') && result['token'] is String) {
      return {
        'success': true,
        'tokens': {
          'accessToken': result['token'],
          'refreshToken': refreshToken,
        },
      };
    }

    return {
      'success': false,
      'message': result['message'] ?? 'Unable to refresh token',
      'errorCode': result['errorCode'] ?? 'REFRESH_FAILED',
    };
  }

  @override
  Future<Map<String, dynamic>> signInWithGoogle() async {
    final result = await _graphQLClient.executeMutation(
      document: signInWithGoogleMutation,
      variables: {},
    );

    if (result.containsKey('signInWithGoogle')) {
      return result['signInWithGoogle'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> signInWithFacebook() async {
    final result = await _graphQLClient.executeMutation(
      document: signInWithFacebookMutation,
      variables: {},
    );

    if (result.containsKey('signInWithFacebook')) {
      return result['signInWithFacebook'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> getCurrentUser() async {
    final result = await _graphQLClient.executeQuery(
      document: auth_q.meAuthQuery,
      variables: {},
    );
    return result['me'] ?? {};
  }

  @override
  Future<Map<String, dynamic>> updateProfile(
    UpdateProfileRequest request,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: updateProfileMutation,
      variables: {'data': request.toJson()},
    );
    if (result.containsKey('updateUser')) {
      return result['updateUser'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> changePassword(
    ChangePasswordRequest request,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: changePasswordMutation,
      variables: {'data': request.toJson()},
    );

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
    final result = await _graphQLClient.executeMutation(
      document: deleteAccountMutation,
      variables: {'userId': userId, 'password': password},
    );

    if (result.containsKey('deleteAccount')) {
      return result['deleteAccount'];
    }
    return result;
  }
}
