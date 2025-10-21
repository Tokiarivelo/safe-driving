// ignore_for_file: constant_identifier_names

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

const String newMessageSubscription = r''' 
  subscription NewMessage($conversationId: String!) {
    newMessage(conversationId: $conversationId) {
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
      lastMessage {
        id
        content
        createdAt
        senderId
      }
      participants {
        user {
          id
          firstName
          lastName
          email
        }
      }
    }
    hasNextPage
    cursor
  }
}


''';
const String GetUserConversations = r''' 
 query GetUserConversations($userId: String!) {
  userConversations(userId: $userId) {
    id
    participants {
      id
      firstName
      lastName
      email
    }
    messages(orderBy: { createdAt: desc }, take: 1) {
      id
      content
      createdAt
      senderId
    }
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
