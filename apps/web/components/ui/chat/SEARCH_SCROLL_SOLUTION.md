# Search & Scroll to Message Solution

## Problem

When a user searches for a message that isn't currently loaded in the chat view, clicking on the search result doesn't scroll to the message because it's not in the DOM.

## Current Solution (Frontend-Only)

### How It Works

1. **Check if message is loaded**: When user clicks a search result, we first check if the message exists in the currently loaded messages
2. **Load message context**: If not loaded, we attempt to load messages around that timestamp using the `fetchMore` query with the message's `createdAt` date as cursor
3. **Multiple attempts**: We make up to 2 attempts to load the message, fetching 50 messages each time
4. **Scroll after loading**: Once the message is loaded, we scroll to it and highlight it

### Implementation

#### 1. Chat Component (`chat.tsx`)

```typescript
const handleMessageClick = async (messageId: string, messageDate: string) => {
  const messageExists = messages.find(m => m.id === messageId);

  if (messageExists) {
    // Message already loaded, just scroll
    setScrollToMessageId(messageId);
  } else {
    // Try to load the message
    const loaded = await onLoadMessageContext(messageId, messageDate);
    if (loaded) {
      // Wait for render, then scroll
      setTimeout(() => {
        setScrollToMessageId(messageId);
      }, 500);
    } else {
      alert('Impossible de charger le message...');
    }
  }
};
```

#### 2. useMessages Hook (`useMessages.ts`)

```typescript
const loadMessageContext = useCallback(
  async (messageId: string, messageDate: string): Promise<boolean> => {
    // Attempt 1: Load 50 messages around the date
    const result = await fetchMore({
      variables: { cursor: messageDate, limit: 50 },
    });

    const messageLoaded = result.data.messages.some(m => m.id === messageId);

    if (!messageLoaded && result.data.messages.length >= 50) {
      // Attempt 2: Load 50 more older messages
      const earliestMessage = result.data.messages[result.data.messages.length - 1];
      const secondResult = await fetchMore({
        variables: { cursor: earliestMessage.createdAt, limit: 50 },
      });
      return secondResult.data.messages.some(m => m.id === messageId);
    }

    return messageLoaded;
  },
  [fetchMore],
);
```

#### 3. Search Component (`chat-search.tsx`)

```typescript
// Pass both messageId and messageDate to handler
onClick={() => {
  onMessageClick(message.id, message.createdAt);
  onClose();
}}
```

### Flow Diagram

```
User clicks search result
        ↓
Is message loaded?
        ↓
   Yes         No
    ↓           ↓
Scroll to   Load 50 messages
  message   around date
              ↓
        Message found?
              ↓
         Yes       No
          ↓         ↓
       Scroll    Load 50 more
      to msg     older msgs
                    ↓
              Message found?
                    ↓
               Yes       No
                ↓         ↓
             Scroll    Show error
            to msg     message
```

## Limitations of Current Solution

1. **Not guaranteed to find**: If message is very old and not within 100 messages of current view, it won't be found
2. **Performance**: Loading 50-100 messages can be slow
3. **Network overhead**: Multiple fetchMore calls
4. **UX**: User has to wait for loading

## Recommended Backend Solution

### Option 1: Get Messages Around Timestamp (Easier)

Add a new query that fetches messages before and after a specific timestamp:

```graphql
query GetMessagesAroundDate(
  $conversationId: String
  $rideId: String
  $targetDate: String!
  $beforeLimit: Int = 25
  $afterLimit: Int = 25
) {
  messagesAroundDate(
    conversationId: $conversationId
    rideId: $rideId
    targetDate: $targetDate
    beforeLimit: $beforeLimit
    afterLimit: $afterLimit
  ) {
    ...messageFragment
  }
}
```

**Backend Implementation:**

```typescript
async messagesAroundDate(
  conversationId: string,
  targetDate: string,
  beforeLimit: number,
  afterLimit: number
) {
  const messagesBefore = await this.messageRepository.find({
    where: {
      conversationId,
      createdAt: LessThan(targetDate),
    },
    order: { createdAt: 'DESC' },
    take: beforeLimit,
  });

  const messagesAfter = await this.messageRepository.find({
    where: {
      conversationId,
      createdAt: GreaterThanOrEqual(targetDate),
    },
    order: { createdAt: 'ASC' },
    take: afterLimit,
  });

  return [...messagesBefore.reverse(), ...messagesAfter];
}
```

### Option 2: Get Message by ID with Context (Better)

Add a query that returns a specific message with surrounding context:

```graphql
query GetMessageWithContext($messageId: String!, $beforeCount: Int = 25, $afterCount: Int = 25) {
  messageWithContext(messageId: $messageId, beforeCount: $beforeCount, afterCount: $afterCount) {
    message {
      ...messageFragment
    }
    messagesBefore {
      ...messageFragment
    }
    messagesAfter {
      ...messageFragment
    }
  }
}
```

**Backend Implementation:**

```typescript
async getMessageWithContext(
  messageId: string,
  beforeCount: number,
  afterCount: number
) {
  const targetMessage = await this.messageRepository.findOne({
    where: { id: messageId },
  });

  if (!targetMessage) {
    throw new NotFoundException('Message not found');
  }

  const messagesBefore = await this.messageRepository.find({
    where: {
      conversationId: targetMessage.conversationId,
      createdAt: LessThan(targetMessage.createdAt),
    },
    order: { createdAt: 'DESC' },
    take: beforeCount,
  });

  const messagesAfter = await this.messageRepository.find({
    where: {
      conversationId: targetMessage.conversationId,
      createdAt: GreaterThan(targetMessage.createdAt),
    },
    order: { createdAt: 'ASC' },
    take: afterCount,
  });

  return {
    message: targetMessage,
    messagesBefore: messagesBefore.reverse(),
    messagesAfter,
  };
}
```

### Frontend Implementation with Backend Support

```typescript
const loadMessageContext = useCallback(
  async (messageId: string, messageDate: string): Promise<boolean> => {
    try {
      // Use new backend query
      const result = await getMessageWithContext({
        variables: {
          messageId,
          beforeCount: 25,
          afterCount: 25,
        },
      });

      // Merge with existing messages
      updateQuery(prev => ({
        ...prev,
        messages: mergeMessages([
          ...prev.messages,
          ...result.data.messageWithContext.messagesBefore,
          result.data.messageWithContext.message,
          ...result.data.messageWithContext.messagesAfter,
        ]),
      }));

      return true;
    } catch (error) {
      console.error('Failed to load message context:', error);
      return false;
    }
  },
  [getMessageWithContext, updateQuery],
);
```

## Comparison

| Aspect              | Current (Frontend Only) | Option 1 (Around Date) | Option 2 (With Context) |
| ------------------- | ----------------------- | ---------------------- | ----------------------- |
| **Reliability**     | ⚠️ Not guaranteed       | ✅ Reliable            | ✅ Guaranteed           |
| **Performance**     | ⚠️ 2 queries, 100 msgs  | ✅ 1 query, 50 msgs    | ✅ 1 query, 50 msgs     |
| **Network**         | ❌ High overhead        | ✅ Optimized           | ✅ Optimized            |
| **UX**              | ⚠️ Slow, may fail       | ✅ Fast                | ✅ Fastest              |
| **Backend Changes** | ✅ None needed          | ⚠️ New query           | ⚠️ New query            |
| **Complexity**      | ✅ Simple               | ⚠️ Moderate            | ⚠️ Moderate             |

## Recommendation

**For Production**: Implement **Option 2 (Get Message by ID with Context)**

- Most reliable
- Best UX
- Guarantees message is found
- Returns exactly what's needed
- Can be cached efficiently

**For Now**: The current frontend solution works as a temporary measure but should be replaced with a proper backend implementation for production use.

## Migration Path

1. ✅ **Phase 1 (Current)**: Frontend-only solution with `fetchMore`
2. **Phase 2**: Add backend `messageWithContext` query
3. **Phase 3**: Update frontend to use new query
4. **Phase 4**: Remove old workaround code

## Testing the Current Solution

```typescript
// 1. Search for a very recent message (should work immediately)
// 2. Search for a message 30 messages back (should work after 1 load)
// 3. Search for a message 60 messages back (should work after 2 loads)
// 4. Search for a message 150 messages back (will fail, show alert)
```

## Notes

- Current solution loads up to 100 messages max (2 attempts × 50 messages)
- Messages are cached in Apollo, so repeated searches are fast
- Highlighting timeout is 2 seconds for visibility
- 500ms delay before scrolling allows DOM to update
