import 'package:flutter/material.dart';
import 'package:safe_driving/models/auth/auth_model.dart';
import 'package:safe_driving/services/user_service.dart';

class AuthViewModel extends ChangeNotifier {
  final UserService _userService;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  AuthViewModel(this._userService);

  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<bool> login(String email, String password) async {
    _setLoading(true);
    _error = null;

    try {
      final authResponse = await _userService.login(email, password);
      _currentUser = authResponse.user;
      _setLoading(false);
      return true;
    } catch (e) {
      _error = e.toString();
      _setLoading(false);
      return false;
    }
  }

  Future<bool> register(CreateUserInput input) async {
    _setLoading(true);
    _error = null;

    try {
      final authResponse = await _userService.register(input);
      _currentUser = authResponse.user;
      _setLoading(false);
      return true;
    } catch (e) {
      _error = e.toString();
      _setLoading(false);
      return false;
    }
  }

  Future<void> fetchCurrentUser() async {
    _setLoading(true);
    _error = null;

    try {
      _currentUser = await _userService.getCurrentUser();
      _setLoading(false);
    } catch (e) {
      _error = e.toString();
      _currentUser = null;
      _setLoading(false);
    }
  }

  Future<void> logout() async {
    _currentUser = null;
    // supprimer le token ?
    notifyListeners();
  }

  Future<bool> changePassword(String currentPassword, String newPassword) async {
    _setLoading(true);
    _error = null;

    try {
      await _userService.changePassword(currentPassword, newPassword);
      _setLoading(false);
      return true;
    } catch (e) {
      _error = e.toString();
      _setLoading(false);
      return false;
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  bool get isAuthenticated => _currentUser != null;
}