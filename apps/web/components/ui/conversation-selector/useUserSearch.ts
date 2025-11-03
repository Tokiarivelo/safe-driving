import { useState, useEffect } from 'react';
import { useSearchUsersLazyQuery } from '@/graphql/generated/graphql';
import { UserSearchResult } from './types';

interface UseUserSearchOptions {
  enabled: boolean;
  debounceMs?: number;
}

export function useUserSearch(
  searchTerm: string,
  options: UseUserSearchOptions = { enabled: true, debounceMs: 300 },
) {
  const [searchUsers, { data, loading, error }] = useSearchUsersLazyQuery();
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);

  // Debounced search effect
  useEffect(() => {
    if (!options.enabled || searchTerm.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchUsers({
        variables: {
          q: searchTerm,
          page: 0,
          size: 20,
        },
      });
    }, options.debounceMs);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchUsers, options.enabled, options.debounceMs]);

  // Transform search results
  useEffect(() => {
    if (data?.searchUsers?.hits) {
      const transformed = data.searchUsers.hits.map(hit => ({
        id: hit._source.id,
        email: hit._source.email,
        firstName: hit._source.firstName,
        lastName: hit._source.lastName || '',
        username: hit._source.username || '',
        avatarUrl: hit._source.avatarUrl || null,
      }));
      setSearchResults(transformed);
    }
  }, [data]);

  return {
    searchResults,
    isSearching: loading,
    searchError: error,
    totalResults: data?.searchUsers?.total ?? 0,
  };
}
