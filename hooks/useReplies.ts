import useSWR, { KeyedMutator } from "swr";

import fetcher from "@/libs/fetcher";
import { CommentItemType } from "@/types";

interface RepliesHookResponse {
  data: {
    replies: CommentItemType[] | [],
    hasMore: boolean,
  },
  error: any,
  isLoading: boolean,
  isValidating: boolean,
  mutate: KeyedMutator<any>,
}

export default function useReplies(
  tweetId: string,
  skip: number = 0,
  take: number = 3,
): RepliesHookResponse {

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(`/api/tweets/${tweetId}/replies?take=${take}&skip=${skip}`, fetcher);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}