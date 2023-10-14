'use client';

import { MoonLoader } from "react-spinners";

import useCurrentUser from "@/hooks/useCurrentUser";
import TweetItem from "./TweetItem";
import { useCallback, useEffect } from "react";
import { TweetItemType } from "@/types";

interface TweetFeedProps {
  onScrollEnd?: () => void,
  data: Array<TweetItemType[]> | Array<[]>,
  isValidating: boolean,
  isLoading: boolean,
  hasMore: boolean,
}

export default function TweetFeed({
  onScrollEnd,
  data,
  isValidating,
  isLoading,
  hasMore,
}: TweetFeedProps) {
  const { data: currentUser } = useCurrentUser();

  const handleOnScroll = useCallback(() => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (
      (documentHeight - scrollPosition === windowHeight) &&
      !isValidating &&
      hasMore &&
      onScrollEnd
    ) {
      onScrollEnd();
    }
  }, [
    isValidating,
    hasMore,
    onScrollEnd,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [handleOnScroll]);

  if (!isLoading && data?.[0]?.length === 0) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-60
        text-lg
        text-blue-400
        "
      >
        Oh no, there are no tweets! 😿
      </div>
    )
  }

  return (
    <div
      className="
      flex
      flex-col
      gap-8
      "
    >
      {data?.map((tweets) => {
        return tweets?.map((tweet) => (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            currentUser={currentUser!}
          />
        ))
      })}
      {(isLoading || isValidating) && (
        <div
          className="
          flex
          justify-center
          items-center
          h-20
          "
        >
          <MoonLoader color="#2D9CDB" />
        </div>
      )}
    </div>
  )
}
