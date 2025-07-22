import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../models/auth/auth_model.dart';
import '../services/user_service.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = false;
  String? _errorMessage;
  late UserService _userService;

  User? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _user != null && _token != null;

  void initialize(GraphQLClient client) {
    _userService = UserService(client);
  }

  Future<bool> login(String email, String password) async {
    _setLoading(true);
    _clearError();

    try {
      final authResponse = await _userService.login(email, password);
      _setAuthData(authResponse);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> register(CreateUserInput input) async {
    _setLoading(true);
    _clearError();

    try {
      final authResponse = await _userService.register(input);
      _setAuthData(authResponse);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> getCurrentUser() async {
    if (_token == null) return false;

    _setLoading(true);
    _clearError();

    try {
      final user = await _userService.getCurrentUser();
      _user = user;
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> updateUser(String id, UpdateUserInput input) async {
    _setLoading(true);
    _clearError();

    try {
      final updatedUser = await _userService.updateUser(id, input);
      _user = updatedUser;
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> changePassword(String currentPassword, String newPassword) async {
    _setLoading(true);
    _clearError();

    try {
      final result = await _userService.changePassword(currentPassword, newPassword);
      if (result['success']) {
        return true;
      } else {
        _setError(result['message']);
        return false;
      }
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> forgotPassword(String email) async {
    _setLoading(true);
    _clearError();

    try {
      final result = await _userService.forgotPassword(email);
      if (result['success']) {
        return true;
      } else {
        _setError(result['message']);
        return false;
      }
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> resetPassword(String token, String newPassword) async {
    _setLoading(true);
    _clearError();

    try {
      final result = await _userService.resetPassword(token, newPassword);
      if (result['success']) {
        return true;
      } else {
        _setError(result['message']);
        return false;
      }
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> verifyEmail(String token) async {
    _setLoading(true);
    _clearError();

    try {
      final result = await _userService.verifyEmail(token);
      if (result['success']) {
        // Refresh user data after verification
        await getCurrentUser();
        return true;
      } else {
        _setError(result['message']);
        return false;
      }
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> resendVerification(String email) async {
    _setLoading(true);
    _clearError();

    try {
      final result = await _userService.resendVerification(email);
      if (result['success']) {
        return true;
      } else {
        _setError(result['message']);
        return false;
      }
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  void logout() {
    _user = null;
    _token = null;
    _clearError();
    notifyListeners();
  }

  void _setAuthData(AuthResponse authResponse) {
    _user = authResponse.user;
    _token = authResponse.token;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
