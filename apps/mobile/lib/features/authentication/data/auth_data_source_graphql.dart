import 'package:safe_driving/features/authentication/models/change_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/reset_password_request_model.dart';
import 'package:safe_driving/features/authentication/models/update_profile_request_model.dart';
import 'package:safe_driving/api/graphql/graphql_client.dart';
import '../../../api/graphql/mutations.dart';
import '../../../api/graphql/queries.dart';

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

    if (result.containsKey('signIn')) {
      return result['signIn'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> signUp(SignUpRequest request) async {
    final result = await _graphQLClient.executeMutation(
      document: signUpMutation,
      variables: {'data': request.toJson()},
    );
    if (result.containsKey('signUp')) {
      return result['signUp'];
    }
    return result;
  }

  @override
  Future<Map<String, dynamic>> resetPassword(
    ResetPasswordRequest request,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: resetPasswordAuthMutation,
      variables: {'data': request.toJson()},
    );

    if (result.containsKey('resetPassword')) {
      return result['resetPassword'];
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
      return result['refreshToken'];
    }
    return result;
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
      document: getCurrentUserAuthQuery,
      variables: {},
    );
    return result['getCurrentUser'] ?? {};
  }

  @override
  Future<Map<String, dynamic>> updateProfile(
    UpdateProfileRequest request,
  ) async {
    final result = await _graphQLClient.executeMutation(
      document: updateProfileMutation,
      variables: {'data': request.toJson()},
    );

    if (result.containsKey('updateProfile')) {
      return result['updateProfile'];
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
