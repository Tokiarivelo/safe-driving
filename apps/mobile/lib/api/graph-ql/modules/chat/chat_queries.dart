const String getMessagesQuery = r'''
query GetMessages($conversationId: String, $rideId: String, $cursor: String, $limit: Int) {
  messages(conversationId: $conversationId, rideId: $rideId, cursor: $cursor, limit: $limit) {
    id
    content
    senderId
    conversationId
    rideId
    createdAt
    deliveredAt
    readAt
    sender {
      id
      firstName
      lastName
      email
    }
    replies {
      id
      content
      senderId
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

const String getConversationsQuery = r'''
query GetConversations {
  conversations {
    id
    type
    lastMessage {
      id
      content
      createdAt
    }
    participants {
      id
      firstName
      lastName
    }
  }
}
''';

const String getUnreadCountQuery = r'''
query GetUnreadCount($userId: String!, $conversationId: String, $rideId: String) {
  unreadCount(userId: $userId, conversationId: $conversationId, rideId: $rideId)
}
''';
