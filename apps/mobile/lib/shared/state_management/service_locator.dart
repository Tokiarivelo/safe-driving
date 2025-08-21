import 'package:graphql_flutter/graphql_flutter.dart';
import '../../features/authentication/data/auth_data_source_interface.dart';
import '../../features/authentication/data/auth_data_source_graphql.dart';
import '../../features/authentication/services/service/auth_service.dart';
import '../../features/authentication/services/service/core/graphql_client_service.dart';
import '../../features/authentication/services/service/session_service.dart';
import '../../features/authentication/services/service/user/user_service.dart';
import '../../features/authentication/repository/user/user_repository.dart';
import '../../features/authentication/services/auth_operations_service.dart';
import '../../features/authentication/services/user_operations_service.dart';
import '../../features/authentication/viewmodels/auth_view_model.dart';
import '../../features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';

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

  void setupDependencies(GraphQLClient graphQLClient) {
    registerSingleton<GraphQLClient>(graphQLClient);
    
    registerLazySingleton<GraphQLClientService>(
      () => GraphQLClientService(get<GraphQLClient>()),
    );
    
    registerLazySingleton<AuthDataSource>(
      () => AuthDataSourceGraphQL(get<GraphQLClientService>()),
    );
    
    registerLazySingleton<AuthService>(
      () => AuthService(get<AuthDataSource>()),
    );
    
    registerLazySingleton<SessionService>(
      () => SessionService(),
    );
    
    registerLazySingleton<UserService>(
      () => UserService(get<GraphQLClientService>()),
    );
    
    registerLazySingleton<UserRepository>(
      () => UserRepository(get<GraphQLClientService>()),
    );
    
    registerLazySingleton<AuthOperationsService>(
      () => AuthOperationsService(
        get<AuthService>(),
        get<SessionService>(),
      ),
    );
    
    registerLazySingleton<UserOperationsService>(
      () => UserOperationsService(
        get<UserService>(),
        get<UserRepository>(),
      ),
    );
    
    registerLazySingleton<AuthViewModel>(
      () => AuthViewModel(
        get<AuthOperationsService>(),
        get<UserOperationsService>(),
        get<SessionService>(),
      ),
    );
    
    registerLazySingleton<DriverOnboardingViewModel>(
      () => DriverOnboardingViewModel(),
    );
  }

  void reset() {
    _services.clear();
    _factories.clear();
  }
}
