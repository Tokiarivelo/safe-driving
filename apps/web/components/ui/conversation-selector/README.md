# ConversationSelector avec CRUD

Un composant réutilisable pour gérer les conversations dans une interface de chat avec opérations CRUD complètes.

## Fonctionnalités

- ✅ Affichage de la liste des conversations
- ✅ **CRUD complet** : Créer, Lire, Modifier, Supprimer
- ✅ Gestion des participants (ajouter/retirer)
- ✅ Recherche par titre ou nom des participants
- ✅ Support des différents types de conversations (DIRECT, GROUP, RIDE_LINKED)
- ✅ Interface responsive avec Tailwind CSS
- ✅ Composant modulaire et réutilisable
- ✅ Modals pour les formulaires
- ✅ Actions en temps réel

## Utilisation

### ConversationSelectorWithCRUD (Recommandé)

```tsx
import { ConversationSelectorWithCRUD } from '@/components/ui/conversation-selector';

function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState('');

  return (
    <ConversationSelectorWithCRUD
      selectedConversationId={selectedConversationId}
      onConversationSelect={setSelectedConversationId}
      onConversationChange={conversations => {
        console.log('Conversations mises à jour:', conversations);
      }}
      showSearch={true}
      showCreateButton={true}
    />
  );
}
```

### Avec ChatContainer intégré

```tsx
import { ChatContainer } from '@/components/chat/chat-container';

function ChatPage() {
  const [conversationId, setConversationId] = useState('');

  return (
    <ChatContainer
      conversationId={conversationId}
      showConversationSelector={true}
      onConversationChange={setConversationId}
    />
  );
}
```

### Utilisation du hook useConversations

```tsx
import { useConversations } from '@/lib/conversation/useConversations';

function MyComponent() {
  const {
    conversations,
    loading,
    error,
    createConversation,
    updateConversation,
    deleteConversation,
    addParticipant,
    removeParticipant,
  } = useConversations();

  const handleCreateConversation = async () => {
    try {
      const newConv = await createConversation({
        title: 'Nouvelle conversation',
        type: 'GROUP',
        participantIds: ['user1', 'user2'],
      });
      console.log('Conversation créée:', newConv);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateConversation}>Créer une conversation</button>
      {/* ... */}
    </div>
  );
}
```

### Gestionnaire de participants

```tsx
import { ParticipantManager } from '@/components/ui/conversation-selector';

function ConversationDetails({ conversation, currentUserId }) {
  return (
    <ParticipantManager
      conversation={conversation}
      currentUserId={currentUserId}
      onParticipantChange={() => {
        // Actualiser les données
      }}
    />
  );
}
```

## Props

### ConversationSelectorWithCRUD

| Prop                     | Type                             | Défaut    | Description                               |
| ------------------------ | -------------------------------- | --------- | ----------------------------------------- |
| `selectedConversationId` | `string`                         | -         | ID de la conversation sélectionnée        |
| `onConversationSelect`   | `(id: string) => void`           | -         | Callback appelé lors de la sélection      |
| `onConversationChange`   | `(conversations: any[]) => void` | -         | Callback appelé lors des changements CRUD |
| `className`              | `string`                         | `''`      | Classes CSS personnalisées                |
| `style`                  | `React.CSSProperties`            | -         | Styles inline                             |
| `maxHeight`              | `string`                         | `'400px'` | Hauteur maximale de la liste              |
| `showSearch`             | `boolean`                        | `true`    | Afficher la barre de recherche            |
| `showCreateButton`       | `boolean`                        | `true`    | Afficher le bouton de création            |

### useConversations Hook

Retourne un objet avec :

```typescript
{
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  createConversation: (input: CreateConversationInput) => Promise<Conversation>;
  updateConversation: (id: string, input: UpdateConversationInput) => Promise<Conversation>;
  deleteConversation: (id: string) => Promise<void>;
  addParticipant: (input: AddParticipantInput) => Promise<void>;
  removeParticipant: (input: RemoveParticipantInput) => Promise<void>;
}
```

## Opérations CRUD

### Créer une conversation

- **Interface** : Modal avec formulaire
- **Champs** : Titre, Type, Participants
- **Types** : DIRECT, GROUP, RIDE_LINKED

### Modifier une conversation

- **Action** : Bouton "Modifier" (icône crayon) au survol
- **Champs modifiables** : Titre principalement

### Supprimer une conversation

- **Action** : Bouton "Supprimer" (icône poubelle) au survol
- **Confirmation** : Dialog de confirmation
- **Effet** : Suppression et désélection si c'était la conversation active

### Gestion des participants

- **Ajouter** : Via email/identifiant dans le ParticipantManager
- **Retirer** : Bouton dans la liste des participants
- **Restrictions** : Impossible de se retirer soi-même des conversations DIRECT

## Types de conversations

- **DIRECT** : Conversation en tête-à-tête (2 participants fixes)
- **GROUP** : Conversation de groupe (participants variables)
- **RIDE_LINKED** : Conversation liée à un trajet spécifique

## État actuel

- 🟡 **Mock Data** : Utilise actuellement des données simulées
- 🔄 **GraphQL Ready** : Préparé pour l'intégration GraphQL
- ✅ **UI Complete** : Interface utilisateur complète
- ✅ **CRUD Logic** : Logique CRUD implémentée

## Prochaines étapes

1. **Générer les types GraphQL** : `npm run codegen`
2. **Connecter aux vraies APIs** : Décommenter les appels GraphQL dans `useConversations.ts`
3. **Tester les subscriptions** : Pour les mises à jour en temps réel
4. **Ajouter la recherche d'utilisateurs** : Pour l'ajout de participants par email
5. **Optimiser le cache Apollo** : Pour les performances

## Architecture

```
conversation-selector/
├── index.ts                           # Exports principaux
├── conversation-selector.tsx          # Composant de base (lecture seule)
├── conversation-selector-with-crud.tsx # Composant avec CRUD complet
├── conversation-item.tsx              # Item individuel de conversation
├── conversation-form-modal.tsx        # Modal pour créer/modifier
├── participant-manager.tsx            # Gestionnaire de participants
├── conversation-selector.interface.ts # Types TypeScript
└── README.md                          # Documentation

lib/conversation/
└── useConversations.ts               # Hook pour les opérations CRUD
```
