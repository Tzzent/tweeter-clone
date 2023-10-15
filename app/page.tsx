'use client';

import Form from "@/components/site/Form";
import TweetFeed from "@/components/site/TweetFeed";
import Trends4u from "@/components/site/Trends4u";
import WhoToFollow from "@/components/site/WhoToFollow";
import useTweets from "@/hooks/useTweets";

export default function HomePage() {
  const {
    data,
    hasMore,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useTweets();

  return (
    <div
      className="
      grid
      grid-cols-3
      gap-5
      w-full
      max-w-7xl
      mx-auto
      mt-4
      "
    >
      <div
        className="
        px-3
        flex
        flex-col
        gap-5
        col-span-3
        lg:col-span-2
        "
      >
        <Form />
        <TweetFeed
          onScrollEnd={() => setSize(size + 1)}
          data={data}
          hasMore={hasMore}
          isLoading={isLoading}
          isValidating={isValidating}
        />
      </div>
      <div
        className="
        flex
        flex-col
        gap-5
        px-3
        col-span-3
        lg:col-span-1
        top-16
        h-fit
        "
      >
        <Trends4u />
        <WhoToFollow />
      </div>
    </div>
  )
}
