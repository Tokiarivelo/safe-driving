import { registerEnumType } from '@nestjs/graphql';

export enum CursorDirection {
  BEFORE = 'BEFORE', // Load older messages (before cursor)
  AFTER = 'AFTER', // Load newer messages (after cursor)
}

registerEnumType(CursorDirection, {
  name: 'CursorDirection',
  description: 'Direction for cursor-based pagination',
  valuesMap: {
    BEFORE: {
      description: 'Load older messages (before the cursor)',
    },
    AFTER: {
      description: 'Load newer messages (after the cursor)',
    },
  },
});
