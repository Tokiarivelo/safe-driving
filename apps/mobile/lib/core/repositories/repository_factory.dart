import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/features/onboarding/user/repository/user_repository.dart';
import 'package:safe_driving/features/onboarding/driver/repository/driver_repository.dart';

class RepositoryFactory {
  static RepositoryFactory? _instance;
  static RepositoryFactory get instance {
    _instance ??= RepositoryFactory._internal();
    return _instance!;
  }

  RepositoryFactory._internal();

  UserRepository? _userRepository;
  DriverRepository? _driverRepository;

  UserRepository getUserRepository(GraphQLClient client) {
    _userRepository ??= UserRepository();
    return _userRepository!;
  }

  DriverRepository getDriverRepository(GraphQLClient client) {
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
