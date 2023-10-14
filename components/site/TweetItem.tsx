'use client';

import Image from "next/image";
import { SlRefresh } from "react-icons/sl";
import { BiBookmark } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { useMemo, useRef } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import { format } from 'date-fns';

import Avatar from "../Avatar";
import InputReply from "../inputs/InputReply";
import Card from "../Card";
import { TweetItemType } from "@/types";
import clsx from "clsx";
import useLike from "@/hooks/useLike";
import useSave from "@/hooks/useSave";
import ReplyFeed from "./ReplyFeed";
import useRetweet from "@/hooks/useRetweet";
import RetweetedBy from "./RetweetedBy";

interface TweetItemProps {
  tweet: TweetItemType,
  currentUser: User,
}

export default function TweetItem({
  tweet,
  currentUser,
}: TweetItemProps) {
  const { hasLiked, toogleLike } = useLike(tweet.id);
  const { hasSaved, toggleSave } = useSave(tweet.id);
  const { hasRetweeted, toggleRetweet } = useRetweet(tweet.id);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const canComment = useMemo(() => {
    if (tweet.audience === 'EVERYONE') {
      return true;
    }

    if (tweet.ownerId === currentUser?.id) {
      return true;
    }

    return tweet.owner.followerIds.includes(currentUser?.id);
  }, [
    tweet.owner.followerIds,
    currentUser?.id,
    tweet.audience,
    tweet.ownerId,
  ]);

  const lastRetweetedId = useMemo(() => (
    tweet.retweetedByIds[tweet.retweetedByIds.length - 1]
  ), [tweet.retweetedByIds]);

  const actions = useMemo(() => [
    {
      label: 'Comment',
      icon: MdOutlineModeComment,
      onClick: () => inputRef.current?.focus(),
    },
    {
      label: hasRetweeted ? 'Retweeted' : 'Retweet',
      icon: SlRefresh,
      onClick: () => toggleRetweet(),
      isRetweeted: hasRetweeted,
    },
    {
      label: hasLiked ? 'Liked' : 'Like',
      icon: AiOutlineHeart,
      onClick: () => toogleLike(),
      isLiked: hasLiked,
    },
    {
      label: hasSaved ? 'Saved' : 'Save',
      icon: BiBookmark,
      onClick: () => toggleSave(),
      isSaved: hasSaved,
    }
  ], [
    hasRetweeted,
    hasLiked,
    hasSaved,
    toogleLike,
    toggleSave,
    toggleRetweet,
  ]);

  return (
    <div>
      {lastRetweetedId && (
        <RetweetedBy
          userId={lastRetweetedId}
          currentUser={currentUser}
        />
      )}
      <Card
        parentClassName="pb-0 overflow-hidden relative"
      >
        {/* Header */}
        <div
          className="
        flex
        justify-between
        "
        >
          <div
            className="
          flex
          items-center
          "
          >
            <Avatar src={tweet.owner?.image} />
            <div className="ml-4">
              <Link href={`/${tweet.owner.username}`}>
                <h2
                  className="
                font-semibold
                hover:underline
                "
                >
                  {tweet.owner.name}
                </h2>
              </Link>
              <p className="text-xs text-[#BDBDBD]">
                {format(new Date(tweet.createdAt), 'dd MMMM \'at\' HH:mm')}
              </p>
            </div>
          </div>
          {!canComment && (
            <div
              className="
          text-xs
          text-[#2D9CDB]
          "
            >
              <p>Follow <a href={`/${tweet.owner.username}`} className="hover:underline">@{tweet.owner.username}</a> to reply</p>
            </div>
          )}
        </div>

        {/* Body */}
        <div>
          <p className="text-[#4F4F4F] my-3">
            {tweet.body}
          </p>
          {tweet.image && (
            <div
              className="
          flex-shrink-0
          relative
          w-full
          h-80
          rounded-lg
          overflow-hidden
          "
            >
              <Image
                src={tweet.image}
                alt="Post"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
              />
            </div>
          )}
          <div
            className="
          text-[#BDBDBD]
          flex
          items-center
          justify-end
          gap-2
          text-xs
          mt-3
          "
          >
            <p>{tweet._count.comments} Comments</p>
            <p>{tweet.retweetedByIds.length} Retweets</p>
            <p>{tweet.likedIds.length} Likes</p>
            <p>{tweet.savedIds.length} Saved</p>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
        flex
        justify-between
        border-t
        border-b
        py-1
        my-2
        text-[#4F4F4F]
        "
        >
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick()}
              disabled={action.label === 'Comment' && !canComment}
              className={clsx(`
          hover:bg-[#F2F2F2]
          px-3
          py-2
          rounded-lg
          flex
          items-center
          justify-center
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:hover:bg-transparent
            disabled:text-gray-300
            `,
                action.isRetweeted && 'text-[#27AE60] font-semibold',
                action.isLiked && 'text-[#EB5757] font-semibold',
                action.isSaved && 'text-[#2D9CDB] font-semibold',
              )}
            >
              <action.icon size={20} />
              <p
                className="
              text-sm
              ml-2
              hidden
              md:block
              "
              >
                {action.label}
              </p>
            </button>
          ))}
        </div>

        {/* InputForm */}
        <InputReply
          id={tweet.id}
          tweetId={tweet.id}
          ref={inputRef}
          currentUser={currentUser!}
          disabled={!canComment}
        />

        {/* ReplyFeed */}
        <ReplyFeed tweetId={tweet.id} />
      </Card>
    </div>
  )
}
