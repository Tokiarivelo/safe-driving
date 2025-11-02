# Module Ride - Documentation complète

## 📚 Vue d'ensemble

Le module Ride gère toutes les opérations liées aux courses (trajets) dans l'application Safe Driving. Il fournit :

- ✅ **CRUD complet** pour les courses
- ✅ **Gestion des participants** (ajouter/retirer)
- ✅ **Recherche Elasticsearch** full-text
- ✅ **Subscriptions GraphQL** en temps réel
- ✅ **WebSocket Gateway** pour le tracking GPS
- ✅ **Filtres avancés** (status, driver, participant)
- ✅ **Pagination** cursor-based

---

## 🔍 GraphQL Queries

### 1. Récupérer les courses d'un utilisateur

```graphql
query UserRides {
  userRides(limit: 20, cursor: null, filter: { status: "ONGOING" }) {
    rides {
      id
      status
      startedAt
      finishedAt
      createdAt
      participantCount
      messageCount
      Driver {
        id
        firstName
        lastName
        email
      }
      RideParticipant {
        id
        role
        joinedAt
        user {
          firstName
          lastName
        }
      }
    }
    nextCursor
    hasMore
  }
}
```

**Filtres disponibles** :

- `status` : REQUESTED, ONGOING, FINISHED
- `driverId` : ID du conducteur
- `participantId` : ID d'un participant

### 2. Récupérer une course par ID

```graphql
query GetRide {
  ride(id: "ride-uuid") {
    id
    status
    startedAt
    finishedAt
    participantCount
    messageCount
    Driver {
      firstName
      lastName
    }
    RideParticipant {
      role
      user {
        firstName
        email
      }
    }
  }
}
```

### 3. Rechercher des courses (Elasticsearch)

```graphql
query SearchRides {
  searchRides(q: "john", status: "ONGOING", page: 0, size: 20) {
    total
    hits {
      _id
      _score
      _source {
        id
        status
        driver {
          firstName
          lastName
          email
        }
        participants {
          role
          firstName
          email
        }
      }
    }
  }
}
```

---

## ✏️ GraphQL Mutations

### 1. Créer une course

```graphql
mutation CreateRide {
  createRide(
    input: {
      driverId: "driver-uuid"
      status: "REQUESTED"
      participantIds: ["user1-uuid", "user2-uuid"]
    }
  ) {
    id
    status
    createdAt
    RideParticipant {
      role
      user {
        firstName
      }
    }
  }
}
```

### 2. Mettre à jour une course

```graphql
mutation UpdateRide {
  updateRide(
    rideId: "ride-uuid"
    input: { status: "ONGOING", startedAt: "2025-11-01T10:00:00Z" }
  ) {
    id
    status
    startedAt
  }
}
```

**Champs modifiables** :

- `status` : Nouveau statut
- `startedAt` : Date de début
- `finishedAt` : Date de fin

### 3. Supprimer une course

```graphql
mutation DeleteRide {
  deleteRide(rideId: "ride-uuid") {
    id
    status
  }
}
```

⚠️ **Permissions** : Seul le conducteur peut supprimer la course

### 4. Ajouter un participant

```graphql
mutation AddParticipant {
  addRideParticipant(
    input: { rideId: "ride-uuid", userId: "user-uuid", role: "PASSENGER" }
  ) {
    id
    role
    user {
      firstName
      email
    }
  }
}
```

**Rôles disponibles** :

- `DRIVER` : Conducteur
- `PASSENGER` : Passager
- `GUIDE` : Guide
- `OBSERVER` : Observateur

### 5. Retirer un participant

```graphql
mutation RemoveParticipant {
  removeRideParticipant(input: { rideId: "ride-uuid", userId: "user-uuid" }) {
    id
    role
  }
}
```

⚠️ **Permissions** : Le conducteur ou le participant lui-même peut se retirer

### 6. Réindexer toutes les courses (Admin)

```graphql
mutation {
  recreateAndBulkRides
}
```

---

## 🔔 GraphQL Subscriptions

### 1. S'abonner aux mises à jour de course

```graphql
subscription RideUpdated {
  rideUpdated {
    action # CREATED, UPDATED, DELETED
    ride {
      id
      status
      RideParticipant {
        user {
          firstName
        }
      }
    }
  }
}
```

**Filtrage automatique** : Ne reçoit que les événements des courses auxquelles l'utilisateur participe

### 2. S'abonner aux mises à jour de participants

```graphql
subscription ParticipantUpdated {
  participantUpdated(rideId: "ride-uuid") {
    action # ADDED, REMOVED
    rideId
    participant {
      role
      user {
        firstName
      }
    }
  }
}
```

---

## 🔌 WebSocket Gateway (`/rides` namespace)

### Connexion

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/rides', {
  auth: {
    token: 'your-jwt-token',
  },
});
```

### Événements disponibles

#### 1. Rejoindre une course

```javascript
socket.emit('joinRide', 'ride-uuid');

socket.on('joinedRide', (data) => {
  console.log('Joined ride:', data.rideId);
});
```

#### 2. Quitter une course

```javascript
socket.emit('leaveRide', 'ride-uuid');

socket.on('leftRide', (data) => {
  console.log('Left ride:', data.rideId);
});
```

#### 3. Recevoir des mises à jour

```javascript
// Mises à jour de la course
socket.on('rideUpdate', (data) => {
  console.log('Ride updated:', data);
});

// Mises à jour des participants
socket.on('participantUpdate', (data) => {
  console.log('Participant updated:', data);
});

// Mises à jour de position GPS
socket.on('positionUpdate', (position) => {
  console.log('Position:', position);
});
```

#### 4. Envoyer une mise à jour de position

```javascript
socket.emit('updatePosition', {
  rideId: 'ride-uuid',
  position: {
    latitude: 48.8566,
    longitude: 2.3522,
    altitude: 35,
    speed: 50,
    heading: 180,
    accuracy: 10,
  },
});

socket.on('positionUpdated', (data) => {
  console.log('Position sent:', data.success);
});
```

---

## 🔒 Permissions et sécurité

### Permissions par action

| Action                 | Qui peut l'exécuter                |
| ---------------------- | ---------------------------------- |
| Créer une course       | Tout utilisateur authentifié       |
| Voir une course        | Participants uniquement            |
| Modifier une course    | Conducteur uniquement              |
| Supprimer une course   | Conducteur uniquement              |
| Ajouter un participant | Conducteur uniquement              |
| Retirer un participant | Conducteur ou participant lui-même |
| Rechercher des courses | Tout utilisateur authentifié       |

### Guards utilisés

- `@UseGuards(JwtAuthGuard)` : Authentification JWT pour les queries/mutations
- `@UseGuards(GraphqlWsJwtGuard)` : Authentification JWT pour les subscriptions

---

## 📊 Recherche Elasticsearch

### Champs indexés

```json
{
  "id": "keyword",
  "driverId": "keyword",
  "status": "keyword",
  "startedAt": "date",
  "finishedAt": "date",
  "createdAt": "date",
  "driver": {
    "email": "text with edge_ngram",
    "firstName": "text with edge_ngram (boost x2)",
    "lastName": "text with edge_ngram"
  },
  "participants": "nested" {
    "role": "keyword",
    "firstName": "text with edge_ngram (boost x2)",
    "lastName": "text with edge_ngram",
    "email": "text with edge_ngram"
  }
}
```

### Exemple de recherche

```typescript
// Rechercher par nom du conducteur ou des participants
const results = await rideSearchService.searchRides('john', {
  page: 0,
  size: 20,
  status: 'ONGOING'
});

// Résultats
{
  total: 5,
  hits: [
    {
      _id: 'ride-uuid',
      _score: 2.5,
      _source: {
        id: 'ride-uuid',
        status: 'ONGOING',
        driver: { firstName: 'John', lastName: 'Doe' },
        participants: [...]
      }
    }
  ]
}
```

---

## 🔄 Flux de données

### 1. Création d'une course

```
Client → GraphQL Mutation (createRide)
  ↓
RideService.createRide()
  ↓
Prisma.ride.create()
  ↓
Redis PubSub (publish 'rideUpdated')
  ↓
Elasticsearch indexRide()
  ↓
GraphQL Subscription (rideUpdated) → Clients connectés
```

### 2. Mise à jour de position GPS

```
Client → WebSocket (updatePosition)
  ↓
RideGateway.handleUpdatePosition()
  ↓
Socket.IO broadcast → Room 'ride_${rideId}'
  ↓
Tous les clients de la room reçoivent 'positionUpdate'
```

---

## 🧪 Exemples de tests

### Tester la création de course

```typescript
const result = await request(app.getHttpServer())
  .post('/graphql')
  .send({
    query: `
      mutation {
        createRide(input: {
          status: "REQUESTED"
          participantIds: ["user-uuid"]
        }) {
          id
          status
        }
      }
    `,
  })
  .set('Authorization', `Bearer ${token}`);

expect(result.body.data.createRide.status).toBe('REQUESTED');
```

### Tester la subscription

```typescript
const subscription = await client.subscribe({
  query: gql`
    subscription {
      rideUpdated {
        action
        ride {
          id
          status
        }
      }
    }
  `,
});

subscription.subscribe(({ data }) => {
  console.log('Received:', data.rideUpdated);
});
```

---

## 📝 Notes importantes

1. **Indexation Elasticsearch** : Activée automatiquement après chaque création/modification de course
2. **Temps réel** : Double système (GraphQL Subscriptions + WebSocket) pour flexibilité maximale
3. **Pagination** : Utilise le cursor-based pagination pour de meilleures performances
4. **Filtres** : Peuvent être combinés (status + driverId + participantId)
5. **Permissions** : Vérifiées à chaque opération pour garantir la sécurité

---

## 🚀 Prochaines améliorations possibles

- [ ] Ajouter des notifications push lors des mises à jour
- [ ] Implémenter un système de rating/review après la course
- [ ] Ajouter le tracking complet de l'itinéraire (polyline)
- [ ] Implémenter un système de paiement intégré
- [ ] Ajouter des statistiques de course (distance, durée, vitesse moyenne)
- [ ] Gérer les courses récurrentes/planifiées
