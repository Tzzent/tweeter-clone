import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";
import useCurrentUser from "./useCurrentUser";
import useTweets from "./useTweets";
import useUser from "./useUser";
import useUsers from "./useUsers";

interface FollowHookResponse {
  hasFollow: boolean,
  toggleFollow: () => Promise<void>,
}

export default function useFollow(
  username?: string,
): FollowHookResponse {
  const { data: currentUser } = useCurrentUser();
  const { data: user, mutate: mutateUser } = useUser(username);
  const { mutate: mutateUsers } = useUsers();
  const { mutate: mutateTweets } = useTweets();

  const authModal = useAuthModal();

  const hasFollow = useMemo(() => {
    const listFollowIds = user?.followerIds || [];

    return listFollowIds.includes(currentUser?.id!);
  }, [
    currentUser?.id,
    user?.followerIds,
  ]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;

      if (hasFollow) {
        request = () => axios.delete('/api/follow', { data: { username } });
      } else {
        request = () => axios.post('/api/follow', { username });
      }

      await request();
      mutateUser();
      mutateUsers();
      mutateTweets();

      toast.success('Success');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }, [
    currentUser,
    hasFollow,
    authModal,
    mutateUsers,
    mutateUser,
    mutateTweets,
    username,
  ]);

  return {
    toggleFollow,
    hasFollow,
  }
}