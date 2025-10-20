import 'package:graphql_flutter/graphql_flutter.dart';

import 'graphql_config.dart';
import '../mutations.dart' as gql_mutations;

class GraphQLClientWrapper {
  late GraphQLClient _client;
  String? _accessToken;
  String? _refreshToken;
  Function(String)? _onTokenRefresh;
  Function(String)? _onError;

  static GraphQLClientWrapper? _instance;
  static GraphQLClientWrapper get instance {
    _instance ??= GraphQLClientWrapper._internal();
    return _instance!;
  }

  GraphQLClientWrapper._internal() {
    _initializeClient();
  }

  void _initializeClient() {
    final httpLink = HttpLink(GraphQLConfig.endpoint);

    final authLink = AuthLink(
      getToken: () async =>
          _accessToken != null ? 'Bearer $_accessToken' : null,
    );

    final errorLink = Link.function((request, [forward]) {
      return forward!(request)
          .map((response) {
            if (response.errors != null && response.errors!.isNotEmpty) {
              final graphqlError = response.errors!.first;

              if (graphqlError.extensions?['code'] == 'UNAUTHENTICATED' ||
                  (graphqlError.message.contains('token') &&
                      graphqlError.message.contains('expired'))) {
                _handleError('UNAUTHENTICATED');
              } else {
                _handleError('GraphQL error: ${graphqlError.message}');
              }
            }
            return response;
          })
          .handleError((error) {
            _handleError('Network error: $error');
          });
    });

    final link = Link.from([errorLink, authLink, httpLink]);

    _client = GraphQLClient(
      link: link,
      cache: GraphQLCache(store: HiveStore()),
    );
  }

  void configure({
    String? accessToken,
    String? refreshToken,
    Function(String)? onTokenRefresh,
    Function(String)? onError,
  }) {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    _onTokenRefresh = onTokenRefresh;
    _onError = onError;
  }

  void updateTokens({String? accessToken, String? refreshToken}) {
    if (accessToken != null) _accessToken = accessToken;
    if (refreshToken != null) _refreshToken = refreshToken;
  }

  void _handleError(String error) {
    if (_onError != null) {
      _onError!(error);
    }
  }

  Future<Map<String, dynamic>> executeMutation({
    required String document,
    Map<String, dynamic>? variables,
    bool useErrorHandling = true,
  }) async {
    try {
      final options = MutationOptions(
        document: gql(document),
        variables: variables ?? {},
      );

      var result = await _client.mutate(options);

      if (result.hasException && useErrorHandling) {
        if (_isUnauthenticated(result.exception)) {
          final refreshed = await _attemptTokenRefresh();
          if (refreshed) {
            result = await _client.mutate(options);
          }
        }
      }

      if (result.hasException && useErrorHandling) {
        return {
          'success': false,
          'message': _extractErrorMessage(result.exception),
          'errorCode': 'GRAPHQL_ERROR',
        };
      }

      return result.data ??
          {'success': false, 'message': 'No data returned from mutation'};
    } catch (e) {
      return {
        'success': false,
        'message': 'Mutation execution failed: $e',
        'errorCode': 'EXECUTION_ERROR',
      };
    }
  }

  Future<Map<String, dynamic>> executeQuery({
    required String document,
    Map<String, dynamic>? variables,
    FetchPolicy fetchPolicy = FetchPolicy.networkOnly,
    bool useErrorHandling = true,
  }) async {
    try {
      final options = QueryOptions(
        document: gql(document),
        variables: variables ?? {},
        fetchPolicy: fetchPolicy,
        errorPolicy: useErrorHandling ? ErrorPolicy.all : ErrorPolicy.none,
      );

      var result = await _client.query(options);

      if (result.hasException && useErrorHandling) {
        if (_isUnauthenticated(result.exception)) {
          final refreshed = await _attemptTokenRefresh();
          if (refreshed) {
            result = await _client.query(options);
          }
        }
      }

      if (result.hasException && useErrorHandling) {
        return {
          'success': false,
          'message': _extractErrorMessage(result.exception),
          'errorCode': 'GRAPHQL_ERROR',
        };
      }

      return result.data ??
          {'success': false, 'message': 'No data returned from query'};
    } catch (e) {
      return {
        'success': false,
        'message': 'Query execution failed: $e',
        'errorCode': 'EXECUTION_ERROR',
      };
    }
  }

  bool _isUnauthenticated(OperationException? exception) {
    if (exception == null) return false;
    if (exception.graphqlErrors.isNotEmpty) {
      for (final e in exception.graphqlErrors) {
        final code = e.extensions?['code'];
        final msg = e.message.toLowerCase();
        if (code == 'UNAUTHENTICATED' ||
            msg.contains('unauthorized') ||
            (msg.contains('token') && msg.contains('expired'))) {
          return true;
        }
      }
    }
    final linkEx = exception.linkException?.toString().toLowerCase() ?? '';
    if (linkEx.contains('401') || linkEx.contains('unauthorized')) return true;
    return false;
  }

  Future<bool> _attemptTokenRefresh() async {
    if (_refreshToken == null || _refreshToken!.isEmpty) {
      _handleError('Missing refresh token');
      return false;
    }
    try {
      final tempClient = GraphQLClient(
        link: HttpLink(GraphQLConfig.endpoint),
        cache: GraphQLCache(store: HiveStore()),
      );
      final options = MutationOptions(
        document: gql(gql_mutations.refreshTokenMutation),
        variables: {'refreshToken': _refreshToken},
      );
      final result = await tempClient.mutate(options);
      if (result.hasException) {
        _handleError(_extractErrorMessage(result.exception));
        return false;
      }
      final data = result.data;
      if (data == null) return false;
      String? newAccessToken;
      if (data['refreshToken'] is Map) {
        final rt = data['refreshToken'] as Map<String, dynamic>;
        newAccessToken =
            (rt['accessToken'] as String?) ?? (rt['token'] as String?);
      } else if (data['token'] is String) {
        newAccessToken = data['token'] as String;
      }
      if (newAccessToken == null || newAccessToken.isEmpty) return false;
      _accessToken = newAccessToken;
      if (_onTokenRefresh != null) {
        try {
          _onTokenRefresh!(newAccessToken);
        } catch (_) {}
      }
      return true;
    } catch (e) {
      _handleError('Token refresh failed: $e');
      return false;
    }
  }

  String _extractErrorMessage(OperationException? exception) {
    if (exception == null) return 'Unknown error';

    if (exception.graphqlErrors.isNotEmpty) {
      return exception.graphqlErrors.map((e) => e.message).join('; ');
    }

    if (exception.linkException != null) {
      return exception.linkException.toString();
    }

    return 'Unknown GraphQL error';
  }
}
