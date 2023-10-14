import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";

import useCurrentUser from "./useCurrentUser";
import useTweet from "./useTweet";
import useTweets from "./useTweets";

interface SaveHookResponse {
  hasRetweeted: boolean,
  toggleRetweet: () => Promise<void>,
}

export default function useRetweet(
  tweetId: string,
): SaveHookResponse {
  const { data: currentUser } = useCurrentUser();
  const { data: tweet, mutate: mutateTweet } = useTweet(tweetId);
  const { mutate: mutateTweets } = useTweets();

  const authModal = useAuthModal();

  const hasRetweeted = useMemo(() => {
    const listRetweetedIds = tweet?.retweetedByIds || [];

    return listRetweetedIds.includes(currentUser?.id!);
  }, [
    tweet?.retweetedByIds,
    currentUser?.id,
  ]);

  const toggleRetweet = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;

      if (hasRetweeted) {
        request = () => axios.delete(`/api/tweets/${tweetId}/retweet`);
      } else {
        request = () => axios.post(`/api/tweets/${tweetId}/retweet`);
      }

      await request();
      mutateTweet();
      mutateTweets();

      toast.success('Success');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }, [
    currentUser,
    authModal,
    hasRetweeted,
    mutateTweets,
    mutateTweet,
    tweetId,
  ]);

  return {
    hasRetweeted,
    toggleRetweet,
  }
}