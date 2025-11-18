# Instructions pour mettre en production

## 1. Générer les types GraphQL

Après avoir démarré le serveur GraphQL, exécutez :

```bash
cd apps/web
npm run codegen
```

## 2. Décommenter les vraies requêtes GraphQL

Dans le fichier `lib/conversation/useConversations.ts`, décommentez les sections suivantes :

```typescript
// Décommenter les imports
import {
  useGetUserConversationsQuery,
  useCreateConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
  useAddParticipantMutation,
  useRemoveParticipantMutation,
  ConversationType,
} from '@/graphql/generated/graphql';

// Décommenter les vraies requêtes dans la fonction useConversations
const {
  data,
  loading: queryLoading,
  error: queryError,
  refetch,
} = useGetUserConversationsQuery({
  variables: { limit: 20 },
  errorPolicy: 'all',
});

const [createConversationMutation] = useCreateConversationMutation();
// ... etc
```

## 3. Remplacer les données mock

Dans `useConversations.ts`, remplacer :

```typescript
// Remplacer cette ligne :
const [conversations, setConversations] = useState<Conversation[]>([...mockData]);

// Par :
const conversations = data?.userConversations?.conversations || [];
```

## 4. Utiliser les vraies mutations

Décommenter toutes les sections marquées `// Real implementation:` et commenter les sections `// Mock implementation`.

## 5. Tester

1. Démarrez le serveur GraphQL : `npm run dev` (dans apps/graphql-server)
2. Démarrez le frontend : `npm run dev` (dans apps/web)
3. Testez les opérations CRUD dans l'interface

## 6. Fonctionnalités disponibles

- ✅ Lister les conversations de l'utilisateur
- ✅ Créer une nouvelle conversation
- ✅ Modifier le titre d'une conversation
- ✅ Supprimer une conversation
- ✅ Ajouter un participant
- ✅ Retirer un participant
- ✅ Subscriptions en temps réel
- ✅ Interface utilisateur complète

## Exemple d'utilisation complète

```tsx
import { ChatContainer } from '@/components/chat/chat-container';

export default function ChatPage() {
  return (
    <div className="h-screen">
      <ChatContainer
        showConversationSelector={true}
        onConversationChange={newId => {
          console.log('Conversation changed to:', newId);
        }}
      />
    </div>
  );
}
```
