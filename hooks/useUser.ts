import useSWR, { KeyedMutator } from "swr";
import { User } from "@prisma/client";

import fetcher from "@/libs/fetcher";

interface UserHookResponse {
  data: User | null,
  error: any,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}

export default function useUser(username?: string): UserHookResponse {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    username ? `/api/users/?username=${username}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}