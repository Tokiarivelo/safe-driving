'use client';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { getSession } from 'next-auth/react';
import { initSocket, getSocket } from './socketClient';

interface SocketContextType {
  isConnected: boolean;
  socket: ReturnType<typeof getSocket> | null;
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socket: null,
});

export const useSocketConnection = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketConnection must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let socketInstance: ReturnType<typeof getSocket> | null = null;

    (async () => {
      const session = await getSession();
      const token = (session as { accessToken?: string })?.accessToken;
      if (!token) return;

      console.log('[SocketProvider] init token:', token);

      // Initialize socket singleton
      socketInstance = initSocket(token);
      if (mountedRef.current) {
        setSocket(socketInstance);
      }

      // Connection handlers
      const onConnect = () => {
        if (mountedRef.current) setIsConnected(true);
      };
      const onDisconnect = () => {
        if (mountedRef.current) setIsConnected(false);
      };

      socketInstance.on('connect', onConnect);
      socketInstance.on('disconnect', onDisconnect);

      // Set initial connection state
      if (socketInstance.connected && mountedRef.current) {
        setIsConnected(true);
      }
    })();

    return () => {
      mountedRef.current = false;
      if (socketInstance) {
        try {
          socketInstance.off('connect');
          socketInstance.off('disconnect');
        } catch (e) {
          console.error('[SocketProvider] cleanup error', e);
        }
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>{children}</SocketContext.Provider>
  );
};
