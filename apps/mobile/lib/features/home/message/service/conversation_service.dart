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
        fetchPolicy: FetchPolicy.cacheAndNetwork,
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
            '👤 User: ${user['id']} - ${user['firstName']} ${user['lastName']} - ${user['email']}',
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

  Future<void> debugGraphQLSetup() async {
    print('🔧 DEBUG GRAPHQL CLIENT');

    // Vérifier si le client est null
    if (client == null) {
      print('❌ CLIENT GRAPHQL EST NULL');
      return;
    }

    print('✅ Client GraphQL existe');

    // Vérifier la configuration du client
    try {
      // Test avec une requête très simple
      const testQuery = r'query { __typename }';

      print('🧪 Test requête __typename...');
      final result = await client.query(
        QueryOptions(
          document: gql(testQuery),
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      print('📊 Résultat __typename: ${result.data}');
      print('❌ Erreurs __typename: ${result.exception}');

      if (result.hasException) {
        print('🔍 Détails erreur:');
        print('   - Exception: ${result.exception}');
        print('   - GraphQL Errors: ${result.exception?.graphqlErrors}');
        print('   - Link Exception: ${result.exception?.linkException}');
      }
    } catch (e) {
      print('💥 Erreur test GraphQL: $e');
    }
  }

  Future<List<Map<String, dynamic>>> getMyConversations() async {
    const query = r'''
    query GetMyConversations {
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

    try {
      print('🔍 Envoi de la requête getMyConversations...');
      final result = await client.query(
        QueryOptions(
          document: gql(query),
          fetchPolicy: FetchPolicy.networkOnly,
        ),
      );

      if (result.hasException) {
        print('❌ Erreur GraphQL: ${result.exception}');

        // Debug détaillé des erreurs
        if (result.exception?.graphqlErrors != null) {
          for (var error in result.exception!.graphqlErrors) {
            print('📌 Erreur GraphQL: ${error.message}');
            print('📍 Chemin: ${error.path}');
            print('🔧 Extensions: ${error.extensions}');
          }
        }

        // Retourner une liste vide au lieu de throw
        return [];
      }

      final data = result.data;
      print('📊 Données reçues: $data');

      if (data == null || data['getMyConversations'] == null) {
        print('⚠️ Aucune donnée dans getMyConversations');
        return [];
      }

      final conversations = data['getMyConversations'] as List;
      print('✅ ${conversations.length} conversation(s) récupérée(s)');

      // Conversion sécurisée
      final List<Map<String, dynamic>> resultList = [];
      for (var item in conversations) {
        if (item is Map<String, dynamic>) {
          resultList.add(item);
        }
      }

      return resultList;
    } catch (e, stack) {
      print('💥 Exception dans getMyConversations: $e');
      print('Stack: $stack');
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getMyConversationsSimple() async {
    const query = r'''
    query GetMyConversations {
      getMyConversations {
        id
        title
        participants {
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  ''';

    try {
      print('🔍 Envoi de la requête getMyConversations (version simple)...');
      final result = await client.query(
        QueryOptions(
          document: gql(query),
          fetchPolicy: FetchPolicy.networkOnly,
        ),
      );

      if (result.hasException) {
        print('❌ Erreur GraphQL (simple): ${result.exception}');
        return [];
      }

      final data = result.data;
      print('📊 Données reçues (simple): $data');

      if (data == null || data['getMyConversations'] == null) {
        print('⚠️ Aucune donnée dans getMyConversations (simple)');
        return [];
      }

      final conversations = data['getMyConversations'] as List;
      return conversations.cast<Map<String, dynamic>>();
    } catch (e) {
      print('💥 Exception (simple): $e');
      return [];
    }
  }

  // Dans ConversationService
  Future<void> discoverAvailableQueries() async {
    const introspectionQuery = r'''
    query {
      __schema {
        queryType {
          fields {
            name
            description
            type {
              name
              kind
            }
          }
        }
      }
    }
  ''';

    try {
      print('🔍 Recherche des queries disponibles...');
      final result = await client.query(
        QueryOptions(
          document: gql(introspectionQuery),
          fetchPolicy: FetchPolicy.networkOnly,
        ),
      );

      if (result.hasException) {
        print('❌ Erreur introspection: ${result.exception}');
        return;
      }

      final fields = result.data?['__schema']?['queryType']?['fields'] as List?;
      if (fields != null) {
        final queryNames = fields
            .map<String>((f) => f['name'] as String)
            .toList();
        print('📋 QUERIES DISPONIBLES:');
        for (var name in queryNames) {
          print('   - $name');
        }

        // Chercher des queries liées aux conversations
        final conversationQueries = queryNames
            .where(
              (name) =>
                  name.toLowerCase().contains('conversation') ||
                  name.toLowerCase().contains('chat') ||
                  name.toLowerCase().contains('message'),
            )
            .toList();

        if (conversationQueries.isNotEmpty) {
          print('🎯 QUERIES DE CONVERSATIONS:');
          for (var query in conversationQueries) {
            print('   ✅ $query');
          }
        } else {
          print('❌ Aucune query de conversation trouvée');
        }
      }
    } catch (e) {
      print('💥 Erreur introspection: $e');
    }
  }
}
