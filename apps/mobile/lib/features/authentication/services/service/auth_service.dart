import '../../data/auth_data_source_interface.dart';
import '../../models/auth_models.dart';

class AuthService {
  final AuthDataSource _dataSource;

  AuthService(this._dataSource);

  Future<AuthResponse> login(String email, String password) async {
    return await _dataSource.login(email, password);
  }

  Future<AuthResponse> register(RegisterInput input) async {
    return await _dataSource.register(input);
  }

  Future<void> resetPassword(String password) async {
    await _dataSource.resetPassword(password);
  }

  Future<User> getCurrentUser() async {
    return await _dataSource.getCurrentUser();
  }

  Future<User> updateUser(String id, UpdateUserInput input) async {
    return await _dataSource.updateUser(id, input);
  }

  Future<bool> isEmailTaken(String email) async {
    return await _dataSource.isEmailTaken(email);
  }
}
