import { UserConversation } from '@/graphql/generated/graphql';
import { MoreVertical, Search } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  conversation?: UserConversation;
  rideId?: string;
  connected: boolean;
  onSearchClick: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  rideId,
  connected,
  onSearchClick,
}) => {
  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="font-semibold">
            {conversation?.title || (rideId ? 'Chat de course' : 'Chat')}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}
            ></div>
            {connected ? 'En ligne' : 'Hors ligne'}
            {conversation?.participants && (
              <span className="ml-2">
                • {conversation.participants.length} participant
                {conversation.participants.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Participant avatars */}
        {conversation?.participants && conversation.participants.length > 0 && (
          <div className="flex -space-x-2 ml-4">
            {conversation.participants.slice(0, 4).map(participant => (
              <div
                key={participant.id}
                className="relative w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                title={
                  `${participant.user?.firstName || ''} ${participant.user?.lastName || ''}`.trim() ||
                  participant.user?.email ||
                  ''
                }
              >
                {participant.user?.avatar?.url ? (
                  <Image
                    src={participant.user.avatar.url}
                    alt={`${participant.user.firstName || ''} ${participant.user.lastName || ''}`.trim()}
                    className="w-full h-full object-cover"
                    fill
                    sizes="32px"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                    {(
                      participant.user?.firstName?.[0] ||
                      participant.user?.email?.[0] ||
                      '?'
                    ).toUpperCase()}
                  </div>
                )}
              </div>
            ))}
            {conversation.participants.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                +{conversation.participants.length - 4}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Rechercher des messages"
        >
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
