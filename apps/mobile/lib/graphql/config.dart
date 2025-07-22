import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Initialise le client GraphQL sans token (auth anonyme ou publique)
ValueNotifier<GraphQLClient> initGraphQLClient() {
  final HttpLink httpLink = HttpLink(dotenv.env['GRAPHQL_ENDPOINT']!);

  final AuthLink authLink = AuthLink(getToken: () async => null);

  final Link link = authLink.concat(httpLink);

  return ValueNotifier(
    GraphQLClient(
      link: link,
      cache: GraphQLCache(store: HiveStore()),
    ),
  );
}

GraphQLClient createGraphQLClientWithToken(String? token) {
  final HttpLink httpLink = HttpLink(dotenv.env['GRAPHQL_ENDPOINT']!);

  final AuthLink authLink = AuthLink(
    getToken: () async => token != null ? 'Bearer $token' : null,
  );

  final Link link = authLink.concat(httpLink);

  return GraphQLClient(
    link: link,
    cache: GraphQLCache(store: HiveStore()),
  );
}
