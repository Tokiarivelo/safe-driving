import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';
import 'package:safe_driving/features/onboarding/user/repository/user_repository.dart';
import 'package:safe_driving/features/onboarding/driver/repository/driver_repository.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';

class AppProviders {
  static AppProviders _instance = AppProviders._internal();

  factory AppProviders() {
    return _instance;
  }

  AppProviders._internal();

  AuthViewModel? _authViewModel;
  UserRepository? _userRepository;
  DriverRepository? _driverRepository;

  AuthViewModel get authViewModel {
    _authViewModel ??= ServiceLocator.instance.get<AuthViewModel>();
    return _authViewModel!;
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
    _authViewModel = null;
    _userRepository = null;
    _driverRepository = null;
  }

  void reset() {
    dispose();
    _instance = AppProviders._internal();
  }
}
