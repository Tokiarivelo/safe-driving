import 'package:graphql_flutter/graphql_flutter.dart';

import 'graphql_config.dart';

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
                  graphqlError.message.contains('token') &&
                      graphqlError.message.contains('expired')) {
                _handleTokenRefresh();
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

  Future<void> _handleTokenRefresh() async {
    if (_refreshToken == null) {
      _handleError('No refresh token available');
      return;
    }

    try {
      const String refreshMutation = '''
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

      final result = await _client.mutate(
        MutationOptions(
          document: gql(refreshMutation),
          variables: {'refreshToken': _refreshToken},
        ),
      );

      if (result.hasException) {
        _handleError('Failed to refresh token: ${result.exception}');
        return;
      }

      final refreshData = result.data?['refreshToken'];
      if (refreshData?['success'] == true) {
        final tokens = refreshData['tokens'];
        _accessToken = tokens['accessToken'];
        _refreshToken = tokens['refreshToken'];

        if (_onTokenRefresh != null) {
          _onTokenRefresh!(_accessToken!);
        }
      } else {
        _handleError('Token refresh failed: ${refreshData?['message']}');
      }
    } catch (e) {
      _handleError('Token refresh exception: $e');
    }
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

      final result = await _client.mutate(options);

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

      final result = await _client.query(options);

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
