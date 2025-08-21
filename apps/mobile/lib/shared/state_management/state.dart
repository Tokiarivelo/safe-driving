import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../presentation/auth/viewmodels/auth_view_model.dart';

import '../../presentation/auth/services/user_service.dart';
// ...existing code...

class AppProviders {
  static List<ChangeNotifierProvider> get providers => [
    ChangeNotifierProvider<AuthViewModel>(
      create: (context) {
        final client = Provider.of<GraphQLClient>(context, listen: false);
        final userService = UserService(client);
        return AuthViewModel(userService);
      },
    ),
  ];
}

// accéder au(x) ViewModel(s)
extension AppContext on BuildContext {
  AuthViewModel get authVM => read<AuthViewModel>();
  AuthViewModel get authVMWatch => watch<AuthViewModel>();
}
