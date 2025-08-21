import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/api/graphql/graphql_client.dart';
import '../../features/authentication/data/auth_data_source_interface.dart';
import '../../features/authentication/data/auth_data_source_graphql.dart';
import '../../features/authentication/services/auth_service.dart';
import '../../features/authentication/repositories/user_repository.dart';
import '../../features/authentication/viewmodels/auth_view_model.dart';
import '../../features/onboarding/driver/core/interfaces/driver_service_interface.dart';
import '../../features/onboarding/driver/services/driver_service.dart';
import '../../features/onboarding/driver/services/storage_service.dart';
import '../../features/onboarding/driver/repositories/driver_repository.dart';
import '../../features/onboarding/driver/data/driver_data_source_interface.dart';
import '../../features/onboarding/driver/data/driver_data_source_graphql.dart';
import '../../features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import '../../features/onboarding/driver/viewmodels/driver_summary_view_model.dart';

class ServiceLocator {
  static ServiceLocator? _instance;
  static ServiceLocator get instance => _instance ??= ServiceLocator._();

  ServiceLocator._();

  final Map<Type, dynamic> _services = {};
  final Map<Type, dynamic Function()> _factories = {};

  void registerLazySingleton<T>(T Function() factory) {
    _factories[T] = factory;
  }

  void registerSingleton<T>(T instance) {
    _services[T] = instance;
  }

  T get<T>() {
    if (_services.containsKey(T)) {
      return _services[T] as T;
    }

    if (_factories.containsKey(T)) {
      final service = _factories[T]!() as T;
      _services[T] = service;
      return service;
    }

    throw Exception('Service of type $T is not registered');
  }

  void setupDependencies() {
    registerSingleton<GraphQLClientWrapper>(GraphQLClientWrapper.instance);

    get<GraphQLClientWrapper>().configure(
      onTokenRefresh: (newToken) {},
      onError: (error) {},
    );

    registerLazySingleton<IAuthDataSource>(
      () => AuthDataSourceGraphQL(get<GraphQLClientWrapper>()),
    );

    registerLazySingleton<SessionService>(() => SessionService());

    registerLazySingleton<UserRepository>(
      () => UserRepository(get<GraphQLClientWrapper>()),
    );

    registerLazySingleton<AuthService>(
      () => AuthService(
        get<IAuthDataSource>(),
        get<SessionService>(),
        get<UserRepository>(),
      ),
    );

    registerLazySingleton<AuthViewModel>(
      () => AuthViewModel(get<AuthService>()),
    );

    registerLazySingleton<DriverOnboardingViewModel>(
      () => DriverOnboardingViewModel(get<IDriverService>()),
    );

    // Driver Onboarding Clean Architecture Dependencies
    registerLazySingleton<StorageService>(() => StorageService());

    registerLazySingleton<IDriverDataSource>(
      () => DriverDataSourceGraphQL(get<GraphQLClientWrapper>()),
    );

    registerLazySingleton<DriverRepository>(
      () => DriverRepository(get<IDriverDataSource>()),
    );

    registerLazySingleton<IDriverService>(
      () => DriverService(get<DriverRepository>(), get<StorageService>()),
    );


    registerLazySingleton<DriverSummaryViewModel>(
      () => DriverSummaryViewModel(get<IDriverService>()),
    );
  }

  void reset() {
    _services.clear();
    _factories.clear();
  }
}
