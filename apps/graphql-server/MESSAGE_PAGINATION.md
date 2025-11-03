# 📨 Pagination bidirectionnelle des messages

## 🎯 Fonctionnalité

La query `messages` supporte maintenant la **pagination bidirectionnelle** avec l'enum `CursorDirection`, permettant de charger :

- ✅ Les messages **plus anciens** (avant un cursor) → `BEFORE`
- ✅ Les messages **plus récents** (après un cursor) → `AFTER`

---

## 📝 Enum CursorDirection

```graphql
enum CursorDirection {
  BEFORE # Load older messages (before cursor)
  AFTER # Load newer messages (after cursor)
}
```

---

## 🔍 Query GraphQL

```graphql
query GetMessages(
  $conversationId: String
  $rideId: String
  $cursor: String
  $limit: Float
  $direction: CursorDirection = BEFORE # Default to loading older messages
) {
  messages(
    conversationId: $conversationId
    rideId: $rideId
    cursor: $cursor
    limit: $limit
    direction: $direction
  ) {
    id
    content
    createdAt
    sender {
      id
      firstName
      lastName
    }
    attachments {
      id
      type
      file {
        key
        url
      }
    }
  }
}
```

---

## 💡 Exemples d'utilisation

### 1. Charger les 20 premiers messages (plus récents)

```graphql
query {
  messages(conversationId: "conv-uuid", limit: 20) {
    id
    content
    createdAt
  }
}
```

**Résultat** : Les 20 messages les plus récents, triés du plus récent au plus ancien.

---

### 2. Charger les 20 messages suivants (plus anciens) - Scroll vers le haut

```graphql
query {
  messages(
    conversationId: "conv-uuid"
    cursor: "2025-11-03T10:30:00Z" # createdAt du message le plus ancien affiché
    limit: 20
    direction: BEFORE # Charger les messages AVANT ce cursor
  ) {
    id
    content
    createdAt
  }
}
```

**Résultat** : Les 20 messages créés **avant** `2025-11-03T10:30:00Z`.

---

### 3. Charger les nouveaux messages (plus récents) - Scroll vers le bas

```graphql
query {
  messages(
    conversationId: "conv-uuid"
    cursor: "2025-11-03T10:30:00Z" # createdAt du message le plus récent affiché
    limit: 20
    direction: AFTER # Charger les messages APRÈS ce cursor
  ) {
    id
    content
    createdAt
  }
}
```

**Résultat** : Les 20 messages créés **après** `2025-11-03T10:30:00Z`.

---

## 🔄 Logique de tri

| Direction | Ordre SQL                                    | Ordre retourné                |
| --------- | -------------------------------------------- | ----------------------------- |
| `BEFORE`  | `ORDER BY createdAt DESC`                    | Du plus récent au plus ancien |
| `AFTER`   | `ORDER BY createdAt ASC` → puis `.reverse()` | Du plus ancien au plus récent |

### Pourquoi cette logique ?

- **BEFORE** : On veut charger les messages **avant** le cursor (plus anciens), donc on trie par `DESC` et on prend les `limit` premiers.
- **AFTER** : On veut charger les messages **après** le cursor (plus récents), donc on trie par `ASC`, on prend les `limit` premiers, puis on **inverse** l'ordre pour avoir le bon affichage chronologique.

---

## 🧪 Exemple pratique : Chat UI

### État initial (chargement des 20 derniers messages)

```typescript
const { data } = useQuery(GET_MESSAGES, {
  variables: {
    conversationId: 'conv-123',
    limit: 20,
    direction: 'BEFORE', // Par défaut
  },
});

// Messages affichés : [msg20, msg19, msg18, ..., msg1]
```

### Scroll vers le haut (charger plus anciens)

```typescript
const oldestMessage = messages[messages.length - 1]; // msg1
const cursor = oldestMessage.createdAt; // "2025-11-01T08:00:00Z"

const { data } = useQuery(GET_MESSAGES, {
  variables: {
    conversationId: 'conv-123',
    cursor,
    limit: 20,
    direction: 'BEFORE', // Charger les messages AVANT msg1
  },
});

// Nouveaux messages : [msg0, msg-1, msg-2, ..., msg-19]
// Ajouter au début de la liste actuelle
```

### Scroll vers le bas (charger plus récents)

```typescript
const newestMessage = messages[0]; // msg20
const cursor = newestMessage.createdAt; // "2025-11-03T10:30:00Z"

const { data } = useQuery(GET_MESSAGES, {
  variables: {
    conversationId: 'conv-123',
    cursor,
    limit: 20,
    direction: 'AFTER', // Charger les messages APRÈS msg20
  },
});

// Nouveaux messages : [msg21, msg22, ..., msg40]
// Ajouter à la fin de la liste actuelle
```

---

## 🚀 Implémentation React (exemple)

```typescript
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from './queries';

function ChatMessages({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState({ before: true, after: false });

  // Chargement initial
  const { loading, fetchMore } = useQuery(GET_MESSAGES, {
    variables: {
      conversationId,
      limit: 20,
      direction: 'BEFORE',
    },
    onCompleted: (data) => {
      setMessages(data.messages);
      setHasMore({ ...hasMore, before: data.messages.length === 20 });
    },
  });

  // Charger plus anciens (scroll vers le haut)
  const loadOlderMessages = async () => {
    if (!hasMore.before || loading) return;

    const oldestMessage = messages[messages.length - 1];
    const { data } = await fetchMore({
      variables: {
        conversationId,
        cursor: oldestMessage.createdAt,
        limit: 20,
        direction: 'BEFORE',
      },
    });

    setMessages([...messages, ...data.messages]);
    setHasMore({ ...hasMore, before: data.messages.length === 20 });
  };

  // Charger plus récents (scroll vers le bas)
  const loadNewerMessages = async () => {
    if (!hasMore.after || loading) return;

    const newestMessage = messages[0];
    const { data } = await fetchMore({
      variables: {
        conversationId,
        cursor: newestMessage.createdAt,
        limit: 20,
        direction: 'AFTER',
      },
    });

    setMessages([...data.messages, ...messages]);
    setHasMore({ ...hasMore, after: data.messages.length === 20 });
  };

  return (
    <div className="chat-container">
      {hasMore.before && (
        <button onClick={loadOlderMessages}>Charger plus anciens</button>
      )}

      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}

      {hasMore.after && (
        <button onClick={loadNewerMessages}>Charger plus récents</button>
      )}
    </div>
  );
}
```

---

## 🔐 Cache Redis

Le cache Redis est utilisé **uniquement pour le chargement initial** (sans cursor) pour optimiser les performances :

```typescript
const shouldUseCache = !cursor; // Cache SEULEMENT pour le chargement initial

if (shouldUseCache) {
  const cacheKey = `messages:${roomId}:latest:${limit}:${direction}`;
  // ... vérifier et utiliser le cache
}
```

**Pourquoi ne pas cacher les "fetch more" ?**

- ✅ Chaque appel avec un cursor différent doit retourner **de nouveaux messages**
- ❌ Cacher les résultats avec cursor créerait des doublons ou des résultats incorrects
- 🎯 Le cache est réservé à la première page de messages uniquement (chargement initial)

**Exemple de clés** :

- `messages:conv-123:latest:20:BEFORE` → ✅ **Cachée** (chargement initial)
- Cursors spécifiques → ❌ **Non cachées** (fetch more avec nouveaux messages à chaque fois)

---

## ⚠️ Points d'attention

### 1. **Cursor doit être un ISO date string**

```typescript
// ✅ Correct
const cursor = message.createdAt; // "2025-11-03T10:30:00.000Z"

// ❌ Incorrect
const cursor = message.id; // Ne fonctionne pas car on filtre par createdAt
```

### 2. **Le cursor est exclusif**

```typescript
// BEFORE : createdAt < cursor (ne contient pas le message cursor)
// AFTER : createdAt > cursor (ne contient pas le message cursor)
```

### 3. **L'ordre inversé pour AFTER**

Le service inverse automatiquement l'ordre des messages `AFTER` pour maintenir l'affichage chronologique correct.

### 4. **Pas de cache pour le "fetch more"**

Le cache Redis est désactivé lors de l'utilisation d'un cursor pour garantir que vous obtenez toujours **20 nouveaux messages** :

```typescript
// ✅ Chargement initial : utilisé le cache
messages(conversationId: "conv-123", limit: 20)
// → Retourne les 20 derniers messages (peut venir du cache)

// ✅ Fetch more : PAS de cache, requête DB directe
messages(conversationId: "conv-123", cursor: "2025-11-03T01:31:46.203Z", limit: 20)
// → Retourne TOUJOURS 20 nouveaux messages avant/après le cursor (jamais caché)
```

---

## 📊 Performance

- ✅ **Cache Redis** : Utilisé uniquement pour le chargement initial (sans cursor), TTL 5 minutes
- ✅ **Fetch more** : Requêtes DB directes pour garantir 20 nouveaux messages à chaque fois
- ✅ **Index DB** : `createdAt` indexé pour des requêtes rapides
- ✅ **Limit** : Défaut à 20, ajustable selon le besoin

---

## 🎯 Cas d'usage

| Scénario                         | Direction                        | Cursor                             |
| -------------------------------- | -------------------------------- | ---------------------------------- |
| Chargement initial               | `BEFORE`                         | `null`                             |
| Scroll vers le haut (historique) | `BEFORE`                         | `createdAt` du plus ancien affiché |
| Scroll vers le bas (nouveaux)    | `AFTER`                          | `createdAt` du plus récent affiché |
| Jump to message                  | Deux appels : `BEFORE` + `AFTER` | `createdAt` du message cible       |

---

## ✅ Avantages de cette approche

1. **Pagination efficace** : Ne charge que les messages nécessaires
2. **Bidirectionnelle** : Permet le scroll dans les deux sens
3. **Cursor-based** : Plus fiable que l'offset/limit
4. **Cache optimisé** : Clés distinctes par direction
5. **Flexible** : S'adapte aux besoins de l'UI (historique ou temps réel)
