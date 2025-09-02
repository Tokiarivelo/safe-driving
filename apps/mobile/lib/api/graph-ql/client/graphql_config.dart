import 'package:flutter_dotenv/flutter_dotenv.dart';

class GraphQLConfig {
  const GraphQLConfig._();

  static String get endpoint {
    final value = dotenv.env['GRAPHQL_ENDPOINT'];
    if (value == null || value.trim().isEmpty) {
      throw Exception('GRAPHQL_ENDPOINT is not configured in .env file');
    }
    return value;
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
    final requiredVars = [
      'GRAPHQL_ENDPOINT',
    ];

    final missingVars = <String>[];

    for (final varName in requiredVars) {
      final value = dotenv.env[varName];
      if (value == null || value.trim().isEmpty) {
        missingVars.add(varName);
      }
    }

    if (missingVars.isNotEmpty) {
      throw Exception(
        'Missing required environment variables: ${missingVars.join(', ')}'
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

