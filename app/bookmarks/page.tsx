'use client';

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import TweetFeed from "@/components/site/TweetFeed";
import BookBar from "@/components/BookBar";
import useTweetsUser, { UserBarState } from "@/hooks/useTweetsUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import AuthModal from "@/components/modals/AuthModal";

export default function BookmarksPage() {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(true);
  const [bookState, setBookState] = useState<UserBarState>('Tweets');
  const router = useRouter();

  const { data: currentuser } = useCurrentUser();
  const {
    data,
    isLoading,
    setSize,
    size,
    hasMore,
    isValidating,
  } = useTweetsUser(bookState, currentuser?.username);

  const books = useMemo(() => [
    {
      label: 'Tweets',
      onClick: () => setBookState('Tweets'),
      isActive: bookState === 'Tweets',
    },
    {
      label: 'Tweets & replies',
      onClick: () => setBookState('RepliedTweets'),
      isActive: bookState === 'RepliedTweets',
    },
    {
      label: 'Media',
      onClick: () => setBookState('MediaTweets'),
      isActive: bookState === 'MediaTweets',
    },
    {
      label: 'Likes',
      onClick: () => setBookState('LikedTweets'),
      isActive: bookState === 'LikedTweets',
    }
  ], [bookState]);

  if (!currentuser?.id) {
    return (
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    );
  }

  return (
    <div
      className="
      w-full
      max-w-7xl
      mx-auto
      mt-5
      px-3
      grid
      grid-cols-1
      md:gap-5
      md:grid-cols-3
      "
    >
      <div
        className="
        sticky 
        top-16 
        h-fit
        "
      >
        <BookBar books={books} />
      </div>
      <div
        className="
        col-span-2
        mt-3
        md:mt-0
        flex
        flex-col
        gap-5
        "
      >
        <TweetFeed
          onScrollEnd={() => setSize(size + 1)}
          data={data}
          isLoading={isLoading}
          hasMore={hasMore}
          isValidating={isValidating}
        />
      </div>
    </div>
  )
}
