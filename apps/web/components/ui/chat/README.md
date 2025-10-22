# Chat Features - Emoji & GIF Support

This document explains the emoji and GIF features added to the chat system.

## Features

### 1. Emoji Reactions

- **Add reactions to messages**: Click the smile icon on any message hover action to add emoji reactions
- **Grouped reactions**: Multiple reactions of the same type are grouped with a count
- **Toggle reactions**: Click on a reaction to add/remove it
- **Visual feedback**: Your own reactions are highlighted in blue

### 2. Emoji Picker in Message Input

- **Insert emojis**: Click the smile icon in the message input to open the emoji picker
- **Search emojis**: Search for emojis by name in French
- **Direct insertion**: Selected emojis are inserted at the cursor position in the text area

### 3. GIF Support

- **Send GIFs**: Click the image icon to open the GIF picker
- **Search GIFs**: Search through GIPHY's library of GIFs
- **Trending GIFs**: Browse trending GIFs when no search term is entered
- **Auto-display**: GIFs are automatically detected and displayed as images in messages

## Setup

### GIPHY API Key

To use the GIF picker, you need a GIPHY API key:

1. Go to [GIPHY Developers](https://developers.giphy.com/)
2. Create a free account
3. Create a new app to get an API key
4. Add the API key to your `.env.local` file:

```env
NEXT_PUBLIC_GIPHY_API_KEY=your_actual_api_key_here
```

### Packages Used

- **frimousse**: Lightweight emoji picker for React
- **@giphy/react-components**: Official GIPHY React components
- **@giphy/js-fetch-api**: GIPHY API client

All packages are already installed in the project.

## Components

### EmojiPicker (`components/ui/chat/emoji-picker.tsx`)

Reusable emoji picker component using Frimousse.

**Props:**

- `onEmojiSelect: (emoji: string) => void` - Callback when emoji is selected
- `triggerClassName?: string` - Custom class for trigger button
- `position?: 'top' | 'bottom'` - Picker position relative to trigger (default: 'top')

### GifPicker (`components/ui/chat/gif-picker.tsx`)

GIPHY-powered GIF picker component.

**Props:**

- `onGifSelect: (gifUrl: string) => void` - Callback when GIF is selected
- `triggerClassName?: string` - Custom class for trigger button
- `position?: 'top' | 'bottom'` - Picker position relative to trigger (default: 'top')

### MessageBubble Updates

- Detects GIF URLs (giphy.com or .gif/.gifv extensions)
- Displays GIFs as images with proper styling
- Shows grouped reactions with interaction

### MessageInput Updates

- Emoji picker for inserting emojis into messages
- GIF picker for sending GIFs
- Both pickers positioned above the input area

## Usage

### Sending a Message with Emoji

1. Click the smile icon in the message input
2. Select an emoji from the picker
3. The emoji is inserted into your message
4. Type additional text if needed
5. Press Enter or click Send

### Sending a GIF

1. Click the image icon in the message input
2. Search for a GIF or browse trending
3. Click on a GIF to send it immediately

### Reacting to a Message

1. Hover over any message
2. Click the smile icon in the action buttons
3. Select an emoji to react
4. Click an existing reaction to toggle it on/off

## Notes

- GIFs are sent as URLs and displayed as images
- The system automatically detects GIPHY URLs and .gif/.gifv files
- Reactions are stored per user and can be toggled
- Both emoji and GIF pickers close when clicking outside
