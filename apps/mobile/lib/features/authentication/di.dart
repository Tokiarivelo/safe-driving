import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/features/authentication/data/auth_data_source_interface.dart';
import 'package:safe_driving/features/authentication/data/auth_data_source_graphql.dart';
import 'package:safe_driving/features/authentication/repositories/user_repository.dart';
import 'package:safe_driving/features/authentication/services/auth_service.dart';
import 'package:safe_driving/features/authentication/repositories/auth_repository.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';

void registerAuthModule(ServiceLocator sl) {
  if (GraphQLConfig.isConfigured) {
    sl.registerLazySingleton<IAuthDataSource>(() => AuthDataSourceGraphQL(sl.get<GraphQLClientWrapper>()));
    sl.registerLazySingleton<UserRepository>(() => UserRepository(sl.get<GraphQLClientWrapper>()));
    sl.registerLazySingleton<AuthService>(() => AuthService(sl.get<IAuthDataSource>(), sl.get(), sl.get()));
    sl.registerLazySingleton<AuthRepository>(() => AuthRepository(sl.get<AuthService>()));
    sl.registerFactory<AuthViewModel>(() => AuthViewModel(sl.get<AuthRepository>()));
  }
}
