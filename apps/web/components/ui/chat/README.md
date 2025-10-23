# Chat Features - Emoji, GIF & File Upload Support

This document explains the emoji, GIF, and file upload features added to the chat system.

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
- **Large emoji display**: Messages with 1-3 emojis only are displayed at 5x size

### 3. GIF Support

- **Send GIFs**: Click the image icon to open the GIF picker
- **Search GIFs**: Search through GIPHY's library of GIFs
- **Trending GIFs**: Browse trending GIFs when no search term is entered
- **Auto-display**: GIFs are automatically detected and displayed as images in messages

### 4. File Upload Support ✨ NEW

- **Multiple upload methods**:
  - Click the paperclip icon to select files
  - Drag and drop files onto the textarea
  - Copy and paste images directly into the textarea
- **File preview**: See thumbnails and file info before sending
- **Progress tracking**: Individual upload progress for each file
- **Remove files**: Click the X button on any file preview to remove it
- **Supported types**: Images, videos, audio, PDF, documents
- **Multiple file support**: Upload multiple files at once
- **Smart detection**: Images and videos are displayed inline, other files show as downloadable links

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
- Displays file attachments (images inline, other files as download links)
- Supports video playback for video attachments

### MessageInput Updates

- Emoji picker for inserting emojis into messages
- GIF picker for sending GIFs
- File upload with drag-and-drop support
- Copy-paste image support
- File preview with progress tracking
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

### Sending Files

**Method 1: Click to select**

1. Click the paperclip icon
2. Select one or more files
3. See file previews appear above the input
4. Type a message (optional)
5. Click Send

**Method 2: Drag and drop**

1. Drag files from your file explorer
2. Drop them onto the textarea
3. Files appear in preview
4. Click Send

**Method 3: Copy and paste**

1. Copy an image from anywhere (browser, screenshot, etc.)
2. Paste (Ctrl/Cmd + V) into the textarea
3. Image appears in preview
4. Click Send

**Managing files:**

- Remove unwanted files by clicking the X button on each preview
- Upload progress shows for each file
- Images show thumbnails, other files show icons

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
