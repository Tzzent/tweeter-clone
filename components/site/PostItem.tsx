'use client';

import { SlRefresh } from "react-icons/sl";
import { BiBookmark } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import Link from "next/link";
import { useMemo } from "react";

import Image from "next/image";
import Avatar from "../Avatar";
import InputReply from "../inputs/InputReply";
import Card from "../Card";

export default function PostItem() {

  const actions = useMemo(() => [
    {
      label: 'Comment',
      icon: MdOutlineModeComment,
      onClick: () => { },
    },
    {
      label: 'Retweet',
      icon: SlRefresh,
      onClick: () => { },
    },
    {
      label: 'Like',
      icon: AiOutlineHeart,
      onClick: () => { },
    },
    {
      label: 'Save',
      icon: BiBookmark,
      onClick: () => { },
    }
  ], []);

  return (
    <Card>
      {/* Header */}
      <div
        className="
        flex
        items-center
        "
      >
        <Avatar />
        <div className="ml-4">
          <Link href="/Peyton">
            <h2
              className="
              font-semibold
              hover:underline
              "
            >
              Peyton Lyons
            </h2>
          </Link>
          <p className="text-xs text-[#BDBDBD]">24 August at 20:43</p>
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="text-[#4F4F4F] my-3">
          Traveling – it leaves you speechless, then turns you into a storyteller.
        </p>
        <div
          className="
          flex-shrink-0
          relative
          w-full
          h-60
          rounded-lg
          overflow-hidden
          "
        >
          <Image
            src="/images/wp-test2.jpg"
            alt="Post"
            fill
            objectFit="cover"
          />
        </div>
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
          <p>449 Comments</p>
          <p>59k Retweets</p>
          <p>234 Saved</p>
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
          <div
            key={index}
            className="
            hover:bg-[#F2F2F2]
            px-3
            py-2
            rounded-lg
            flex
            items-center
            justify-center
            cursor-pointer
            "
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
          </div>
        ))}
      </div>

      {/* InputForm */}
      <InputReply />
    </Card>
  )
}
