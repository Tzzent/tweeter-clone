'use client';

import Card from "../Card";

export default function Trends4u() {
  return (
    <Card title="Trends for you">
      <div className="mt-4 space-y-5">
        <div>
          <span
            className="
            text-[#333333]
            font-bold
            "
          >
            #programming
          </span>
          <p
            className="
            text-xs
            text-[#828282]
            "
          >
            213k Tweets
          </p>
        </div>
        <div>
          <span
            className="
            text-[#333333]
            font-bold
            "
          >
            #devchallenges
          </span>
          <p
            className="
            text-xs
            text-[#828282]
            "
          >
            113k Tweets
          </p>
        </div>
      </div>
    </Card>
  )
}
