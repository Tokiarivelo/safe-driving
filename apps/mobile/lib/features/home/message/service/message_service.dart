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
      print('Résultat brut getMessages: ${result.data}');
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

      print('Données messages reçues: ${result.data}');
      return result.data?['messages'];
    } catch (e) {
      print('Erreur récupération messages: $e');
      return null;
    }
  }

  Stream<Map<String, dynamic>?> subscribeToMessages(String conversationId) {
    try {
      final stream = client.subscribe(
        SubscriptionOptions(
          document: gql(newMessageSubscription),
          variables: {'conversationId': conversationId},
        ),
      );

      return stream.map((result) {
        if (result.hasException) {
          print('Erreur subscription: ${result.exception}');
          return null;
        }

        final newMessage = result.data?['newMessage'];
        if (newMessage != null) {
          print('Nouveau message reçu via subscription: $newMessage');
          if (newMessage['sender'] == null) {
            newMessage['sender'] = {
              'id': newMessage['senderId'],
              'firstName': 'Utilisateur',
              'lastName': '',
              'email': '',
            };
          }
        }
        return newMessage as Map<String, dynamic>?;
      });
    } catch (e) {
      print('Erreur subscription: $e');
      return const Stream.empty();
    }
  }
}
