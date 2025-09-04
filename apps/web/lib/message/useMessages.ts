import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetMessagesQuery,
  useMarkMessageDeliveredMutation,
  useMessageReceivedSubscription,
  useSendMessageMutation,
} from '@/graphql/generated/graphql';

interface UseMessagesOptions {
  conversationId?: string;
  rideId?: string;
}

export const useMessages = (options: UseMessagesOptions) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, fetchMore } = useGetMessagesQuery({
    variables: {
      conversationId: options.conversationId,
      rideId: options.rideId,
      limit: 20,
    },
    onCompleted: data => {
      setMessages(data.messages || []);
    },
  });

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
  useMessageReceivedSubscription({
    variables: {
      conversationId: options.conversationId,
      rideId: options.rideId,
    },
    onData: ({ data }) => {
      if (data.data?.messageReceived) {
        const { message, type } = data.data.messageReceived;

        if (type === 'NEW_MESSAGE') {
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
        } else if (type === 'MESSAGE_UPDATED') {
          setMessages(prev => prev.map(m => (m.id === message.id ? message : m)));
        }
      }
    },
  });

  const sendMessage = useCallback(
    async (content: string, parentMessageId?: string) => {
      const clientTempId = uuidv4();
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

      // Message optimiste
      const optimisticMessage = {
        id: clientTempId,
        content,
        senderId: currentUser.id,
        clientTempId,
        parentMessageId,
        createdAt: new Date().toISOString(),
        sentAt: new Date().toISOString(),
        state: 'SENDING',
        sender: currentUser,
        replies: [],
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
            },
          },
        });

        return messageData?.data;
      } catch (error) {
        // Marquer le message optimiste comme en erreur
        setOptimisticMessages(prev =>
          prev.map(msg =>
            msg.clientTempId === clientTempId ? { ...msg, state: 'ERROR', error: true } : msg,
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
    async (messageId: string, content: string) => {
      try {
        await editMessageMutation({
          variables: {
            messageId,
            content,
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
