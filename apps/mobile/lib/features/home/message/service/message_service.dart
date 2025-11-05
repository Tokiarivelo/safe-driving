import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/api/graph-ql/modules/chat/chat_mutations.dart';
import 'package:safe_driving/api/graph-ql/modules/chat/chat_queries.dart';

class MessageService {
  final GraphQLClient client;
  MessageService({required this.client});

  Future<Map<String, dynamic>?> sendMessage({
    required String content,
    required String conversationId,
    String? rideId,
  }) async {
    try {
      final MutationOptions options = MutationOptions(
        document: gql(sendMessageMutation),
        variables: {
          'input': {
            'content': content,
            'conversationId': conversationId,
            if (rideId != null) 'rideId': rideId,
          },
        },
      );

      final QueryResult result = await client.mutate(options);

      if (result.hasException) {
        print('Erreur GraphQL envoi message: ${result.exception}');
        return null;
      }

      final data = result.data?['sendMessage'];
      print('Message envoyé: $data');
      print('🧾 Résultat brut getMessages: ${result.data}');
      return data;
    } catch (e) {
      print('Erreur envoi message: $e');
      return null;
    }
  }

  // Dans message_service.dart - Modifiez la méthode getMessages
  Future<List<dynamic>?> getMessages(String conversationId) async {
    try {
      final QueryOptions options = QueryOptions(
        document: gql(getMessagesQuery),
        variables: {'conversationId': conversationId},
        fetchPolicy: FetchPolicy.networkOnly,
      );

      final QueryResult result = await client.query(options);

      if (result.hasException) {
        print('Erreur récupération messages: ${result.exception}');
        return null;
      }

      final messages = result.data?['messages'];

      // DEBUG: Afficher les détails des messages
      if (messages != null) {
        for (var message in messages) {
          print('📨 Message reçu:');
          print('   ID: ${message['id']}');
          print('   Contenu: ${message['content']}');
          print('   Sender ID: ${message['sender']?['id']}');
          print(
            '   Sender Name: ${message['sender']?['firstName']} ${message['sender']?['lastName']}',
          );
          print('   Conversation ID: ${message['conversationId']}');
        }
      }

      return messages;
    } catch (e) {
      print('Erreur récupération messages: $e');
      return null;
    }
  }

  // Future<List<dynamic>?> getMessages(String conversationId) async {
  //   try {
  //     final QueryOptions options = QueryOptions(
  //       document: gql(getMessagesQuery),
  //       variables: {'conversationId': conversationId},
  //       fetchPolicy: FetchPolicy.networkOnly,
  //     );

  //     final QueryResult result = await client.query(options);

  //     if (result.hasException) {
  //       print('Erreur récupération messages: ${result.exception}');
  //       return null;
  //     }

  //     return result.data?['messages'];
  //   } catch (e) {
  //     print('Erreur récupération messages: $e');
  //     return null;
  //   }
  // }
}
