import { disconnectSocket } from '@/lib/socket.io/socketClient';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    // optionnel: leaveRoom si tu connais la conversation courante
    // await disconnectSocket({ conversationId: currentConversationId });

    // simple disconnect global
    await disconnectSocket();

    // puis déconnecte la session NextAuth
    signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
      onClick={handleLogout}
    >
      Se déconnecter
    </button>
  );
}
