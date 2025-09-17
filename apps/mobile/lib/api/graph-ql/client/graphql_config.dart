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
        value ??= dotenv.env['NEXT_PUBLIC_GRAPHQL_API_URL'];
        value ??= dotenv.env['GRAPHQL_API_URL'];
      }
    } catch (_) {
      value = null;
    }
    if (value == null || value.trim().isEmpty) {
      throw Exception(
        'GRAPHQL endpoint is not configured. Define GRAPHQL_ENDPOINT or NEXT_PUBLIC_GRAPHQL_API_URL (via --dart-define or .env)',
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
    endpoint;
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
