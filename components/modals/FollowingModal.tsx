'use client';

import { User } from "@prisma/client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowings from "@/hooks/useFollowings";
import Modal from "../Modal";
import ToFollowItem from "../site/ToFollowItem";
import { useCallback } from "react";
import { PropagateLoader } from "react-spinners";

interface FollowingModalProps {
  isOpen: boolean,
  onClose: () => void,
  user: User,
  onOpenProfile?: () => void,
}

export default function FollowingModal({
  isOpen,
  onClose,
  user,
  onOpenProfile,
}: FollowingModalProps) {
  const { data: currentuser } = useCurrentUser();
  const {
    data: [users],
    hasMore,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useFollowings(user.id);

  const handleOnScrollEnded = useCallback(() => {
    if (hasMore && !isValidating && !isLoading) {
      return setSize(size + 1);
    }
  }, [
    hasMore,
    isLoading,
    isValidating,
    setSize,
    size,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onScrollEnd={handleOnScrollEnded}
      title={`${user.name} is following`}
      className="
      max-h-96
      overflow-y-auto
      flex
      flex-col
      space-y-3
      "
    >
      {users.map((user) => (
        <ToFollowItem
          key={user.id}
          user={user}
          coverVisible={false}
          sameUser={currentuser?.id === user.id}
          onOpenProfile={onOpenProfile}
        />
      ))}
      {(hasMore && isLoading && isValidating) && (
        <div
          className="
          flex
          justify-center
          pt-2
          pb-4
          "
        >
          <PropagateLoader color="#2D9CDB" />
        </div>
      )}
    </Modal>
  )
}
