# Elasticsearch Search Integration

Ce document décrit l'intégration complète d'Elasticsearch pour la recherche de conversations, messages, users et rides.

## 📚 Structure

### Modules de recherche créés

1. **ConversationSearchService** (`src/conversation/`)
2. **MessageSearchService** (`src/message/`)
3. **UserSearchService** (`src/user/`)
4. **RideSearchService** (`src/drivers/`)

## 🔍 Queries GraphQL disponibles

### 1. Recherche de conversations

```graphql
query SearchConversations {
  searchConversations(q: "test", page: 0, size: 20) {
    total
    hits {
      _id
      _score
      _source {
        id
        title
        type
        createdAt
        participants {
          displayName
          username
          email
        }
        messageCount
      }
    }
  }
}
```

**Champs recherchés** :

- `title` : Titre de la conversation
- `participants.displayName` : Nom d'affichage des participants (boost x2)
- `participants.username` : Nom d'utilisateur
- `participants.email` : Email
- `createdAt_text` : Date formatée

### 2. Recherche de messages

```graphql
query SearchMessages {
  searchMessages(q: "hello", conversationId: "uuid", page: 0, size: 20) {
    total
    hits {
      _id
      _score
      _source {
        id
        content
        createdAt
        sender {
          firstName
          lastName
          email
        }
        attachments {
          type
          linkTitle
        }
      }
    }
  }
}
```

**Champs recherchés** :

- `content` : Contenu du message (avec fuzziness AUTO)
- `sender.firstName` : Prénom de l'expéditeur (boost x2)
- `sender.lastName` : Nom de l'expéditeur
- `sender.username` : Nom d'utilisateur
- `sender.email` : Email
- `attachments.linkTitle` : Titre des liens attachés (nested)

**Filtres disponibles** :

- `conversationId` : Filtrer par conversation

### 3. Recherche d'utilisateurs

```graphql
query SearchUsers {
  searchUsers(q: "john", page: 0, size: 20) {
    total
    hits {
      _id
      _score
      _source {
        id
        email
        firstName
        lastName
        username
        phone
        isVerified
        status
        driverStatus
        roles {
          id
          name
        }
      }
    }
  }
}
```

**Champs recherchés** :

- `email` : Email
- `firstName` : Prénom (boost x2)
- `lastName` : Nom (boost x2)
- `username` : Nom d'utilisateur
- `phone` : Téléphone

### 4. Recherche de courses (Rides)

```graphql
query SearchRides {
  searchRides(q: "driver name", status: "ONGOING", page: 0, size: 20) {
    total
    hits {
      _id
      _score
      _source {
        id
        status
        startedAt
        finishedAt
        driver {
          firstName
          lastName
          email
        }
        participants {
          role
          firstName
          lastName
          email
        }
      }
    }
  }
}
```

**Champs recherchés** :

- `driver.firstName` : Prénom du conducteur (boost x2)
- `driver.lastName` : Nom du conducteur
- `driver.username` : Nom d'utilisateur du conducteur
- `driver.email` : Email du conducteur
- `participants.firstName` : Prénom des participants (nested, boost x2)
- `participants.lastName` : Nom des participants (nested)
- `participants.email` : Email des participants (nested)

**Filtres disponibles** :

- `status` : Filtrer par statut (REQUESTED, ONGOING, FINISHED, etc.)

## 🔧 Mutations d'administration

### Recréer et réindexer tous les documents

```graphql
# Conversations
mutation {
  recreateAndBulkConversation
}

# Messages
mutation {
  recreateAndBulkMessages
}

# Users
mutation {
  recreateAndBulkUsers
}

# Rides
mutation {
  recreateAndBulkRides
}
```

⚠️ **Attention** : Ces mutations suppriment l'index existant et réindexent toutes les données. À utiliser avec précaution en production.

## 🎯 Fonctionnalités Elasticsearch

### Edge N-gram Analyzer

Tous les champs texte utilisent l'analyseur `edge_ngram_analyzer` qui permet :

- Recherche partielle : "test" match "test2@email.com"
- Auto-complétion : "joh" match "john", "johnny", etc.
- Min 2 caractères, max 20 caractères

### Configuration

```json
{
  "edge_ngram_filter": {
    "type": "edge_ngram",
    "min_gram": 2,
    "max_gram": 20
  },
  "edge_ngram_analyzer": {
    "tokenizer": "standard",
    "filter": ["lowercase", "asciifolding", "edge_ngram_filter"]
  }
}
```

### Multi-fields

Chaque champ texte a deux mappings :

- **text** : Pour la recherche full-text avec edge n-gram
- **raw** (keyword) : Pour le tri et les agrégations exactes

Exemple :

```json
{
  "email": {
    "type": "text",
    "analyzer": "edge_ngram_analyzer",
    "fields": {
      "raw": { "type": "keyword", "normalizer": "keyword_lowercase" }
    }
  }
}
```

## 📊 Tri des résultats

Par défaut, les résultats sont triés par :

1. **Score de pertinence** (`_score`) pour les requêtes avec `q`
2. **Date de création** (`createdAt desc`) pour match_all

## 🚀 Initialisation automatique

Les index sont créés automatiquement au démarrage de l'application via `OnModuleInit` :

- ✅ `conversations` index
- ✅ `messages` index
- ✅ `users` index
- ✅ `rides` index

## 🔄 Synchronisation temps réel

Pour maintenir Elasticsearch synchronisé avec la base de données, vous pouvez :

1. **Appeler manuellement** `indexConversation`, `indexMessage`, `indexUser`, `indexRide` après chaque création/modification
2. **Utiliser des hooks Prisma** (middleware)
3. **Écouter des événements** via Redis pub/sub
4. **Scheduler une synchronisation** périodique

### Exemple d'indexation manuelle

```typescript
// Après création d'un message
const message = await this.messageService.sendMessage(userId, input);
await this.messageSearchService.indexMessage(message.id, { refresh: true });
```

## 🛠️ Maintenance

### Vérifier l'état du cluster

```bash
curl http://localhost:9200/_cluster/health?pretty
```

### Vérifier les index

```bash
curl http://localhost:9200/_cat/indices?v
```

### Supprimer un index

```bash
curl -X DELETE http://localhost:9200/conversations
```

## 📈 Performance

- **number_of_shards**: 1 (développement)
- **number_of_replicas**: 0 (développement)
- **Pagination**: Limitée à 10000 documents par défaut
- **Bulk indexing**: Limite de 10000 messages par opération

Pour la production, ajustez ces paramètres selon vos besoins.

## 🔐 Sécurité

Toutes les queries de recherche sont protégées par `@UseGuards(JwtAuthGuard)`.

Les mutations de recréation d'index devraient être limitées aux administrateurs en production :

```typescript
@UseGuards(JwtAuthGuard, AdminGuard)
@Mutation(() => Boolean)
async recreateAndBulkMessages() {
  await this.messageSearchService.recreateAndBulkIndex();
  return true;
}
```

## 📝 Notes

- Les recherches sont **insensibles à la casse** (lowercase filter)
- Les accents sont normalisés (asciifolding filter)
- Les recherches partielles fonctionnent dès 2 caractères
- Le scoring favorise les correspondances exactes et les champs boostés
