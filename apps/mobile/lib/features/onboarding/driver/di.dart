import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/features/onboarding/driver/data/driver_data_source_interface.dart';
import 'package:safe_driving/features/onboarding/driver/data/driver_data_source_graphql.dart';
import 'package:safe_driving/features/onboarding/driver/data/driver_data_source_local.dart';
import 'package:safe_driving/features/onboarding/driver/repositories/driver_repository.dart';
import 'package:safe_driving/features/onboarding/driver/services/driver_service.dart';
import 'package:safe_driving/features/onboarding/driver/services/storage_service.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_summary_view_model.dart';
import 'package:safe_driving/features/onboarding/driver/core/interfaces/driver_service_interface.dart';

void registerOnboardingDriverModule(ServiceLocator sl) {
  sl.registerLazySingleton<StorageService>(() => StorageService());
  if (GraphQLConfig.isConfigured) {
    sl.registerLazySingleton<IDriverDataSource>(
      () => DriverDataSourceGraphQL(sl.get<GraphQLClientWrapper>()),
    );
  } else {
    sl.registerLazySingleton<IDriverDataSource>(() => DriverDataSourceLocal());
  }
  sl.registerLazySingleton<DriverRepository>(
    () => DriverRepository(sl.get<IDriverDataSource>()),
  );
  sl.registerLazySingleton<IDriverService>(
    () => DriverService(sl.get<DriverRepository>(), sl.get(), sl.get()),
  );
  sl.registerFactory<DriverOnboardingCoordinator>(
    () => DriverOnboardingCoordinator(sl.get<IDriverService>()),
  );
  sl.registerFactory<DriverSummaryViewModel>(
    () => DriverSummaryViewModel(sl.get<IDriverService>()),
  );
}
