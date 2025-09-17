// import 'package:safe_driving/api/graph-ql/client/graphql_client.dart';
// import 'package:safe_driving/api/graph-ql/modules/chat/chat_mutations.dart';
// import 'package:safe_driving/api/graph-ql/modules/chat/chat_queries.dart';

// class ChatRepository {
//   final GraphQLClientWrapper _client;

//   ChatRepository(this._client);

//   Future<List<dynamic>> getMessages({
//     String? conversationId,
//     String? rideId,
//     String? cursor,
//     int limit = 20,
//   }) async {
//     final result = await _client.executeQuery(
//       document: getMessagesQuery,
//       variables: {
//         'conversationId': conversationId,
//         'rideId': rideId,
//         'cursor': cursor,
//         'limit': limit,
//       },
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['messages'] ?? [];
//   }

//   Future<dynamic> sendMessage(Map<String, dynamic> input) async {
//     final result = await _client.executeMutation(
//       document: sendMessageMutation,
//       variables: {'input': input},
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['sendMessage'];
//   }

//   Future<dynamic> editMessage(String messageId, String content) async {
//     final result = await _client.executeMutation(
//       document: editMessageMutation,
//       variables: {'messageId': messageId, 'content': content},
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['editMessage'];
//   }

//   Future<dynamic> deleteMessage(String messageId) async {
//     final result = await _client.executeMutation(
//       document: deleteMessageMutation,
//       variables: {'messageId': messageId},
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['deleteMessage'];
//   }

//   Future<dynamic> markAsDelivered(String messageId) async {
//     final result = await _client.executeMutation(
//       document: markMessageAsDeliveredMutation,
//       variables: {'messageId': messageId},
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['markMessageAsDelivered'];
//   }

//   Future<dynamic> markAsRead(String messageId, String userId) async {
//     final result = await _client.executeMutation(
//       document: markMessageAsReadMutation,
//       variables: {'messageId': messageId, 'userId': userId},
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['markMessageAsRead'];
//   }

//   Future<int> getUnreadCount(
//     String userId, {
//     String? conversationId,
//     String? rideId,
//   }) async {
//     final result = await _client.executeQuery(
//       document: getUnreadCountQuery,
//       variables: {
//         'userId': userId,
//         'conversationId': conversationId,
//         'rideId': rideId,
//       },
//     );

//     if (result['success'] == false) {
//       throw Exception(result['message']);
//     }

//     return result['unreadCount'] ?? 0;
//   }
// }
