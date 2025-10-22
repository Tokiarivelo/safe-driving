# Reaction Module

This module handles reactions to messages in the GraphQL server. Users can add, remove, and toggle reactions (emojis or codes like "like", "laugh") on messages.

## Features

- ✅ Add reactions to messages
- ✅ Remove reactions from messages
- ✅ Toggle reactions (add if not exists, remove if exists)
- ✅ Get reaction summary (grouped by type)
- ✅ Get all reactions for a message
- ✅ Get all reactions by a user
- ✅ Get users who reacted with a specific type
- ✅ Unique constraint: One reaction per user per type per message
- ✅ Full GraphQL API with mutations and queries
- ✅ JWT authentication protected

## Database Schema

The `Reaction` model in Prisma:

```prisma
model Reaction {
  id        String   @id @default(uuid())
  messageId String
  userId    String
  type      String   // ex: "❤️", "👍", "🚩" or "like", "laugh"
  createdAt DateTime @default(now())

  message Message @relation(fields: [messageId], references: [id])
  user    User    @relation(fields: [userId], references: [id])

  @@unique([messageId, userId, type])
  @@index([messageId])
  @@index([userId])
}
```

## GraphQL API

### Mutations

#### Add Reaction

```graphql
mutation AddReaction($input: AddReactionInput!) {
  addReaction(input: $input) {
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
  "input": {
    "messageId": "message-uuid",
    "type": "❤️"
  }
}
```

#### Remove Reaction

```graphql
mutation RemoveReaction($input: RemoveReactionInput!) {
  removeReaction(input: $input) {
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
```

**Variables:**

```json
{
  "input": {
    "messageId": "message-uuid",
    "type": "❤️"
  }
}
```

#### Toggle Reaction

```graphql
mutation ToggleReaction($input: ToggleReactionInput!) {
  toggleReaction(input: $input) {
    success
    message
    reaction {
      id
      type
    }
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
```

#### Remove All Reactions from Message

```graphql
mutation RemoveAllReactionsFromMessage($messageId: String!) {
  removeAllReactionsFromMessage(messageId: $messageId)
}
```

### Queries

#### Get Reactions by Message

```graphql
query GetReactionsByMessage($messageId: String!) {
  getReactionsByMessage(messageId: $messageId) {
    id
    type
    createdAt
    user {
      id
      firstName
      lastName
      username
    }
  }
}
```

#### Get Reaction Summary

```graphql
query GetReactionSummary($messageId: String!) {
  getReactionSummary(messageId: $messageId) {
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

#### Get Reactions by User

```graphql
query GetReactionsByUser($limit: Int) {
  getReactionsByUser(limit: $limit) {
    id
    type
    createdAt
    messageId
    message {
      id
      content
    }
  }
}
```

#### Get Users by Reaction Type

```graphql
query GetUsersByReactionType($messageId: String!, $type: String!) {
  getUsersByReactionType(messageId: $messageId, type: $type) {
    id
    type
    user {
      id
      firstName
      lastName
      username
      avatar {
        url
      }
    }
  }
}
```

#### Get Reaction Stats

```graphql
query GetReactionStats($messageId: String!) {
  getReactionStats(messageId: $messageId) {
    type
    count
  }
}
```

## Service Methods

The `ReactionService` provides the following methods:

### `addReaction(userId: string, input: AddReactionInput)`

Adds a reaction to a message. Returns `ReactionActionResult`.

### `removeReaction(userId: string, input: RemoveReactionInput)`

Removes a reaction from a message. Returns `ReactionActionResult`.

### `toggleReaction(userId: string, input: ToggleReactionInput)`

Toggles a reaction (adds if not exists, removes if exists). Returns `ReactionActionResult`.

### `getReactionsByMessage(messageId: string)`

Gets all reactions for a specific message. Returns `Reaction[]`.

### `getReactionSummary(messageId: string, currentUserId?: string)`

Gets reactions grouped by type with counts. Returns `ReactionSummary`.

### `getReactionsByUser(userId: string, limit = 50)`

Gets all reactions made by a user. Returns `Reaction[]`.

### `getReactionStats(messageId: string)`

Gets reaction statistics (type and count) for a message.

### `removeAllReactionsFromMessage(messageId: string)`

Removes all reactions from a message. Returns count of deleted reactions.

### `getUsersByReactionType(messageId: string, type: string)`

Gets all users who reacted with a specific type to a message.

## Usage Examples

### In a Component/Service

```typescript
import { ReactionService } from 'src/reaction';

@Injectable()
export class SomeService {
  constructor(private readonly reactionService: ReactionService) {}

  async reactToMessage(userId: string, messageId: string, emoji: string) {
    return this.reactionService.addReaction(userId, {
      messageId,
      type: emoji,
    });
  }
}
```

### Common Reaction Types

You can use:

- Emojis: `"❤️"`, `"👍"`, `"👎"`, `"😂"`, `"😢"`, `"😮"`, `"🚩"`
- Codes: `"like"`, `"love"`, `"laugh"`, `"sad"`, `"angry"`, `"wow"`

## Authentication

All endpoints are protected with `@UseGuards(JwtAuthGuard)`. Users must be authenticated to add, remove, or query reactions.

## Error Handling

The service throws appropriate exceptions:

- `NotFoundException`: When message or reaction doesn't exist
- `BadRequestException`: For invalid inputs (can be extended)

## Integration

The `ReactionModule` is already integrated into the main `AppModule`. To use it:

1. Import in your module:

```typescript
import { ReactionModule } from 'src/reaction';

@Module({
  imports: [ReactionModule],
  // ...
})
```

2. Inject the service:

```typescript
constructor(private readonly reactionService: ReactionService) {}
```

## Performance Considerations

- Indexes are set on `messageId` and `userId` for fast lookups
- Unique constraint on `[messageId, userId, type]` prevents duplicate reactions
- The `getReactionSummary` method efficiently groups reactions in memory
- Queries include only necessary fields with proper `select` statements

## Future Enhancements

- [ ] Real-time reaction updates via WebSocket/GraphQL subscriptions
- [ ] Reaction rate limiting per user
- [ ] Reaction analytics and trending
- [ ] Custom reaction sets per workspace/conversation
- [ ] Reaction notifications
