'use client';

import { format } from "date-fns";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { CommentItemType } from "@/types";
import Avatar from "../Avatar";
import useLikeReply from "@/hooks/useLikeReply";

interface ReplyItemProps {
  reply: CommentItemType,
}

export default function ReplyItem({
  reply,
}: ReplyItemProps) {
  const {
    isLoading,
    hasLiked,
    toogleLike,
  } = useLikeReply(reply.id);

  return (
    <div
      className="
      flex
      items-start
      gap-2
      mt-3
      "
    >
      <Avatar src={reply.author?.image} />
      <div
        className="
        flex
        flex-col
        gap-2
        w-full
        "
      >

        {/* Body */}
        <div
          className="
          bg-[#FAFAFA]
          rounded-lg
          px-3
          pt-2
          "
        >
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            <Link
              href={`/${reply.author.username}`}
              className="
              font-bold
              hover:underline
              "
            >
              {reply.author.name}
            </Link>
            <p className="text-[#BDBDBD] text-xs">
              {format(new Date(reply.createdAt), "d MMMM 'at' HH:mm")}
            </p>
          </div>
          <span className="text-[#4F4F4F]">
            {reply.body}
          </span>

          {reply.image && (
            <div
              className="
              flex-shrink-0
              relative
              w-full
              h-80
              rounded-lg
              overflow-hidden
              mt-3
              "
            >
              <Image
                src={reply.image}
                alt="Post"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
              />
            </div>
          )}
        </div>

        {/* Likes and Handle Like */}
        <div
          className="
          text-[#BDBDBD]
          text-xs
          flex
          items-center
          gap-2
          "
        >
          <button
            disabled={isLoading}
            onClick={toogleLike}
            className={clsx(`
            flex
            items-center
            hover:text-[#EB5757]
            `,
              hasLiked && 'text-[#EB5757]'
            )}
          >
            <AiOutlineHeart size={20} />
            <p className="ml-2">
              {hasLiked ? 'Liked' : 'Like'}
            </p>
          </button>
          <div>
            •
          </div>
          <div>
            {reply.likedIds.length} Likes
          </div>
        </div>
      </div>
    </div>
  )
}
