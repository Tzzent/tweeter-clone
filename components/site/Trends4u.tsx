'use client';

import Link from "next/link";

import useTrends from "@/hooks/useTrends";
import Card from "../Card";
import TrendsModal from "../modals/TrendsModal";
import { useState } from "react";

export default function Trends4u() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: [trends], isLoading } = useTrends(3);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      <TrendsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Card title="Trends for you">
        <div className="mt-4 space-y-5">
          {trends.map((trend) => (
            <div key={trend.id}>
              <Link
                href={`/explore?search=${trend.name}`}
                className="
              text-[#333333]
              font-bold
              hover:underline
              "
              >
                #{trend.name}
              </Link>
              <p
                className="
              text-xs
              text-[#828282]
              "
              >
                {trend._count.tweets} Tweets
              </p>
            </div>
          ))}
          {trends.length !== 3 && (
            <button
              onClick={() => setIsOpen(true)}
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
            </button>
          )}
        </div>
      </Card>
    </>
  )
}
