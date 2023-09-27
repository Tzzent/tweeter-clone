'use client';

import Image from "next/image";
import { MdPersonAdd } from "react-icons/md";
import Link from "next/link";

import Avatar from "../Avatar";
import Button from "../buttons/Button";

interface ToFollowItemProps {
  coverVisible?: boolean,
}

export default function ToFollowItem({
  coverVisible,
}: ToFollowItemProps) {
  return (
    <div
      className="
      grid
      grid-cols-2
      border-b
      pb-5
      last:border-none
      "
    >
      <div
        className="
        flex
        items-center
        col-span-2
        space-x-2
        "
      >
        <div
          className="
          flex
          items-center
          justify-start
          truncate
          w-full
          "
        >
          <Avatar />
          <div
            className="
            ml-3
            truncate
            "
          >
            <Link href="/Mikael">
              <h3
                className="
                font-semibold
                truncate
                hover:underline
                "
              >
                Mikael Stanley
              </h3>
            </Link>
            <p
              className="
              text-[#828282] 
              text-xs
              truncate
              "
            >
              230k followers
            </p>
          </div>
        </div>
        <Button
          icon={MdPersonAdd}
          label="Follow"
          onClick={() => { }}
        />
      </div>
      <div
        className="
        col-span-1
        md:col-span-2
        text-[#828282]
        text-sm
        mt-3
        "
      >
        <p>
          Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
        </p>
      </div>
      {coverVisible && (
        <div
          className="
          mt-3
          relative
          col-span-2
          overflow-hidden
          rounded-lg
          w-full
          h-28
          "
        >
          <Image
            src="/images/wp-test.jpg"
            alt="Wallpaper"
            fill
            objectFit="cover"
          />
        </div>
      )}
    </div>
  )
}
