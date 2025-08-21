import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/presentation/authentification/services/service/auth_service.dart';
import 'package:safe_driving/presentation/authentification/services/service/core/graphql_client_service.dart';
import 'package:safe_driving/presentation/authentification/services/service/session_service.dart';
import 'package:safe_driving/presentation/authentification/services/service/user/user_repository.dart';
import 'package:safe_driving/presentation/authentification/services/service/user/user_service.dart';
import '../../presentation/authentification/viewmodels/auth_view_model.dart';
import '../../presentation/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';

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
    ChangeNotifierProvider<DriverOnboardingViewModel>(
      create: (context) => DriverOnboardingViewModel(),
    ),
  ];
}

extension AppContext on BuildContext {
  AuthViewModel get authVM => read<AuthViewModel>();
  AuthViewModel get authVMWatch => watch<AuthViewModel>();
  DriverOnboardingViewModel get driverOnboardingVM => read<DriverOnboardingViewModel>();
  DriverOnboardingViewModel get driverOnboardingVMWatch => watch<DriverOnboardingViewModel>();
}
