'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface ScanResult {
  sessionId: string;
  scannedValue: string;
  timestamp: string;
}

interface UseScanSessionOptions {
  onScanResult?: (result: ScanResult) => void;
  onSessionExpired?: () => void;
  onError?: (error: Error) => void;
}

interface UseScanSessionReturn {
  isConnected: boolean;
  scannedValue: string | null;
  error: Error | null;
  connect: () => void;
  disconnect: () => void;
}

export function useScanSession(
  sessionId: string | null,
  options: UseScanSessionOptions = {}
): UseScanSessionReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const mountedRef = useRef(true);

  const { onScanResult, onSessionExpired, onError } = options;

  const connect = useCallback(() => {
    if (!sessionId || socketRef.current) return;

    try {
      const socketUrl = process.env.NEXT_PUBLIC_API_GRAPHQL_BASE_URL || 'http://localhost:4000';
      
      socketRef.current = io(`${socketUrl}/scan`, {
        transports: ['websocket'],
        autoConnect: true,
      });

      socketRef.current.on('connect', () => {
        if (mountedRef.current) {
          setIsConnected(true);
          setError(null);
          // Join the scan session room
          socketRef.current?.emit('joinScanSession', { sessionId });
        }
      });

      socketRef.current.on('disconnect', () => {
        if (mountedRef.current) {
          setIsConnected(false);
        }
      });

      socketRef.current.on('connect_error', err => {
        if (mountedRef.current) {
          const connectionError = new Error(`Connection error: ${err.message}`);
          setError(connectionError);
          onError?.(connectionError);
        }
      });

      socketRef.current.on('scan-result', (result: ScanResult) => {
        if (mountedRef.current) {
          setScannedValue(result.scannedValue);
          onScanResult?.(result);
        }
      });

      socketRef.current.on('scan-session-expired', () => {
        if (mountedRef.current) {
          onSessionExpired?.();
        }
      });
    } catch (err) {
      const connectionError = err instanceof Error ? err : new Error('Unknown connection error');
      setError(connectionError);
      onError?.(connectionError);
    }
  }, [sessionId, onScanResult, onSessionExpired, onError]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      if (sessionId) {
        socketRef.current.emit('leaveScanSession', { sessionId });
      }
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, [sessionId]);

  useEffect(() => {
    mountedRef.current = true;

    if (sessionId) {
      connect();
    }

    return () => {
      mountedRef.current = false;
      disconnect();
    };
  }, [sessionId, connect, disconnect]);

  return {
    isConnected,
    scannedValue,
    error,
    connect,
    disconnect,
  };
}
