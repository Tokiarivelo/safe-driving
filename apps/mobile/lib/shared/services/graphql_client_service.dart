import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLClientService {
  final GraphQLClient _client;

  GraphQLClientService(this._client);

  Future<Map<String, dynamic>> executeMutation({
    required String document,
    Map<String, dynamic>? variables,
  }) async {
    final options = MutationOptions(
      document: gql(document),
      variables: variables ?? {},
    );

    final result = await _client.mutate(options);

    if (result.hasException) {
      return {
        'success': false,
        'message': result.exception?.toString() ?? 'Erreur GraphQL inconnue',
        'errorCode': 'GRAPHQL_ERROR',
      };
    }

    return result.data ??
        {'success': false, 'message': 'Aucune donnée retournée'};
  }

  Future<Map<String, dynamic>> executeQuery({
    required String document,
    Map<String, dynamic>? variables,
    FetchPolicy fetchPolicy = FetchPolicy.networkOnly,
  }) async {
    final options = QueryOptions(
      document: gql(document),
      variables: variables ?? {},
      fetchPolicy: fetchPolicy,
    );

    final result = await _client.query(options);

    if (result.hasException) {
      return {
        'success': false,
        'message': result.exception?.toString() ?? 'Erreur GraphQL inconnue',
        'errorCode': 'GRAPHQL_ERROR',
      };
    }

    return result.data ??
        {'success': false, 'message': 'Aucune donnée retournée'};
  }

  Future<QueryResult> mutate(MutationOptions options) async {
    return await _client.mutate(options);
  }

  Future<QueryResult> query(QueryOptions options) async {
    return await _client.query(options);
  }

  void writeQuery(Request request, Map<String, dynamic> data) {
    _client.cache.writeQuery(request, data: data);
  }

  Map<String, dynamic>? readQuery(Request request) {
    try {
      return _client.cache.readQuery(request);
    } catch (e) {
      return null;
    }
  }

  void clearCache() {
    _client.cache.store.reset();
  }

  GraphQLClient get client => _client;
}
