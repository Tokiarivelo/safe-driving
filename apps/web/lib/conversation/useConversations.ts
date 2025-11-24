import { useState, useCallback, useEffect } from 'react';
import {
  useGetUserConversationsQuery,
  useCreateConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
  useAddParticipantMutation,
  useRemoveParticipantMutation,
  CreateConversationInput,
  Conversation,
  UpdateConversationInput,
  AddParticipantInput,
  RemoveParticipantInput,
  UserConversation,
  useGetDirectConversationBetweenUsersLazyQuery,
} from '@/graphql/generated/graphql';

export function useConversations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<UserConversation[]>([]);

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
  const [updateConversationMutation] = useUpdateConversationMutation();
  const [deleteConversationMutation] = useDeleteConversationMutation();
  const [addParticipantMutation] = useAddParticipantMutation();
  const [removeParticipantMutation] = useRemoveParticipantMutation();
  const [getDirectConversationBetweenUsers] = useGetDirectConversationBetweenUsersLazyQuery();

  useEffect(() => {
    if (data?.userConversations?.conversations) {
      setConversations(data.userConversations.conversations);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
    setLoading(queryLoading);
  }, [queryLoading, queryError]);

  // CRUD Operations
  const createConversation = useCallback(
    async (input: CreateConversationInput): Promise<Conversation | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await createConversationMutation({
          variables: { input },
          update: (cache, { data }) => {
            if (data?.createConversation) {
              // Update cache with new conversation
              cache.modify({
                fields: {
                  userConversations(existing) {
                    return {
                      ...existing,
                      conversations: [data.createConversation, ...existing.conversations],
                    };
                  },
                },
              });
            }
          },
        });

        return data?.createConversation as Conversation | undefined;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || 'Erreur lors de la création de la conversation');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateConversation = useCallback(
    async (
      conversationId: string,
      input: UpdateConversationInput,
    ): Promise<UserConversation | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await updateConversationMutation({
          variables: { conversationId, input },
        });

        return data?.updateConversation;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || 'Erreur lors de la mise à jour de la conversation');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [conversations],
  );

  const deleteConversation = useCallback(async (conversationId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Mock implementation
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));

      // Real implementation:

      await deleteConversationMutation({
        variables: { conversationId },
        update: cache => {
          cache.modify({
            fields: {
              userConversations(existing) {
                return {
                  ...existing,
                  conversations: existing.conversations.filter(
                    (conv: { id: string }) => conv.id !== conversationId,
                  ),
                };
              },
            },
          });
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || 'Erreur lors de la suppression de la conversation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addParticipant = useCallback(async (input: AddParticipantInput): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await addParticipantMutation({
        variables: { input },
      });
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || "Erreur lors de l'ajout du participant");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeParticipant = useCallback(async (input: RemoveParticipantInput): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await removeParticipantMutation({
        variables: { input },
      });
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || 'Erreur lors de la suppression du participant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Utilitaire pour obtenir une conversation par ID
  const getConversationById = useCallback(
    (conversationId: string): UserConversation | undefined => {
      return conversations.find(conv => conv.id === conversationId);
    },
    [conversations],
  );

  return {
    conversations,
    loading,
    error,
    createConversation,
    updateConversation,
    deleteConversation,
    addParticipant,
    removeParticipant,
    getConversationById,
    getDirectConversationBetweenUsers,
    refetch,
  };
}
