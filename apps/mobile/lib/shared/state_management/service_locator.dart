import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import '../../features/authentication/data/auth_data_source_interface.dart';
import '../../features/authentication/data/auth_data_source_graphql.dart';
import '../../features/authentication/services/auth_service.dart';
import '../../features/authentication/repositories/user_repository.dart';
import '../../features/authentication/repositories/auth_repository.dart';
import '../../features/authentication/viewmodels/auth_view_model.dart';
import '../../features/onboarding/driver/core/interfaces/driver_service_interface.dart';
import '../../features/onboarding/driver/services/driver_service.dart';
import '../../features/onboarding/driver/services/storage_service.dart';
import '../../features/onboarding/driver/repositories/driver_repository.dart';
import '../../features/onboarding/driver/data/driver_data_source_interface.dart';
import '../../features/onboarding/driver/data/driver_data_source_graphql.dart';
import '../../features/onboarding/driver/data/driver_data_source_local.dart';
import '../../features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import '../../features/onboarding/driver/viewmodels/driver_summary_view_model.dart';
import '../../features/onboarding/user/data/user_data_source_interface.dart';
import '../../features/onboarding/user/data/user_data_source_graphql.dart';
import '../../features/onboarding/user/repositories/user_onboarding_repository.dart';
import '../../features/onboarding/user/core/interfaces/user_service_interface.dart';
import '../../features/onboarding/user/services/user_service.dart';
import '../../features/onboarding/user/viewmodels/user_onboarding_viewmodel.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';

typedef _FactoryFunc<T> = T Function();
typedef _Disposer = void Function(dynamic);

class ServiceLocator {
  static ServiceLocator? _instance;
  static ServiceLocator get instance => _instance ??= ServiceLocator._();

  ServiceLocator._();

  final Map<Type, dynamic> _services = {};

  final Map<Type, _FactoryFunc<dynamic>> _lazyFactories = {};
  final Map<Type, _FactoryFunc<dynamic>> _factories = {};
  final Map<Type, _Disposer> _disposers = {};

  void registerSingleton<T>(T instance, {void Function(T)? dispose}) {
    _ensureNotRegistered<T>();
    _services[T] = instance;
    if (dispose != null) _disposers[T] = (obj) => dispose(obj as T);
  }

  void registerLazySingleton<T>(
    T Function() factory, {
    void Function(T)? dispose,
  }) {
    _ensureNotRegistered<T>();
    _lazyFactories[T] = factory;
    if (dispose != null) _disposers[T] = (obj) => dispose(obj as T);
  }

  void registerFactory<T>(T Function() factory) {
    _ensureNotRegistered<T>();
    _factories[T] = factory;
  }

  T get<T>() {
    if (_services.containsKey(T)) return _services[T] as T;

    final lazy = _lazyFactories[T];
    if (lazy != null) {
      final built = lazy() as T;
      _services[T] = built;
      return built;
    }

    final f = _factories[T];
    if (f != null) {
      return f() as T;
    }

    throw Exception(
      'Service of type $T is not registered. '
      'Tip: check setupDependencies() or use isRegistered<$T>().',
    );
  }

  bool isRegistered<T>() =>
      _services.containsKey(T) ||
      _lazyFactories.containsKey(T) ||
      _factories.containsKey(T);

  void override<T>(T Function() factory, {bool asSingleton = true}) {
    unregister<T>();
    if (asSingleton) {
      registerLazySingleton<T>(factory);
    } else {
      registerFactory<T>(factory);
    }
  }

  void unregister<T>() {
    if (_services.containsKey(T)) {
      final instance = _services.remove(T);
      final disposer = _disposers.remove(T);
      if (disposer != null && instance != null) disposer(instance);
    }
    _lazyFactories.remove(T);
    _factories.remove(T);
  }

  void disposeAll() {
    _services.forEach((type, instance) {
      final disposer = _disposers[type];
      if (disposer != null) disposer(instance);
    });
    reset();
  }

  void reset() {
    _services.clear();
    _lazyFactories.clear();
    _factories.clear();
    _disposers.clear();
  }

  void _ensureNotRegistered<T>() {
    if (isRegistered<T>()) {
      throw Exception('Type $T already registered');
    }
  }

  void setupDependencies() {
 
    registerLazySingleton<SessionService>(() => SessionService());
    try {
      get<SessionService>().initialize();
    } catch (_) {}

    // Register GraphQL only if configured
    if (GraphQLConfig.isConfigured) {
      registerSingleton<GraphQLClientWrapper>(GraphQLClientWrapper.instance);
      final session = get<SessionService>();
      get<GraphQLClientWrapper>().configure(
        accessToken: session.token,
        refreshToken: session.refreshToken,
        onTokenRefresh: (newToken) async {
          try {
            await session.saveToken(newToken);
          } catch (_) {}
        },
        onError: (error) {},
      );
    }

    // Theme controller
    registerLazySingleton<ThemeController>(() => ThemeController());

    // Auth stack (only when GraphQL is configured)
    if (GraphQLConfig.isConfigured) {
      registerLazySingleton<IAuthDataSource>(
        () => AuthDataSourceGraphQL(get<GraphQLClientWrapper>()),
      );

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

      registerLazySingleton<AuthRepository>(
        () => AuthRepository(get<AuthService>()),
      );

      registerFactory<AuthViewModel>(() => AuthViewModel(get<AuthRepository>()));
    }

    // Storage service for local files
    registerLazySingleton<StorageService>(() => StorageService());

    // Driver data source: GraphQL when available, otherwise local
    if (GraphQLConfig.isConfigured) {
      registerLazySingleton<IDriverDataSource>(
        () => DriverDataSourceGraphQL(get<GraphQLClientWrapper>()),
      );
    } else {
      registerLazySingleton<IDriverDataSource>(
        () => DriverDataSourceLocal(),
      );
    }

    registerLazySingleton<DriverRepository>(
      () => DriverRepository(get<IDriverDataSource>()),
    );

    registerLazySingleton<IDriverService>(
      () => DriverService(
        get<DriverRepository>(),
        get<StorageService>(),
        get<SessionService>(),
      ),
    );

    registerFactory<DriverOnboardingCoordinator>(
      () => DriverOnboardingCoordinator(get<IDriverService>()),
    );

    registerFactory<DriverSummaryViewModel>(
      () => DriverSummaryViewModel(get<IDriverService>()),
    );

    // User onboarding stack
    if (GraphQLConfig.isConfigured) {
      registerLazySingleton<IUserDataSource>(
        () => UserDataSourceGraphQL(get<GraphQLClientWrapper>()),
      );
      registerLazySingleton<IUserOnboardingService>(
        () => UserOnboardingService(get<IUserDataSource>()),
      );
    } else {
      registerLazySingleton<IUserOnboardingService>(
        () => UserOnboardingService(),
      );
    }

    registerLazySingleton<UserOnboardingRepository>(
      () => UserOnboardingRepository(service: get<IUserOnboardingService>()),
    );

    registerFactory<UserOnboardingViewModel>(
      () =>
          UserOnboardingViewModel(repository: get<UserOnboardingRepository>()),
    );
  }
}
