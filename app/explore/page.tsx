'use client';

import { UIEvent, useCallback, useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import InputSearch from "@/components/explore/InputSearch";
import TweetFeed from "@/components/site/TweetFeed";
import BookBar from "@/components/BookBar";
import useExplore from "@/hooks/useExplore";
import ToFollowItem from "@/components/site/ToFollowItem";
import Card from "@/components/Card";

type ExploreState = 'Top' | 'Latest' | 'People' | 'Media';
const ExploreState = ['Top', 'Latest', 'People', 'Media'];

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stateFromUrl = useMemo(() => {
    const stateUrl = searchParams.get('book') || 'Top';

    if (ExploreState.includes(stateUrl)) {
      return stateUrl as ExploreState;
    }

    return 'Top' as ExploreState;
  }, [searchParams]);

  const [exploreState, setExploreState] = useState<ExploreState>(stateFromUrl);
  const [searchValue, setSearchValue] = useState<string>(() => (
    searchParams.get('search') || ''
  ));

  const {
    data,
    isLoading,
    isValidating,
    hasMore,
    size,
    setSize,
  } = useExplore(exploreState, searchValue);

  const books = useMemo(() => [
    {
      label: 'Top',
      onClick: () => setExploreState('Top'),
      isActive: exploreState === 'Top',
    },
    {
      label: 'Latest',
      onClick: () => setExploreState('Latest'),
      isActive: exploreState === 'Latest',
    },
    {
      label: 'People',
      onClick: () => setExploreState('People'),
      isActive: exploreState === 'People',
    },
    {
      label: 'Media',
      onClick: () => setExploreState('Media'),
      isActive: exploreState === 'Media',
    }
  ], [exploreState]);

  const handleOnSubmit = useCallback((value: string) => {
    const encodedSearchValue = encodeURIComponent(value);
    router.push(`/explore?book=${exploreState}&search=${encodedSearchValue}`);

    setSearchValue(value);
  }, [
    exploreState,
    router,
  ]);

  const updateUrl = useCallback(() => {
    const encodedSearchValue = encodeURIComponent(searchValue);
    router.push(`/explore?book=${exploreState}&search=${encodedSearchValue}`);
  }, [
    exploreState,
    searchValue,
    router,
  ]);

  const handleOnScroll = useCallback(() => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (
      (documentHeight - scrollPosition === windowHeight) &&
      !isValidating &&
      hasMore
    ) {
      setSize(size + 1);
    }
  }, [
    isValidating,
    hasMore,
    setSize,
    size,
  ]);


  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [handleOnScroll]);

  useEffect(() => updateUrl(), [updateUrl]);

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
      <BookBar books={books} />
      <div
        className="
        mt-3
        md:mt-0
        col-span-2
        flex
        flex-col
        gap-5
        "
      >
        <InputSearch
          isLoading={isLoading}
          value={searchValue}
          onSubmit={handleOnSubmit}
        />
        {exploreState !== 'People'
          ? (
            <TweetFeed
              onScrollEnd={() => setSize(size + 1)}
              data={data}
              hasMore={hasMore}
              isLoading={isLoading}
              isValidating={isValidating}
            />
          )
          : (
            <div
              className="
              columns-1
              xs:columns-2
              sm:columns-3
              md:columns-2
              lg:columns-3
              xl:columns-4
              "
            >
              {data?.map((users: any) => (
                users?.map((user: User) => (
                  <div
                    key={user.id}
                    className="
                    mb-5 
                    break-inside-avoid
                    "
                  >
                    <Card>
                      <ToFollowItem
                        user={user}
                        coverVisible
                      />
                    </Card>
                  </div>
                ))))}
            </div>
          )}
      </div>
    </div>
  )
}
