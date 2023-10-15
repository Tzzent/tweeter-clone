import { KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";

import fetcher from "@/libs/fetcher";

interface ExploreHookResponse {
  data: Array<any[]>,
  error: any,
  isLoading: boolean,
  isValidating: boolean,
  mutate: KeyedMutator<any>,
  size: number,
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>,
  hasMore: boolean,
}

export type EploreState = 'Top' | 'Latest' | 'People' | 'Media';

export default function useExplore(
  explore: EploreState,
  search: string,
): ExploreHookResponse {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getKey = (pageIdx: number, prevData: any) => {
    if (prevData && !prevData.length) {
      // Reached the end
      setHasMore(false);
      return null;
    }

    const limit = explore === 'People' ? 10 : 3;

    return `/api/explore/${explore}?search=${search}&page=${pageIdx}&limit=${limit}`;
  };

  const {
    data,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, fetcher);

  return {
    data: data || [[]],
    error,
    isLoading,
    mutate,
    isValidating,
    size,
    setSize,
    hasMore,
  }
}