'use client';

import Image from "next/image";
import { MdPersonAdd } from "react-icons/md";
import Link from "next/link";
import { User } from "@prisma/client";
import { FaUserEdit } from "react-icons/fa";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import useFollow from "@/hooks/useFollow";

interface ToFollowItemProps {
  user: User,
  coverVisible?: boolean,
  sameUser?: boolean,
  onOpenProfile?: () => void,
}

export default function ToFollowItem({
  user,
  coverVisible,
  sameUser,
  onOpenProfile,
}: ToFollowItemProps) {
  const { hasFollow, toggleFollow } = useFollow(user.username);

  return (
    <div
      className="
      grid
      grid-cols-2
      items-start
      "
    >
      {/* Head */}
      <div
        className="
        flex
        flex-wrap
        justify-between
        gap-3
        col-span-2
        "
      >
        <div
          className="
          flex
          items-center
          truncate
          "
        >
          <Avatar src={user?.image} />
          <div
            className="
            ml-3
            truncate
            "
          >
            <Link href={`/${user.username}`}>
              <h3
                className="
                font-semibold
                truncate
                hover:underline
                "
              >
                {user.name}
              </h3>
            </Link>
            <p
              className="
              text-[#828282] 
              text-xs
              truncate
              "
            >
              {user.followerIds.length} followers
            </p>
          </div>
        </div>
        <div>
          {sameUser ? (
            <Button
              onClick={onOpenProfile}
              icon={FaUserEdit}
              label="Edit profile"
              outline
            />
          ) :
            (<Button
              icon={hasFollow ? null : MdPersonAdd}
              label={hasFollow ? "Following" : "Follow"}
              onClick={toggleFollow}
            />
            )}
        </div>
      </div>

      {/* Biography */}
      <div
        className="
        col-span-1
        sm:col-span-2
        text-[#828282]
        text-sm
        mt-3
        max-h-40
        overflow-y-auto
        "
      >
        <p>
          {user.bio}
        </p>
      </div>

      {/* Cover Image */}
      {coverVisible && (
        <div
          className="
          mt-3
          relative
          col-span-2
          overflow-hidden
          rounded-lg
          w-full
          h-32
          "
        >
          <Image
            src={user.coverImage || '/images/placeholder-cover.jpg'}
            alt="Wallpaper"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
          />
        </div>
      )}
    </div>
  )
}
