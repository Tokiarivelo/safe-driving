import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/api/graph-ql/modules/chat/chat_mutations.dart';
import 'package:safe_driving/api/graph-ql/modules/chat/chat_queries.dart';

class ConversationService {
  final GraphQLClient client;

  ConversationService({required this.client});

  Future<Map<String, dynamic>?> createConversationBetweenUsers({
    required String currentUserId,
    required String otherUserId,
  }) async {
    if (currentUserId.trim().isEmpty) {
      print('createConversationBetweenUsers aborted: currentUserId is empty');
      return null;
    }

    try {
      final result = await client.mutate(
        MutationOptions(
          document: gql(createConversationMutation),
          variables: {
            'input': {
              'participantIds': [otherUserId],
              'type': 'DIRECT',
            },
          },
        ),
      );

      final conversationId = result.data?['createConversation']?['id'];
      if (conversationId == null) {
        print('Erreur: conversationId est null');
        return null;
      }
      if (result.hasException) {
        print('Erreur création conversation: ${result.exception}');
      } else if (result.data == null) {
        print('Aucune donnée retournée (result.data est null)');
      } else {
        final conversation = result.data!['createConversation'];
        if (conversation == null) {
          print('createConversation est null dans le résultat');
        } else {
          print('Conversation créée: ${conversation['id']}');
        }
      }

      print('createConversation result.data: ${result.data}');
      if (result.data != null && result.data!['createConversation'] != null) {
        final created = result.data!['createConversation'];
        print('Conversation créée (returned): $created');
        return created as Map<String, dynamic>?;
      } else {
        print(
          'Attention: createConversation returned null or unexpected structure: ${result.data}',
        );
        return null;
      }
    } catch (e) {
      print('Erreur création conversation (exception): $e');
      return null;
    }
  }

  Future<List<dynamic>?> getConversations() async {
    try {
      final result = await client.query(
        QueryOptions(
          document: gql('''
        query {
          userConversations {
            conversations {
              id
              title
              type
              participants {
                user {
                  id
                  firstName
                  lastName
                }
              }
            }
          }
        }
      '''),
        ),
      );

      if (result.hasException) {
        print('Erreur récupération conversations: ${result.exception}');
        return [];
      }

      final data = result.data?['userConversations'];
      if (data == null) {
        print('userConversations est null');
        return [];
      }

      final conversations = (data['conversations'] as List?) ?? [];
      if (conversations.isEmpty) {
        print('Aucune conversation trouvée');
        return [];
      }

      print('${conversations.length} conversations récupérées');
      return conversations;
    } catch (e) {
      print('Erreur interne getConversations: $e');
      return [];
    }
  }

  Future<String?> findOrCreateConversation({
    required String currentUserId,
    required String otherUserId,
  }) async {
    if (currentUserId == otherUserId) {
      throw Exception("Impossible de créer une conversation avec soi-même");
    }

    final conversations = (await getConversations()) ?? [];
    for (var conversation in conversations) {
      final participants = (conversation['participants'] as List?) ?? [];
      final participantIds = participants
          .map((p) => (p['user']?['id'] as String?))
          .whereType<String>()
          .toList();

      if (participantIds.contains(currentUserId) &&
          participantIds.contains(otherUserId)) {
        print('Conversation existante trouvée: ${conversation['id']}');
        return conversation['id'];
      }
    }

    final newConversation = await createConversationBetweenUsers(
      currentUserId: currentUserId,
      otherUserId: otherUserId,
    );

    return newConversation?['id'];
  }

  Future<List<dynamic>?> getAvailableUsers() async {
    try {
      final QueryOptions options = QueryOptions(
        document: gql(getAvailableUsersQuery),
        fetchPolicy: FetchPolicy.networkOnly,
      );

      print('Exécution de la requête getAvailableUsers...');

      final QueryResult result = await client.query(options);

      if (result.hasException) {
        print('Erreur récupération users: ${result.exception}');
        print('Détails: ${result.exception?.graphqlErrors}');
        return null;
      }

      print('Données reçues: ${result.data}');

      if (result.data != null && result.data!['users'] != null) {
        final users = (result.data!['users'] as List?) ?? [];
        print('${users.length} utilisateurs récupérés');

        for (var user in users) {
          print(
            'User: ${user['id']} - ${user['firstName']} ${user['lastName']} - ${user['email']}',
          );
        }

        return users;
      } else {
        print('Aucun utilisateur trouvé ou structure de données incorrecte');
        return [];
      }
    } catch (e) {
      print('Erreur récupération users: $e');
      return null;
    }
  }

  Future<List<Map<String, dynamic>>> getMyConversations() async {
    const query = r'''
      query {
        getMyConversations {
          id
          title
          type
          updatedAt
          participants {
            user {
              id
              firstName
              lastName
              email
            }
          }
          messages {
            id
            content
            createdAt
            sender {
              id
              firstName
              lastName
            }
          }
        }
      }
    ''';

    final result = await client.query(QueryOptions(document: gql(query)));

    if (result.hasException) {
      print('Erreur GraphQL: ${result.exception.toString()}');
      throw Exception('Erreur lors de la récupération des conversations');
    }

    final data = result.data?['getMyConversations'] as List<dynamic>?;
    return data?.cast<Map<String, dynamic>>() ?? [];
  }
}
