import {
  QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';

type UseQueryParams = Parameters<typeof useQuery>;

export default function useLazyQuery<TData, TError>(
  key: UseQueryParams[0],
  fetchFn: QueryFunction<TData, QueryKey>,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
): [() => void, UseQueryResult<TData, TError>] {
  const [enabled, setEnabled] = useState(false);

  const query = useQuery<TData, TError, TData, QueryKey>(key, fetchFn, {
    ...(options || {}),
    enabled,
  });

  const trigger = useCallback(() => {
    if (!enabled) {
      setEnabled(true);
    }
  }, [fetchFn, enabled]);

  return [trigger, query];
}
