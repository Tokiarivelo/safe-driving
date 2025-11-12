// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';
// import 'package:safe_driving/features/home/message/service/local_reaction_service.dart';
// import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
// import 'package:safe_driving/features/home/message/service/conversation_service.dart';
// import 'package:safe_driving/features/home/message/service/message_service.dart';
// import '../../features/authentication/viewmodels/auth_view_model.dart';
// import '../../features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
// import '../../features/onboarding/user/viewmodels/user_onboarding_viewmodel.dart';
// import 'service_locator.dart';
// import 'package:safe_driving/core/theme/theme_controller.dart';
// import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
// import 'package:safe_driving/l10n/l10n.dart';

// class AppProviders {
//   static List<ChangeNotifierProvider> get providers {
//     final serviceLocator = ServiceLocator.instance;
//     final list = <ChangeNotifierProvider>[];

//     if (GraphQLConfig.isConfigured) {
//       list.add(
//         ChangeNotifierProvider<AuthViewModel>(
//           create: (_) => serviceLocator.get<AuthViewModel>(),
//         ),
//       );
//     }

//     list.add(
//       ChangeNotifierProvider<DriverOnboardingCoordinator>(
//         create: (_) => serviceLocator.get<DriverOnboardingCoordinator>(),
//       ),
//     );

//     list.add(
//       ChangeNotifierProvider<UserOnboardingViewModel>(
//         create: (_) => serviceLocator.get<UserOnboardingViewModel>(),
//       ),
//     );
//     list.add(
//       ChangeNotifierProvider<ThemeController>(
//         create: (_) => serviceLocator.get<ThemeController>(),
//       ),
//     );

//     list.add(
//       ChangeNotifierProvider<LocaleProvider>(create: (_) => LocaleProvider()),
//     );

//     list.add(
//       ChangeNotifierProvider<NavigationViewModel>(
//         create: (_) => NavigationViewModel(),
//       ),
//     );
//     list.add(
//       ChangeNotifierProvider<MessageViewmodels>(
//         create: (_) => MessageViewmodels(
//           conversationService: serviceLocator.get<ConversationService>(),
//           messageService: serviceLocator.get<MessageService>(),
//           reactionService: ServiceLocator.instance.get<LocalReactionService>(),
//         ),
//       ),
//     );

//     return list;
//   }
// }

// extension AppContext on BuildContext {
//   AuthViewModel get authVM => read<AuthViewModel>();
//   AuthViewModel get authVMWatch => watch<AuthViewModel>();
//   DriverOnboardingCoordinator get driverOnboardingVM =>
//       read<DriverOnboardingCoordinator>();
//   DriverOnboardingCoordinator get driverOnboardingVMWatch =>
//       watch<DriverOnboardingCoordinator>();
//   UserOnboardingViewModel get userOnboardingVM =>
//       read<UserOnboardingViewModel>();
//   UserOnboardingViewModel get userOnboardingVMWatch =>
//       watch<UserOnboardingViewModel>();
//   ThemeController get themeController => read<ThemeController>();
//   ThemeController get themeControllerWatch => watch<ThemeController>();
//   NavigationViewModel get navigationVM => read<NavigationViewModel>();
//   NavigationViewModel get navigationVMWatch => watch<NavigationViewModel>();
//   MessageViewmodels get messageVM => read<MessageViewmodels>();
//   MessageViewmodels get messageVMWatch => watch<MessageViewmodels>();
// }

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/home/acceuil/viewmodels/navigation_viewmodel.dart';
import 'package:safe_driving/features/home/message/service/local_reaction_service.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import '../../features/authentication/viewmodels/auth_view_model.dart';
import '../../features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import '../../features/onboarding/user/viewmodels/user_onboarding_viewmodel.dart';
import 'service_locator.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/l10n/l10n.dart';

class AppProviders {
  static List<ChangeNotifierProvider> get providers {
    final serviceLocator = ServiceLocator.instance;
    final list = <ChangeNotifierProvider>[];

    if (GraphQLConfig.isConfigured) {
      list.add(
        ChangeNotifierProvider<AuthViewModel>(
          create: (_) => serviceLocator.get<AuthViewModel>(),
        ),
      );
    }

    list.add(
      ChangeNotifierProvider<DriverOnboardingCoordinator>(
        create: (_) => serviceLocator.get<DriverOnboardingCoordinator>(),
      ),
    );

    list.add(
      ChangeNotifierProvider<UserOnboardingViewModel>(
        create: (_) => serviceLocator.get<UserOnboardingViewModel>(),
      ),
    );
    list.add(
      ChangeNotifierProvider<ThemeController>(
        create: (_) => serviceLocator.get<ThemeController>(),
      ),
    );

    list.add(
      ChangeNotifierProvider<LocaleProvider>(create: (_) => LocaleProvider()),
    );

    list.add(
      ChangeNotifierProvider<NavigationViewModel>(
        create: (_) => NavigationViewModel(),
      ),
    );

    // ⭐⭐ CORRIGEZ CETTE PARTIE ⭐⭐
    list.add(
      ChangeNotifierProvider<MessageViewmodels>(
        create: (_) =>
            serviceLocator.get<MessageViewmodels>(), // ⭐⭐ SIMPLIFIÉ ⭐⭐
      ),
    );

    return list;
  }
}

extension AppContext on BuildContext {
  AuthViewModel get authVM => read<AuthViewModel>();
  AuthViewModel get authVMWatch => watch<AuthViewModel>();
  DriverOnboardingCoordinator get driverOnboardingVM =>
      read<DriverOnboardingCoordinator>();
  DriverOnboardingCoordinator get driverOnboardingVMWatch =>
      watch<DriverOnboardingCoordinator>();
  UserOnboardingViewModel get userOnboardingVM =>
      read<UserOnboardingViewModel>();
  UserOnboardingViewModel get userOnboardingVMWatch =>
      watch<UserOnboardingViewModel>();
  ThemeController get themeController => read<ThemeController>();
  ThemeController get themeControllerWatch => watch<ThemeController>();
  NavigationViewModel get navigationVM => read<NavigationViewModel>();
  NavigationViewModel get navigationVMWatch => watch<NavigationViewModel>();
  MessageViewmodels get messageVM => read<MessageViewmodels>();
  MessageViewmodels get messageVMWatch => watch<MessageViewmodels>();
}
