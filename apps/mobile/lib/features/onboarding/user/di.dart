import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/features/onboarding/user/data/user_data_source_interface.dart';
import 'package:safe_driving/features/onboarding/user/data/user_data_source_graphql.dart';
import 'package:safe_driving/features/onboarding/user/repositories/user_onboarding_repository.dart';
import 'package:safe_driving/features/onboarding/user/core/interfaces/user_service_interface.dart';
import 'package:safe_driving/features/onboarding/user/services/user_service.dart';
import 'package:safe_driving/features/onboarding/user/viewmodels/user_onboarding_viewmodel.dart';

void registerOnboardingUserModule(ServiceLocator sl) {
  if (GraphQLConfig.isConfigured) {
    sl.registerLazySingleton<IUserDataSource>(() => UserDataSourceGraphQL(sl.get<GraphQLClientWrapper>()));
    sl.registerLazySingleton<IUserOnboardingService>(() => UserOnboardingService(sl.get<IUserDataSource>()));
  } else {
    sl.registerLazySingleton<IUserOnboardingService>(() => UserOnboardingService());
  }
  sl.registerLazySingleton<UserOnboardingRepository>(() => UserOnboardingRepository(service: sl.get<IUserOnboardingService>()));
  sl.registerFactory<UserOnboardingViewModel>(() => UserOnboardingViewModel(repository: sl.get<UserOnboardingRepository>()));
}
