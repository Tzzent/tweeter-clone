'use client';

import Link from "next/link";

import useTrends from "@/hooks/useTrends";
import Modal from "../Modal";
import { useCallback } from "react";

interface TrendsModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export default function TrendsModal({
  isOpen,
  onClose,
}: TrendsModalProps) {
  const {
    data,
    hasMore,
    isLoading,
    isValidating,
    size,
    setSize,
  } = useTrends(5);

  const handleOnScrollEnded = useCallback(() => {
    if (!isValidating && hasMore && !isLoading) {
      setSize(size + 1);
    }
  }, [
    isValidating,
    isLoading,
    hasMore,
    setSize,
    size,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onScrollEnd={handleOnScrollEnded}
      title="Trends for you"
      className="
      space-y-3
      max-h-96
      overflow-y-auto
      "
    >
      {data.map((trends) => (
        trends.map((trend) => (
          <div
            key={trend.id}
            className="
            flex
            justify-between
            items-center
            "
          >
            <Link
              href={`/explore?search=${trend.name}`}
              className="
              transition-all
              hover:underline
              hover:font-semibold
              "
            >
              #{trend.name}
            </Link>
            <div
              className="
              text-xs
              text-gray-500
              "
            >
              {trend._count.tweets} Tweets
            </div>
          </div>
        ))
      ))}
    </Modal>
  )
}
