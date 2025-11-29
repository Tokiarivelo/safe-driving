import { useState, useMemo } from 'react';
import { useGetUserConversationsQuery } from '@/graphql/generated/graphql';
import { ConversationSelectorProps } from './conversation-selector.interface';

export function useConversationSelector({
  selectedConversationId,
  //  onConversationSelect,
}: Pick<ConversationSelectorProps, 'selectedConversationId' | 'onConversationSelect'>) {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error, fetchMore } = useGetUserConversationsQuery({
    variables: {
      limit: 20,
    },
    errorPolicy: 'all',
  });

  const conversations = useMemo(
    () => data?.userConversations?.conversations || [],
    [data?.userConversations?.conversations],
  );

  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations;

    return conversations.filter(conversation => {
      // Filter by title
      if (conversation.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      // Filter by participant names
      if (
        conversation.participants?.some(participant => {
          const firstName = participant.user.firstName?.toLowerCase() || '';
          const lastName = participant.user.lastName?.toLowerCase() || '';
          const fullName = `${firstName} ${lastName}`.trim();
          return fullName.includes(searchTerm.toLowerCase());
        })
      ) {
        return true;
      }

      return false;
    });
  }, [conversations, searchTerm]);

  const handleLoadMore = () => {
    if (data?.userConversations?.hasNextPage && !loading) {
      fetchMore({
        variables: {
          cursor: data.userConversations.cursor,
        },
      });
    }
  };

  const getConversationDisplayName = (conversation: (typeof conversations)[0]) => {
    if (conversation.title) {
      return conversation.title;
    }

    if (conversation.type === 'DIRECT' && conversation.participants) {
      const otherParticipants = conversation.participants.filter(
        p => p.user.id !== selectedConversationId,
      );
      if (otherParticipants.length > 0) {
        const user = otherParticipants[0].user;
        return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur inconnu';
      }
    }

    return `Conversation ${conversation.type.toLowerCase()}`;
  };

  return {
    conversations: filteredConversations,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleLoadMore,
    getConversationDisplayName,
    hasMore: data?.userConversations?.hasNextPage || false,
  };
}
