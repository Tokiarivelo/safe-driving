import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/api/graph-ql/modules/user/user_queries.dart';

class AuthProvider extends ChangeNotifier {
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

  Future<void> checkAuthStatus(GraphQLClient? client) async {
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

      // log token

      if (token == null) {
        _isAuthenticated = false;
        _isVerified = false;
        _isLoading = false;
        notifyListeners();
        return;
      }

      final result = await client.query(
        QueryOptions(
          document: gql(meQuery),
          fetchPolicy: FetchPolicy.networkOnly,
        ),
      );

      if (result.hasException || result.data == null) {
        _isAuthenticated = false;
        _isVerified = false;
      } else {
        _userData = result.data!['me'];
        _isAuthenticated = true;
        _isVerified = _userData?['isVerified'] ?? false;
      }
    } catch (e) {
      _isAuthenticated = false;
      _isVerified = false;
    } finally {
      _hasCheckedAuth = true;
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<String?> _getStoredToken() async {
    // Implement token retrieval
    return null;
  }

  String getInitialRoute() {
    // log auth status
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
