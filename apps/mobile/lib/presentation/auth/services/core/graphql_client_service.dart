import 'package:graphql_flutter/graphql_flutter.dart';
import 'error_handler.dart';

class GraphQLClientService {
  final GraphQLClient _client;
  final CustomErrorHandler _errorHandler;

  GraphQLClientService(this._client) : _errorHandler = CustomErrorHandler();

  Future<Map<String, dynamic>> query(
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
    _errorHandler.handleException(result.exception);
    return result.data!;
  }

  Future<dynamic> mutate({
    required String document,
    Map<String, dynamic>? variables,
    required String key,
  }) async {
    final result = await _client.mutate(
      MutationOptions(document: gql(document), variables: variables ?? {}),
    );
    _errorHandler.handleException(result.exception);
    return result.data![key];
  }
}
