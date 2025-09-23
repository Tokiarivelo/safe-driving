import 'package:graphql_flutter/graphql_flutter.dart';

String extractGraphQLError(OperationException? exception) {
  if (exception == null) return 'Unknown error';
  if (exception.graphqlErrors.isNotEmpty) {
    return exception.graphqlErrors.map((e) => e.message).join('; ');
  }
  if (exception.linkException != null) {
    return exception.linkException.toString();
  }
  return 'Unknown GraphQL error';
}
