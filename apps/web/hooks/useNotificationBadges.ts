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
 * Returns counts of active conversations (with messages) and pending rides
 */
export function useNotificationBadges(): NotificationBadges {
  const [messagesCount, setMessagesCount] = useState(0);
  const [ridesCount, setRidesCount] = useState(0);

  // Fetch user conversations - count active ones with messages
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
      // This shows the count of active conversations as a notification indicator
      const conversations = conversationsData.userConversations.conversations;
      const conversationsWithMessages = conversations.filter(
        (conv) => conv._count?.messages && conv._count.messages > 0
      );
      setMessagesCount(conversationsWithMessages.length);
    }
  }, [conversationsData]);

  // Update ride count based on pending rides from the query
  useEffect(() => {
    if (ridesData?.userRides?.rides) {
      // The query already filters for PENDING status, so we just count the results
      setRidesCount(ridesData.userRides.rides.length);
    }
  }, [ridesData]);

  return {
    messagesCount,
    ridesCount,
    loading: conversationsLoading || ridesLoading,
  };
}
