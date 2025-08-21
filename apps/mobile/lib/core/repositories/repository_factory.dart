import 'package:safe_driving/features/authentication/repositories/user_repository.dart';
import 'package:safe_driving/features/onboarding/driver/repository/driver_repository.dart';
import 'package:safe_driving/api/graphql/graphql_client.dart';

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
    _driverRepository ??= DriverRepository();
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
