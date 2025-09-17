import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_request.dart';
import 'package:safe_driving/features/authentication/models/user_model.dart';
import '../repositories/auth_repository.dart';

class AuthViewModel extends ChangeNotifier {
  final AuthRepository _repository;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  AuthViewModel(this._repository);

  String? get token => null;
  bool get isAuthenticated => _currentUser != null;
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _error;

  Future<bool> signIn(String email, String password) async {
    _setLoading(true);
    _clearError();

    final result = await _repository.signIn(email, password);

    if (result.isSuccess) {
   
      _currentUser = result.user;
      notifyListeners();

   
      try {
        final me = await _repository.getCurrentUser();
        if (me.isSuccess) {
          _currentUser = me.user;
          notifyListeners();
        }
      } catch (_) {}

      _setLoading(false);
      return true;
    } else {
      _setError(result.errorMessage!);
      _setLoading(false);
      return false;
    }
  }

  Future<bool> signUp(SignUpRequest request) async {
    _setLoading(true);
    _clearError();

    final result = await _repository.signUp(
      request.firstName,
      request.lastName,
      request.email,
      request.password,
    );

    if (result.isSuccess) {
      _currentUser = result.user;
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.errorMessage!);
      _setLoading(false);
      return false;
    }
  }

  Future<bool> resetPasswordConfirm(String sessionToken, String newPassword) async {
    _setLoading(true);
    _clearError();

    final result = await _repository.resetPasswordConfirm(sessionToken, newPassword);

    if (result.isSuccess) {
      _setLoading(false);
      return true;
    } else {
      _setError(result.errorMessage ?? 'Échec de la réinitialisation');
      _setLoading(false);
      return false;
    }
  }

  Future<bool> resetPassword(String email) async {
    _setLoading(true);
    _clearError();

    final result = await _repository.resetPassword(email);

    if (result.isSuccess) {
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.errorMessage!);
      _setLoading(false);
      return false;
    }
  }

  Future<void> fetchCurrentUser() async {
    _setLoading(true);
    _clearError();

    final result = await _repository.getCurrentUser();

    if (result.isSuccess) {
      _currentUser = result.user;
    } else {
      _setError(result.errorMessage!);
      _currentUser = null;
    }

    _setLoading(false);
  }

  Future<void> logout() async {
    _currentUser = null;
    await _repository.logout();
    _clearError();
    notifyListeners();
  }

  Future<bool> isEmailTaken(String email) async {
    return await _repository.isEmailTaken(email);
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String error) {
    _error = error;
    notifyListeners();
  }

  void _clearError() {
    _error = null;
    notifyListeners();
  }
}
