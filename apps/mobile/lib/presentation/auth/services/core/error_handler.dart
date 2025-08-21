import 'package:graphql_flutter/graphql_flutter.dart';

class CustomErrorHandler {
  void handleException(OperationException? exception) {
    if (exception != null) {
      throw Exception(exception.toString());
    }
  }
}
