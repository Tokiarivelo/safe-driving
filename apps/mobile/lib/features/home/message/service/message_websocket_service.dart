import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class MessageWebSocketService {
  final GraphQLClient client;
  WebSocketChannel? _channel;

  MessageWebSocketService({required this.client, String? token});

  Future<void> connectToConversation(String conversationId) async {
    final wsUrl = 'ws://localhost:4000/graphql?conversationId=$conversationId';
    _channel = WebSocketChannel.connect(Uri.parse(wsUrl));
  }

  Future<void> connectToRide(String rideId) async {
    final wsUrl = 'ws://localhost:4000/graphql?rideId=$rideId';
    _channel = WebSocketChannel.connect(Uri.parse(wsUrl));
  }

  Stream<dynamic> get messageStream {
    return _channel!.stream.map((data) {
      try {
        return json.decode(data);
      } catch (e) {
        return data;
      }
    });
  }

  void sendTypingIndicator(String conversationId, bool isTyping) {
    _channel?.sink.add(
      json.encode({
        'type': 'typing_indicator',
        'conversationId': conversationId,
        'isTyping': isTyping,
      }),
    );
  }

  void disconnect() {
    _channel?.sink.close();
  }
}
