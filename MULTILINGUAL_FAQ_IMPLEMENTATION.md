# Multilingual FAQ Implementation

## Overview

This document describes the implementation of multilingual FAQ support with GraphQL backend as requested.

## Changes Made

### 1. Database Schema (Prisma)

Added two new models to support multilingual FAQs:

**Faq Model:**
- `id`: UUID primary key
- `order`: Display order (for sorting)
- `isActive`: Toggle visibility
- `createdAt`, `updatedAt`: Timestamps
- `translations`: Relation to FaqTranslation

**FaqTranslation Model:**
- `id`: UUID primary key
- `faqId`: Foreign key to Faq
- `locale`: Language code (e.g., 'fr', 'en', 'mg')
- `question`: Translated question text
- `answer`: Translated answer text
- **Unique constraint**: One translation per FAQ per locale

### 2. Database Migration

Created migration: `20251207125548_add_faq_with_multilingual_support`
- Creates `Faq` table
- Creates `FaqTranslation` table
- Adds indexes for performance
- Sets up foreign key constraints with CASCADE delete

### 3. Backend (NestJS GraphQL)

**Module Structure:**
```
apps/graphql-server/src/faq/
├── faq.module.ts       # Module configuration
├── faq.service.ts      # Business logic
└── faq.resolver.ts     # GraphQL resolver
```

**Key Features:**
- `getFaqsByLocale(locale)`: Returns FAQs with translations for specified locale
- Automatic fallback to French if requested locale unavailable
- Active FAQs only (isActive = true)
- Ordered by display order

**GraphQL Query:**
```graphql
query GetFaqs($locale: String) {
  faqs(locale: $locale) {
    id
    order
    isActive
    createdAt
    updatedAt
    translations {
      id
      locale
      question
      answer
    }
  }
}
```

### 4. Data Seeding

Added `seedFaqs()` method to `SeedService`:
- Seeds 5 FAQ items on application start
- Each FAQ includes French and English translations
- Skips if FAQs already exist
- Questions cover:
  1. How to book a ride
  2. How to cancel a ride
  3. Payment methods
  4. Sharing trips
  5. Late driver scenarios

### 5. Frontend Integration

**GraphQL Queries:**
Created in `apps/web/graphql/faq/`:
- `fragment.graphql`: Faq fields
- `translation-fragment.graphql`: FaqTranslation fields
- `queries.graphql`: GetFaqs query

**Updated FAQ Component:**
- Fetches FAQs from GraphQL API using `useGetFaqsQuery`
- Passes current i18n locale to API
- Shows loading state while fetching
- **Graceful degradation**: Falls back to translation files if API fails
- Maintains existing UI/UX

## Benefits

1. **Centralized Content Management**: FAQs stored in database, not scattered in translation files
2. **Easy Updates**: Add/edit/delete FAQs without code deployments
3. **Scalable**: Easy to add new languages
4. **Consistent**: Same FAQ content for all users in their language
5. **SEO-friendly**: Server-side rendering possible with GraphQL
6. **Admin-ready**: Foundation for future admin panel

## How to Use

### Adding New Languages

1. **Backend**: No code changes needed
2. **Add translation**:
```typescript
await prisma.faqTranslation.create({
  data: {
    faqId: '<existing-faq-id>',
    locale: 'mg',  // Malagasy
    question: 'Ahoana no fanaovana reservation?',
    answer: 'Sokafy ny app...',
  },
});
```

### Adding New FAQs

**In Seed File** (`seed.service.ts`):
```typescript
{
  order: 6,
  translations: [
    { locale: 'fr', question: '...', answer: '...' },
    { locale: 'en', question: '...', answer: '...' },
  ],
}
```

**Via API** (future admin feature):
```typescript
await faqService.createFaq(6, [
  { locale: 'fr', question: '...', answer: '...' },
  { locale: 'en', question: '...', answer: '...' },
]);
```

## Migration Path

For existing deployments:

1. **Run database migration**:
   ```bash
   cd apps/graphql-server
   pnpm prisma:migrate:deploy
   ```

2. **Generate Prisma client**:
   ```bash
   pnpm prisma:generate
   ```

3. **Restart backend**: FAQs will auto-seed

4. **Generate frontend GraphQL types**:
   ```bash
   cd apps/web
   pnpm generate
   ```

5. **Deploy frontend**: Will automatically fetch from API

## Backward Compatibility

- Frontend falls back to translation files if API unavailable
- Existing translation files remain as backup
- No breaking changes for users

## Future Enhancements

- Admin panel for FAQ management (CRUD operations)
- FAQ categories/tags
- Search analytics
- Rich text formatting for answers
- FAQ reordering via drag-and-drop
- A/B testing different answers
- FAQ usage metrics

## Technical Details

**Database Indexes:**
- `Faq(isActive, order)`: Fast active FAQ retrieval
- `FaqTranslation(locale)`: Fast locale filtering
- `FaqTranslation(faqId, locale)`: Enforces uniqueness

**Query Performance:**
- Single query retrieves FAQ with translations
- Includes filter for active FAQs only
- Ordered results for consistent display

**Error Handling:**
- GraphQL errors logged on client
- Automatic fallback to translation files
- User never sees broken FAQ section

## Files Changed

### Backend
- `apps/graphql-server/prisma/schema.prisma`
- `apps/graphql-server/prisma/migrations/*/migration.sql`
- `apps/graphql-server/src/faq/faq.module.ts` (new)
- `apps/graphql-server/src/faq/faq.service.ts` (new)
- `apps/graphql-server/src/faq/faq.resolver.ts` (new)
- `apps/graphql-server/src/app/app.module.ts`
- `apps/graphql-server/src/seed/seed.service.ts`

### Frontend
- `apps/web/graphql/faq/fragment.graphql` (new)
- `apps/web/graphql/faq/translation-fragment.graphql` (new)
- `apps/web/graphql/faq/queries.graphql` (new)
- `apps/web/components/support/faq-section.tsx`
- `apps/web/components/support/README.md`

## Testing

To verify the implementation:

1. Start GraphQL server
2. Run seed: FAQs should be created
3. Query via GraphQL Playground:
   ```graphql
   { faqs(locale: "fr") { translations { question } } }
   ```
4. Check frontend: FAQs should load from API
5. Stop backend: FAQs should fall back to translation files

## Conclusion

The multilingual FAQ system is now fully implemented with:
- ✅ Database schema with Prisma
- ✅ GraphQL API with NestJS
- ✅ Automatic data seeding
- ✅ Frontend integration
- ✅ Graceful fallback
- ✅ Full documentation

This provides a scalable foundation for managing FAQs across multiple languages.
