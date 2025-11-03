# GraphQL Queries for Message Search & Navigation

## 1. Recherche de Messages

### Recherche Simple

```graphql
query SearchMessages {
  searchMessages(q: "rendez-vous", limit: 10) {
    total
    took
    hits {
      _id
      _score
      position
      _source {
        content
        createdAt
        senderId
        sender {
          fullName
          phoneNumber
        }
      }
    }
  }
}
```

### Recherche dans une Conversation Spécifique

```graphql
query SearchInConversation {
  searchMessages(
    q: "important"
    conversationId: "clabcdef123456789"
    limit: 20
    offset: 0
  ) {
    total
    took
    hits {
      _id
      _score
      position
      _source {
        content
        createdAt
        conversationId
        sender {
          fullName
          avatar {
            url
          }
        }
        attachments {
          id
          filename
          mimeType
          file {
            url
          }
        }
      }
    }
  }
}
```

## 2. Pagination Bidirectionnelle

### Chargement Initial

```graphql
query LoadInitialMessages {
  messages(conversationId: "clabcdef123456789", limit: 20, direction: BEFORE) {
    id
    content
    createdAt
    updatedAt
    sender {
      id
      fullName
      avatar {
        url
      }
    }
    attachments {
      id
      filename
      mimeType
      file {
        url
        size
      }
    }
    reactions {
      id
      reactionType
      user {
        id
        fullName
      }
    }
  }
}
```

### Charger Messages Plus Anciens (Scroll Up)

```graphql
query LoadOlderMessages {
  messages(
    conversationId: "clabcdef123456789"
    cursor: "2025-01-15T10:30:00.000Z" # createdAt du message le plus ancien actuellement chargé
    limit: 20
    direction: BEFORE
  ) {
    id
    content
    createdAt
    sender {
      id
      fullName
    }
  }
}
```

### Charger Messages Plus Récents (Scroll Down)

```graphql
query LoadNewerMessages {
  messages(
    conversationId: "clabcdef123456789"
    cursor: "2025-01-15T12:30:00.000Z" # createdAt du message le plus récent actuellement chargé
    limit: 20
    direction: AFTER
  ) {
    id
    content
    createdAt
    sender {
      id
      fullName
    }
  }
}
```

## 3. Jump to Message

### Charger Messages Autour d'un Message Ciblé

```graphql
query JumpToMessage {
  messagesAroundMessage(
    messageId: "clmsg123456789"
    beforeCount: 20
    afterCount: 20
  ) {
    messages {
      id
      content
      createdAt
      edited
      deleted
      sender {
        id
        fullName
        phoneNumber
        avatar {
          url
        }
      }
      attachments {
        id
        filename
        mimeType
        file {
          url
          size
        }
      }
      reactions {
        id
        reactionType
        user {
          id
          fullName
        }
      }
      parentMessage {
        id
        content
        sender {
          fullName
        }
      }
      replies {
        id
        content
        sender {
          fullName
        }
      }
    }
    targetMessageId
    targetPosition
    beforeCount
    afterCount
    hasMoreBefore
    hasMoreAfter
  }
}
```

### Jump avec Contexte Minimal

```graphql
query JumpToMessageMinimal {
  messagesAroundMessage(
    messageId: "clmsg123456789"
    beforeCount: 5
    afterCount: 5
  ) {
    messages {
      id
      content
      createdAt
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

## 4. Workflow Complet: Recherche → Jump → Pagination

### Étape 1: Rechercher

```graphql
query Step1_Search {
  searchMessages(q: "demain 15h", conversationId: "clabcdef123456789") {
    total
    hits {
      _id
      _score
      position # Ex: 147 (le message est le 148ème)
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

### Étape 2: Utilisateur clique sur un résultat → Jump

```graphql
query Step2_JumpToSearchResult {
  messagesAroundMessage(
    messageId: "clmsg123456789" # _id du résultat cliqué
    beforeCount: 15
    afterCount: 15
  ) {
    messages {
      id
      content
      createdAt
      sender {
        fullName
        avatar {
          url
        }
      }
    }
    targetMessageId
    targetPosition # 147
    hasMoreBefore # true (il y a 132 messages avant)
    hasMoreAfter # true (il y a 253 messages après)
  }
}
```

### Étape 3: Utilisateur scroll vers le haut → Pagination normale

```graphql
query Step3_ScrollUpForOlder {
  messages(
    conversationId: "clabcdef123456789"
    cursor: "2025-01-10T08:00:00.000Z" # createdAt du message le plus ancien chargé
    limit: 20
    direction: BEFORE
  ) {
    id
    content
    createdAt
    sender {
      fullName
    }
  }
}
```

## 5. Tests et Debugging

### Vérifier l'Indexation d'un Message

```graphql
query CheckMessageIndexed {
  searchMessages(q: "test unique string 12345", limit: 1) {
    total
    hits {
      _id
      _source {
        content
      }
    }
  }
}
```

### Vérifier la Position

```graphql
query CheckMessagePosition {
  searchMessages(q: "word", conversationId: "clabcdef123456789") {
    hits {
      _id
      position
      _source {
        content
        createdAt
      }
    }
  }
}
```

### Vérifier les Permissions

```graphql
query CheckAccessToMessage {
  messagesAroundMessage(
    messageId: "clmsg_unauthorized"
    beforeCount: 1
    afterCount: 1
  ) {
    # Si l'utilisateur n'est pas participant, retourne une erreur
    targetMessageId
  }
}
```

## 6. Mutations avec Auto-Indexation

### Créer et Rechercher Immédiatement

```graphql
# 1. Créer un message
mutation SendMessage {
  sendMessage(
    input: {
      conversationId: "clabcdef123456789"
      content: "Message test pour recherche"
      filesKeys: []
    }
  ) {
    id
    content
    createdAt
  }
}

# 2. Rechercher (devrait être trouvé immédiatement grâce à refresh: true)
query SearchNewMessage {
  searchMessages(
    q: "Message test pour recherche"
    conversationId: "clabcdef123456789"
  ) {
    total # Devrait être >= 1
    hits {
      _id
      _source {
        content
      }
    }
  }
}
```

### Éditer et Re-rechercher

```graphql
# 1. Éditer un message
mutation EditMessage {
  editMessage(
    messageId: "clmsg123456789"
    content: "Contenu modifié pour test"
    filesKeys: []
  ) {
    id
    content
    edited
  }
}

# 2. Rechercher le nouveau contenu
query SearchEditedMessage {
  searchMessages(q: "Contenu modifié pour test") {
    hits {
      _id
      _source {
        content
        edited # Devrait être true
      }
    }
  }
}
```

### Supprimer et Vérifier

```graphql
# 1. Supprimer un message
mutation DeleteMessage {
  deleteMessage(messageId: "clmsg123456789") {
    id
    deleted
  }
}

# 2. Rechercher (ne devrait plus être trouvé)
query SearchDeletedMessage {
  searchMessages(q: "contenu du message supprimé") {
    total # Devrait être 0 ou ne pas inclure le message supprimé
    hits {
      _id
    }
  }
}
```

## 7. Variables TypeScript pour Apollo Client

```typescript
// Types
interface SearchMessagesVariables {
  q: string;
  conversationId?: string;
  rideId?: string;
  limit?: number;
  offset?: number;
}

interface MessagesAroundMessageVariables {
  messageId: string;
  beforeCount?: number;
  afterCount?: number;
}

interface GetMessagesVariables {
  conversationId?: string;
  rideId?: string;
  cursor?: string;
  limit?: number;
  direction?: 'BEFORE' | 'AFTER';
}

// Usage avec Apollo Client
import { useQuery } from '@apollo/client';

// Recherche
const { data, loading } = useQuery<
  { searchMessages: MessageSearchResponse },
  SearchMessagesVariables
>(SEARCH_MESSAGES, {
  variables: {
    q: 'rendez-vous',
    conversationId: 'clabcdef123456789',
    limit: 20,
  },
});

// Jump to message
const { data: jumpData } = useQuery<
  { messagesAroundMessage: MessagesAroundOutput },
  MessagesAroundMessageVariables
>(MESSAGES_AROUND_MESSAGE, {
  variables: {
    messageId: selectedMessageId,
    beforeCount: 20,
    afterCount: 20,
  },
  skip: !selectedMessageId,
});

// Pagination
const { data: messagesData, fetchMore } = useQuery<
  { messages: Message[] },
  GetMessagesVariables
>(GET_MESSAGES, {
  variables: {
    conversationId: 'clabcdef123456789',
    limit: 20,
    direction: 'BEFORE',
  },
});

// Fetch more
fetchMore({
  variables: {
    cursor: oldestMessage.createdAt,
    direction: 'BEFORE',
  },
  updateQuery: (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;
    return {
      messages: [...fetchMoreResult.messages, ...prev.messages],
    };
  },
});
```

## 8. Exemples cURL pour Tests Manuels

### Recherche

```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "query { searchMessages(q: \"test\", limit: 5) { total hits { _id position _source { content } } } }"
  }'
```

### Jump to Message

```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "query { messagesAroundMessage(messageId: \"clmsg123\", beforeCount: 10, afterCount: 10) { messages { id content } targetPosition hasMoreBefore hasMoreAfter } }"
  }'
```

## 9. Playground Queries (GraphQL Playground / Apollo Studio)

Copier-coller ces exemples directement dans GraphQL Playground :

```graphql
# === RECHERCHE ===
query SearchWithPosition {
  searchMessages(q: "rendez-vous", conversationId: "clabcdef123456789") {
    total
    hits {
      _id
      position
      _source {
        content
        createdAt
      }
    }
  }
}

# === JUMP ===
query JumpToFoundMessage {
  messagesAroundMessage(
    messageId: "clmsg123456789"
    beforeCount: 15
    afterCount: 15
  ) {
    messages {
      id
      content
      createdAt
      sender {
        fullName
      }
    }
    targetPosition
    hasMoreBefore
    hasMoreAfter
  }
}

# === PAGINATION ===
query LoadMessages {
  messages(conversationId: "clabcdef123456789", limit: 20, direction: BEFORE) {
    id
    content
    createdAt
  }
}
```

---

## Notes

- Toutes ces queries nécessitent un JWT valide (utilisateur authentifié)
- Les résultats sont automatiquement filtrés par utilisateur (sécurité)
- Le champ `position` est 0-based (ajouter +1 pour affichage humain)
- `refresh: true` garantit que les nouveaux/modifiés messages sont immédiatement cherchables
- Cache activé uniquement pour chargement initial (sans cursor)
