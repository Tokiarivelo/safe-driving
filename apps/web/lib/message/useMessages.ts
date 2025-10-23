import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  MessageEventType,
  MessageFragmentFragment,
  MessageState,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetMessagesQuery,
  useMarkMessageDeliveredMutation,
  useMessageEventSubscription,
  useSendMessageMutation,
} from '@/graphql/generated/graphql';

interface UseMessagesOptions {
  conversationId?: string;
  rideId?: string;
}

export const useMessages = (options: UseMessagesOptions) => {
  const [messages, setMessages] = useState<MessageFragmentFragment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [optimisticMessages, setOptimisticMessages] = useState<MessageFragmentFragment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, fetchMore, updateQuery } = useGetMessagesQuery({
    variables: {
      conversationId: options.conversationId,
      rideId: options.rideId,
      limit: 20,
    },
  });

  // Replace onCompleted with useEffect
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data?.messages]);

  const [sendMessageMutation] = useSendMessageMutation({
    onCompleted: data => {
      // Retirer le message optimiste une fois confirmé
      setOptimisticMessages(prev =>
        prev.filter(msg => msg.clientTempId !== data.sendMessage.clientTempId),
      );
    },
    onError: error => {
      console.error('Failed to send message:', error);
      // TODO: Gérer l'erreur, peut-être garder le message en état d'erreur
    },
  });

  const [editMessageMutation] = useEditMessageMutation();
  const [deleteMessageMutation] = useDeleteMessageMutation();

  const [markDelivered] = useMarkMessageDeliveredMutation();

  // Subscription pour les nouveaux messages
  const { data: subscriptionData } = useMessageEventSubscription({
    variables: {
      conversationId: options.conversationId,
      rideId: options.rideId,
    },
    onData: ({ data }) => {
      console.log('data useMessageReceivedSubscription :>> ', data);

      if (data.data?.messageEvent) {
        const { message, type } = data.data.messageEvent;

        if (type === MessageEventType.NEW_MESSAGE) {
          // Mettre à jour le cache Apollo
          updateQuery(prev => ({
            ...prev,
            messages: [message, ...(prev.messages || [])].filter(
              (msg, index, self) => self.findIndex(m => m.id === msg.id) === index,
            ),
          }));

          setMessages(prev => {
            // Éviter les doublons
            const exists = prev.some(m => m.id === message.id);
            if (exists) return prev;
            return [message, ...prev];
          });

          // Marquer comme délivré si ce n'est pas notre message
          const currentUserId = localStorage.getItem('userId');
          if (message.senderId !== currentUserId) {
            markDelivered({ variables: { messageId: message.id } });
          }
        }
        if (type === MessageEventType.MESSAGE_UPDATED) {
          // Mettre à jour le cache Apollo pour les messages modifiés
          updateQuery(prev => ({
            ...prev,
            messages: (prev.messages || []).map(m => (m.id === message.id ? message : m)),
          }));

          setMessages(prev => prev.map(m => (m.id === message.id ? message : m)));
        }

        if (type === MessageEventType.MESSAGE_DELETED) {
          // Mettre à jour le cache Apollo pour les messages supprimés
          updateQuery(prev => ({
            ...prev,
            messages: (prev.messages || []).filter(m => m.id !== message.id),
          }));

          setMessages(prev => prev.filter(m => m.id !== message.id));
        }

        if (
          type === MessageEventType.REACTION_ADDED ||
          type === MessageEventType.REACTION_REMOVED
        ) {
          // Mettre à jour le message avec la nouvelle liste de réactions
          updateQuery(prev => ({
            ...prev,
            messages: (prev.messages || []).map(m =>
              m.id === message.id ? { ...m, reactions: message.reactions } : m,
            ),
          }));

          setMessages(prev =>
            prev.map(m => (m.id === message.id ? { ...m, reactions: message.reactions } : m)),
          );
        }
      }
    },
  });

  console.log('subscriptionData useMessageReceivedSubscription :>> ', subscriptionData);

  const sendMessage = useCallback(
    async (content: string, parentMessageId?: string, filesKeys: string[] = []) => {
      const clientTempId = uuidv4();
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

      // Message optimiste
      const optimisticMessage: MessageFragmentFragment & { isOptimistic: boolean } = {
        id: clientTempId,
        content,
        senderId: currentUser.id,
        clientTempId,
        parentMessageId,
        createdAt: new Date().toISOString(),
        sentAt: new Date().toISOString(),
        state: MessageState.SENT,
        sender: currentUser,
        edited: false,
        deleted: false,
        isOptimistic: true,
      };

      setOptimisticMessages(prev => [optimisticMessage, ...prev]);

      try {
        const messageData = await sendMessageMutation({
          variables: {
            input: {
              content,
              conversationId: options.conversationId,
              rideId: options.rideId,
              clientTempId,
              parentMessageId,
              filesKeys,
            },
          },
        });

        return messageData?.data;
      } catch {
        // Marquer le message optimiste comme en erreur
        setOptimisticMessages(prev =>
          prev.map(msg =>
            msg.clientTempId === clientTempId ? { ...msg, state: MessageState.FAILED } : msg,
          ),
        );
      }
    },
    [options.conversationId, options.rideId, sendMessageMutation],
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    try {
      const result = await fetchMore({
        variables: {
          cursor: lastMessage.createdAt,
        },
      });

      if (result.data.messages.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more messages:', error);
    }
  }, [messages, hasMore, loading, fetchMore]);

  const editMessage = useCallback(
    async (messageId: string, content: string, filesKeys?: string[]) => {
      try {
        await editMessageMutation({
          variables: {
            messageId,
            content,
            filesKeys,
          },
        });
      } catch (error) {
        console.error('Failed to edit message:', error);
      }
    },
    [editMessageMutation],
  );

  const deleteMessage = useCallback(
    async (messageId: string) => {
      try {
        await deleteMessageMutation({
          variables: {
            messageId,
          },
        });
        // Optionnel: Retirer le message localement pour une réponse plus rapide
        setMessages(prev => prev.filter(m => m.id !== messageId));
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    },
    [deleteMessageMutation],
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll pour les nouveaux messages
  useEffect(() => {
    if (messages.length > 0 || optimisticMessages.length > 0) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length, optimisticMessages.length, scrollToBottom]);

  // Fusionner messages confirmés et optimistes
  const allMessages = [...optimisticMessages, ...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    messages: allMessages,
    loading,
    error,
    hasMore,
    messagesEndRef,
    sendMessage,
    loadMore,
    scrollToBottom,
    editMessage,
    deleteMessage,
  };
};
