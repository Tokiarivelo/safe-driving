import 'package:shared_preferences/shared_preferences.dart';

class SessionService {
  static const String _tokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'current_user_id';

  String? _token;
  String? _refreshToken;
  String? _userId;

  String? get token => _token;
  String? get refreshToken => _refreshToken;
  String? get userId => _userId;

  bool get isAuthenticated => _token != null && _token!.isNotEmpty;

  bool get hasValidTokens =>
      _token != null &&
      _token!.isNotEmpty &&
      _refreshToken != null &&
      _refreshToken!.isNotEmpty;

  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    _refreshToken = prefs.getString(_refreshTokenKey);
    _userId = prefs.getString(_userIdKey);
  }

  Future<void> saveToken(String token) async {
    if (token.isEmpty) {
      throw ArgumentError('Le token ne peut pas être vide');
    }
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<void> saveRefreshToken(String refreshToken) async {
    if (refreshToken.isEmpty) {
      throw ArgumentError('Le refresh token ne peut pas être vide');
    }
    _refreshToken = refreshToken;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_refreshTokenKey, refreshToken);
  }

  Future<void> saveTokens(String token, String refreshToken) async {
    await Future.wait([saveToken(token), saveRefreshToken(refreshToken)]);
  }

  Future<void> saveUserId(String userId) async {
    if (userId.isEmpty) {
      throw ArgumentError('L\'identifiant utilisateur ne peut pas être vide');
    }
    _userId = userId;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userIdKey, userId);
  }

  Future<void> clear() async {
    _token = null;
    _refreshToken = null;
    _userId = null;
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.remove(_tokenKey),
      prefs.remove(_refreshTokenKey),
      prefs.remove(_userIdKey),
    ]);
  }

  Future<void> clearAccessToken() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }
}
