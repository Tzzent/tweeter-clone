'use client';

import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { SlRefresh } from "react-icons/sl";
import axios from "axios";
import Link from "next/link";

interface RetweetedByProps {
  userId: string,
  currentUser?: User,
}

export default function RetweetedBy({
  userId,
  currentUser,
}: RetweetedByProps) {
  const [user, setUser] = useState<User | null>(null);

  const name = useMemo(() => {
    if (userId === currentUser?.id) {
      return `You`;
    }

    return user?.name;
  }, [
    currentUser?.id,
    user?.name,
    userId,
  ]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error);
    }
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div
      className="
      flex
      items-center
      gap-2
      text-sm
      text-[#828282]
      mb-2
      select-none
      "
    >
      <SlRefresh />
      <p>
        <Link
          href={`/${user.username}`}
          className="
          hover:underline
          mr-1
          "
        >
          {name}
        </Link>
        Retweeted
      </p>
    </div>
  )
}