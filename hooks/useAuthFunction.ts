import { useSession } from "next-auth/react"
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "./useAuthModal";

export default function useAuthFunction() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { onOpen } = useAuthModal();

  const secureFunction = useCallback(async (cb: Function) => {
    setLoading(true);

    if (!session) {
      toast('You need to authenticate!', {
        icon: '🔐',
        position: 'top-center'
      });
      return onOpen();
    }

    await cb();
    setLoading(false);
  }, [
    onOpen,
    session,
  ]);

  return {
    loading,
    secureFunction,
  }
};