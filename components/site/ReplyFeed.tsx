'use client';

import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { UIEvent, useCallback, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import useReplies from "@/hooks/useReplies";
import ReplyItem from "./ReplyItem";

interface ReplyFeedProps {
  tweetId: string,
}

export default function ReplyFeed({
  tweetId,
}: ReplyFeedProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading, mutate: mutateReplies } = useReplies(tweetId, 0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMoreReplies = useCallback(() => {
    setLoading(true);

    axios.get(`/api/tweets/${tweetId}/replies?take=3&skip=${data.replies.length}`)
      .then((res) => {
        mutateReplies({
          replies: [...data.replies, ...res.data.replies],
          hasMore: res.data.hasMore,
        }, false);
      })
      .finally(() => setLoading(false));
  }, [
    data?.replies,
    mutateReplies,
    tweetId,
  ]);

  const handleOnScroll = useCallback((ev: UIEvent<HTMLDivElement>) => {
    const element = ev.target as HTMLDivElement;

    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (!data?.hasMore || isLoading || loading) {
        return;
      }

      getMoreReplies();
    }
  }, [
    getMoreReplies,
    data?.hasMore,
    isLoading,
    loading,
  ]);

  return (
    <div
      ref={containerRef}
      onScroll={handleOnScroll}
      className="
      border-t
      my-2
      flex
      flex-col
      max-h-96
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-track-rounded-full
      scrollbar-thumb-sky-600 
      scrollbar-track-gray-300
      "
    >
      {data?.replies?.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
        />
      ))}
      {isLoading || loading && (
        <div
          className="
          flex
          justify-center
          py-2
          "
        >
          <ClipLoader color="#2D9CDB" />
        </div>
      )}
      {(containerRef.current?.clientHeight! < 300 && data?.hasMore && !loading) && (
        <button
          onClick={getMoreReplies}
          className="
          py-2
          absolute
          bottom-0
          inset-x-0
          flex
          justify-center
          items-center
          gap-2
          text-[#2D9CDB]
          bg-gradient-to-t
          from-blue-200
          font-bold
          transition
          hover:scale-105
          "
        >
          More <BsFillArrowDownCircleFill size={20} />
        </button>
      )}
    </div>
  )
}
