import { MessageFragmentFragment, UserConversation } from '@/graphql/generated/graphql';
import { useState } from 'react';

interface ConversationDetailsSidebarProps {
  conversation: UserConversation;
  messages: MessageFragmentFragment[];
  currentUserId?: string;
  onSearchInMessages?: (query: string) => void;
}

export const ConversationDetailsSidebar: React.FC<ConversationDetailsSidebarProps> = ({
  conversation,
  messages,
  currentUserId,
  onSearchInMessages,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    files: false,
    links: false,
  });

  // Get the other participant (excluding current user)
  const displayParticipant = conversation.participants?.find(
    p => p.user.id !== currentUserId,
  ) || conversation.participants?.[0];

  // Filter messages with attachments
  // TODO: Use AttachmentType enum from generated types once available
  const fileAttachments = messages.flatMap(m => m.attachments?.filter(a => a.type === 'FILE') || []);
  const linkAttachments = messages.flatMap(
    m => m.attachments?.filter(a => a.type === 'LINK' || a.linkTitle) || [],
  );

  const toggleSection = (section: 'files' | 'links') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchInMessages && query.trim()) {
      onSearchInMessages(query);
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 flex flex-col bg-white overflow-y-auto">
      {/* User/Conversation Info Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-300 mb-3 overflow-hidden">
            {displayParticipant?.user?.avatar?.url ? (
              <img
                src={displayParticipant.user.avatar.url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-gray-600">
                {displayParticipant?.user?.firstName?.[0] || '?'}
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            {conversation.title ||
              `${displayParticipant?.user?.firstName || ''} ${
                displayParticipant?.user?.lastName || ''
              }`.trim() ||
              'Conversation'}
          </h3>

          {/* Additional Info (e.g., rating, phone) */}
          {displayParticipant?.user?.phone && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{displayParticipant.user.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Search in messages */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Rechercher dans les messages"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Files Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('files')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <span className="font-medium text-gray-900">Fichiers</span>
            {fileAttachments.length > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                {fileAttachments.length}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              expandedSections.files ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.files && fileAttachments.length > 0 && (
          <div className="px-4 pb-4 space-y-2">
            {fileAttachments.slice(0, 10).map((attachment, index) => (
              <div
                key={attachment.id || index}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-700 truncate">
                  {attachment.file?.key || attachment.url || 'Fichier'}
                </span>
              </div>
            ))}
            {fileAttachments.length > 10 && (
              <div className="text-xs text-gray-500 text-center">
                +{fileAttachments.length - 10} autres fichiers
              </div>
            )}
          </div>
        )}
      </div>

      {/* Links Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('links')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="font-medium text-gray-900">Liens</span>
            {linkAttachments.length > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                {linkAttachments.length}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              expandedSections.links ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.links && linkAttachments.length > 0 && (
          <div className="px-4 pb-4 space-y-2">
            {linkAttachments.slice(0, 10).map((attachment, index) => (
              <a
                key={attachment.id || index}
                href={attachment.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
              >
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 truncate">
                    {attachment.linkTitle || 'Lien'}
                  </div>
                  {attachment.linkDesc && (
                    <div className="text-xs text-gray-500 truncate">{attachment.linkDesc}</div>
                  )}
                </div>
              </a>
            ))}
            {linkAttachments.length > 10 && (
              <div className="text-xs text-gray-500 text-center">
                +{linkAttachments.length - 10} autres liens
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Info Section - Placeholder for future features */}
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-500 text-center">
          {conversation.participants?.length || 0} participant
          {(conversation.participants?.length || 0) > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
