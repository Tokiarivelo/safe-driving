import 'package:safe_driving/features/authentication/repository/auth_repository.dart';
import 'package:safe_driving/features/onboarding/user/repository/user_repository.dart';
import 'package:safe_driving/features/onboarding/driver/repository/driver_repository.dart';

class AppProviders {
  static AppProviders _instance = AppProviders._internal();

  factory AppProviders() {
    return _instance;
  }

  AppProviders._internal();

  AuthRepository? _authRepository;
  UserRepository? _userRepository;
  DriverRepository? _driverRepository;

  AuthRepository get authRepository {
    _authRepository ??= AuthRepository();
    return _authRepository!;
  }

  UserRepository get userRepository {
    _userRepository ??= UserRepository();
    return _userRepository!;
  }

  DriverRepository get driverRepository {
    _driverRepository ??= DriverRepository();
    return _driverRepository!;
  }

  void dispose() {
    _authRepository = null;
    _userRepository = null;
    _driverRepository = null;
  }

  void reset() {
    dispose();
    _instance = AppProviders._internal();
  }
}
