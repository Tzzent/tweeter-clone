'use client';

import Image from "next/image";

export default function UserHero() {
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
        src="/images/wp-test.jpg"
        alt="Hero"
        fill
        objectFit="cover"
      />
    </div>
  )
}
