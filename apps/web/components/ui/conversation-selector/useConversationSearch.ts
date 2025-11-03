import { useState, useEffect, useCallback } from 'react';
import { UserConversation, useSearchConversationsLazyQuery } from '@/graphql/generated/graphql';
import { transformConversationHit } from './utils';

interface UseConversationSearchOptions {
  enabled: boolean;
  debounceMs?: number;
}

export function useConversationSearch(
  searchTerm: string,
  options: UseConversationSearchOptions = { enabled: true, debounceMs: 300 },
) {
  const [searchConversations, { data, loading, error }] = useSearchConversationsLazyQuery();
  const [searchResults, setSearchResults] = useState<UserConversation[]>([]);

  // Debounced search effect
  useEffect(() => {
    if (!options.enabled || searchTerm.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchConversations({
        variables: {
          q: searchTerm,
          page: 0,
          size: 50,
        },
      });
    }, options.debounceMs);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchConversations, options.enabled, options.debounceMs]);

  // Transform search results
  useEffect(() => {
    if (data?.searchConversations?.hits) {
      const transformed = data.searchConversations.hits.map(transformConversationHit);
      setSearchResults(transformed);
    }
  }, [data]);

  const reset = useCallback(() => {
    setSearchResults([]);
  }, []);

  return {
    searchResults,
    isSearching: loading,
    searchError: error,
    totalResults: data?.searchConversations?.total ?? 0,
    reset,
  };
}
