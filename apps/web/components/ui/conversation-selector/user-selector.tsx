import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useUserSearch } from './useUserSearch';
import { useUsersQuery, SortOrder } from '@/graphql/generated/graphql';

interface UserSelectorProps {
  selectedUserIds: string[];
  onAddUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  debounceMs?: number; // Debounce delay in milliseconds (default: 300ms)
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUserIds,
  onAddUser,
  onRemoveUser,
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get all users for fallback display
  const { data: allUsersData, loading: allUsersLoading } = useUsersQuery({
    variables: {
      take: 100,
      orderBy: [{ firstName: SortOrder.ASC }],
    },
    errorPolicy: 'all',
  });

  // Search users with Elasticsearch (with debouncing)
  const { searchResults, isSearching } = useUserSearch(searchTerm, {
    enabled: searchTerm.trim().length >= 2,
    debounceMs,
  });

  // Determine which users to display
  const displayUsers =
    searchTerm.trim().length >= 2
      ? searchResults
      : allUsersData?.users?.map(u => ({
          id: u.id,
          email: u.email,
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          username: u.username || '',
          avatarUrl: null,
        })) || [];

  const availableUsers = displayUsers.filter(user => !selectedUserIds.includes(user.id));
  const isLoading = searchTerm.trim().length >= 2 ? isSearching : allUsersLoading;

  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* User list */}
      <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : availableUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            {searchTerm ? 'Aucun utilisateur trouvé' : 'Tous les utilisateurs sont déjà ajoutés'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {availableUsers.map(user => (
              <button
                key={user.id}
                type="button"
                onClick={() => onAddUser(user.id)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {user.avatarUrl ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${user.avatarUrl})` }}
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected users */}
      {selectedUserIds.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Participants sélectionnés ({selectedUserIds.length})
          </label>
          <div className="space-y-1">
            {selectedUserIds.map(userId => {
              const user =
                displayUsers.find(u => u.id === userId) ||
                allUsersData?.users?.find(u => u.id === userId);
              return (
                <div
                  key={userId}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                >
                  <span className="text-sm text-gray-700 truncate">
                    {user ? (
                      <>
                        {user.firstName} {user.lastName}
                        <span className="text-gray-500 ml-2">({user.email})</span>
                      </>
                    ) : (
                      userId
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveUser(userId)}
                    className="text-red-600 hover:text-red-800 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
