import 'package:flutter/material.dart';
import 'package:safe_driving/presentation/authentification/services/service/auth_service.dart';
import 'package:safe_driving/presentation/authentification/services/service/session_service.dart';
import 'package:safe_driving/presentation/authentification/services/service/user/user_repository.dart';
import 'package:safe_driving/presentation/authentification/services/service/user/user_service.dart';
import '../models/auth_models.dart';

class AuthViewModel extends ChangeNotifier {
  final AuthService _authService;
  final UserService _userService;
  final UserRepository _userRepository;
  final SessionService _sessionService;
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  AuthViewModel(
    this._authService,
    this._userService,
    this._userRepository,
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

    try {
      final authResponse = await _authService.login(email, password);
      _currentUser = authResponse.user;
      _sessionService.saveToken(authResponse.token);
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> register(RegisterInput input) async {
    _setLoading(true);
    _clearError();

    try {
      final authResponse = await _authService.register(input);
      _currentUser = authResponse.user;
      _sessionService.saveToken(authResponse.token);
      notifyListeners();
      return true;
    } catch (e) {
      var message = e.toString();

      if (message.contains('Unique constraint') ||
          message.contains('email') ||
          message.contains('ConflictException')) {
        message =
            'Cette adresse email est déjà utilisée. Veuillez en choisir une autre.';
      } else if (message.contains('password')) {
        message =
            'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre.';
      } else if (message.contains('firstName')) {
        message = 'Le prénom est requis.';
      } else if (message.contains('non-nullable field LoginOutput.user')) {
        message =
            'Échec de l\'inscription. Cet email est peut-être déjà utilisé.';
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

  Future<bool> resetPassword(String newPassword) async {
    _setLoading(true);
    _clearError();
    try {
      await _authService.resetPassword(newPassword);
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

  Future<void> logout() async {
    _currentUser = null;
    _sessionService.clear();
    _clearError();
    notifyListeners();
  }

  Future<bool> isEmailTaken(String email) async {
    try {
      return await _userRepository.isEmailTaken(email);
    } catch (_) {
      return false;
    }
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
