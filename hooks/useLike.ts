import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";

import useCurrentUser from "./useCurrentUser";
import useTweet from "./useTweet";
import useTweets from "./useTweets";

interface LikeHookResponse {
  hasLiked: boolean,
  toogleLike: () => Promise<void>,
}

export default function useLike(
  tweetId: string,
): LikeHookResponse {
  const { data: currentUser } = useCurrentUser();
  const { data: tweet, mutate: mutateTweet } = useTweet(tweetId);
  const { mutate: mutateTweets } = useTweets();

  const authModal = useAuthModal();

  const hasLiked = useMemo(() => {
    const listLikedIds = tweet?.likedIds || [];

    return listLikedIds.includes(currentUser?.id!);
  }, [
    tweet?.likedIds,
    currentUser?.id,
  ]);

  const toogleLike = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/tweets/${tweetId}/like`);
      } else {
        request = () => axios.post(`/api/tweets/${tweetId}/like`);
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
    hasLiked,
    mutateTweets,
    mutateTweet,
    tweetId,
  ]);

  return {
    hasLiked,
    toogleLike,
  }
}