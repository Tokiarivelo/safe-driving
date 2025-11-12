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

  Future<Map<String, dynamic>?> editMessage({
    required String messageId,
    required String content,
  }) async {
    try {
      print('✏️ Modification du message: $messageId');

      final MutationOptions options = MutationOptions(
        document: gql(editMessageMutation),
        variables: {'messageId': messageId, 'content': content},
      );

      final QueryResult result = await client.mutate(options);

      if (result.hasException) {
        print('❌ Erreur modification message: ${result.exception}');
        return null;
      }

      final data = result.data?['editMessage'];
      print('✅ Message modifié: $data');
      return data;
    } catch (e) {
      print('❌ Erreur modification message: $e');
      return null;
    }
  }

  Future<bool> deleteMessage(String messageId) async {
    try {
      print('🗑️ Suppression du message: $messageId');

      final MutationOptions options = MutationOptions(
        document: gql(deleteMessageMutation),
        variables: {'messageId': messageId},
      );

      final QueryResult result = await client.mutate(options);

      if (result.hasException) {
        print('❌ Erreur suppression message: ${result.exception}');
        return false;
      }

      final data = result.data?['deleteMessage'];
      final success = data?['deleted'] ?? false;
      print('✅ Message supprimé: $success');
      return success;
    } catch (e) {
      print('❌ Erreur suppression message: $e');
      return false;
    }
  }
}
