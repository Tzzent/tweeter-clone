'use client';

import { useMemo, useState } from "react";

import UserHero from "@/components/username/UserHero";
import UserBio from "@/components/username/UserBio";
import TweetFeed from "@/components/site/TweetFeed";
import useUser from "@/hooks/useUser";
import BookBar from "@/components/BookBar";
import useTweetsUser, { UserBarState } from "@/hooks/useTweetsUser";

interface IParams {
  username: string,
}

export default function UserPage(
  { params }: { params: IParams }
) {
  const [bookState, setBookState] = useState<UserBarState>('Tweets');
  const { data: user, isLoading: userLoading } = useUser(params.username);
  const {
    data,
    hasMore,
    isLoading,
    isValidating,
    size,
    setSize
  } = useTweetsUser(bookState, params.username);

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

  return (
    <div
      className="
        grid
        grid-cols-3
        w-full
        mx-auto
        "
    >
      <div
        className="
          w-full
          flex
          flex-col
          items-center
          col-span-3
          "
      >
        <UserHero coverImage={user?.coverImage!} />
        <UserBio
          isloading={userLoading}
          user={user}
        />
      </div>
      <div
        className="
          mt-3
          col-span-3
          w-full
          md:max-w-7xl
          md:mx-auto
          px-3
          grid
          lg:grid-cols-3
          gap-5
          "
      >
        <BookBar books={books} />
        <div
          className="
          lg:col-span-2
          "
        >
          <TweetFeed
            onScrollEnd={() => setSize(size + 1)}
            data={data}
            hasMore={hasMore}
            isLoading={isLoading}
            isValidating={isValidating}
          />
        </div>
      </div>
    </div>
  )
}
