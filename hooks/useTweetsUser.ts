import { KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";

import fetcher from "@/libs/fetcher";
import { TweetItemType } from "@/types";
import { useState } from "react";

interface TweetsUserHookResponse {
  data: Array<TweetItemType[]> | Array<[]>,
  error: any,
  isLoading: boolean,
  isValidating: boolean,
  mutate: KeyedMutator<any>,
  size: number,
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>,
  hasMore: boolean,
}

export type UserBarState = 'Tweets' | 'RepliedTweets' | 'MediaTweets' | 'LikedTweets';

export default function useTweetsUser(
  barState: UserBarState,
  username?: string,
): TweetsUserHookResponse {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getKey = (pageIdx: number, prevData: any) => {
    if (prevData && !prevData.length) {
      // Reached the end
      setHasMore(false);
      return null;
    }

    return (username)
      ? `/api/tweets/filter?book=${barState}&username=${username}&page=${pageIdx}&limit=3`
      : null;
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