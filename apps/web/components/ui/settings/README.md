# Settings Pages

This directory contains the settings pages for both user and driver dashboards.

## Features

### User Settings (/user/dashboard/settings)
- **Profile Tab**: Edit user information (name, email, phone, username, password)
- **Preferences Tab**: Configure GPS, notifications, language, and theme

### Driver Settings (/driver/dashboard/settings)
- **Profile Tab**: Same as user settings
- **Vehicle Tab**: Manage vehicle information (brand, model, registration number, number of seats)
- **Preferences Tab**: Same as user preferences

## Prerequisites

To build and run this project, you need:

1. **Backend GraphQL Server** running at `http://localhost:4001/graphql` (or the URL specified in your `.env` file)
2. **GraphQL Code Generation**: Run `pnpm generate` to generate TypeScript types from the GraphQL schema
3. **Node.js >= 23** (as specified in package.json)
4. **pnpm** package manager

## Setup

```bash
# Install dependencies
pnpm install

# Generate GraphQL types (requires running backend)
pnpm generate

# Run development server
pnpm dev

# Build for production
pnpm build
```

## GraphQL Schema Dependencies

The settings component uses the following GraphQL queries and mutations:

- `useMeQuery` - Fetch current user data
- `useUpdateUserMutation` - Update user profile
- `useUpsertUserPreferenceMutation` - Update user preferences

These are auto-generated from the GraphQL schema files located in `/graphql/` directory.

## Notes

- The GraphQL generated types are gitignored and must be generated locally
- Make sure the backend GraphQL server is running before generating types
- Some fields shown in the mockups (dateOfBirth, sex, bio, vehicle-specific fields) are not yet in the database schema and are commented out or removed from the implementation
