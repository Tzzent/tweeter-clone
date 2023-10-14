'use client';

import clsx from "clsx";
import Card from "./Card";

interface BookBarProps {
  books: {
    label: string,
    onClick: () => void,
    isActive: boolean,
  }[],

}

export default function BookBar({
  books,
}: BookBarProps) {
  return (
    <Card
      className="
      flex
      flex-col
      space-y-3
      px-0
      "
    >
      {books.map((book, index) => (
        <div
          key={index}
          onClick={book.onClick}
          className={clsx(`
          cursor-pointer
          relative
          pl-5
          py-1
          font-semibold
          text-sm
          `,
            book.isActive ? 'text-[#2F80ED]' : 'text-[#828282]',
          )}
        >
          {book.label}

          {/* ActiveMark */}
          {book.isActive && (
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
