import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/presentation/auth/view_models/auth_view_models.dart';

import '../../services/user_service.dart';

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
