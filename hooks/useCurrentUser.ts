import useSWR, { KeyedMutator } from "swr";

import fetcher from "@/libs/fetcher";
import { User } from "@prisma/client";

interface UserHookResponse {
  data: User | null,
  error: any,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}

export default function useCurrentUser(): UserHookResponse {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/user`, fetcher);
  console.log('From the useCurrentUser()', data);
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};