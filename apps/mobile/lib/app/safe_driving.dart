import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/app/routes.dart';
import 'package:safe_driving/graphql/config.dart';
import 'package:safe_driving/providers/auth_provider.dart';

class SafeDriving extends StatelessWidget {
  SafeDriving({super.key});
  final ValueNotifier<GraphQLClient> client = initGraphQLClient();

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: client,
      child: ChangeNotifierProvider(
        create: (context) {
          final authProvider = AuthProvider();
          authProvider.initialize(client.value);
          return authProvider;
        },
        child: MaterialApp(
          title: 'Safe Driving',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            fontFamily: 'Inder',
          ),
          initialRoute: AppRoutes.auth,
          routes: AppRoutes.routes,
        ),
      ),
    );
  }
}
