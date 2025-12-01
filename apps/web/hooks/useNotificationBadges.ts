'use client';

import { useEffect, useState, useCallback } from 'react';
import { useGetUserConversationsQuery, useUserRidesQuery } from '@/graphql/generated/graphql';
import { useSocketConnection } from '@/lib/socket.io/SocketProvider';

interface NotificationBadges {
  messagesCount: number;
  ridesCount: number;
  loading: boolean;
}

/**
 * Hook to get notification badge counts for messages and rides
 * Returns counts of active conversations (with messages) and pending rides
 * Subscribes to Socket.IO events for real-time updates
 */
export function useNotificationBadges(): NotificationBadges {
  const [messagesCount, setMessagesCount] = useState(0);
  const [ridesCount, setRidesCount] = useState(0);

  // Get socket connection for real-time updates
  const { socket, isConnected } = useSocketConnection();

  // Fetch user conversations - count active ones with messages
  const {
    data: conversationsData,
    loading: conversationsLoading,
    refetch: refetchConversations,
  } = useGetUserConversationsQuery({
    variables: { limit: 50 },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // Fetch user rides - count pending ones (new rides associated with user)
  const {
    data: ridesData,
    loading: ridesLoading,
    refetch: refetchRides,
  } = useUserRidesQuery({
    variables: {
      limit: 50,
      filter: { status: 'PENDING' },
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // Update message count based on unread messages in conversations
  // This should count actual unread messages, not total messages
  useEffect(() => {
    if (conversationsData?.userConversations?.conversations) {
      // Count total unread messages across all conversations
      // This requires the backend to provide unreadCount in each conversation
      const conversations = conversationsData.userConversations.conversations;
      let totalUnread = 0;
      conversations.forEach((conv) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unreadCount = (conv as any).unreadCount;
        if (typeof unreadCount === 'number' && unreadCount > 0) {
          totalUnread += unreadCount;
        }
      });
      setMessagesCount(totalUnread);
    }
  }, [conversationsData]);

  // Update ride count based on pending rides from the query
  useEffect(() => {
    if (ridesData?.userRides?.rides) {
      // The query already filters for PENDING status, so we just count the results
      setRidesCount(ridesData.userRides.rides.length);
    }
  }, [ridesData]);

  // Handle new message event - refetch to get accurate count
  // Note: Refetch is used instead of optimistic updates to avoid counting
  // messages in existing conversations as new conversations
  const handleNewMessage = useCallback(() => {
    refetchConversations();
  }, [refetchConversations]);

  // Handle ride update event - refetch rides when status may have changed
  // Both 'rideUpdate' and 'rideUpdated' events are handled for compatibility
  // with different backend event naming conventions
  const handleRideUpdate = useCallback(() => {
    refetchRides();
  }, [refetchRides]);

  // Handle participant update event - refetch when user is added/removed from a ride
  // Both 'participantUpdate' and 'participantUpdated' events are handled for compatibility
  const handleParticipantUpdate = useCallback(() => {
    refetchRides();
  }, [refetchRides]);

  // Subscribe to Socket.IO events for real-time notifications
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Subscribe to new message events from chat gateway
    socket.on('newMessage', handleNewMessage);
    
    // Subscribe to ride update events (both naming conventions for compatibility)
    socket.on('rideUpdate', handleRideUpdate);
    socket.on('rideUpdated', handleRideUpdate);
    
    // Subscribe to participant update events (both naming conventions for compatibility)
    socket.on('participantUpdate', handleParticipantUpdate);
    socket.on('participantUpdated', handleParticipantUpdate);

    // Cleanup subscriptions on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('rideUpdate', handleRideUpdate);
      socket.off('rideUpdated', handleRideUpdate);
      socket.off('participantUpdate', handleParticipantUpdate);
      socket.off('participantUpdated', handleParticipantUpdate);
    };
  }, [socket, isConnected, handleNewMessage, handleRideUpdate, handleParticipantUpdate]);

  return {
    messagesCount,
    ridesCount,
    loading: conversationsLoading || ridesLoading,
  };
}
