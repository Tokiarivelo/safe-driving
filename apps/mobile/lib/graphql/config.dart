import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

ValueNotifier<GraphQLClient> initGraphQLClient() {
  final HttpLink httpLink = HttpLink('http://localhost:4000/graphql');

  final AuthLink authLink = AuthLink(
    getToken: () async {
      // TODO: Implement token retrieval from secure storage
      // For now, return null - will be updated when implementing secure storage
      return null;
    },
  );

  final Link link = authLink.concat(httpLink);

  return ValueNotifier(
    GraphQLClient(
      cache: GraphQLCache(store: HiveStore()),
      link: link,
    ),
  );
}

// Helper function to create GraphQL client with token
GraphQLClient createGraphQLClientWithToken(String? token) {
  final HttpLink httpLink = HttpLink('http://localhost:4000/graphql');

  final AuthLink authLink = AuthLink(
    getToken: () async => token != null ? 'Bearer $token' : null,
  );

  final Link link = authLink.concat(httpLink);

  return GraphQLClient(
    cache: GraphQLCache(store: HiveStore()),
    link: link,
  );
}
