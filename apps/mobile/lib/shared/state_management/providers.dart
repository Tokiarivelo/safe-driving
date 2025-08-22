import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../features/authentication/viewmodels/auth_view_model.dart';
import '../../features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'service_locator.dart';

class AppProviders {
  static List<ChangeNotifierProvider> get providers => [
    ChangeNotifierProvider<AuthViewModel>(
      create: (_) => ServiceLocator.instance.get<AuthViewModel>(),
    ),
    ChangeNotifierProvider<DriverOnboardingCoordinator>(
      create: (_) => ServiceLocator.instance.get<DriverOnboardingCoordinator>(),
    ),
  ];
}

extension AppContext on BuildContext {
  AuthViewModel get authVM => read<AuthViewModel>();
  AuthViewModel get authVMWatch => watch<AuthViewModel>();
  DriverOnboardingCoordinator get driverOnboardingVM =>
      read<DriverOnboardingCoordinator>();
  DriverOnboardingCoordinator get driverOnboardingVMWatch =>
      watch<DriverOnboardingCoordinator>();
}
