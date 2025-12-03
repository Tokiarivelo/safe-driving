import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/api/graph-ql/modules/scan-session/scan_session_mutations.dart';

/// Service for handling scan session operations
class ScanSessionService {
  final GraphQLClient _client;

  ScanSessionService(this._client);

  /// Send the scanned result to the backend
  /// Returns true if successful, false otherwise
  Future<bool> sendScanResult({
    required String sessionId,
    required String scannedValue,
  }) async {
    try {
      final result = await _client.mutate(
        MutationOptions(
          document: gql(sendScanResultMutation),
          variables: {
            'input': {
              'sessionId': sessionId,
              'scannedValue': scannedValue,
            },
          },
        ),
      );

      if (result.hasException) {
        debugPrint(
            'ScanSessionService: Error sending scan result: ${result.exception}');
        return false;
      }

      final success = result.data?['sendScanResult'] as bool? ?? false;
      debugPrint('ScanSessionService: Send scan result success: $success');
      return success;
    } catch (e) {
      debugPrint('ScanSessionService: Exception sending scan result: $e');
      return false;
    }
  }
}
