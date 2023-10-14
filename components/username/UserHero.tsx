'use client';

import Image from "next/image";

interface UserHeroProps {
  coverImage?: string,
}

export default function UserHero({
  coverImage
}: UserHeroProps) {
  return (
    <div
      className="
      relative
      w-full
      h-48
      md:h-60
      "
    >
      <Image
        src={coverImage || "/images/placeholder-cover.jpg"}
        alt="Hero"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
      />
    </div>
  )
}
