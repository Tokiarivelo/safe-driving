import '../models/auth_models.dart';
import 'service/user/user_service.dart';
import '../repository/user/user_repository.dart';

class UserOperationsService {
  final UserService _userService;
  final UserRepository _userRepository;

  UserOperationsService(this._userService, this._userRepository);

  Future<UserResult> updateUser(String id, UpdateUserInput input) async {
    try {
      final updatedUser = await _userService.updateUser(id, input);
      return UserResult.success(updatedUser);
    } catch (e) {
      return UserResult.failure(e.toString());
    }
  }

  Future<UserResult> fetchCurrentUser() async {
    try {
      final user = await _userService.getCurrentUser();
      return UserResult.success(user);
    } catch (e) {
      return UserResult.failure(e.toString());
    }
  }

  Future<bool> isEmailTaken(String email) async {
    try {
      return await _userRepository.isEmailTaken(email);
    } catch (_) {
      return false;
    }
  }
}

class UserResult {
  final bool isSuccess;
  final User? user;
  final String? error;

  UserResult.success(this.user) : isSuccess = true, error = null;
  UserResult.failure(this.error) : isSuccess = false, user = null;
}
