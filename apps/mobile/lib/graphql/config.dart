import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

/// Initialise le client GraphQL sans token (auth anonyme ou publique)
ValueNotifier<GraphQLClient> initGraphQLClient() {
  final HttpLink httpLink = HttpLink('http://localhost:4000/graphql');

  final AuthLink authLink = AuthLink(
    getToken: () async => null, // à implémenter plus tard
  );

  final Link link = authLink.concat(httpLink);

  return ValueNotifier(
    GraphQLClient(
      link: link,
      cache: GraphQLCache(store: HiveStore()),
    ),
  );
}

/// Crée un client GraphQL avec un token (utilisé après login)
GraphQLClient createGraphQLClientWithToken(String? token) {
  final HttpLink httpLink = HttpLink('http://localhost:4000/graphql');

  final AuthLink authLink = AuthLink(
    getToken: () async => token != null ? 'Bearer $token' : null,
  );

  final Link link = authLink.concat(httpLink);

  return GraphQLClient(
    link: link,
    cache: GraphQLCache(store: HiveStore()),
  );
}
