# Support/Help Center Implementation

This document describes the implementation of the Help Center + FAQ feature as requested in the GitHub issue.

## Overview

The support center provides a comprehensive help and assistance interface for both users and drivers, featuring:
- FAQ (Frequently Asked Questions) **with multilingual support from GraphQL backend**
- Contact options (Email, Chat, Phone, Facebook, LinkedIn)
- Tutorials & Videos section (placeholder for future content)
- Feedback & Suggestions form

## Implementation Details

### File Structure

```
apps/
├── graphql-server/
│   ├── prisma/
│   │   ├── schema.prisma                         # Added Faq and FaqTranslation models
│   │   └── migrations/
│   │       └── *_add_faq_with_multilingual_support/
│   │           └── migration.sql                 # Database migration for FAQ tables
│   └── src/
│       ├── faq/
│       │   ├── faq.module.ts                     # FAQ NestJS module
│       │   ├── faq.service.ts                    # FAQ business logic & database queries
│       │   └── faq.resolver.ts                   # GraphQL resolver for FAQs
│       ├── seed/
│       │   └── seed.service.ts                   # Updated to include FAQ seeding
│       └── app/
│           └── app.module.ts                     # Registered FaqModule
└── web/
    ├── app/[locale]/
    │   ├── user/dashboard/(pages)/support/
    │   │   └── page.tsx                          # User support page
    │   └── driver/dashboard/(pages)/support/
    │       └── page.tsx                          # Driver support page
    ├── components/support/
    │   ├── index.ts                              # Exports all support components
    │   ├── support-component.tsx                 # Main support component with tab navigation
    │   ├── faq-section.tsx                       # FAQ with GraphQL integration
    │   ├── contact-section.tsx                   # Contact options grid
    │   ├── tutorials-section.tsx                 # Tutorials placeholder
    │   └── feedback-section.tsx                  # Feedback form with rating
    ├── graphql/faq/
    │   ├── fragment.graphql                      # FAQ GraphQL fragment
    │   ├── translation-fragment.graphql          # FaqTranslation fragment
    │   └── queries.graphql                       # GetFaqs query
    └── public/locales/
        ├── fr/support.json                       # French translations (fallback)
        └── en/support.json                       # English translations (fallback)
```

### Features

#### 1. FAQ Section (Multilingual with GraphQL Backend)
- **Backend-driven content**: FAQ data is now stored in PostgreSQL database
- **Multilingual support**: Each FAQ can have translations in multiple languages (fr, en, etc.)
- **GraphQL API**: Frontend fetches FAQs via `GetFaqs` query with locale parameter
- **Automatic fallback**: If requested locale not available, falls back to French
- **Graceful degradation**: Falls back to translation files if API fails
- **Searchable FAQ**: Users can search through frequently asked questions
- **Expandable Answers**: Questions expand/collapse on click to show answers
- **Default expanded**: First question is expanded by default
- **Seeded questions**:
  - How to book a ride
  - How to cancel a ride
  - Payment methods available
  - Share trip with someone
  - What to do if driver is late

#### 2. Contact Section
- **Grid layout**: 3 columns on desktop, responsive on mobile
- **Contact options**:
  - Email (opens default email client)
  - Live chat (navigates to messages)
  - Phone (initiates phone call)
  - Facebook (opens Facebook page)
  - LinkedIn (opens LinkedIn page)
- **Visual icons**: Color-coded icons for each option

#### 3. Tutorials Section
- **Coming soon placeholder**: Shows a message that content will be available soon
- **Visual design**: Gradient background with icon

#### 4. Feedback Section
- **Rating system**: 5 emoji-based ratings from happy to angry
- **Text input**: Large textarea for detailed feedback
- **Categories**: Feedback, Suggestion, Other
- **Other category input**: Shows additional input field when "Other" is selected
- **Form validation**: Ensures rating and description are provided
- **Toast notifications**: Success/error messages on submission

### Components

#### SupportComponent
Main component that provides:
- Tab navigation between sections
- Header with support icon and title
- Responsive layout
- Active tab highlighting

#### FaqSection
Features:
- Search bar for filtering questions
- Expandable/collapsible question cards
- Clean, modern UI with proper spacing
- Empty state when no results found

#### ContactSection
Features:
- Grid layout of contact options
- Hover effects on cards
- Icon-based visual representation
- Click handlers for each contact method

#### TutorialsSection
Features:
- Placeholder design for future content
- Informative message about upcoming tutorials

#### FeedbackSection
Features:
- Emoji-based rating system (1-5 scale)
- Multi-line text input for feedback
- Category selection (Feedback/Suggestion/Other)
- Submit button with loading state
- Form reset after successful submission

### Translations

Both French and English translations are provided in:
- `/public/locales/fr/support.json`
- `/public/locales/en/support.json`

All text is fully internationalized using `react-i18next`.

### Routing

The support pages are accessible at:
- **Users**: `/[locale]/user/dashboard/support`
- **Drivers**: `/[locale]/driver/dashboard/support`

Both routes use the same shared `SupportComponent`, ensuring identical experience for users and drivers.

### Navigation

The support menu item already exists in both user and driver menus:
- Menu item name: "Assistance"
- Icon: `flat-color-icons:online-support`
- Path: `/[user|driver]/dashboard/support`

## Design Implementation

The implementation follows the UI mockups provided in the issue:

1. **Tab-based navigation**: Matches the design with FAQ, Contact, Tutorials, and Feedback tabs
2. **FAQ Layout**: Search bar + expandable question cards
3. **Contact Layout**: Grid of contact options with icons
4. **Feedback Layout**: Rating emojis + description field + category buttons

## Usage

Users and drivers can access the support center by:
1. Clicking on the "Assistance" menu item in the sidebar
2. Navigating through the tabs to find the information they need
3. Using the FAQ search to quickly find answers
4. Contacting support through multiple channels
5. Providing feedback and suggestions

## Database Schema

### Faq Table
```prisma
model Faq {
  id        String   @id @default(uuid())
  order     Int      @default(0)  // Display order
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  translations FaqTranslation[]
}
```

### FaqTranslation Table
```prisma
model FaqTranslation {
  id       String @id @default(uuid())
  faqId    String
  locale   String  // e.g., 'fr', 'en', 'mg'
  question String
  answer   String @db.Text
  faq      Faq @relation(fields: [faqId], references: [id], onDelete: Cascade)
  
  @@unique([faqId, locale])
}
```

## GraphQL API

### Query: Get FAQs
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

### Example Usage
```typescript
const { data } = useGetFaqsQuery({
  variables: { locale: 'fr' }  // or 'en'
});
```

## Seeding FAQs

FAQs are automatically seeded when the application starts via `SeedService.seedFaqs()`. To manually seed:

```bash
cd apps/graphql-server
pnpm seed
```

## Adding New FAQs

### Via Database
```typescript
await prisma.faq.create({
  data: {
    order: 6,
    isActive: true,
    translations: {
      create: [
        {
          locale: 'fr',
          question: 'Nouvelle question?',
          answer: 'Nouvelle réponse',
        },
        {
          locale: 'en',
          question: 'New question?',
          answer: 'New answer',
        },
      ],
    },
  },
});
```

## Future Enhancements

- Add admin interface for managing FAQs
- Add actual backend integration for feedback submission
- Populate tutorials section with video content
- Add more FAQ questions based on user feedback
- Integrate live chat functionality
- Add analytics to track most viewed FAQs
- Support additional languages (e.g., Malagasy)
