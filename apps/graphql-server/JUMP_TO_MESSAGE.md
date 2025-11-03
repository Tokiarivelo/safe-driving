# Jump to Message Feature

## Overview

Cette fonctionnalité permet de "sauter" directement à un message spécifique dans une conversation et de charger les messages environnants. C'est particulièrement utile lorsque l'utilisateur clique sur un résultat de recherche et veut voir le contexte autour de ce message.

## Architecture

### 1. Position Tracking dans les Résultats de Recherche

Chaque résultat de recherche inclut maintenant sa position exacte dans la conversation :

```graphql
type MessageSearchHit {
  _index: String!
  _id: String!
  _score: Float!
  _source: MessageSource!
  position: Int # Position 0-based du message dans la conversation
}
```

La position est calculée automatiquement lors de la recherche :

```typescript
const countBefore = await this.prisma.message.count({
  where: {
    conversationId: messageSource.conversationId,
    deleted: false,
    createdAt: { lt: messageSource.createdAt },
  },
});
position = countBefore; // 0-based index
```

### 2. Chargement des Messages Autour d'un Message Cible

Nouvelle query GraphQL : `messagesAroundMessage`

```graphql
query GetMessagesAroundMessage(
  $messageId: String!
  $beforeCount: Int
  $afterCount: Int
) {
  messagesAroundMessage(
    messageId: $messageId
    beforeCount: $beforeCount # Défaut: 10
    afterCount: $afterCount # Défaut: 10
  ) {
    messages {
      id
      content
      createdAt
      sender {
        id
        fullName
      }
      # ... autres champs
    }
    targetMessageId
    targetPosition # Position dans la conversation complète
    beforeCount # Nombre de messages chargés avant
    afterCount # Nombre de messages chargés après
    hasMoreBefore # Y a-t-il plus de messages avant?
    hasMoreAfter # Y a-t-il plus de messages après?
  }
}
```

## Workflow Utilisateur

### Scénario: Recherche et Navigation

1. **L'utilisateur recherche un texte**

   ```graphql
   query SearchMessages {
     searchMessages(q: "rendez-vous demain", conversationId: "conv-123") {
       total
       hits {
         _id
         _score
         position # Ex: 147 (le message est le 148ème dans la conversation)
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

2. **L'utilisateur clique sur un résultat de recherche**

   Frontend affiche : "Message #148 de 500" (position + 1 pour l'affichage humain)

3. **Le système charge les messages autour de ce résultat**

   ```graphql
   query JumpToMessage {
     messagesAroundMessage(
       messageId: "msg-xyz"
       beforeCount: 20
       afterCount: 20
     ) {
       messages {
         id
         content
         createdAt
       }
       targetPosition # 147
       hasMoreBefore # true (il y a 127 messages avant)
       hasMoreAfter # true (il y a 352 messages après)
     }
   }
   ```

4. **L'utilisateur peut continuer à paginer normalement**

   Utiliser la query `messages` standard avec `cursor` et `direction`

## Implémentation Frontend (React Example)

### Hook pour le Jump to Message

```typescript
import { useQuery, gql } from '@apollo/client';

const MESSAGES_AROUND_MESSAGE = gql`
  query GetMessagesAroundMessage(
    $messageId: String!
    $beforeCount: Int
    $afterCount: Int
  ) {
    messagesAroundMessage(
      messageId: $messageId
      beforeCount: $beforeCount
      afterCount: $afterCount
    ) {
      messages {
        id
        content
        createdAt
        sender {
          id
          fullName
          avatar {
            url
          }
        }
        attachments {
          id
          file {
            url
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
`;

export function useJumpToMessage(messageId: string | null) {
  return useQuery(MESSAGES_AROUND_MESSAGE, {
    variables: {
      messageId,
      beforeCount: 20,
      afterCount: 20,
    },
    skip: !messageId, // Ne pas exécuter si pas de messageId
  });
}
```

### Composant de Résultat de Recherche

```typescript
interface SearchResultProps {
  hit: MessageSearchHit;
  onJumpToMessage: (messageId: string) => void;
}

function SearchResultItem({ hit, onJumpToMessage }: SearchResultProps) {
  return (
    <div
      className="search-result-item"
      onClick={() => onJumpToMessage(hit._id)}
    >
      <div className="search-result-content">
        {hit._source.content}
      </div>
      <div className="search-result-meta">
        <span>Score: {hit._score.toFixed(2)}</span>
        {hit.position !== undefined && (
          <span>Message #{hit.position + 1}</span>
        )}
        <span>{new Date(hit._source.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
```

### Intégration dans le Chat

```typescript
function ChatView() {
  const [jumpToMessageId, setJumpToMessageId] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Query pour charger les messages autour d'un message cible
  const { data: jumpData, loading: jumpLoading } = useJumpToMessage(jumpToMessageId);

  useEffect(() => {
    if (jumpData?.messagesAroundMessage) {
      const { messages, targetMessageId } = jumpData.messagesAroundMessage;

      // 1. Remplacer les messages actuels
      setMessages(messages);

      // 2. Scroll vers le message ciblé
      setTimeout(() => {
        const targetElement = document.getElementById(`message-${targetMessageId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Optionnel: highlight temporaire
          targetElement.classList.add('highlighted');
          setTimeout(() => targetElement.classList.remove('highlighted'), 2000);
        }
      }, 100);

      // 3. Reset le jumpToMessageId
      setJumpToMessageId(null);
    }
  }, [jumpData]);

  return (
    <div className="chat-container">
      {/* Zone de recherche */}
      <SearchPanel onSelectResult={(messageId) => setJumpToMessageId(messageId)} />

      {/* Liste des messages */}
      <div ref={messageListRef} className="message-list">
        {jumpLoading && <div>Chargement...</div>}
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            id={`message-${msg.id}`}
          />
        ))}
      </div>

      {/* Indicateurs de pagination */}
      {jumpData?.messagesAroundMessage && (
        <div className="pagination-info">
          {jumpData.messagesAroundMessage.hasMoreBefore && (
            <button onClick={loadOlderMessages}>
              Charger messages précédents
            </button>
          )}
          {jumpData.messagesAroundMessage.hasMoreAfter && (
            <button onClick={loadNewerMessages}>
              Charger messages suivants
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

## Optimisations

### 1. Performance de Calcul de Position

**Problème actuel**: La position est calculée avec une requête COUNT pour chaque résultat de recherche.

**Solutions possibles**:

a) **Cache Redis** (Recommandé pour petites conversations)

```typescript
// Cache la position pendant 5 minutes
const cacheKey = `message:${messageId}:position`;
const cachedPosition = await this.redis.get(cacheKey);
if (cachedPosition) return parseInt(cachedPosition);

const position = await this.calculatePosition(messageId);
await this.redis.setex(cacheKey, 300, position.toString());
return position;
```

b) **Window Functions SQL** (Recommandé pour grandes conversations)

```sql
-- Calculer toutes les positions en une seule requête
SELECT
  id,
  ROW_NUMBER() OVER (ORDER BY createdAt) - 1 as position
FROM messages
WHERE conversationId = ? AND deleted = false
  AND id IN (?, ?, ?)  -- IDs des résultats de recherche
```

c) **Denormalisation** (Recommandé pour conversations très actives)

```prisma
model Message {
  id                String   @id
  positionInConv    Int?     // Mise à jour automatique via trigger
  // ... autres champs
}
```

### 2. Pagination Infinie avec Jump

Combiner le jump to message avec la pagination infinie existante :

```typescript
function useChatMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cursors, setCursors] = useState({
    oldest: null as string | null,
    newest: null as string | null,
  });

  // Pagination normale (fetch-more)
  const loadOlder = async () => {
    const { data } = await fetchMessages({
      conversationId,
      cursor: cursors.oldest,
      direction: 'BEFORE',
      limit: 20,
    });

    setMessages((prev) => [...data, ...prev]);
    setCursors((prev) => ({ ...prev, oldest: data[0]?.id }));
  };

  // Jump to message (remplace tout)
  const jumpToMessage = async (messageId: string) => {
    const { data } = await fetchMessagesAround({
      messageId,
      beforeCount: 20,
      afterCount: 20,
    });

    const { messages, hasMoreBefore, hasMoreAfter } =
      data.messagesAroundMessage;

    setMessages(messages);
    setCursors({
      oldest: hasMoreBefore ? messages[0]?.id : null,
      newest: hasMoreAfter ? messages[messages.length - 1]?.id : null,
    });
  };

  return { messages, loadOlder, loadNewer, jumpToMessage };
}
```

## Sécurité

### Vérification d'Accès

La méthode `getMessagesAroundMessage` vérifie automatiquement que l'utilisateur a accès à la conversation :

```typescript
// Vérification dans le service
const participant = await this.prisma.conversationParticipant.findUnique({
  where: {
    conversationId_userId: {
      conversationId: targetMessage.conversationId,
      userId,
    },
  },
});

if (!participant) {
  throw new Error(
    'Unauthorized: User is not a participant of this conversation',
  );
}
```

Cette vérification empêche un utilisateur malveillant de :

- Accéder à des messages de conversations dont il n'est pas membre
- Utiliser un messageId pour découvrir des messages privés

## Monitoring et Métriques

### Métriques à suivre

1. **Performance de recherche**
   - Temps de calcul de position (moyenne, p95, p99)
   - Nombre de COUNT queries par recherche

2. **Utilisation de la fonctionnalité**
   - Nombre de jump-to-message par jour
   - Pourcentage d'utilisateurs qui utilisent la recherche puis jump

3. **Cache hit rate** (si implémenté)
   - Taux de cache hit pour les positions
   - TTL optimal pour le cache

### Exemple de Logging

```typescript
const startTime = Date.now();
const result = await this.getMessagesAroundMessage(
  messageId,
  userId,
  before,
  after,
);
const duration = Date.now() - startTime;

this.logger.log({
  action: 'jump_to_message',
  messageId,
  userId,
  conversationId: result.messages[0]?.conversationId,
  position: result.targetPosition,
  beforeCount: result.beforeCount,
  afterCount: result.afterCount,
  duration,
});
```

## Tests

### Tests Unitaires

```typescript
describe('MessageService.getMessagesAroundMessage', () => {
  it('should load messages around target message', async () => {
    const result = await service.getMessagesAroundMessage(
      'msg-50',
      'user-1',
      10,
      10,
    );

    expect(result.messages).toHaveLength(21); // 10 avant + 1 cible + 10 après
    expect(result.targetMessageId).toBe('msg-50');
    expect(result.targetPosition).toBe(49); // 0-based
  });

  it('should handle edge case: target is first message', async () => {
    const result = await service.getMessagesAroundMessage(
      'msg-1',
      'user-1',
      10,
      10,
    );

    expect(result.beforeCount).toBe(0);
    expect(result.hasMoreBefore).toBe(false);
  });

  it('should throw error if user is not participant', async () => {
    await expect(
      service.getMessagesAroundMessage('msg-50', 'unauthorized-user', 10, 10),
    ).rejects.toThrow('Unauthorized');
  });
});
```

### Tests E2E

```typescript
describe('Jump to Message Flow (E2E)', () => {
  it('should search and jump to message', async () => {
    // 1. Rechercher
    const searchResult = await client.query({
      query: SEARCH_MESSAGES,
      variables: { q: 'important', conversationId: 'conv-1' },
    });

    const firstHit = searchResult.data.searchMessages.hits[0];
    expect(firstHit.position).toBeGreaterThan(0);

    // 2. Jump to message
    const jumpResult = await client.query({
      query: MESSAGES_AROUND_MESSAGE,
      variables: { messageId: firstHit._id },
    });

    expect(jumpResult.data.messagesAroundMessage.messages).toContainEqual(
      expect.objectContaining({ id: firstHit._id }),
    );
  });
});
```

## Roadmap

### Améliorations futures

1. **Optimisation de la position**
   - [ ] Implémenter le cache Redis pour les positions
   - [ ] Utiliser window functions SQL pour batch calculation
   - [ ] Ajouter un index sur (conversationId, createdAt, deleted)

2. **UX amélioré**
   - [ ] Prévisualisation du contexte dans les résultats de recherche
   - [ ] Scroll virtuel pour gérer des milliers de messages
   - [ ] Animation de transition lors du jump

3. **Analytics**
   - [ ] Dashboard de métriques d'utilisation de la recherche
   - [ ] A/B test: beforeCount/afterCount optimal
   - [ ] Heatmap des positions les plus consultées

## Ressources

- [MESSAGE_PAGINATION.md](./MESSAGE_PAGINATION.md) - Pagination bidirectionnelle
- [ELASTICSEARCH_MESSAGE_INDEXING.md](./ELASTICSEARCH_MESSAGE_INDEXING.md) - Indexation automatique
- [ELASTICSEARCH_SECURITY.md](./ELASTICSEARCH_SECURITY.md) - Sécurité de la recherche
