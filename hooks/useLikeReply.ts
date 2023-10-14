import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";

import useCurrentUser from "./useCurrentUser";
import useReply from "./useReply";
import useTweets from "./useTweets";

interface LikeHookResponse {
  isLoading: boolean,
  hasLiked: boolean,
  toogleLike: () => Promise<void>,
}

export default function useLikeReply(
  replyId: string,
): LikeHookResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: currentUser } = useCurrentUser();
  const { data: reply, mutate: mutateReply } = useReply(replyId);
  const { mutate: mutateReplies } = useTweets();

  const authModal = useAuthModal();

  const hasLiked = useMemo(() => {
    const listLikedIds = reply?.likedIds || [];

    return listLikedIds.includes(currentUser?.id!);
  }, [
    currentUser?.id,
    reply?.likedIds,
  ]);

  const toogleLike = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }
    setIsLoading(true);

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/replies/${replyId}/like`);
      } else {
        request = () => axios.post(`/api/replies/${replyId}/like`);
      }

      await request();
      mutateReply();
      mutateReplies();

      toast.success('Success');
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [
    authModal,
    currentUser,
    hasLiked,
    mutateReplies,
    mutateReply,
    replyId,
  ]);

  return {
    isLoading,
    hasLiked,
    toogleLike,
  }
}