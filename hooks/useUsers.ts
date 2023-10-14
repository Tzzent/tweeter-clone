import useSWR, { KeyedMutator } from "swr";
import { User } from "@prisma/client";

import fetcher from "@/libs/fetcher";

interface UsersHookResponse {
  data: User[] | [],
  error: any,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}

export default function useUsers(): UsersHookResponse {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/users`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}