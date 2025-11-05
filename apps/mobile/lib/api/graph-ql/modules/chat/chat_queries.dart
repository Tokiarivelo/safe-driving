const String getMessagesQuery = r'''
query GetMessages($conversationId: String!) {
  messages(conversationId: $conversationId) {
    id
    content
    senderId
    conversationId
    createdAt
    sender {
      id
      firstName
      lastName
      email
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

const String UserConversations = r''' 
  query UserConversations($limit: Int, $cursor: String) {
    userConversations(limit: $limit, cursor: $cursor) {
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
      hasNextPage
      cursor
    }
  }

''';

const String getUnreadCountQuery = r'''
query GetUnreadCount($userId: String!, $conversationId: String, $rideId: String) {
  unreadCount(userId: $userId, conversationId: $conversationId, rideId: $rideId)
}
''';

const String getAvailableUsersQuery = r''' 
  query GetAvailableUsers{
    users{
      id
      email
      firstName
      lastName
    }
  }
''';
