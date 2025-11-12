import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_client.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/api/graph-ql/modules/user/user_queries.dart';

class AuthProvider extends ChangeNotifier {
  static const String _tokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';

  bool _isAuthenticated = false;
  bool _isVerified = false;
  bool _isLoading = true;
  bool _hasCheckedAuth = false;
  Map<String, dynamic>? _userData;

  bool get isAuthenticated => _isAuthenticated;
  bool get isVerified => _isVerified;
  bool get isLoading => _isLoading;
  bool get hasCheckedAuth => _hasCheckedAuth;
  Map<String, dynamic>? get userData => _userData;

  Future<void> checkAuthStatus(GraphQLClientWrapper? client) async {
    if (_hasCheckedAuth) return;

    _isLoading = true;
    notifyListeners();

    if (client == null) {
      _isAuthenticated = false;
      _isVerified = false;
      _hasCheckedAuth = true;
      _isLoading = false;
      notifyListeners();
      return;
    }

    try {
      final token = await _getStoredToken();

      debugPrint(
        'Token retrieved: ${token != null ? "exists" : "null"}, $token',
      );

      if (token == null) {
        _isAuthenticated = false;
        _isVerified = false;
        _hasCheckedAuth = true;
        _isLoading = false;
        notifyListeners();
        return;
      }

      try {
        client.updateTokens(accessToken: token);
      } catch (_) {}

      final data = await client.executeQuery(
        document: meQuery,
        fetchPolicy: FetchPolicy.networkOnly,
      );

      final result = data['me'];

      if (result == null) {
        debugPrint('Auth check failed: ${result.exception}');
        _isAuthenticated = false;
        _isVerified = false;
        // Clear invalid token
        await clearTokens();
      } else {
        _userData = result!;
        _isAuthenticated = true;
        _isVerified = _userData?['isVerified'] ?? false;
        debugPrint('User data loaded: ${_userData?['email']}');
      }
    } catch (e) {
      debugPrint('Error checking auth status: $e');
      _isAuthenticated = false;
      _isVerified = false;
    } finally {
      _hasCheckedAuth = true;
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<String?> _getStoredToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(_tokenKey);
    } catch (e) {
      debugPrint('Error getting stored token: $e');
      return null;
    }
  }

  Future<void> saveToken(String token, {String? refreshToken}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_tokenKey, token);
      if (refreshToken != null) {
        await prefs.setString(_refreshTokenKey, refreshToken);
      }
      debugPrint('Token saved successfully');
    } catch (e) {
      debugPrint('Error saving token: $e');
    }
  }

  Future<String?> getRefreshToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(_refreshTokenKey);
    } catch (e) {
      debugPrint('Error getting refresh token: $e');
      return null;
    }
  }

  Future<void> clearTokens() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_tokenKey);
      await prefs.remove(_refreshTokenKey);
      _isAuthenticated = false;
      _isVerified = false;
      _userData = null;
      notifyListeners();
      debugPrint('Tokens cleared successfully');
    } catch (e) {
      debugPrint('Error clearing tokens: $e');
    }
  }

  Future<void> logout() async {
    await clearTokens();
    _hasCheckedAuth = false;
  }

  String getInitialRoute() {
    debugPrint(
      'Auth Status: isAuthenticated=$_isAuthenticated, isVerified=$_isVerified',
    );

    if (_isAuthenticated && !_isVerified) {
      return '/onboarding';
    }
    if (_isVerified) {
      return '/home';
    }
    return '/auth';
  }
}
