import { useEffect, useRef, useState } from 'react';
import { joinRoom, leaveRoom, onUserTyping, offUserTyping, emitTyping } from './socketClient';
import { useSocketConnection } from './SocketProvider';

interface UseChatSocketOptions {
  conversationId?: string;
  rideId?: string;
}

export const useChatSocket = (options?: UseChatSocketOptions) => {
  const { socket, isConnected } = useSocketConnection();
  const mountedRef = useRef(true);
  const typingTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const [typingUsers, setTypingUsers] = useState<{ userId: string; userName: string }[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    const typingTimeouts = typingTimeoutsRef.current;
    const cleanupFns: Array<() => void> = [];

    if (!socket || !isConnected) return;

    // Join room if provided
    if (options?.conversationId || options?.rideId) {
      joinRoom({ conversationId: options?.conversationId, rideId: options?.rideId });
      cleanupFns.push(() =>
        leaveRoom({ conversationId: options?.conversationId, rideId: options?.rideId }),
      );
    }

    // Typing handler
    const typingHandler = (data: {
      userId: string;
      userName: string;
      isTyping: boolean;
      timestamp?: string;
    }) => {
      if (!mountedRef.current) return;

      // Update typingUsers
      setTypingUsers(prev => {
        if (data.isTyping) {
          const filtered = prev.filter(u => u.userId !== data.userId);
          return [...filtered, { userId: data.userId, userName: data.userName }];
        } else {
          return prev.filter(u => u.userId !== data.userId);
        }
      });

      // Manage timeout
      const existing = typingTimeoutsRef.current.get(data.userId);
      if (existing) {
        clearTimeout(existing);
        typingTimeoutsRef.current.delete(data.userId);
      }

      if (data.isTyping) {
        const timeout = setTimeout(() => {
          if (mountedRef.current) {
            setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
          }
          typingTimeoutsRef.current.delete(data.userId);
        }, 4000);
        typingTimeoutsRef.current.set(data.userId, timeout);
      }
    };

    // Subscribe to typing events
    onUserTyping(typingHandler);
    cleanupFns.push(() => offUserTyping(typingHandler));

    return () => {
      mountedRef.current = false;

      // Execute cleanup functions
      cleanupFns.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('[useChatSocket] cleanup fn error', e);
        }
      });

      // Clear all typing timeouts
      typingTimeouts.forEach(t => clearTimeout(t));
      typingTimeouts.clear();
    };
  }, [socket, isConnected, options?.conversationId, options?.rideId]);

  return {
    socket,
    isConnected,
    typingUsers,
    emitTyping,
  };
};
