import 'package:flutter/material.dart';
import '../services/service/session_service.dart';
import '../services/auth_operations_service.dart';
import '../services/user_operations_service.dart';
import '../models/auth_models.dart';

class AuthViewModel extends ChangeNotifier {
  final AuthOperationsService _authOperations;
  final UserOperationsService _userOperations;
  final SessionService _sessionService;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  AuthViewModel(
    this._authOperations,
    this._userOperations,
    this._sessionService,
  );

  String? get token => _sessionService.token;
  bool get isAuthenticated =>
      _sessionService.isAuthenticated && _currentUser != null;
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _error;

  Future<bool> login(String email, String password) async {
    _setLoading(true);
    _clearError();

    final result = await _authOperations.login(email, password);
    
    if (result.isSuccess) {
      _currentUser = result.user;
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.error!);
      _setLoading(false);
      return false;
    }
  }

  Future<bool> register(RegisterInput input) async {
    _setLoading(true);
    _clearError();

    final result = await _authOperations.register(input);
    
    if (result.isSuccess) {
      _currentUser = result.user;
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.error!);
      _setLoading(false);
      return false;
    }
  }

  Future<bool> resetPassword(String newPassword) async {
    _setLoading(true);
    _clearError();
    
    final result = await _authOperations.resetPassword(newPassword);
    
    if (result.isSuccess) {
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.error!);
      _setLoading(false);
      return false;
    }
  }

  Future<bool> updateUser(String id, UpdateUserInput input) async {
    _setLoading(true);
    _clearError();

    final result = await _userOperations.updateUser(id, input);
    
    if (result.isSuccess) {
      _currentUser = result.user;
      notifyListeners();
      _setLoading(false);
      return true;
    } else {
      _setError(result.error!);
      _setLoading(false);
      return false;
    }
  }

  Future<void> fetchCurrentUser() async {
    _setLoading(true);
    _clearError();

    final result = await _userOperations.fetchCurrentUser();
    
    if (result.isSuccess) {
      _currentUser = result.user;
    } else {
      _setError(result.error!);
      _currentUser = null;
    }
    
    _setLoading(false);
  }

  Future<void> logout() async {
    _currentUser = null;
    _authOperations.logout();
    _clearError();
    notifyListeners();
  }

  Future<bool> isEmailTaken(String email) async {
    return await _userOperations.isEmailTaken(email);
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
