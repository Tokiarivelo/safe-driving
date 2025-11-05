# Conversation Attachments Management

## Overview

Cette fonctionnalité permet de récupérer et filtrer tous les fichiers, liens et trajets (attachments) d'une conversation, similaire à ce qui existe dans des applications comme WhatsApp ou Telegram.

## Features

✅ **Récupération de tous les attachments d'une conversation**  
✅ **Filtrage par type** (Images, Vidéos, Documents, Audio, Liens, Trajets)  
✅ **Pagination** avec curseur pour de grandes listes  
✅ **Résumé des attachments** avec comptage par type  
✅ **Sécurité** : uniquement les participants peuvent accéder aux attachments  
✅ **Métadonnées** : nom de l'expéditeur, date du message, etc.

## GraphQL Queries

### 1. Récupérer les Attachments avec Filtrage

```graphql
query GetConversationAttachments(
  $conversationId: String!
  $filter: FileTypeFilter
  $limit: Int
  $cursor: String
) {
  conversationAttachments(
    conversationId: $conversationId
    filter: $filter # ALL, IMAGES, VIDEOS, DOCUMENTS, AUDIO, LINKS, RIDES
    limit: $limit
    cursor: $cursor
  ) {
    attachments {
      id
      messageId
      type # FILE, LINK, RIDE
      createdAt

      # Pour les fichiers
      file {
        id
        url
        key
        originalName
        contentType
        size
      }

      # Pour les liens
      url
      linkTitle
      linkDesc
      linkThumbnail
      linkMeta

      # Pour les trajets
      rideId

      # Métadonnées du message
      senderName
      messageCreatedAt
    }
    total
    hasNextPage
    cursor
  }
}
```

**Variables** :

```json
{
  "conversationId": "clxyz123",
  "filter": "IMAGES",
  "limit": 20,
  "cursor": null
}
```

### 2. Récupérer le Résumé des Attachments

```graphql
query GetAttachmentsSummary($conversationId: String!) {
  conversationAttachmentsSummary(conversationId: $conversationId) {
    totalFiles
    totalImages
    totalVideos
    totalDocuments
    totalAudio
    totalLinks
    totalRides

    byMimeType {
      type # e.g., "image/jpeg", "application/pdf"
      count
    }
  }
}
```

## File Type Filters

```typescript
enum FileTypeFilter {
  ALL = 'ALL', // Tous les attachments
  IMAGES = 'IMAGES', // Images uniquement (image/*)
  VIDEOS = 'VIDEOS', // Vidéos uniquement (video/*)
  DOCUMENTS = 'DOCUMENTS', // Documents (PDF, Word, Excel, etc.)
  AUDIO = 'AUDIO', // Audio uniquement (audio/*)
  LINKS = 'LINKS', // Liens web uniquement
  RIDES = 'RIDES', // Trajets uniquement
}
```

## Exemples d'Utilisation

### Frontend React - Liste des Images

```typescript
import { useQuery } from '@apollo/client';
import { FileTypeFilter } from './types';

const CONVERSATION_ATTACHMENTS = gql`
  query GetConversationAttachments(
    $conversationId: String!
    $filter: FileTypeFilter!
    $limit: Int
    $cursor: String
  ) {
    conversationAttachments(
      conversationId: $conversationId
      filter: $filter
      limit: $limit
      cursor: $cursor
    ) {
      attachments {
        id
        file {
          url
          originalName
          contentType
        }
        senderName
        createdAt
      }
      total
      hasNextPage
      cursor
    }
  }
`;

function ConversationImagesView({ conversationId }: { conversationId: string }) {
  const { data, loading, fetchMore } = useQuery(CONVERSATION_ATTACHMENTS, {
    variables: {
      conversationId,
      filter: FileTypeFilter.IMAGES,
      limit: 20,
    },
  });

  const loadMore = () => {
    if (data?.conversationAttachments.hasNextPage) {
      fetchMore({
        variables: {
          cursor: data.conversationAttachments.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            conversationAttachments: {
              ...fetchMoreResult.conversationAttachments,
              attachments: [
                ...prev.conversationAttachments.attachments,
                ...fetchMoreResult.conversationAttachments.attachments,
              ],
            },
          };
        },
      });
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Images ({data.conversationAttachments.total})</h2>
      <div className="image-grid">
        {data.conversationAttachments.attachments.map((attachment) => (
          <div key={attachment.id} className="image-item">
            <img src={attachment.file.url} alt={attachment.file.originalName} />
            <div className="metadata">
              <span>{attachment.senderName}</span>
              <span>{new Date(attachment.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      {data.conversationAttachments.hasNextPage && (
        <button onClick={loadMore}>Charger plus</button>
      )}
    </div>
  );
}
```

### Frontend React - Tabs par Type (comme dans l'image)

```typescript
function ConversationAttachmentsPanel({ conversationId }: { conversationId: string }) {
  const [activeFilter, setActiveFilter] = useState<FileTypeFilter>(FileTypeFilter.ALL);

  // Récupérer le résumé pour les compteurs
  const { data: summary } = useQuery(ATTACHMENTS_SUMMARY, {
    variables: { conversationId },
  });

  return (
    <div className="attachments-panel">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeFilter === FileTypeFilter.ALL ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.ALL)}
        >
          Tous
        </button>
        <button
          className={activeFilter === FileTypeFilter.IMAGES ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.IMAGES)}
        >
          <ImageIcon />
          Images {summary?.conversationAttachmentsSummary.totalImages || 0}
        </button>
        <button
          className={activeFilter === FileTypeFilter.VIDEOS ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.VIDEOS)}
        >
          <VideoIcon />
          Vidéos {summary?.conversationAttachmentsSummary.totalVideos || 0}
        </button>
        <button
          className={activeFilter === FileTypeFilter.DOCUMENTS ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.DOCUMENTS)}
        >
          <FileIcon />
          Fichiers {summary?.conversationAttachmentsSummary.totalDocuments || 0}
        </button>
        <button
          className={activeFilter === FileTypeFilter.LINKS ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.LINKS)}
        >
          <LinkIcon />
          Liens {summary?.conversationAttachmentsSummary.totalLinks || 0}
        </button>
        <button
          className={activeFilter === FileTypeFilter.RIDES ? 'active' : ''}
          onClick={() => setActiveFilter(FileTypeFilter.RIDES)}
        >
          <CarIcon />
          Courses {summary?.conversationAttachmentsSummary.totalRides || 0}
        </button>
      </div>

      {/* Content */}
      <AttachmentsListView
        conversationId={conversationId}
        filter={activeFilter}
      />
    </div>
  );
}
```

### Frontend React - Liste Générique d'Attachments

```typescript
function AttachmentsListView({
  conversationId,
  filter,
}: {
  conversationId: string;
  filter: FileTypeFilter;
}) {
  const { data, loading, fetchMore } = useQuery(CONVERSATION_ATTACHMENTS, {
    variables: {
      conversationId,
      filter,
      limit: 20,
    },
  });

  if (loading) return <Spinner />;

  return (
    <div className="attachments-list">
      {data?.conversationAttachments.attachments.map((attachment) => (
        <AttachmentItem key={attachment.id} attachment={attachment} />
      ))}
      {data?.conversationAttachments.hasNextPage && (
        <button onClick={() => loadMore()}>Charger plus</button>
      )}
    </div>
  );
}

function AttachmentItem({ attachment }: { attachment: ConversationAttachment }) {
  switch (attachment.type) {
    case 'FILE':
      return <FileAttachmentItem attachment={attachment} />;
    case 'LINK':
      return <LinkAttachmentItem attachment={attachment} />;
    case 'RIDE':
      return <RideAttachmentItem attachment={attachment} />;
    default:
      return null;
  }
}
```

## Backend Implementation

### Service Method: `getConversationAttachments`

```typescript
async getConversationAttachments(
  conversationId: string,
  userId: string,
  options?: {
    filter?: FileTypeFilter;
    limit?: number;
    cursor?: string;
  },
): Promise<ConversationAttachmentsResponse>
```

**Fonctionnement** :

1. Vérifie que l'utilisateur est participant de la conversation
2. Construit la requête Prisma selon le filtre :
   - `ALL` : Tous les attachments
   - `IMAGES` : type='FILE' + contentType commence par 'image/'
   - `VIDEOS` : type='FILE' + contentType commence par 'video/'
   - `AUDIO` : type='FILE' + contentType commence par 'audio/'
   - `DOCUMENTS` : type='FILE' + contentType ne commence pas par image/video/audio
   - `LINKS` : type='LINK'
   - `RIDES` : type='RIDE'
3. Pagination avec curseur (ID de l'attachment)
4. Inclut les métadonnées du message (expéditeur, date)
5. Retourne la liste + total + indicateur hasNextPage

### Service Method: `getConversationAttachmentsSummary`

```typescript
async getConversationAttachmentsSummary(
  conversationId: string,
  userId: string,
): Promise<ConversationAttachmentsSummary>
```

**Fonctionnement** :

1. Vérifie que l'utilisateur est participant
2. Compte les attachments par type principal (LINK, RIDE)
3. Récupère tous les fichiers et les catégorise par contentType
4. Utilise une requête SQL brute pour grouper par MIME type
5. Retourne le résumé complet

**Performance** :

- Utilise `Promise.all()` pour paralléliser les requêtes
- Requête SQL optimisée pour le groupement par MIME type
- Cache potentiel via Redis pour les résumés (optionnel)

## Sécurité

✅ **Vérification d'accès** : Seuls les participants de la conversation peuvent accéder aux attachments

```typescript
// Dans getConversationAttachments et getConversationAttachmentsSummary
await this.ensureUserIsParticipant(conversationId, userId);
```

Cette vérification empêche un utilisateur non autorisé de :

- Lister les attachments d'une conversation privée
- Accéder aux fichiers partagés dans une conversation dont il n'est pas membre

## Use Cases

### 1. Gallery View (Images/Vidéos)

**Frontend** :

```typescript
// Afficher toutes les images dans une galerie
<ImageGallery conversationId={conversationId} filter="IMAGES" />
```

**Backend** :

```graphql
query {
  conversationAttachments(conversationId: "conv-123", filter: IMAGES) {
    attachments {
      file {
        url
      }
    }
  }
}
```

### 2. Documents Manager

**Frontend** :

```typescript
// Afficher tous les documents avec recherche
<DocumentsManager conversationId={conversationId} filter="DOCUMENTS" />
```

**Backend** :

```graphql
query {
  conversationAttachments(conversationId: "conv-123", filter: DOCUMENTS) {
    attachments {
      file {
        originalName
        url
        size
        contentType
      }
      senderName
      createdAt
    }
  }
}
```

### 3. Links Collection

**Frontend** :

```typescript
// Afficher tous les liens partagés
<LinksCollection conversationId={conversationId} filter="LINKS" />
```

**Backend** :

```graphql
query {
  conversationAttachments(conversationId: "conv-123", filter: LINKS) {
    attachments {
      url
      linkTitle
      linkDesc
      linkThumbnail
      senderName
      createdAt
    }
  }
}
```

### 4. Rides History

**Frontend** :

```typescript
// Afficher tous les trajets partagés dans la conversation
<RidesHistory conversationId={conversationId} filter="RIDES" />
```

**Backend** :

```graphql
query {
  conversationAttachments(conversationId: "conv-123", filter: RIDES) {
    attachments {
      rideId
      ride {
        origin
        destination
        departureTime
      }
      senderName
      createdAt
    }
  }
}
```

## Performance Considerations

### Pagination

- Utilise un curseur basé sur l'ID de l'attachment
- Limite par défaut : 20 items
- `hasNextPage` indique s'il y a plus de résultats

### Indexation Database

Indexes existants dans le schéma Prisma :

```prisma
model Attachment {
  @@index([messageId])
  @@index([fileId])
  @@index([rideId])
  @@index([type])
}

model Message {
  @@index([conversationId, createdAt])
}
```

Ces indexes optimisent les requêtes de filtrage et de tri.

### Optimisations Possibles

1. **Cache Redis pour les résumés** :

   ```typescript
   const cacheKey = `conversation:${conversationId}:attachments:summary`;
   const cached = await redis.get(cacheKey);
   if (cached) return JSON.parse(cached);

   const summary = await this.calculateSummary(conversationId);
   await redis.setex(cacheKey, 300, JSON.stringify(summary)); // 5 min
   return summary;
   ```

2. **Lazy Loading des métadonnées** :
   - Charger uniquement les URLs en premier
   - Charger les métadonnées au scroll

3. **Thumbnails pour les images** :
   - Générer des thumbnails lors de l'upload
   - Afficher les thumbnails dans la liste, image complète au clic

## Testing

### Test GraphQL Query

```graphql
# Test 1: Récupérer toutes les images
query TestImages {
  conversationAttachments(
    conversationId: "clxyz123"
    filter: IMAGES
    limit: 10
  ) {
    total
    attachments {
      id
      file {
        url
        originalName
      }
      senderName
    }
  }
}

# Test 2: Résumé
query TestSummary {
  conversationAttachmentsSummary(conversationId: "clxyz123") {
    totalImages
    totalVideos
    totalDocuments
    totalLinks
    totalRides
    byMimeType {
      type
      count
    }
  }
}
```

### Test Unitaire

```typescript
describe('ConversationService.getConversationAttachments', () => {
  it('should return only images when filter is IMAGES', async () => {
    const result = await service.getConversationAttachments(
      conversationId,
      userId,
      { filter: FileTypeFilter.IMAGES },
    );

    result.attachments.forEach((att) => {
      expect(att.type).toBe('FILE');
      expect(att.file.contentType).toMatch(/^image\//);
    });
  });

  it('should throw error if user is not participant', async () => {
    await expect(
      service.getConversationAttachments(conversationId, 'unauthorized-user'),
    ).rejects.toThrow('Access denied');
  });

  it('should paginate correctly', async () => {
    const page1 = await service.getConversationAttachments(
      conversationId,
      userId,
      { limit: 10 },
    );

    expect(page1.attachments).toHaveLength(10);
    expect(page1.hasNextPage).toBe(true);

    const page2 = await service.getConversationAttachments(
      conversationId,
      userId,
      { limit: 10, cursor: page1.cursor },
    );

    expect(page2.attachments[0].id).not.toBe(page1.attachments[0].id);
  });
});
```

## Future Enhancements

### 1. Search dans les Attachments

```graphql
query SearchAttachments($conversationId: String!, $q: String!) {
  conversationAttachments(
    conversationId: $conversationId
    filter: ALL
    search: $q  # 🆕 Rechercher par nom de fichier
  ) {
    attachments { ... }
  }
}
```

### 2. Tri Personnalisé

```graphql
query SortedAttachments($conversationId: String!) {
  conversationAttachments(
    conversationId: $conversationId
    orderBy: { field: SIZE, direction: DESC }  # 🆕 Trier par taille
  ) {
    attachments { ... }
  }
}
```

### 3. Filtres Combinés

```graphql
query FilteredAttachments($conversationId: String!) {
  conversationAttachments(
    conversationId: $conversationId
    filter: IMAGES
    dateRange: { from: "2025-01-01", to: "2025-12-31" }  # 🆕 Filtre par date
    senderIds: ["user-1", "user-2"]  # 🆕 Filtre par expéditeur
  ) {
    attachments { ... }
  }
}
```

## Summary

✅ **Feature complète** pour gérer les attachments de conversation  
✅ **UI similaire** à WhatsApp/Telegram avec tabs par type  
✅ **Performance optimisée** avec pagination et indexes  
✅ **Sécurité** avec vérification d'accès  
✅ **Flexible** avec filtres par type et métadonnées

Cette implémentation permet une gestion professionnelle des fichiers partagés dans les conversations ! 🎉
