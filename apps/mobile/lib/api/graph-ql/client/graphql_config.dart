import 'package:flutter_dotenv/flutter_dotenv.dart';

class GraphQLConfig {
  const GraphQLConfig._();

  static String get endpoint {
    const define = String.fromEnvironment('GRAPHQL_ENDPOINT');
    if (define.isNotEmpty) return define;

    String? value;
    try {
      if (dotenv.isInitialized) {
        value = dotenv.env['GRAPHQL_ENDPOINT'];
      }
    } catch (_) {
      value = null;
    }
    if (value == null || value.trim().isEmpty) {
      throw Exception(
        'GRAPHQL_ENDPOINT is not configured (use --dart-define or .env)',
      );
    }
    return value.trim();
  }

  static Map<String, String> headers({String? accessToken}) {
    return <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (accessToken != null && accessToken.isNotEmpty)
        'Authorization': 'Bearer $accessToken',
    };
  }

  static void validateConfiguration() {
    const define = String.fromEnvironment('GRAPHQL_ENDPOINT');
    if (define.isNotEmpty) return;

    final requiredVars = ['GRAPHQL_ENDPOINT'];

    final missingVars = <String>[];

    for (final varName in requiredVars) {
      String? value;
      try {
        if (dotenv.isInitialized) {
          value = dotenv.env[varName];
        }
      } catch (_) {
        value = null;
      }
      if (value == null || value.trim().isEmpty) {
        missingVars.add(varName);
      }
    }

    if (missingVars.isNotEmpty) {
      throw Exception(
        'Missing required environment variables: ${missingVars.join(', ')} (or set via --dart-define)',
      );
    }
  }

  static bool get isConfigured {
    try {
      validateConfiguration();
      return true;
    } catch (e) {
      return false;
    }
  }
}
