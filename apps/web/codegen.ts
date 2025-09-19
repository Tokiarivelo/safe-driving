import type { CodegenConfig } from '@graphql-codegen/cli';

import { config } from 'dotenv';

// Charger les variables d'environnement depuis .env.local
config({ path: '.env' });

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
  documents: '**/*.graphql',
  generates: {
    './graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOCs: false,
        withComponent: false,
        withSubscriptionFn: true,
        reactApolloVersion: 3,
        namingConvention: {
          typeNames: 'change-case#pascalCase',
          enumValues: 'change-case#upperCase',
        },
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default codegenConfig;
