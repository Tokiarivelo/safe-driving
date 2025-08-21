import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../models/user_model.dart';
import '../models/auth_request.dart';

class AuthViewModel extends ChangeNotifier {
  final AuthService _authService;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  AuthViewModel(this._authService);

  String? get token => _authService.token;
  bool get isAuthenticated =>
      _authService.isAuthenticated && _currentUser != null;
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _error;

  Future<bool> signIn(String email, String password) async {
    _setLoading(true);
    _clearError();

    final result = await _authService.signIn(email, password);

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

  Future<bool> signUp(SignUpRequest request) async {
    _setLoading(true);
    _clearError();

    final result = await _authService.signUp(request);

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

  Future<bool> resetPassword(String email) async {
    _setLoading(true);
    _clearError();

    final result = await _authService.resetPassword(email);

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

  // Méthode de compatibility pour l'ancien nom
  Future<bool> login(String email, String password) async {
    return await signIn(email, password);
  }

  // Méthode de compatibility pour l'ancien nom  
  Future<bool> register(SignUpRequest request) async {
    return await signUp(request);
  }

  Future<void> fetchCurrentUser() async {
    _setLoading(true);
    _clearError();

    final result = await _authService.getCurrentUser();

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
    await _authService.logout();
    _clearError();
    notifyListeners();
  }

  Future<bool> isEmailTaken(String email) async {
    return await _authService.isEmailTaken(email);
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
