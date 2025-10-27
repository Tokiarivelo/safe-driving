# Link Preview Module

This module provides functionality to extract metadata from URLs, including Open Graph tags, Twitter cards, and other web page metadata.

## Features

- **URL Validation & Normalization** - Handles URLs with/without protocols
- **Metadata Extraction** - Extracts title, description, thumbnail, and other metadata
- **Open Graph Support** - Parses Open Graph meta tags
- **Twitter Cards Support** - Parses Twitter card meta tags
- **Fallback Handling** - Uses page title and description as fallbacks
- **Error Handling** - Graceful error handling with timeout protection
- **Redis Caching** - 7-day cache to prevent repeated fetches

## GraphQL Queries

### Get Link Preview

```graphql
query GetLinkPreview($url: String!) {
  getLinkPreview(url: $url) {
    url
    title
    description
    thumbnail
    meta
  }
}
```

### Get Multiple Link Previews

```graphql
query GetMultipleLinkPreviews($urls: [String!]!) {
  getMultipleLinkPreviews(urls: $urls) {
    url
    title
    description
    thumbnail
    meta
  }
}
```

## GraphQL Mutations

### Clear Cache for Specific URL

```graphql
mutation ClearLinkPreviewCache($url: String!) {
  clearLinkPreviewCache(url: $url)
}
```

### Clear All Link Preview Cache

```graphql
mutation ClearAllLinkPreviewCache {
  clearAllLinkPreviewCache
}
```

## Extracted Properties

The module extracts the following properties from web pages:

- **url**: The normalized URL
- **title**: Page title (Open Graph → Twitter → HTML title)
- **description**: Page description (Open Graph → Twitter → meta description)
- **thumbnail**: Preview image (Open Graph → Twitter images)
- **meta**: Additional metadata as JSON including:
  - `siteName`: Website name
  - `type`: Content type (article, website, etc.)
  - `favicon`: Website favicon URL
  - `openGraph`: Raw Open Graph data

## Caching

The module uses Redis for caching with the following configuration:

- **Cache Key**: `link_preview:{normalized_url}`
- **TTL**: 7 days (604,800 seconds)
- **Storage**: JSON format using RedisExtendedService
- **Cache Hit Ratio**: Optimized for multiple URL requests

### Cache Behavior

- **Single URL**: Checks cache first, fetches if not found, caches result
- **Multiple URLs**: Checks cache for all URLs in parallel, fetches only missing ones
- **Error Handling**: Failed fetches are not cached (only successful previews)

## Usage in Messages

This module can be used to create link attachments in messages. When users send messages with URLs, you can:

1. Use `getLinkPreview(url)` to fetch metadata (with caching)
2. Create `LINK` type attachments with the extracted data
3. Store the metadata in the `linkMeta` JSON field

## Example

```typescript
// Get preview for a single URL (cached)
const preview = await linkPreviewService.getLinkPreview('https://example.com');

// Create attachment with link data
const attachment = await prisma.attachment.create({
  data: {
    messageId: message.id,
    type: 'LINK',
    url: preview.url,
    linkTitle: preview.title,
    linkDesc: preview.description,
    linkThumbnail: preview.thumbnail,
    linkMeta: preview.meta,
  },
});
```

## Dependencies

- `cheerio`: HTML parsing and DOM manipulation
- `node-fetch`: HTTP client for fetching URLs
- `@types/node-fetch`: TypeScript types for node-fetch
- `graphql-type-json`: GraphQL JSON scalar support
- `RedisExtendedService`: Redis caching functionality

## Error Handling

The service includes comprehensive error handling:

- Invalid URLs return null
- Network errors return basic preview with error metadata
- Timeout errors (10 seconds) abort the request
- Malformed HTML is handled gracefully
- Cache failures don't break the service

## Security Considerations

- User-Agent header is set to identify the bot
- 10-second timeout prevents hanging requests
- Only HTTP/HTTPS URLs are supported
- No JavaScript execution (static HTML parsing only)
- Rate limiting should be implemented at the application level

## Cache Management

The module provides cache management utilities:

- **clearCache(url)**: Remove cache for specific URL
- **clearAllCache()**: Remove all cached link previews
- **Automatic expiration**: 7-day TTL on all cached entries

Use cache clearing mutations when:

- Website metadata has changed
- Testing new extraction logic
- Administrative maintenance
