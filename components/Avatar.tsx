'use client';

import Image from "next/image";

interface AvatarProps {
  src?: string | null,
  hasBorder?: boolean,
  medium?: boolean,
}

export default function Avatar({
  src,
  hasBorder,
  medium,
}: AvatarProps) {
  return (
    <div
      className={`
      rounded-xl
      overflow-hidden
      flex-shrink-0
      relative
      ${medium ? 'w-28 h-28' : 'w-9 h-9'}
      ${medium && 'shadow-sm'}
      ${hasBorder && 'border-4 border-white'}
      `}
    >
      <Image
        src={src || "/images/placeholder.jpg"}
        alt="Avatar"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
      />
    </div>
  )
}
