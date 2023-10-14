import { KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";

import fetcher from "@/libs/fetcher";
import { TweetItemType } from "@/types";
import { useState } from "react";

interface TweetsHookResponse {
  data: Array<TweetItemType[]> | Array<[]>,
  error: any,
  isLoading: boolean,
  isValidating: boolean,
  mutate: KeyedMutator<any>,
  size: number,
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>,
  hasMore: boolean,
}

export default function useTweets(): TweetsHookResponse {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getKey = (pageIdx: number, prevData: any) => {
    if (prevData && !prevData.length) {
      // Reached the end
      setHasMore(false);
      return null;
    }


    return `/api/tweets?page=${pageIdx}&limit=3`;
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
    isValidating,
    mutate,
    setSize,
    size,
    hasMore,
  }
}