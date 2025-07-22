import 'package:flutter/material.dart';
import 'package:safe_driving/models/auth/auth_model.dart';
import 'package:safe_driving/services/user_service.dart';

class AuthViewModel extends ChangeNotifier {
  final UserService _userService;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;
  String? _token;

  AuthViewModel(this._userService);

  // Getters
  String? get token => _token;
  bool get isAuthenticated => _currentUser != null && _token != null;
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _error;

  // Login
  Future<bool> login(String email, String password) async {
    _setLoading(true);
    _clearError();

    try {
      final authResponse = await _userService.login(email, password);
      _currentUser = authResponse.user;
      _token = authResponse.token;
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Register
  Future<bool> register(RegisterInput input) async {
    _setLoading(true);
    _clearError();

    try {
      final authResponse = await _userService.register(input);
      _currentUser = authResponse.user;
      _token = authResponse.token;
      notifyListeners();
      return true;
    } catch (e) {
      var message = e.toString();

      if (message.contains('Unique constraint') || message.contains('email') || message.contains('ConflictException')) {
        message = 'Cette adresse email est déjà utilisée. Veuillez en choisir une autre.';
      } else if (message.contains('password')) {
        message = 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre.';
      } else if (message.contains('firstName')) {
        message = 'Le prénom est requis.';
      } else if (message.contains('non-nullable field LoginOutput.user')) {
        message = 'Échec de l\'inscription. Cet email est peut-être déjà utilisé.';
      } else if (message.contains('INTERNAL_SERVER_ERROR')) {
        message = 'Erreur serveur lors de l\'inscription. Veuillez réessayer.';
      } else if (message.contains('Exception')) {
        message = message.replaceAll('Exception: ', '');
      }

      _setError(message);
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Update user
  Future<bool> updateUser(String id, UpdateUserInput input) async {
    _setLoading(true);
    _clearError();

    try {
      final updatedUser = await _userService.updateUser(id, input);
      _currentUser = updatedUser;
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Fetch current user
  Future<void> fetchCurrentUser() async {
    _setLoading(true);
    _clearError();

    try {
      _currentUser = await _userService.getCurrentUser();
    } catch (e) {
      _setError(e.toString());
      _currentUser = null;
    } finally {
      _setLoading(false);
    }
  }

  // Logout
  Future<void> logout() async {
    _currentUser = null;
    _token = null;
    _clearError();
    notifyListeners();
  }

  // Check si email exist
  Future<bool> isEmailTaken(String email) async {
    try {
      return await _userService.isEmailTaken(email);
    } catch (_) {
      return false;
    }
  }

  // Helpers
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
