const String sendMessageMutation = r'''
mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    id
    content
    senderId
    conversationId
    rideId
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

const String editMessageMutation = r'''
mutation EditMessage($messageId: String!, $content: String!) {
  editMessage(messageId: $messageId, content: $content) {
    id
    content
    edited
    editedAt
  }
}
''';

const String deleteMessageMutation = r'''
mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId) {
    id
    deleted
    deletedAt
  }
}
''';

const String markMessageAsDeliveredMutation = r'''
mutation MarkMessageAsDelivered($messageId: String!) {
  markMessageAsDelivered(messageId: $messageId) {
    id
    deliveredAt
    state
  }
}
''';

const String markMessageAsReadMutation = r'''
mutation MarkMessageAsRead($messageId: String!, $userId: String!) {
  markMessageAsRead(messageId: $messageId, userId: $userId) {
    id
    readAt
  }
}
''';
