'use client';

import Image from "next/image";
'use client';

import Card from "../Card";
import ToFollowItem from "./ToFollowItem";

export default function WhoToFollow() {
  return (
    <Card
      title="Who to follow"
      className="
      flex
      flex-col
      gap-5
      px-3
      mt-4
      "
    >

      <ToFollowItem coverVisible />
      <ToFollowItem coverVisible />
      <ToFollowItem coverVisible />

    </Card>
  )
}
