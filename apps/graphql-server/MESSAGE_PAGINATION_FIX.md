# 🧪 Test de la pagination des messages

## Problème identifié et résolu

### ❌ Problème initial

Avec cette requête :

```json
{
  "conversationId": "aa123cc8-2ce2-4ab0-a6af-b54e9601384c",
  "limit": 20,
  "direction": "BEFORE",
  "cursor": "2025-11-03T01:31:46.203Z"
}
```

**Résultat attendu** : 20 nouveaux messages créés avant `2025-11-03T01:31:46.203Z`

**Résultat obtenu** : ❌ 1 seul nouveau message + 19 messages déjà affichés (total 20 mais pas de nouvelles données)

### 🔍 Cause

Le **cache Redis** était utilisé même lors des "fetch more" avec cursor, retournant les anciens résultats au lieu de charger de nouveaux messages.

### ✅ Solution appliquée

Désactiver le cache Redis pour les requêtes avec cursor :

```typescript
// Dans messages.service.ts

const shouldUseCache = !cursor; // Cache SEULEMENT pour le chargement initial

if (shouldUseCache) {
  const cacheKey = `messages:${roomId}:latest:${limit}:${direction}`;
  const cached = await this.redisService.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
}

// Requête DB directe pour les "fetch more"
const messages = await this.prisma.message.findMany({
  where: {
    ...where,
    deleted: false,
    ...(cursor && Object.keys(dateCondition).length > 0
      ? { createdAt: dateCondition }
      : {}),
  },
  take: limit, // Prend TOUJOURS 20 messages
});
```

---

## 🧪 Scénarios de test

### Test 1 : Chargement initial (avec cache)

**Query** :

```graphql
query {
  messages(conversationId: "conv-123", limit: 20, direction: BEFORE) {
    id
    content
    createdAt
  }
}
```

**Résultat attendu** :

- ✅ 20 messages les plus récents de la conversation
- ✅ Peut venir du cache si déjà appelé récemment
- ✅ Ordre : du plus récent au plus ancien

**Vérification** :

```bash
# Dans Redis
GET messages:conv-123:latest:20:BEFORE
# Devrait retourner les 20 messages en JSON
```

---

### Test 2 : Fetch more - Scroll vers le haut (sans cache)

**État initial** : 20 messages affichés (msg100 à msg81)

**Query** :

```graphql
query {
  messages(
    conversationId: "conv-123"
    cursor: "2025-11-03T01:31:46.203Z" # createdAt de msg81
    limit: 20
    direction: BEFORE
  ) {
    id
    content
    createdAt
  }
}
```

**Résultat attendu** :

- ✅ 20 **nouveaux** messages (msg80 à msg61)
- ✅ **AUCUN** message déjà affiché dans les résultats
- ❌ **PAS** de cache utilisé
- ✅ Ordre : du plus récent au plus ancien

**Vérification** :

```typescript
// Tous les messages doivent avoir createdAt < "2025-11-03T01:31:46.203Z"
messages.every(msg => new Date(msg.createdAt) < new Date("2025-11-03T01:31:46.203Z"))
// → true

// Aucun message ne doit avoir le même ID que ceux déjà affichés
const existingIds = [msg100.id, msg99.id, ..., msg81.id];
messages.every(msg => !existingIds.includes(msg.id))
// → true
```

---

### Test 3 : Fetch more - Scroll vers le bas (sans cache)

**État initial** : 20 messages affichés (msg100 à msg81)

**Query** :

```graphql
query {
  messages(
    conversationId: "conv-123"
    cursor: "2025-11-03T10:30:00.000Z" # createdAt de msg100
    limit: 20
    direction: AFTER
  ) {
    id
    content
    createdAt
  }
}
```

**Résultat attendu** :

- ✅ 20 **nouveaux** messages (msg101 à msg120)
- ✅ **AUCUN** message déjà affiché dans les résultats
- ❌ **PAS** de cache utilisé
- ✅ Ordre : du plus ancien au plus récent (inversé automatiquement)

**Vérification** :

```typescript
// Tous les messages doivent avoir createdAt > cursor
messages.every(
  (msg) => new Date(msg.createdAt) > new Date('2025-11-03T10:30:00.000Z'),
);
// → true

// L'ordre doit être chronologique croissant
messages[0].createdAt < messages[19].createdAt;
// → true
```

---

### Test 4 : Invalidation du cache après nouveau message

**Étapes** :

1. Charger les 20 messages initiaux → Cache créé
2. Envoyer un nouveau message
3. Recharger les 20 messages initiaux

**Résultat attendu** :

- ✅ Le cache doit être **invalidé** après l'envoi du message
- ✅ La nouvelle requête doit inclure le nouveau message
- ✅ Un nouveau cache doit être créé avec le message récent

**Vérification** :

```typescript
// Avant envoi
const before = await query({ conversationId: 'conv-123', limit: 20 });
// before.length = 20, before[0].id = "msg100"

// Envoi d'un message
await sendMessage({ conversationId: 'conv-123', content: 'New message' });

// Après envoi
const after = await query({ conversationId: 'conv-123', limit: 20 });
// after.length = 20, after[0].id = "msg101" (nouveau message)
// after[0].content = "New message"
```

---

## 📋 Checklist de validation

Avant de déployer, vérifier :

- [ ] **Chargement initial** : 20 messages retournés
- [ ] **Cache initial** : Redis contient la clé `messages:${roomId}:latest:${limit}:BEFORE`
- [ ] **Fetch more BEFORE** : 20 **nouveaux** messages (pas de doublons)
- [ ] **Fetch more AFTER** : 20 **nouveaux** messages (pas de doublons)
- [ ] **Pas de cache pour cursor** : Redis ne contient PAS de clés avec timestamps spécifiques
- [ ] **Invalidation cache** : Nouveau message invalide le cache initial
- [ ] **Ordre correct** : BEFORE = DESC, AFTER = ASC puis reverse
- [ ] **Cursor exclusif** : Le message au cursor n'est jamais inclus dans les résultats

---

## 🐛 Debugging

### Vérifier le cache Redis

```bash
# Lister toutes les clés de messages
redis-cli KEYS "messages:*"

# Exemple de résultat attendu :
# 1) "messages:conv-123:latest:20:BEFORE"
# 2) "messages:ride-456:latest:20:BEFORE"

# PAS de clés avec timestamps :
# ❌ messages:conv-123:2025-11-03T01:31:46.203Z:20:BEFORE
```

### Logs de débogage

Dans `messages.service.ts`, les logs suivants doivent apparaître :

```typescript
// Chargement initial (avec cache potentiel)
console.log('Messages trouvés dans le cache :>> ', jsonCached.length);

// Fetch more (toujours depuis DB)
console.log('messages :>> ', JSON.stringify(orderedMessages, null, 2));
```

**Comportement attendu** :

- 1er appel : Log "messages :>> ..." (DB query)
- 2e appel identique : Log "Messages trouvés dans le cache :>> 20"
- Appel avec cursor : **Toujours** log "messages :>> ..." (jamais de cache)

---

## ✅ Validation finale

### Test avec GraphQL Playground

```graphql
# 1. Chargement initial
query Initial {
  messages(conversationId: "aa123cc8-2ce2-4ab0-a6af-b54e9601384c", limit: 20) {
    id
    content
    createdAt
  }
}

# Copier le createdAt du dernier message (msg20)
# Par exemple : "2025-11-03T01:31:46.203Z"

# 2. Fetch more (doit retourner 20 NOUVEAUX messages)
query FetchMore {
  messages(
    conversationId: "aa123cc8-2ce2-4ab0-a6af-b54e9601384c"
    cursor: "2025-11-03T01:31:46.203Z"
    limit: 20
    direction: BEFORE
  ) {
    id
    content
    createdAt
  }
}

# 3. Vérifier qu'AUCUN ID n'est identique entre les deux requêtes
```

**Résultat attendu** :

- ✅ 0 ID en commun entre `Initial` et `FetchMore`
- ✅ 20 messages dans chaque résultat
- ✅ Tous les messages de `FetchMore` ont `createdAt < "2025-11-03T01:31:46.203Z"`

---

## 🎯 Résumé de la correction

| Aspect                | Avant                | Après          |
| --------------------- | -------------------- | -------------- |
| **Cache initial**     | ✅ Activé            | ✅ Activé      |
| **Cache fetch more**  | ❌ Activé (problème) | ✅ Désactivé   |
| **Nouveaux messages** | ❌ 1 seul            | ✅ 20 messages |
| **Performance**       | ⚠️ Cache inutile     | ✅ Optimisée   |

Le problème est **résolu** : vous obtenez maintenant **20 nouveaux messages** à chaque "fetch more" ! 🚀
