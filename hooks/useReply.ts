import useSWR, { KeyedMutator } from "swr";

import fetcher from "@/libs/fetcher";
import { Tweet } from "@prisma/client";

interface TweetHookResponse {
  data: Tweet,
  error: any,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}

export default function useReply(replyId: string): TweetHookResponse {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(replyId ? `/api/replies/${replyId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}