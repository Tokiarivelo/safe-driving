# Safe Driving - GraphQL Server

## Overview

This is the GraphQL API server for the Safe Driving application, built with NestJS, Prisma, PostgreSQL, and Elasticsearch.

## Features

### 🔍 Full-Text Search with Elasticsearch

- Search across messages, conversations, users, and rides
- Edge N-gram analyzer for partial text matching
- **Automatic indexing** on create/update/delete operations
- **Position tracking** for search results
- Security filtering by current user

### 💬 Advanced Message Management

- **Bidirectional pagination** (BEFORE/AFTER)
- **Jump to message** functionality (navigate from search results)
- Real-time updates via WebSocket (Socket.IO)
- Message reactions, replies, and attachments
- Automatic Elasticsearch indexing

### 🚗 Ride Management

- Full CRUD operations for rides
- Real-time ride updates and tracking
- Search and filter capabilities
- Driver and passenger management

### 👥 User & Conversation Management

- User profiles with preferences
- Private and group conversations
- Participant management
- File uploads (S3)

## Documentation

### Message Search & Navigation

- **[MESSAGE_SEARCH_NAVIGATION.md](./MESSAGE_SEARCH_NAVIGATION.md)** - Complete feature set overview
- **[JUMP_TO_MESSAGE.md](./JUMP_TO_MESSAGE.md)** - Jump to message implementation
- **[MESSAGE_PAGINATION.md](./MESSAGE_PAGINATION.md)** - Bidirectional pagination guide
- **[MESSAGE_PAGINATION_FIX.md](./MESSAGE_PAGINATION_FIX.md)** - Cache bug fix

### Elasticsearch

- **[ELASTICSEARCH_MESSAGE_INDEXING.md](./ELASTICSEARCH_MESSAGE_INDEXING.md)** - Auto-indexing docs
- **[ELASTICSEARCH_SECURITY.md](./ELASTICSEARCH_SECURITY.md)** - Security filtering

### Examples & Optimization

- **[GRAPHQL_EXAMPLES.md](./GRAPHQL_EXAMPLES.md)** - GraphQL query examples
- **[PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)** - Performance roadmap

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Elasticsearch 9.2+ (via LocalStack or AWS)

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Run database migrations
pnpm prisma migrate dev

# Seed database (optional)
pnpm prisma db seed

# Start development server
pnpm run start:dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/safedriving"

# JWT
JWT_SECRET="your-secret-key"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379

# Elasticsearch
ELASTICSEARCH_NODE="http://localhost:9200"
ELASTICSEARCH_USERNAME="elastic"
ELASTICSEARCH_PASSWORD="changeme"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="safedriving-uploads"
```

## GraphQL API

### Access GraphQL Playground

```
http://localhost:3000/graphql
```

### Example Queries

#### Search Messages with Position

```graphql
query SearchMessages {
  searchMessages(q: "rendez-vous", conversationId: "conv-123") {
    total
    hits {
      _id
      _score
      position # Position in conversation (0-based)
      _source {
        content
        createdAt
        sender {
          fullName
        }
      }
    }
  }
}
```

#### Jump to Message

```graphql
query JumpToMessage {
  messagesAroundMessage(messageId: "msg-xyz", beforeCount: 20, afterCount: 20) {
    messages {
      id
      content
      sender {
        fullName
      }
    }
    targetPosition
    hasMoreBefore
    hasMoreAfter
  }
}
```

#### Paginate Messages

```graphql
query GetMessages {
  messages(
    conversationId: "conv-123"
    cursor: "2025-01-15T10:30:00Z"
    limit: 20
    direction: BEFORE # or AFTER
  ) {
    id
    content
    createdAt
  }
}
```

See **[GRAPHQL_EXAMPLES.md](./GRAPHQL_EXAMPLES.md)** for more examples.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
└─────────────────┬───────────────────────────────────────────┘
                  │ GraphQL + WebSocket
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   GraphQL API (NestJS)                       │
├─────────────────────────────────────────────────────────────┤
│  - MessageResolver (messages, search, jump)                 │
│  - ConversationResolver                                     │
│  - RideResolver                                             │
│  - UserResolver                                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │  Elasticsearch   │
│   (Prisma)       │  │  (LocalStack)    │
├──────────────────┤  ├──────────────────┤
│ - Messages       │  │ - messages index │
│ - Conversations  │  │ - Edge N-gram    │
│ - Users          │  │ - Auto-indexed   │
│ - Rides          │  │ - Position calc  │
└──────────────────┘  └──────────────────┘
         │                     │
         └──────────┬──────────┘
                    │
            ┌──────────────┐
            │     Redis    │
            ├──────────────┤
            │ - Cache      │
            │ - Pub/Sub    │
            └──────────────┘
```

## Performance

### Current Metrics

| Operation                 | Time   |
| ------------------------- | ------ |
| Search 10 messages        | ~150ms |
| Position calculation (10) | ~100ms |
| Jump to message           | ~200ms |
| Auto-indexing overhead    | +30ms  |

### Optimization Roadmap

See **[PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)** for detailed optimization strategies:

1. **Phase 1** (Week 1-2): SQL Window Functions → 95% faster
2. **Phase 2** (Week 3-4): Redis Cache → 98% cache hit improvement
3. **Phase 3** (Month 2-3): Denormalization → Instant position lookup

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Deployment

### Docker

```bash
# Build image
docker build -t safe-driving-api .

# Run container
docker run -p 3000:3000 safe-driving-api
```

### Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure production database
- [ ] Set up AWS S3 bucket
- [ ] Configure Elasticsearch cluster
- [ ] Set up Redis cluster
- [ ] Enable SSL/TLS
- [ ] Configure CORS
- [ ] Set up monitoring (Grafana)
- [ ] Configure logging (CloudWatch)

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Update documentation
5. Submit a pull request

## License

MIT
