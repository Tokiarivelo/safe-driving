# Message Reaction GraphQL API Reference

This document provides GraphQL queries and mutations for message reactions in the MessageResolver.

## Mutations

### 1. Add Message Reaction

Add a reaction to a message.

```graphql
mutation AddMessageReaction($input: AddReactionInput!) {
  addMessageReaction(input: $input) {
    success
    message
    reaction {
      id
      messageId
      userId
      type
      createdAt
      user {
        id
        firstName
        lastName
        username
      }
    }
    summary {
      messageId
      totalReactions
      reactions {
        type
        count
        userIds
        hasReacted
      }
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "messageId": "message-uuid-here",
    "type": "❤️"
  }
}
```

**Response Example:**

```json
{
  "data": {
    "addMessageReaction": {
      "success": true,
      "message": "Reaction added successfully",
      "reaction": {
        "id": "reaction-uuid",
        "messageId": "message-uuid",
        "userId": "user-uuid",
        "type": "❤️",
        "createdAt": "2025-10-21T10:30:00Z",
        "user": {
          "id": "user-uuid",
          "firstName": "John",
          "lastName": "Doe",
          "username": "johndoe"
        }
      },
      "summary": {
        "messageId": "message-uuid",
        "totalReactions": 3,
        "reactions": [
          {
            "type": "❤️",
            "count": 2,
            "userIds": ["user-uuid-1", "user-uuid-2"],
            "hasReacted": true
          },
          {
            "type": "👍",
            "count": 1,
            "userIds": ["user-uuid-3"],
            "hasReacted": false
          }
        ]
      }
    }
  }
}
```

---

### 2. Remove Message Reaction

Remove a specific reaction from a message.

```graphql
mutation RemoveMessageReaction($messageId: String!, $reactionType: String!) {
  removeMessageReaction(messageId: $messageId, reactionType: $reactionType) {
    success
    message
    summary {
      messageId
      totalReactions
      reactions {
        type
        count
        userIds
        hasReacted
      }
    }
  }
}
```

**Variables:**

```json
{
  "messageId": "message-uuid-here",
  "reactionType": "❤️"
}
```

**Response Example:**

```json
{
  "data": {
    "removeMessageReaction": {
      "success": true,
      "message": "Reaction removed successfully",
      "summary": {
        "messageId": "message-uuid",
        "totalReactions": 1,
        "reactions": [
          {
            "type": "👍",
            "count": 1,
            "userIds": ["user-uuid-3"],
            "hasReacted": false
          }
        ]
      }
    }
  }
}
```

---

### 3. Toggle Message Reaction

Toggle a reaction (add if not exists, remove if exists).

```graphql
mutation ToggleMessageReaction($messageId: String!, $reactionType: String!) {
  toggleMessageReaction(messageId: $messageId, reactionType: $reactionType) {
    success
    message
    reaction {
      id
      messageId
      userId
      type
      createdAt
    }
    summary {
      messageId
      totalReactions
      reactions {
        type
        count
        userIds
        hasReacted
      }
    }
  }
}
```

**Variables:**

```json
{
  "messageId": "message-uuid-here",
  "reactionType": "👍"
}
```

**Response Example (Added):**

```json
{
  "data": {
    "toggleMessageReaction": {
      "success": true,
      "message": "Reaction added successfully",
      "reaction": {
        "id": "new-reaction-uuid",
        "messageId": "message-uuid",
        "userId": "user-uuid",
        "type": "👍",
        "createdAt": "2025-10-21T10:35:00Z"
      },
      "summary": {
        "messageId": "message-uuid",
        "totalReactions": 2,
        "reactions": [...]
      }
    }
  }
}
```

**Response Example (Removed):**

```json
{
  "data": {
    "toggleMessageReaction": {
      "success": true,
      "message": "Reaction removed successfully",
      "reaction": null,
      "summary": {
        "messageId": "message-uuid",
        "totalReactions": 1,
        "reactions": [...]
      }
    }
  }
}
```

---

## Queries

### Get Message Reaction Summary

Get a summary of all reactions on a message, grouped by type.

```graphql
query GetMessageReactionSummary($messageId: String!) {
  getMessageReactionSummary(messageId: $messageId) {
    messageId
    totalReactions
    reactions {
      type
      count
      userIds
      hasReacted
    }
  }
}
```

**Variables:**

```json
{
  "messageId": "message-uuid-here"
}
```

**Response Example:**

```json
{
  "data": {
    "getMessageReactionSummary": {
      "messageId": "message-uuid",
      "totalReactions": 5,
      "reactions": [
        {
          "type": "❤️",
          "count": 3,
          "userIds": ["user1", "user2", "user3"],
          "hasReacted": true
        },
        {
          "type": "👍",
          "count": 2,
          "userIds": ["user4", "user5"],
          "hasReacted": false
        }
      ]
    }
  }
}
```

---

## Real-time Subscription Updates

When a reaction is added, removed, or toggled, the existing `messageEvent` subscription will receive updates:

```graphql
subscription OnMessageUpdated($conversationId: String, $rideId: String) {
  messageEvent(conversationId: $conversationId, rideId: $rideId) {
    type
    message {
      id
      # Reaction-specific fields
      reaction {
        id
        userId
        type
        createdAt
      }
      reactionRemoved {
        userId
        type
      }
      reactionToggled
      reactionSummary {
        messageId
        totalReactions
        reactions {
          type
          count
          userIds
          hasReacted
        }
      }
    }
  }
}
```

**Example Subscription Event (Reaction Added):**

```json
{
  "data": {
    "messageEvent": {
      "type": "MESSAGE_UPDATED",
      "message": {
        "id": "message-uuid",
        "reaction": {
          "id": "reaction-uuid",
          "userId": "user-uuid",
          "type": "❤️",
          "createdAt": "2025-10-21T10:40:00Z"
        },
        "reactionSummary": {
          "messageId": "message-uuid",
          "totalReactions": 4,
          "reactions": [
            {
              "type": "❤️",
              "count": 3,
              "userIds": ["user1", "user2", "user3"],
              "hasReacted": true
            }
          ]
        }
      }
    }
  }
}
```

**Example Subscription Event (Reaction Removed):**

```json
{
  "data": {
    "messageEvent": {
      "type": "MESSAGE_UPDATED",
      "message": {
        "id": "message-uuid",
        "reactionRemoved": {
          "userId": "user-uuid",
          "type": "❤️"
        },
        "reactionSummary": {
          "messageId": "message-uuid",
          "totalReactions": 2,
          "reactions": [...]
        }
      }
    }
  }
}
```

---

## Common Reaction Types

You can use emojis or text codes:

**Emojis:**

- `"❤️"` - Heart
- `"👍"` - Thumbs up
- `"👎"` - Thumbs down
- `"😂"` - Laughing
- `"😮"` - Surprised
- `"😢"` - Sad
- `"😡"` - Angry
- `"🔥"` - Fire
- `"🎉"` - Party
- `"🚩"` - Flag

**Text Codes:**

- `"like"`
- `"love"`
- `"laugh"`
- `"wow"`
- `"sad"`
- `"angry"`

---

## Error Handling

All mutations can return errors:

```json
{
  "errors": [
    {
      "message": "Message with ID abc123 not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

**Common Error Cases:**

- Message not found
- User already reacted with this type (for `addMessageReaction`)
- Reaction not found (for `removeMessageReaction`)
- Unauthorized access

---

## Client Implementation Example

### React with Apollo Client

```typescript
import { gql, useMutation, useQuery } from '@apollo/client';

const TOGGLE_REACTION = gql`
  mutation ToggleMessageReaction($messageId: String!, $reactionType: String!) {
    toggleMessageReaction(messageId: $messageId, reactionType: $reactionType) {
      success
      message
      summary {
        messageId
        totalReactions
        reactions {
          type
          count
          hasReacted
        }
      }
    }
  }
`;

const GET_REACTION_SUMMARY = gql`
  query GetMessageReactionSummary($messageId: String!) {
    getMessageReactionSummary(messageId: $messageId) {
      messageId
      totalReactions
      reactions {
        type
        count
        hasReacted
      }
    }
  }
`;

function MessageReactions({ messageId }) {
  const [toggleReaction] = useMutation(TOGGLE_REACTION);
  const { data } = useQuery(GET_REACTION_SUMMARY, {
    variables: { messageId }
  });

  const handleReaction = async (emoji) => {
    await toggleReaction({
      variables: {
        messageId,
        reactionType: emoji
      },
      refetchQueries: ['GetMessageReactionSummary']
    });
  };

  return (
    <div>
      {data?.getMessageReactionSummary?.reactions?.map(reaction => (
        <button
          key={reaction.type}
          onClick={() => handleReaction(reaction.type)}
          className={reaction.hasReacted ? 'active' : ''}
        >
          {reaction.type} {reaction.count}
        </button>
      ))}

      <button onClick={() => handleReaction('❤️')}>❤️</button>
      <button onClick={() => handleReaction('👍')}>👍</button>
      <button onClick={() => handleReaction('😂')}>😂</button>
    </div>
  );
}
```

---

## Performance Notes

1. **Caching**: Reaction summaries are cached in Redis for 1 hour
2. **Real-time**: All operations publish to PubSub for instant updates
3. **Optimistic Updates**: Consider using optimistic UI updates in your client
4. **Batching**: Use `toggleMessageReaction` instead of separate add/remove calls

---

## Testing in GraphQL Playground

1. Start your server
2. Navigate to GraphQL Playground (usually `http://localhost:3000/graphql`)
3. Add authentication header:
   ```json
   {
     "Authorization": "Bearer YOUR_JWT_TOKEN"
   }
   ```
4. Try the mutations and queries above!
