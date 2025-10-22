# Message Reaction Integration

This document describes the integration of the Reaction module into the Message service for handling reactions to messages with caching and real-time updates.

## Overview

Four new methods have been added to `MessageService` that integrate with `ReactionService` and provide:

- ✅ Cache management (Redis)
- ✅ Real-time updates (PubSub)
- ✅ Reaction summary caching
- ✅ Activity tracking

## New Methods in MessageService

### 1. `addMessageReaction(userId: string, input: AddReactionInput)`

Adds a reaction to a message with full cache and pubsub integration.

**Flow:**

1. Verifies message exists and gets context (conversationId/rideId)
2. Calls `ReactionService.addReaction()` to add the reaction
3. Invalidates message cache to reflect the new reaction
4. Caches the reaction summary in Redis (1 hour TTL)
5. Publishes reaction event to appropriate channel (conversation or ride)
6. Updates activity tracking

**Usage:**

```typescript
const result = await messageService.addMessageReaction(userId, {
  messageId: 'message-uuid',
  type: '❤️',
});
```

**PubSub Event:**

```typescript
{
  type: MessageEventType.MESSAGE_UPDATED,
  message: {
    id: messageId,
    reaction: { id, messageId, userId, type, createdAt },
    reactionSummary: { messageId, reactions: [...], totalReactions }
  }
}
```

### 2. `removeMessageReaction(userId: string, messageId: string, reactionType: string)`

Removes a reaction from a message.

**Flow:**

1. Verifies message exists
2. Calls `ReactionService.removeReaction()`
3. Invalidates message cache
4. Updates reaction summary cache
5. Publishes removal event to pubsub

**Usage:**

```typescript
const result = await messageService.removeMessageReaction(
  userId,
  'message-uuid',
  '❤️',
);
```

**PubSub Event:**

```typescript
{
  type: MessageEventType.MESSAGE_UPDATED,
  message: {
    id: messageId,
    reactionRemoved: { userId, type },
    reactionSummary: { ... }
  }
}
```

### 3. `toggleMessageReaction(userId: string, messageId: string, reactionType: string)`

Toggles a reaction (adds if not exists, removes if exists).

**Flow:**

1. Verifies message exists
2. Calls `ReactionService.toggleReaction()`
3. Invalidates message cache
4. Updates reaction summary cache
5. Publishes toggle event with action indicator ('added' or 'removed')

**Usage:**

```typescript
const result = await messageService.toggleMessageReaction(
  userId,
  'message-uuid',
  '👍',
);
```

**PubSub Event:**

```typescript
{
  type: MessageEventType.MESSAGE_UPDATED,
  message: {
    id: messageId,
    reactionToggled: 'added', // or 'removed'
    reaction: { ... }, // if added
    reactionSummary: { ... }
  }
}
```

### 4. `getMessageReactionSummary(messageId: string, userId?: string)`

Gets reaction summary for a message with caching.

**Flow:**

1. Checks Redis cache first (`message:{messageId}:reactions`)
2. If cached, returns immediately
3. If not cached, fetches from `ReactionService.getReactionSummary()`
4. Caches the result for 1 hour
5. Returns summary

**Usage:**

```typescript
const summary = await messageService.getMessageReactionSummary(
  'message-uuid',
  'user-uuid',
);
```

**Returns:**

```typescript
{
  messageId: string,
  reactions: [
    {
      type: '❤️',
      count: 5,
      userIds: ['user1', 'user2', ...],
      hasReacted: true
    }
  ],
  totalReactions: 5
}
```

## Cache Keys

### Message Cache Invalidation

When a reaction is added/removed/toggled:

```
messages:{roomId}:*
```

### Reaction Summary Cache

```
message:{messageId}:reactions
```

- TTL: 3600 seconds (1 hour)
- Contains: Full ReactionSummary object

### Activity Tracking

```
conversation:{conversationId}:lastActivity
ride:{rideId}:lastActivity
```

- TTL: 86400 seconds (24 hours)
- Contains: ISO timestamp

## PubSub Channels

### Conversation Messages

```
conversation_{conversationId}
```

### Ride Messages

```
ride_{rideId}
```

### Event Structure

```typescript
{
  messageEvent: {
    type: MessageEventType.MESSAGE_UPDATED,
    message: {
      id: string,
      reaction?: Reaction,
      reactionRemoved?: { userId: string, type: string },
      reactionToggled?: 'added' | 'removed',
      reactionSummary: ReactionSummary
    }
  }
}
```

## Module Integration

The `MessageModule` now imports `ReactionModule`:

```typescript
@Module({
  providers: [MessageService, MessageResolver, ChatGateway, ChatCacheService],
  imports: [PrismaModule, AuthModule, RedisModule, ReactionModule],
  exports: [MessageService, ChatGateway],
})
export class MessageModule {}
```

## Usage Examples

### In a Resolver or Controller

```typescript
import { MessageService } from 'src/message/messages.service';

@Resolver()
export class SomeResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => ReactionActionResult)
  @UseGuards(JwtAuthGuard)
  async reactToMessage(
    @CurrentUser() user: User,
    @Args('messageId') messageId: string,
    @Args('emoji') emoji: string,
  ) {
    return this.messageService.addMessageReaction(user.id, {
      messageId,
      type: emoji,
    });
  }

  @Query(() => ReactionSummary)
  async getMessageReactions(
    @Args('messageId') messageId: string,
    @CurrentUser() user: User,
  ) {
    return this.messageService.getMessageReactionSummary(messageId, user.id);
  }
}
```

### Client-side Real-time Updates

Subscribe to message events to get real-time reaction updates:

```typescript
subscription OnMessageUpdated($conversationId: String!) {
  messageEvent(conversationId: $conversationId) {
    type
    message {
      id
      reaction {
        id
        type
        userId
      }
      reactionSummary {
        totalReactions
        reactions {
          type
          count
          hasReacted
        }
      }
    }
  }
}
```

## Performance Considerations

1. **Cache First**: Reaction summaries are cached for 1 hour to reduce database queries
2. **Selective Invalidation**: Only invalidates relevant message caches
3. **Optimized Queries**: ReactionService uses indexed fields and selective includes
4. **Real-time Efficiency**: PubSub events only sent to relevant channels

## Error Handling

All methods throw appropriate errors:

- `NotFoundException`: When message doesn't exist
- `Error`: For validation or business logic errors

These are propagated from the `ReactionService` and can be caught by GraphQL error handlers.

## Future Enhancements

- [ ] Batch reaction operations for multiple messages
- [ ] Reaction notifications to message sender
- [ ] Reaction analytics and trending
- [ ] Rate limiting on reactions per user
- [ ] Reaction animation/sound preferences
