'use client';

import { useEffect, useState } from 'react';
import { useGetUserConversationsQuery, useUserRidesQuery } from '@/graphql/generated/graphql';

interface NotificationBadges {
  messagesCount: number;
  ridesCount: number;
  loading: boolean;
}

/**
 * Hook to get notification badge counts for messages and rides
 * Returns counts of unread messages (new conversations) and new pending rides
 */
export function useNotificationBadges(): NotificationBadges {
  const [messagesCount, setMessagesCount] = useState(0);
  const [ridesCount, setRidesCount] = useState(0);

  // Fetch user conversations - count new ones without messages read
  const {
    data: conversationsData,
    loading: conversationsLoading,
  } = useGetUserConversationsQuery({
    variables: { limit: 50 },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // Fetch user rides - count pending ones (new rides associated with user)
  const {
    data: ridesData,
    loading: ridesLoading,
  } = useUserRidesQuery({
    variables: {
      limit: 50,
      filter: { status: 'PENDING' },
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // Update message count based on conversations with messages
  useEffect(() => {
    if (conversationsData?.userConversations?.conversations) {
      // Count conversations that have messages (indicating activity)
      // In a real implementation, this would track unread message counts
      const conversations = conversationsData.userConversations.conversations;
      const conversationsWithMessages = conversations.filter(
        (conv) => conv._count?.messages && conv._count.messages > 0
      );
      // For now, we'll show the count of active conversations as a simple indicator
      // This can be refined when backend provides unread message counts
      setMessagesCount(conversationsWithMessages.length > 0 ? conversationsWithMessages.length : 0);
    }
  }, [conversationsData]);

  // Update ride count based on pending rides
  useEffect(() => {
    if (ridesData?.userRides?.rides) {
      // Count pending rides that need attention
      const pendingRides = ridesData.userRides.rides.filter(
        (ride) => ride.status === 'PENDING'
      );
      setRidesCount(pendingRides.length);
    }
  }, [ridesData]);

  return {
    messagesCount,
    ridesCount,
    loading: conversationsLoading || ridesLoading,
  };
}
