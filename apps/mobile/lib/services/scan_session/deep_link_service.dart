import 'package:flutter/material.dart';

/// Service for handling deep links in the app
/// 
/// Supported deep link formats:
/// - myapp://scan?sessionId=<sessionId> - Opens scan session page
/// 
/// Usage:
/// 1. Configure platform-specific deep link handling (see README)
/// 2. Call DeepLinkService.handleDeepLink when a deep link is received
/// 3. The service will navigate to the appropriate screen
class DeepLinkService {
  /// Parse and handle an incoming deep link URI
  /// 
  /// Returns true if the deep link was handled, false otherwise
  static bool handleDeepLink(BuildContext context, Uri uri) {
    debugPrint('DeepLinkService: Handling URI: $uri');

    // Check for scan session deep link
    if (uri.scheme == 'myapp' && uri.host == 'scan') {
      final sessionId = uri.queryParameters['sessionId'];
      if (sessionId != null && sessionId.isNotEmpty) {
        _navigateToScanSession(context, sessionId);
        return true;
      }
    }

    debugPrint('DeepLinkService: Unhandled deep link: $uri');
    return false;
  }

  /// Navigate to the scan session page
  static void _navigateToScanSession(BuildContext context, String sessionId) {
    debugPrint('DeepLinkService: Navigating to scan session: $sessionId');
    Navigator.of(context).pushNamed(
      '/scan_session',
      arguments: {'sessionId': sessionId},
    );
  }

  /// Parse a deep link string to a Uri
  /// 
  /// Returns null if the string is not a valid URI
  static Uri? parseDeepLink(String link) {
    try {
      return Uri.parse(link);
    } catch (e) {
      debugPrint('DeepLinkService: Failed to parse deep link: $e');
      return null;
    }
  }
}
