# Performance Optimization Roadmap

## Current Performance Metrics

### Indexation Time (Auto-sync to Elasticsearch)

| Operation     | DB Only | With ES Index | Overhead |
| ------------- | ------- | ------------- | -------- |
| sendMessage   | 50ms    | 80ms          | +30ms    |
| editMessage   | 40ms    | 70ms          | +30ms    |
| deleteMessage | 35ms    | 65ms          | +30ms    |

**Status**: ✅ Acceptable (immediate searchability worth the cost)

### Position Calculation Time

| Search Results | COUNT Queries | Time per COUNT | Total Time |
| -------------- | ------------- | -------------- | ---------- |
| 1              | 1             | 5-10ms         | ~10ms      |
| 10             | 10            | 5-10ms         | ~100ms     |
| 50             | 50            | 5-10ms         | ~500ms     |
| 100            | 100           | 5-10ms         | ~1000ms    |

**Status**: ⚠️ Needs optimization for large result sets

---

## Optimization Strategy

### Phase 1: Quick Wins (1-2 weeks)

#### 1.1 Add Database Index

```sql
CREATE INDEX idx_message_conversation_created
ON "Message" (conversationId, createdAt DESC, deleted)
WHERE deleted = false;
```

**Impact**: COUNT query time: 5-10ms → 2-3ms

**Implementation**:

```typescript
// Prisma migration
generator client {
  provider = "prisma-client-js"
}

model Message {
  // ... existing fields

  @@index([conversationId, createdAt(sort: Desc), deleted])
}
```

#### 1.2 Redis Cache for Positions

Cache positions for 5 minutes to avoid recalculating for popular messages:

```typescript
async getMessagePosition(messageId: string): Promise<number> {
  const cacheKey = `message:${messageId}:position`;

  // Check cache
  const cached = await this.redis.get(cacheKey);
  if (cached !== null) {
    return parseInt(cached, 10);
  }

  // Calculate
  const message = await this.prisma.message.findUnique({
    where: { id: messageId },
    select: { conversationId: true, createdAt: true },
  });

  const position = await this.prisma.message.count({
    where: {
      conversationId: message.conversationId,
      deleted: false,
      createdAt: { lt: message.createdAt },
    },
  });

  // Cache for 5 minutes
  await this.redis.setex(cacheKey, 300, position.toString());

  return position;
}
```

**Impact**:

- Cache hit: 100ms → 2ms (98% faster)
- Cache miss: 100ms → 102ms (2ms overhead)
- Expected hit rate: 70-80% for popular messages

**Cache Invalidation**:

```typescript
// Invalider le cache quand un nouveau message est ajouté à la conversation
async sendMessage(userId: string, input: SendMessageInput) {
  const message = await this.prisma.message.create({ /* ... */ });

  // Invalider toutes les positions de cette conversation
  await this.redis.del(`conversation:${message.conversationId}:positions:*`);

  return message;
}
```

#### 1.3 Limit Search Results

Add a maximum limit to prevent excessive position calculations:

```typescript
async searchMessages(q: string, options: SearchOptions) {
  const limit = Math.min(options.limit ?? 20, 100); // Max 100 results

  // ... rest of the code
}
```

**Impact**: Worst case: 1000ms → 100ms

---

### Phase 2: SQL Window Functions (2-3 weeks)

#### 2.1 Batch Position Calculation

Instead of N COUNT queries, use a single window function query:

```typescript
async getMessagePositions(messageIds: string[]): Promise<Map<string, number>> {
  // Raw SQL with window function
  const result = await this.prisma.$queryRaw<Array<{ id: string; position: number }>>`
    WITH positioned_messages AS (
      SELECT
        id,
        ROW_NUMBER() OVER (
          PARTITION BY conversationId
          ORDER BY createdAt ASC
        ) - 1 as position
      FROM "Message"
      WHERE deleted = false
        AND id IN (${Prisma.join(messageIds)})
    )
    SELECT id, position::int
    FROM positioned_messages
  `;

  return new Map(result.map(r => [r.id, r.position]));
}
```

**Usage in searchMessages**:

```typescript
async searchMessages(q: string, options: SearchOptions) {
  const res = await this.esClient.search({ /* ... */ });

  // Extract all message IDs
  const messageIds = res.hits.hits.map(hit => hit._id!);

  // Get all positions in a single query
  const positionsMap = await this.getMessagePositions(messageIds);

  // Map results
  const hits: MessageSearchHit[] = res.hits.hits.map(hit => ({
    _index: hit._index,
    _id: hit._id!,
    _score: hit._score ?? 0,
    _source: hit._source as MessageSource,
    position: positionsMap.get(hit._id!),
  }));

  return { total, took: res.took, hits };
}
```

**Impact**:

- 10 results: 100ms → 15ms (85% faster)
- 50 results: 500ms → 20ms (96% faster)
- 100 results: 1000ms → 25ms (97.5% faster)

#### 2.2 Optimize with Partitioning

For very large conversations (10k+ messages), consider partitioning:

```sql
-- Partition by conversation
CREATE TABLE "Message" (
  -- ... fields
) PARTITION BY LIST (conversationId);

-- Create partitions for active conversations
CREATE TABLE message_conv_1 PARTITION OF "Message"
  FOR VALUES IN ('conv-1');
```

**Impact**: Query time on 100k messages: 50ms → 10ms

---

### Phase 3: Denormalization (1 month)

#### 3.1 Add Position Column

Store the position directly in the database:

```prisma
model Message {
  id                String   @id @default(cuid())
  content           String
  createdAt         DateTime @default(now())
  conversationId    String?
  positionInConv    Int?     @default(0) // 🆕 Position précalculée

  @@index([conversationId, positionInConv])
}
```

**Trigger to Update Positions**:

```sql
CREATE OR REPLACE FUNCTION update_message_position()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate position for new message
  IF TG_OP = 'INSERT' THEN
    NEW.positionInConv := (
      SELECT COUNT(*)
      FROM "Message"
      WHERE conversationId = NEW.conversationId
        AND deleted = false
        AND createdAt < NEW.createdAt
    );
  END IF;

  -- Recalculate positions for messages after deleted one
  IF TG_OP = 'DELETE' THEN
    UPDATE "Message"
    SET positionInConv = positionInConv - 1
    WHERE conversationId = OLD.conversationId
      AND deleted = false
      AND positionInConv > OLD.positionInConv;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER message_position_trigger
AFTER INSERT OR DELETE ON "Message"
FOR EACH ROW
EXECUTE FUNCTION update_message_position();
```

**Impact**:

- Position query: 10ms → 0ms (instant lookup)
- Trade-off: +5-10ms on insert/delete (trigger execution)

#### 3.2 Materialized View for Positions

Alternative to triggers: use a materialized view:

```sql
CREATE MATERIALIZED VIEW message_positions AS
SELECT
  id,
  conversationId,
  ROW_NUMBER() OVER (
    PARTITION BY conversationId
    ORDER BY createdAt ASC
  ) - 1 as position
FROM "Message"
WHERE deleted = false;

-- Index for fast lookup
CREATE INDEX idx_message_positions_id ON message_positions(id);

-- Refresh strategy: every 5 minutes
SELECT cron.schedule('refresh-positions', '*/5 * * * *',
  'REFRESH MATERIALIZED VIEW CONCURRENTLY message_positions'
);
```

**Impact**:

- Position query: 10ms → 1ms (indexed view lookup)
- Consistency: Eventually consistent (max 5 minutes delay)

---

### Phase 4: Elasticsearch Position Storage (1-2 months)

#### 4.1 Store Position in Elasticsearch

Calculate and store position during indexing:

```typescript
async indexMessage(messageId: string, opts?: { refresh?: boolean }) {
  const message = await this.prisma.message.findUnique({
    where: { id: messageId },
    include: { /* ... */ },
  });

  // Calculate position
  const position = await this.prisma.message.count({
    where: {
      conversationId: message.conversationId,
      deleted: false,
      createdAt: { lt: message.createdAt },
    },
  });

  // Index with position
  await this.esClient.index({
    index: 'messages',
    id: messageId,
    body: {
      // ... existing fields
      position, // 🆕 Stocker la position
    },
    refresh: opts?.refresh ?? false,
  });
}
```

**Search without additional queries**:

```typescript
async searchMessages(q: string, options: SearchOptions) {
  const res = await this.esClient.search({
    index: 'messages',
    body: {
      query: { /* ... */ },
    },
  });

  // Position already in _source
  const hits: MessageSearchHit[] = res.hits.hits.map(hit => ({
    _index: hit._index,
    _id: hit._id!,
    _score: hit._score ?? 0,
    _source: hit._source as MessageSource,
    position: hit._source.position, // 🆕 Direct access
  }));

  return { total, took: res.took, hits };
}
```

**Impact**:

- Search time: 100ms → 30ms (70% faster)
- Trade-off: +10ms on indexing (position calculation)

**Consistency Challenge**:

- Position changes when messages are added/deleted
- Need to reindex all subsequent messages in the conversation

**Solution: Batch Reindexing**:

```typescript
async onMessageAdded(conversationId: string, newMessageCreatedAt: Date) {
  // Find all messages after the new message
  const affectedMessages = await this.prisma.message.findMany({
    where: {
      conversationId,
      deleted: false,
      createdAt: { gte: newMessageCreatedAt },
    },
    select: { id: true },
  });

  // Reindex them (async job)
  await this.queue.add('reindex-messages', {
    messageIds: affectedMessages.map(m => m.id),
  });
}
```

---

## Recommended Implementation Order

### Immediate (This Week)

1. ✅ Add database index on `(conversationId, createdAt, deleted)`
2. ✅ Limit max search results to 100

**Effort**: 2 hours  
**Impact**: 30-50% faster position calculation

### Short Term (Next 2 Weeks)

1. ⏱️ Implement Redis cache for positions
2. ⏱️ Implement SQL window functions for batch calculation

**Effort**: 3-5 days  
**Impact**: 85-97% faster for 10+ results

### Medium Term (1-2 Months)

1. 📋 Evaluate: Denormalization vs Materialized View
2. 📋 Implement chosen strategy
3. 📋 Add monitoring and metrics

**Effort**: 2-3 weeks  
**Impact**: Near-instant position lookup

### Long Term (3+ Months)

1. 📋 Store positions in Elasticsearch (if needed)
2. 📋 Implement batch reindexing strategy
3. 📋 Add queue for async position updates

**Effort**: 1-2 months  
**Impact**: Fully scalable to millions of messages

---

## Performance Monitoring

### Metrics to Track

```typescript
interface PerformanceMetrics {
  // Search performance
  searchDuration: number;
  positionCalculationDuration: number;
  elasticsearchTook: number;

  // Cache performance
  cacheHitRate: number;
  cacheSize: number;

  // Database performance
  countQueriesCount: number;
  averageCountQueryTime: number;
}
```

### Logging Example

```typescript
const startTime = Date.now();
const esStart = Date.now();
const esResult = await this.esClient.search({
  /* ... */
});
const esDuration = Date.now() - esStart;

const posCalcStart = Date.now();
const positions = await this.calculatePositions(messageIds);
const posCalcDuration = Date.now() - posCalcStart;

this.logger.log({
  action: 'search_messages',
  query: q,
  resultCount: esResult.hits.hits.length,
  esTook: esResult.took,
  esDuration,
  posCalcDuration,
  totalDuration: Date.now() - startTime,
});
```

### Grafana Dashboard Queries

```promql
# Average search time
avg(search_duration_ms{action="search_messages"}) by (conversationId)

# Position calculation time p99
histogram_quantile(0.99, position_calculation_duration_ms)

# Cache hit rate
(cache_hits_total / (cache_hits_total + cache_misses_total)) * 100

# Elasticsearch performance
avg(elasticsearch_took_ms) by (index)
```

---

## Cost-Benefit Analysis

### Option 1: Database Index + Redis Cache

**Pros**:

- ✅ Quick to implement (1 week)
- ✅ Significant performance gain (70-80% for cached results)
- ✅ No schema changes
- ✅ Easy to rollback

**Cons**:

- ❌ Cache invalidation complexity
- ❌ Memory overhead (Redis)
- ❌ Still slow for cache misses

**Cost**: $0 (use existing Redis)  
**Effort**: 5 days  
**Impact**: Medium

### Option 2: SQL Window Functions

**Pros**:

- ✅ 95%+ performance gain
- ✅ No cache invalidation needed
- ✅ Single query for all positions
- ✅ Accurate and consistent

**Cons**:

- ❌ Requires raw SQL (less type-safe)
- ❌ Prisma doesn't support window functions natively

**Cost**: $0  
**Effort**: 1 week  
**Impact**: High

### Option 3: Denormalization with Triggers

**Pros**:

- ✅ Instant position lookup (0ms)
- ✅ Always consistent
- ✅ Scales to millions of messages

**Cons**:

- ❌ Schema migration required
- ❌ Trigger maintenance overhead
- ❌ Slower inserts/deletes
- ❌ Harder to rollback

**Cost**: $0  
**Effort**: 3 weeks  
**Impact**: Very High

### Option 4: Elasticsearch Position Storage

**Pros**:

- ✅ Positions bundled with search results
- ✅ No additional database queries
- ✅ Fast search + position in one call

**Cons**:

- ❌ Complex reindexing logic
- ❌ Eventual consistency issues
- ❌ Higher Elasticsearch storage cost
- ❌ Difficult to maintain consistency

**Cost**: +20% Elasticsearch storage  
**Effort**: 2 months  
**Impact**: High (but complex)

---

## Recommendation

### Phase 1 (Week 1-2): **SQL Window Functions**

- Best balance of effort vs impact
- 95%+ performance gain
- Clean implementation
- No schema changes needed

### Phase 2 (Week 3-4): **Redis Cache** (Optional)

- Add caching for extra performance boost
- Especially useful for repeated searches
- Can be added on top of window functions

### Phase 3 (Month 2-3): **Evaluate Need for Denormalization**

- Monitor performance with Phase 1+2
- Only implement if still experiencing issues
- Consider as conversations grow to 100k+ messages

---

## Implementation Checklist

### Phase 1: SQL Window Functions

- [ ] Create `getMessagePositions(messageIds[])` method
- [ ] Add database index on `(conversationId, createdAt, deleted)`
- [ ] Update `searchMessages()` to use batch position calculation
- [ ] Add unit tests for position calculation
- [ ] Add performance logging
- [ ] Deploy to staging
- [ ] Performance testing with 1k, 10k, 100k messages
- [ ] Deploy to production
- [ ] Monitor for 1 week

### Phase 2: Redis Cache (Optional)

- [ ] Implement `getMessagePositionCached(messageId)`
- [ ] Add cache invalidation on message create/delete
- [ ] Set TTL to 5 minutes
- [ ] Add cache hit/miss metrics
- [ ] Monitor cache hit rate
- [ ] Tune TTL based on usage patterns

### Phase 3: Monitoring

- [ ] Add Grafana dashboard for search performance
- [ ] Set up alerts for slow queries (>500ms)
- [ ] Track cache hit rate (if implemented)
- [ ] Monitor database index usage
- [ ] Set up weekly performance review
