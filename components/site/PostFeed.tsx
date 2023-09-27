'use client';

import PostItem from "./PostItem";

export default function PostFeed() {
  return (
    <div
      className="
      flex
      flex-col
      gap-8
      "
    >
      <PostItem />
      <PostItem />
    </div>
  )
}
