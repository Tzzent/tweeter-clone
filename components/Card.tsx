'use client';

interface CardProps {
  title?: string,
  children: React.ReactNode,
  className?: string,
}

export default function Card({
  title,
  children,
  className,
}: CardProps) {
  return (
    <div
      className="
      bg-white
      py-4
      rounded-xl
      shadow-sm
      h-fit
      w-full
      "
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
        className={`
        ${className ? className : 'px-3'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
