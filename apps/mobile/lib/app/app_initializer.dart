import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/app/routes.dart';

import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';

import 'package:safe_driving/shared/state_management/providers.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/core/theme/app_theme.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';
import 'package:safe_driving/l10n/l10n.dart';

class SafeDriving extends StatelessWidget {
  SafeDriving({super.key}) {
    ServiceLocator.instance.setupDependencies();
  }

  @override
  Widget build(BuildContext context) {
<<<<<<< HEAD
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
=======
    Widget app = MultiProvider(
      providers: AppProviders.providers,
      child: Builder(
        builder: (context) => MaterialApp(
          title: 'Safe Driving',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: context.watch<ThemeController>().mode,
          // Internationalization
          localizationsDelegates: L10n.localizationsDelegates,
          supportedLocales: L10n.supportedLocales,
          locale: context.watch<LocaleProvider>().locale,
          initialRoute: AppRoutes.auth,
          routes: AppRoutes.routes,
>>>>>>> fc4ccdc (feat: operational dark mode on user onboarding)
        ),
      ),
    );

    if (GraphQLConfig.isConfigured) {
      final httpLink = HttpLink(GraphQLConfig.endpoint);
      final client = ValueNotifier(
        GraphQLClient(
          link: httpLink,
          cache: GraphQLCache(store: HiveStore()),
        ),
      );
      app = GraphQLProvider(client: client, child: app);
    }

    return app;
  }
}
