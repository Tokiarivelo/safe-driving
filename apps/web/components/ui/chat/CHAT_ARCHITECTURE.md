# Chat Component Architecture

## Overview

The chat component has been completely refactored into a modular, explicit architecture with clear separation of concerns. New messages now appear at the **bottom** of the chat list (like traditional messaging apps), and the component automatically scrolls to show new messages when the user is near the bottom.

## Component Structure

### 1. **Chat.tsx** (Main Container)

The main orchestrator component that manages state and coordinates all child components.

**Responsibilities:**

- State management (reply, search, scroll-to-message)
- Message action handlers (reply, edit, delete, react)
- Error handling
- Coordinating child components

**Props:**

```typescript
interface ChatProps {
  conversation?: UserConversation;
  rideId?: string;
  currentUserId: string;
  className?: string;
  // Message data
  messages: MessageFragmentFragment[];
  loading: boolean;
  error?: { message: string } | null;
  hasMore: boolean;
  connected: boolean;
  // Message actions
  onSendMessage: (content: string, parentMessageId?: string, attachmentIds?: string[]) => Promise<...>;
  onLoadMore: () => Promise<void>;
  onEditMessage?: (messageId: string, content: string, attachmentIds?: string[]) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  onReactToMessage?: (messageId: string, emoji: string) => Promise<void>;
}
```

### 2. **ChatHeader.tsx**

Displays conversation information and controls.

**Features:**

- Conversation title
- Connection status indicator
- Participant count and avatars
- Search button
- More options menu

**Props:**

```typescript
interface ChatHeaderProps {
  conversation?: UserConversation;
  rideId?: string;
  connected: boolean;
  onSearchClick: () => void;
}
```

### 3. **ChatSearch.tsx**

Full-screen search overlay for finding messages.

**Features:**

- Real-time search with debouncing (300ms)
- Uses `useSearchMessagesLazyQuery` GraphQL hook
- Pagination support
- Click to navigate to message
- Auto-highlights searched message for 2 seconds

**Props:**

```typescript
interface ChatSearchProps {
  onClose: () => void;
  onMessageClick: (messageId: string) => void;
}
```

**Search Flow:**

1. User types query (min 2 characters)
2. 300ms debounce delay
3. GraphQL query executes
4. Results displayed with sender, content preview, and date
5. Click result → scroll to message in chat → highlight for 2s

### 4. **ChatMessagesList.tsx**

Manages message rendering and scroll behavior.

**Features:**

- **Smart Auto-Scroll**: Only auto-scrolls on new messages if user is near bottom
- **Load More**: Button at top to load older messages
- **Scroll to Bottom Button**: Appears when user scrolls up
- **Message Highlighting**: Highlights searched messages
- **Optimized Rendering**: Smooth scrolling and transitions

**Props:**

```typescript
interface ChatMessagesListProps {
  messages: MessageFragmentFragment[];
  loading: boolean;
  hasMore: boolean;
  currentUserId: string;
  onLoadMore: () => Promise<void>;
  onReply: (messageId: string) => void;
  onEdit: (messageId: string, content: string, attachmentIds?: string[]) => Promise<void>;
  onDelete: (messageId: string) => Promise<void>;
  onReact: (messageId: string, emoji: string) => Promise<void>;
  scrollToMessageId?: string | null;
}
```

**Scroll Behavior:**

- **New Messages**: Auto-scrolls to bottom if user was already near bottom (within 100px)
- **User Scrolled Up**: Shows "scroll to bottom" button, doesn't auto-scroll
- **Load More**: Maintains scroll position when loading older messages
- **Search Result**: Smoothly scrolls to and highlights the found message

## Message Flow

### Message Display Order

```
┌─────────────────────────┐
│     Chat Header         │
├─────────────────────────┤
│ [Load More Button]      │ ← Load older messages
│                         │
│ Oldest Message          │ ↑
│ ...                     │ │
│ ...                     │ │ Time flows down
│ ...                     │ │
│ Newest Message          │ ↓
│                         │
│ [Scroll to Bottom]      │ ← Floating button (when scrolled up)
├─────────────────────────┤
│  Message Input          │
└─────────────────────────┘
```

### Auto-Scroll Logic

```typescript
// Only auto-scroll if user is near bottom (within 100px)
const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

if (newMessageArrived && isNearBottom) {
  scrollToBottom(smooth: true);
} else {
  showScrollButton(true);
}
```

## Search Feature

### GraphQL Query

Uses `useSearchMessagesLazyQuery` from generated GraphQL:

```graphql
query SearchMessages($q: String!, $size: Int!, $page: Int!) {
  searchMessages(q: $q, size: $size, page: $page) {
    total
    hits {
      _id
      _index
      _score
      _source {
        id
        content
        createdAt
        sender {
          firstName
          lastName
        }
      }
    }
  }
}
```

### Search Response Structure

```typescript
{
  searchMessages: {
    total: number; // Total number of results
    hits: Array<{
      _id: string;
      _score: number; // Relevance score
      _source: {
        // Actual message data
        id: string;
        content: string;
        createdAt: string;
        sender: {
          firstName: string;
          lastName: string;
        };
      };
    }>;
  }
}
```

## Key Improvements

### 1. **Modular Architecture**

- Each component has a single, clear responsibility
- Easy to test and maintain
- Reusable components

### 2. **Explicit Code Structure**

- Clear prop interfaces
- Separated concerns (header, search, messages, input)
- Self-documenting component names

### 3. **Better User Experience**

- Smart auto-scroll (doesn't interrupt reading)
- Search functionality with highlighting
- Smooth transitions and animations
- Clear visual feedback

### 4. **Performance**

- Debounced search (300ms)
- Lazy query execution
- Pagination support
- Optimized re-renders

## Usage Example

```tsx
import { Chat } from '@/components/ui/chat/chat';
import { useMessages } from './hooks/useMessages';

function ChatContainer({ conversationId }: { conversationId: string }) {
  const {
    messages,
    loading,
    error,
    hasMore,
    connected,
    sendMessage,
    loadMore,
    editMessage,
    deleteMessage,
    reactToMessage,
  } = useMessages(conversationId);

  return (
    <Chat
      conversation={conversation}
      currentUserId={currentUser.id}
      messages={messages}
      loading={loading}
      error={error}
      hasMore={hasMore}
      connected={connected}
      onSendMessage={sendMessage}
      onLoadMore={loadMore}
      onEditMessage={editMessage}
      onDeleteMessage={deleteMessage}
      onReactToMessage={reactToMessage}
    />
  );
}
```

## File Structure

```
components/ui/chat/
├── chat.tsx                    # Main container
├── chat-header.tsx             # Header component
├── chat-search.tsx             # Search overlay
├── chat-messages-list.tsx      # Messages list with scroll
├── message-bubble.tsx          # Individual message display
├── message-input.tsx           # Message input with attachments
├── emoji-picker.tsx            # Emoji picker
├── gif-picker.tsx              # GIF picker
├── LinkPreviewViewer.tsx       # Link preview
└── typing-indicator/           # Typing indicator
```

## Features Summary

✅ **Search Messages** - Full-text search with highlighting  
✅ **Smart Auto-Scroll** - Only scrolls when user is at bottom  
✅ **Load More** - Pagination for older messages  
✅ **Scroll to Bottom** - Quick navigation button  
✅ **Message Highlighting** - Visual feedback for search results  
✅ **Modular Components** - Clean, maintainable architecture  
✅ **Explicit Code** - Clear separation of concerns  
✅ **Bottom-Up Messages** - New messages appear at bottom

## Next Steps

Potential future enhancements:

1. Virtual scrolling for very long message lists
2. Message threading view
3. Advanced search filters (date range, sender, etc.)
4. Message bookmarks/pins
5. Export conversation history
