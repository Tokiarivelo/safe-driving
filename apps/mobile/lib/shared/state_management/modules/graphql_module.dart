import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'dart:developer' as developer;

void registerGraphQLModule(ServiceLocator sl) {
  if (GraphQLConfig.isConfigured) {
    sl.registerSingleton<GraphQLClientWrapper>(GraphQLClientWrapper.instance);

    final session = sl.get<SessionService>();
    final wrapper = sl.get<GraphQLClientWrapper>();

    wrapper.configure(
      accessToken: session.token,
      refreshToken: session.refreshToken,
      onTokenRefresh: (newToken) async {
        try {
          await session.saveToken(newToken);
        } catch (_) {}
      },
      onError: (error) {
        try {
          developer.log('[GraphQL] $error');
        } catch (_) {}
      },
    );

    sl.registerLazySingleton<GraphQLClient>(() => wrapper.client);
  }
}
