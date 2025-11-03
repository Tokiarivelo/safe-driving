# 🔒 Sécurité Elasticsearch - Filtrage par utilisateur

## 📋 Résumé

Toutes les méthodes de recherche Elasticsearch ont été **sécurisées** pour ne retourner que les données auxquelles l'utilisateur actuel a accès.

---

## ✅ Services sécurisés

### 1. **ConversationSearchService** (`searchConversations`)

**Filtrage** : Uniquement les conversations où l'utilisateur est participant

```typescript
// Filtre appliqué
{
  nested: {
    path: 'participants',
    query: {
      term: { 'participants.userId': userId }
    }
  }
}
```

**Resolver** :

```graphql
query {
  searchConversations(q: "test", page: 0, size: 20) {
    total
    hits {
      _source {
        id
        title
        # Seulement les conversations où je suis participant
      }
    }
  }
}
```

---

### 2. **MessageSearchService** (`searchMessages`)

**Filtrage** : Uniquement les messages des conversations où l'utilisateur est participant

**Indexation automatique** : ✅ Tous les messages sont automatiquement indexés lors de :

- ✅ Création (`sendMessage`) → Indexation immédiate
- ✅ Édition (`editMessage`) → Réindexation immédiate
- ✅ Suppression (`deleteMessage`) → Suppression de l'index

> 📚 Voir [ELASTICSEARCH_MESSAGE_INDEXING.md](./ELASTICSEARCH_MESSAGE_INDEXING.md) pour les détails

**Deux scénarios** :

#### A. Recherche globale (sans `conversationId`)

```typescript
// 1. Récupérer les IDs des conversations de l'utilisateur
const userConversations = await prisma.conversationParticipant.findMany({
  where: { userId },
  select: { conversationId: true },
});

// 2. Filtrer les messages de ces conversations
{
  terms: {
    conversationId: conversationIds;
  }
}
```

#### B. Recherche dans une conversation spécifique

```typescript
// 1. Vérifier que l'utilisateur est participant
const participant = await prisma.conversationParticipant.findUnique({
  where: {
    conversationId_userId: { conversationId, userId },
  },
});

// 2. Si non participant → retourner { total: 0, hits: [] }
// 3. Sinon → appliquer le filtre
{
  term: {
    conversationId;
  }
}
```

**Resolver** :

```graphql
query {
  searchMessages(q: "bonjour", conversationId: "conv-uuid") {
    total
    hits {
      _source {
        content
        # Seulement si je suis participant de cette conversation
      }
    }
  }
}
```

---

### 3. **RideSearchService** (`searchRides`)

**Filtrage** : Uniquement les rides où l'utilisateur est conducteur OU participant

```typescript
// Filtre appliqué (OR logic)
{
  bool: {
    should: [
      // L'utilisateur est le conducteur
      { term: { driverId: userId } },

      // L'utilisateur est un participant
      {
        nested: {
          path: 'participants',
          query: {
            term: { 'participants.userId': userId }
          }
        }
      }
    ],
    minimum_should_match: 1
  }
}
```

**Resolver** :

```graphql
query {
  searchRides(q: "john", status: "ONGOING") {
    total
    hits {
      _source {
        id
        status
        # Seulement les rides où je suis conducteur ou participant
      }
    }
  }
}
```

---

### 4. **UserSearchService** (`searchUsers`)

**⚠️ NON SÉCURISÉ** - Intentionnellement public

**Raison** : Permet de rechercher des utilisateurs pour les ajouter dans des conversations ou des rides.

**Resolver** :

```graphql
query {
  searchUsers(q: "john@email.com") {
    total
    hits {
      _source {
        id
        email
        firstName
        # Accessible à tous les utilisateurs authentifiés
      }
    }
  }
}
```

---

## 🔐 Implémentation technique

### Pattern utilisé

Tous les services de recherche sécurisés suivent le même pattern :

1. **Service** : Accepte `userId` en option

   ```typescript
   async searchXXX(
     q: string | null,
     options?: { page?: number; size?: number; userId?: string }
   ): Promise<XXXSearchResponse>
   ```

2. **Resolver** : Injecte automatiquement `user.id` via le décorateur `@CurrentUser()`

   ```typescript
   @UseGuards(JwtAuthGuard)
   @Query(() => XXXSearchResponse)
   async searchXXX(
     @CurrentUser() user: User,
     @Args('q', { nullable: true }) q: string | null,
     ...
   ): Promise<XXXSearchResponse> {
     return this.xxxSearchService.searchXXX(q, {
       ...options,
       userId: user.id // ✅ Injection automatique
     });
   }
   ```

3. **Elasticsearch Query** : Applique le filtre `userId` dans le `must` array

   ```typescript
   const must: any[] = [];

   if (userId) {
     must.push({
       /* filtre spécifique */
     });
   }

   const body = {
     query: must.length > 0 ? { bool: { must } } : { match_all: {} },
   };
   ```

---

## 🧪 Tests de sécurité

### Test 1 : Conversations

```typescript
// Utilisateur A ne doit PAS voir les conversations de B
const userA = { id: 'user-a-id' };
const userB = { id: 'user-b-id' };

// Créer une conversation pour B uniquement
const convB = await createConversation({
  participantIds: [userB.id],
});

// Recherche par A
const resultsA = await searchConversations('test', { userId: userA.id });
// ✅ Doit retourner 0 résultats

// Recherche par B
const resultsB = await searchConversations('test', { userId: userB.id });
// ✅ Doit retourner 1 résultat (convB)
```

### Test 2 : Messages

```typescript
// Utilisateur A ne doit PAS voir les messages de conversations où il n'est pas participant
const userA = { id: 'user-a-id' };

// Conversation privée de B
const convB = await createConversation({
  participantIds: [userB.id],
});

await sendMessage({
  conversationId: convB.id,
  content: 'Message secret',
});

// Recherche par A
const resultsA = await searchMessages('secret', { userId: userA.id });
// ✅ Doit retourner 0 résultats

// Recherche dans une conversation spécifique (non participant)
const resultsA2 = await searchMessages('secret', {
  userId: userA.id,
  conversationId: convB.id,
});
// ✅ Doit retourner { total: 0, hits: [] }
```

### Test 3 : Rides

```typescript
// Utilisateur A ne doit PAS voir les rides où il n'est ni conducteur ni participant
const userA = { id: 'user-a-id' };
const userB = { id: 'user-b-id' };

// Ride de B uniquement
const rideB = await createRide({
  driverId: userB.id,
  participantIds: [],
});

// Recherche par A
const resultsA = await searchRides('ride', { userId: userA.id });
// ✅ Doit retourner 0 résultats

// Recherche par B
const resultsB = await searchRides('ride', { userId: userB.id });
// ✅ Doit retourner 1 résultat (rideB)
```

---

## 🚨 Points d'attention

### 1. **Performance**

La recherche de messages peut être coûteuse si un utilisateur participe à beaucoup de conversations :

```typescript
// Récupération de toutes les conversations de l'utilisateur
const userConversations = await prisma.conversationParticipant.findMany({
  where: { userId },
  select: { conversationId: true },
});
```

**Solution** : Ajouter un cache Redis pour stocker les IDs des conversations par utilisateur :

```typescript
const cacheKey = `user:${userId}:conversations`;
let conversationIds = await redis.get(cacheKey);

if (!conversationIds) {
  const userConversations = await prisma.conversationParticipant.findMany({
    where: { userId },
    select: { conversationId: true },
  });
  conversationIds = userConversations.map((c) => c.conversationId);
  await redis.set(cacheKey, JSON.stringify(conversationIds), 'EX', 300); // 5 min
}
```

### 2. **Indexation**

L'indexation doit être déclenchée après chaque modification de participant :

```typescript
// Exemple : Ajout d'un participant à une conversation
await addParticipant(conversationId, userId);

// ✅ Réindexer la conversation
await conversationSearchService.indexConversation(conversationId, {
  refresh: true,
});
```

### 3. **Mutations bulk (Admin)**

Les mutations `recreateAndBulkXXX` ne sont **PAS** sécurisées car elles sont destinées aux admins.

**TODO** : Ajouter un guard admin :

```typescript
@UseGuards(JwtAuthGuard, AdminGuard)
@Mutation(() => Boolean)
async recreateAndBulkConversations() {
  await this.conversationSearchService.recreateAndBulkIndex();
  return true;
}
```

---

## 📊 Récapitulatif

| Service                | Sécurisé | Filtre appliqué           | Performance              |
| ---------------------- | -------- | ------------------------- | ------------------------ |
| **ConversationSearch** | ✅ Oui   | Participant uniquement    | ⚡ Rapide (nested query) |
| **MessageSearch**      | ✅ Oui   | Conversations participées | ⚠️ Moyen (DB query)      |
| **RideSearch**         | ✅ Oui   | Conducteur OU participant | ⚡ Rapide (nested query) |
| **UserSearch**         | ❌ Non   | Aucun (public)            | ⚡ Rapide                |

---

## 🎯 Prochaines améliorations

1. ✅ **Cache Redis** pour les IDs de conversations par utilisateur
2. ✅ **AdminGuard** pour les mutations bulk
3. ✅ **Tests unitaires** pour vérifier le filtrage de sécurité
4. ✅ **Monitoring** des performances de recherche
5. ✅ **Rate limiting** pour éviter les abus
