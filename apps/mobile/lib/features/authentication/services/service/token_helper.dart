class TokenHelper {
  static String? extractToken(dynamic tokensData) {
    if (tokensData is List && tokensData.isNotEmpty) {
      return tokensData.first['token'];
    } else if (tokensData is String) {
      return tokensData;
    }
    return null;
  }
}
