import { useSearchMessagesLazyQuery } from '@/graphql/generated/graphql';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ChatSearchProps {
  onClose: () => void;
  onMessageClick: (messageId: string, messageDate: string) => void;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({ onClose, onMessageClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [searchMessages, { data, loading, error }] = useSearchMessagesLazyQuery();

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const delayDebounce = setTimeout(() => {
        searchMessages({
          variables: {
            q: searchQuery,
            size: 20,
            page: page,
          },
        });
      }, 300);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery, page, searchMessages]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const searchResults = data?.searchMessages?.hits?.map(hit => hit._source) || [];
  const totalResults = data?.searchMessages?.total || 0;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* Search header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans les messages..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search results */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && <div className="text-center text-gray-500 py-8">Recherche en cours...</div>}

        {error && (
          <div className="text-center text-red-500 py-8">
            Erreur lors de la recherche: {error.message}
          </div>
        )}

        {!loading && searchQuery.trim().length < 2 && (
          <div className="text-center text-gray-500 py-8">
            Entrez au moins 2 caractères pour rechercher
          </div>
        )}

        {!loading && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
          <div className="text-center text-gray-500 py-8">Aucun résultat trouvé</div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-2">
            {searchResults.map(message => (
              <div
                key={message.id}
                onClick={() => {
                  onMessageClick(message.id, message.createdAt);
                  onClose();
                }}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">{message.content}</div>
                  </div>
                  <div className="text-xs text-gray-400 ml-2">
                    {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Load more button */}
            {totalResults > searchResults.length && (
              <div className="text-center py-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  {loading ? 'Chargement...' : 'Charger plus de résultats'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
