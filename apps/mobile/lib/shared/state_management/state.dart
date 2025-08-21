import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../presentation/auth/viewmodels/auth_view_model.dart';

import '../../presentation/auth/services/services.dart';

class AppProviders {
  static List<ChangeNotifierProvider> get providers => [
    ChangeNotifierProvider<AuthViewModel>(
      create: (context) {
        final client = Provider.of<GraphQLClient>(context, listen: false);
        final graphQLClientService = GraphQLClientService(client);
        final authService = AuthService(graphQLClientService);
        final userService = UserService(graphQLClientService);
        final userRepository = UserRepository(graphQLClientService);
        final sessionService = SessionService();
        return AuthViewModel(
          authService,
          userService,
          userRepository,
          sessionService,
        );
      },
    ),
  ];
}

extension AppContext on BuildContext {
  AuthViewModel get authVM => read<AuthViewModel>();
  AuthViewModel get authVMWatch => watch<AuthViewModel>();
}
