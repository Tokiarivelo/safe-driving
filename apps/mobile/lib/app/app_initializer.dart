import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/app/routes.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/shared/state_management/providers.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';

class SafeDriving extends StatelessWidget {
  SafeDriving({super.key}) {
    ServiceLocator.instance.setupDependencies();
  }

  @override
  Widget build(BuildContext context) {
    final httpLink = HttpLink(GraphQLConfig.endpoint);
    final client = ValueNotifier(
      GraphQLClient(
        link: httpLink,
        cache: GraphQLCache(store: HiveStore()),
      ),
    );

    return GraphQLProvider(
      client: client,
      child: Provider<GraphQLClientWrapper>.value(
        value: GraphQLClientWrapper.instance,
        child: MultiProvider(
          providers: AppProviders.providers,
          child: MaterialApp(
            title: 'Safe Driving',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(fontFamily: 'Inder'),
            // initialRoute: AppRoutes.onboarding,
            initialRoute: AppRoutes.home,
            routes: AppRoutes.routes,
          ),
        ),
      ),
    );
  }
}
