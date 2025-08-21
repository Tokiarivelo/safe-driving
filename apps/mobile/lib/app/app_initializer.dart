import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/app/routes.dart';
import 'package:safe_driving/api/graphql/graphql_client.dart';
import 'package:safe_driving/shared/state_management/providers.dart';

class SafeDriving extends StatelessWidget {
  SafeDriving({super.key});
  final ValueNotifier<GraphQLClient> client = initGraphQLClient();

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: client,
      child: Provider<GraphQLClient>.value(
        value: client.value,
        child: MultiProvider(
          providers: AppProviders.providers,
          child: MaterialApp(
            title: 'Safe Driving',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(fontFamily: 'Inder'),
            initialRoute: AppRoutes.auth,
            routes: AppRoutes.routes,
          ),
        ),
      ),
    );
  }
}
