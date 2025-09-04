import io, { Socket } from 'socket.io-client';
import throttle from 'lodash/throttle';

type TypingPayload = { conversationId?: string; rideId?: string; isTyping: boolean };

let socket: Socket | null = null;

/** Initialise la socket si pas encore créée, retourne l'instance */
export function initSocket(token?: string) {
  if (socket) return socket;

  socket = io(`${process.env.NEXT_PUBLIC_API_GRAPHQL_BASE_URL}/chat`, {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => console.log('[socket] connected', socket?.id));
  socket.on('connect_error', err => console.error('[socket] connect_error', err));
  socket.on('disconnect', reason => console.log('[socket] disconnected', reason));

  return socket;
}

export function getSocket() {
  return socket;
}

/** Leave room(s) then disconnect and cleanup */
export async function disconnectSocket(opts?: { conversationId?: string; rideId?: string }) {
  try {
    if (!socket) return;
    // leave room if provided
    if (opts?.conversationId || opts?.rideId) {
      socket.emit('leaveRoom', { conversationId: opts.conversationId, rideId: opts.rideId });
      // small delay to ensure server processes the leave before disconnect (optional)
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    socket.disconnect();
    socket = null;
    console.log('[socket] disconnected and cleaned up');
  } catch (err) {
    console.error('[socket] disconnect error', err);
  }
}

/** helpers pour room */
export function joinRoom(payload: { conversationId?: string; rideId?: string }) {
  socket?.emit('joinRoom', payload);
}
export function leaveRoom(payload: { conversationId?: string; rideId?: string }) {
  socket?.emit('leaveRoom', payload);
}

/** subscribe/unsubscribe aux events (utiles pour useEffect cleanup) */
export function onUserTyping(
  cb: (data: { userId: string; userName: string; isTyping: boolean }) => void,
) {
  socket?.on('userTyping', cb);
}
export function offUserTyping(
  cb: (data: { userId: string; userName: string; isTyping: boolean }) => void,
) {
  socket?.off('userTyping', cb);
}

/** emitTyping centralisé + throttled (évite multiple throttles dans l'app) */
const _emitTyping = (payload: TypingPayload) => {
  if (!socket) return;
  socket.emit('typing', payload);
};
export const emitTyping = throttle(_emitTyping, 300);
