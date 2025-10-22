'use client';

import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import {
  AddReactionInput,
  RemoveReactionInput,
  Message,
  useAddMessageReactionMutation,
  useRemoveMessageReactionMutation,
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';

export function useReactions() {
  const [addReactionMutation] = useAddMessageReactionMutation();
  const [removeReactionMutation] = useRemoveMessageReactionMutation();

  const addReaction = useCallback(
    async (messageId: string, emoji: string) => {
      try {
        const input: AddReactionInput = {
          messageId,
          type: emoji,
        };

        const { data } = await addReactionMutation({
          variables: { input },
          // Optimistic update could be added here
          update: (cache, { data }) => {
            if (data?.addMessageReaction?.success && data.addMessageReaction.reaction) {
              // The cache will be updated automatically by the mutation response
              // or you can manually update it here if needed
            }
          },
        });

        if (data?.addMessageReaction?.success) {
          // Success - the reaction was added
          return data.addMessageReaction.reaction;
        } else {
          toast.error(data?.addMessageReaction?.message || "Erreur lors de l'ajout de la réaction");
        }
      } catch (error) {
        console.error('Error adding reaction:', error);
        toast.error("Erreur lors de l'ajout de la réaction");
      }
    },
    [addReactionMutation],
  );

  const removeReaction = useCallback(
    async (messageId: string, emoji: string) => {
      try {
        const input: {
          messageId: string;
          reactionType: string;
        } = {
          messageId,
          reactionType: emoji,
        };

        const { data } = await removeReactionMutation({
          variables: input,
        });

        if (data?.removeMessageReaction?.success) {
          // Success - the reaction was removed
          return true;
        } else {
          toast.error(
            data?.removeMessageReaction?.message || 'Erreur lors de la suppression de la réaction',
          );
        }
      } catch (error) {
        console.error('Error removing reaction:', error);
        toast.error('Erreur lors de la suppression de la réaction');
      }
    },
    [removeReactionMutation],
  );

  // Toggle reaction: add if not present, remove if already reacted
  const toggleReaction = useCallback(
    async (message: Message, emoji: string, currentUserId: string) => {
      // Check if user already reacted with this emoji
      const existingReaction = message.reactions?.find(
        r => r.type === emoji && r.user.id === currentUserId,
      );

      if (existingReaction) {
        // Remove the reaction
        return await removeReaction(message.id, emoji);
      } else {
        // Add the reaction
        return await addReaction(message.id, emoji);
      }
    },
    [addReaction, removeReaction],
  );

  return {
    addReaction,
    removeReaction,
    toggleReaction,
  };
}
