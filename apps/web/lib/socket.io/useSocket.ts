// hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react';
import { getSession } from 'next-auth/react';
import {
  initSocket,
  getSocket,
  joinRoom,
  leaveRoom,
  onUserTyping,
  offUserTyping,
  // disconnectSocket, // si tu veux déconnecter explicitement à un moment
  emitTyping,
} from './socketClient'; // ajuste le chemin si nécessaire

interface UseSocketOptions {
  conversationId?: string;
  rideId?: string;
}

export const useSocket = (options?: UseSocketOptions) => {
  const mountedRef = useRef(true);
  const typingTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<{ userId: string; userName: string }[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    const cleanupFns: Array<() => void> = [];

    (async () => {
      const session = await getSession();
      const token = (session as any)?.accessToken;
      if (!token) return; // pas d'init si pas de token

      console.log('[useSocket] init token:', token);

      // initialise la socket (singleton)
      const s = initSocket(token);

      // handlers connect / disconnect
      const onConnect = () => {
        if (mountedRef.current) setIsConnected(true);
      };
      const onDisconnect = () => {
        if (mountedRef.current) setIsConnected(false);
      };

      s.on('connect', onConnect);
      s.on('disconnect', onDisconnect);

      // cleanup pour detach listeners socket
      cleanupFns.push(() => {
        try {
          s.off('connect', onConnect);
          s.off('disconnect', onDisconnect);
        } catch (e) {
          console.error('[useSocket] error cleaning socket listeners', e);
        }
      });

      // join the room if provided
      if (options?.conversationId || options?.rideId) {
        joinRoom({ conversationId: options?.conversationId, rideId: options?.rideId });
        cleanupFns.push(() =>
          leaveRoom({ conversationId: options?.conversationId, rideId: options?.rideId }),
        );
      }

      // typing handler : update state and gère timeouts auto-remove
      const typingHandler = (data: {
        userId: string;
        userName: string;
        isTyping: boolean;
        timestamp?: string;
      }) => {
        // update typingUsers
        setTypingUsers(prev => {
          if (data.isTyping) {
            const filtered = prev.filter(u => u.userId !== data.userId);
            return [...filtered, { userId: data.userId, userName: data.userName }];
          } else {
            return prev.filter(u => u.userId !== data.userId);
          }
        });

        // manage timeout
        const existing = typingTimeoutsRef.current.get(data.userId);
        if (existing) {
          clearTimeout(existing);
          typingTimeoutsRef.current.delete(data.userId);
        }

        if (data.isTyping) {
          const timeout = setTimeout(() => {
            // remove user if no new typing events
            setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
            typingTimeoutsRef.current.delete(data.userId);
          }, 4000);
          typingTimeoutsRef.current.set(data.userId, timeout);
        }
      };

      // subscribe and push cleanup
      onUserTyping(typingHandler);
      cleanupFns.push(() => offUserTyping(typingHandler));
    })();

    // RETURN cleanup synchron que React utilisera lors du unmount
    return () => {
      // empêche les setState futurs
      mountedRef.current = false;

      // exécution des cleanup enregistrés (leaveRoom, offUserTyping, off connect/disconnect)
      cleanupFns.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('[useSocket] cleanup fn error', e);
        }
      });

      // clear tous les timeouts typing
      typingTimeoutsRef.current.forEach(t => clearTimeout(t));
      typingTimeoutsRef.current.clear();

      // NE PAS disconnectSocket() ici si tu veux que la socket reste pour d'autres composants
      // si tu veux la déconnecter quand le hook se démonte, appelle disconnectSocket() explicitement ailleurs
    };
  }, [options?.conversationId, options?.rideId]);

  return {
    socket: getSocket(),
    isConnected,
    typingUsers,
    emitTyping, // throttled singleton importé depuis socketClient
  };
};
