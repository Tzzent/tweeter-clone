'use client';

import clsx from "clsx";

interface CardProps {
  title?: string,
  children: React.ReactNode,
  parentClassName?: string,
  className?: string,
}

export default function Card({
  title,
  children,
  parentClassName,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(`
      bg-white
      py-4
      rounded-xl
      shadow-sm
      h-fit
      w-full
      relative
      `,
        parentClassName
      )}
    >
      {title && (
        <>
          <div
            className="
            font-semibold
            text-xs
            mb-2
            px-3
            "
          >
            {title}
          </div>
          <hr className="mx-3" />
        </>
      )}
      <div
        className={clsx(
          className ? className : 'px-3'
        )}
      >
        {children}
      </div>
    </div>
  )
}
