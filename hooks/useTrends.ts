import { KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";

import fetcher from "@/libs/fetcher";
import { TrendItemType } from "@/types";
import { useState } from "react";

interface TrendsHookResponse {
  data: Array<TrendItemType[]> | Array<[]>,
  error: any,
  isLoading: boolean,
  isValidating: boolean,
  mutate: KeyedMutator<any>,
  size: number,
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>,
  hasMore: boolean,
}

export default function useTrends(
  limit: number = 3,
): TrendsHookResponse {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getKey = (pageIdx: number, prevData: any) => {
    if (prevData && !prevData.length) {
      // Reached the end
      setHasMore(false);
      return null;
    }

    return `/api/trends?page=${pageIdx}&limit=${limit}`;
  };

  const {
    data,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey, fetcher);

  return {
    data: data || [[]],
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate,
    hasMore,
  }
}