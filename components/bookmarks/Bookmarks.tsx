'use client';

import { useMemo, useState } from "react";
import Card from "../Card";

enum BookState {
  TWEETS,
  TWEETS_REPLIES,
  MEDIA,
  LIKES,
}

export default function Bookmarks() {
  const [bookState, setBookState] = useState<BookState>(BookState.TWEETS);
  const bookmarks = useMemo(() => [
    {
      label: 'Tweets',
      onClick: () => setBookState(BookState.TWEETS),
      isActive: bookState === BookState.TWEETS,
    },
    {
      label: 'Tweets & replies',
      onClick: () => setBookState(BookState.TWEETS_REPLIES),
      isActive: bookState === BookState.TWEETS_REPLIES,
    },
    {
      label: 'Media',
      onClick: () => setBookState(BookState.MEDIA),
      isActive: bookState === BookState.MEDIA,
    },
    {
      label: 'Likes',
      onClick: () => setBookState(BookState.LIKES),
      isActive: bookState === BookState.LIKES,
    }
  ], [bookState]);

  return (
    <Card
      className="
      flex
      flex-col
      space-y-3
      px-0
      "
    >
      {bookmarks.map((bookmark, index) => (
        <div
          key={index}
          onClick={bookmark.onClick}
          className={`
          cursor-pointer
          relative
          pl-5
          py-1
          font-semibold
          text-sm
          ${bookmark.isActive ? 'text-[#2F80ED]' : 'text-[#828282]'}
          `}
        >
          {bookmark.label}

          {/* ActiveMark */}
          {bookmark.isActive && (
            <div
              className="
              absolute
              left-0
              inset-y-0
              w-1
              h-full
              rounded-r-md
              bg-[#2F80ED]
              "
            />
          )}
        </div>
      ))}
    </Card>
  )
}
