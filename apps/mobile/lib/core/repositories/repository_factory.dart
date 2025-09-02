import 'package:safe_driving/features/authentication/repositories/user_repository.dart';
import 'package:safe_driving/features/onboarding/driver/repositories/driver_repository.dart';
import 'package:safe_driving/features/onboarding/driver/data/driver_data_source_graphql.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';

class RepositoryFactory {
  static RepositoryFactory? _instance;
  static RepositoryFactory get instance {
    _instance ??= RepositoryFactory._internal();
    return _instance!;
  }

  RepositoryFactory._internal();

  UserRepository? _userRepository;
  DriverRepository? _driverRepository;

  UserRepository getUserRepository() {
    _userRepository ??= UserRepository(GraphQLClientWrapper.instance);
    return _userRepository!;
  }

  DriverRepository getDriverRepository() {
    _driverRepository ??= DriverRepository(
      DriverDataSourceGraphQL(GraphQLClientWrapper.instance),
    );
    return _driverRepository!;
  }

  void dispose() {
    _userRepository = null;
    _driverRepository = null;
  }

  void reset() {
    dispose();
    _instance = null;
  }
}
