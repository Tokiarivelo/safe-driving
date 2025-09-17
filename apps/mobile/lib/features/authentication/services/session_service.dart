import 'package:shared_preferences/shared_preferences.dart';

class SessionService {
  static const String _tokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'current_user_id';
  static const String _signupFirstNameKey = 'signup_first_name';
  static const String _signupLastNameKey = 'signup_last_name';
  static const String _signupEmailKey = 'signup_email';
  static const String _pendingRoleKey = 'pending_role';

  String? _token;
  String? _refreshToken;
  String? _userId;
  String? _signupFirstName;
  String? _signupLastName;
  String? _signupEmail;
  String? _pendingRole;

  String? get token => _token;
  String? get refreshToken => _refreshToken;
  String? get userId => _userId;
  String? get lastSignupFirstName => _signupFirstName;
  String? get lastSignupLastName => _signupLastName;
  String? get lastSignupEmail => _signupEmail;
  String? get pendingRole => _pendingRole;
  bool get hasPendingRole => _pendingRole != null && _pendingRole!.isNotEmpty;
  bool get pendingRoleIsDriver => _pendingRole == 'DRIVER';

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
    _signupFirstName = prefs.getString(_signupFirstNameKey);
    _signupLastName = prefs.getString(_signupLastNameKey);
    _signupEmail = prefs.getString(_signupEmailKey);
    _pendingRole = prefs.getString(_pendingRoleKey);
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
    _signupFirstName = null;
    _signupLastName = null;
    _signupEmail = null;
    _pendingRole = null;
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.remove(_tokenKey),
      prefs.remove(_refreshTokenKey),
      prefs.remove(_userIdKey),
      prefs.remove(_signupFirstNameKey),
      prefs.remove(_signupLastNameKey),
      prefs.remove(_signupEmailKey),
      prefs.remove(_pendingRoleKey),
    ]);
  }

  Future<void> clearAccessToken() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  Future<void> saveSignupInfo({
    required String firstName,
    required String lastName,
    required String email,
  }) async {
    _signupFirstName = firstName;
    _signupLastName = lastName;
    _signupEmail = email;
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.setString(_signupFirstNameKey, firstName),
      prefs.setString(_signupLastNameKey, lastName),
      prefs.setString(_signupEmailKey, email),
    ]);
  }

  Future<void> savePendingRole(String role) async {
    _pendingRole = role;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_pendingRoleKey, role);
  }

  Future<void> clearPendingRole() async {
    _pendingRole = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_pendingRoleKey);
  }
}
