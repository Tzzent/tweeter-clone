import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";

import useCurrentUser from "./useCurrentUser";
import useTweet from "./useTweet";
import useTweets from "./useTweets";

interface SaveHookResponse {
  hasSaved: boolean,
  toggleSave: () => Promise<void>,
}

export default function useSave(
  tweetId: string,
): SaveHookResponse {
  const { data: currentUser } = useCurrentUser();
  const { data: tweet, mutate: mutateTweet } = useTweet(tweetId);
  const { mutate: mutateTweets } = useTweets();

  const authModal = useAuthModal();

  const hasSaved = useMemo(() => {
    const listSavedIds = tweet?.savedIds || [];

    return listSavedIds.includes(currentUser?.id!);
  }, [
    currentUser?.id,
    tweet?.savedIds,
  ]);

  const toggleSave = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;
      if (hasSaved) {
        request = () => axios.delete('/api/save', { data: { tweetId } });
      } else {
        request = () => axios.post('/api/save', { tweetId });
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
    hasSaved,
    mutateTweets,
    mutateTweet,
    tweetId,
  ]);

  return {
    hasSaved,
    toggleSave,
  }
}