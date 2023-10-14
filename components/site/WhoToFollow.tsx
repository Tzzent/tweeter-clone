'use client';

import Link from "next/link";

import Card from "../Card";
import useUsers from "@/hooks/useUsers";
import ToFollowItem from "./ToFollowItem";

export default function WhoToFollow() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <Card
      title="Who to follow"
      className="
      px-3
      mt-4
      columns-1
      xs:columns-2
      sm:columns-3
      lg:columns-1
      "
    >
      {users.map((user) => (
        <div
          key={user.id}
          className="
            mb-5
            break-inside-avoid
            last:border-none
            last:pb-0
            border-b
            xs:border-b-0
            md:border-b
            pb-5
            "
        >
          <ToFollowItem
            user={user}
            coverVisible
          />
        </div>
      ))}
      {users.length === 3 && (
        <Link
          href={`/explore/?book=People`}
          className="
          text-blue-400
          underline
          text-sm
          font-semibold
          transition
          hover:text-blue-500
          "
        >
          Show more
        </Link>
      )}
    </Card>
  )
}
