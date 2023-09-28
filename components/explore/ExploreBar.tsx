'use client';

import { useMemo, useState } from "react";
import Card from "../Card";

enum ExploreState {
  TOP,
  LASTEST,
  PEOPLE,
  MEDIA,
}

export default function ExploreBar() {
  const [exploreState, setExploreState] = useState<ExploreState>(ExploreState.TOP);
  const explorers = useMemo(() => [
    {
      label: 'Top',
      onClick: () => setExploreState(ExploreState.TOP),
      isActive: exploreState === ExploreState.TOP,
    },
    {
      label: 'Latest',
      onClick: () => setExploreState(ExploreState.LASTEST),
      isActive: exploreState === ExploreState.LASTEST,
    },
    {
      label: 'People',
      onClick: () => setExploreState(ExploreState.PEOPLE),
      isActive: exploreState === ExploreState.PEOPLE,
    },
    {
      label: 'Media',
      onClick: () => setExploreState(ExploreState.MEDIA),
      isActive: exploreState === ExploreState.MEDIA,
    }
  ], [exploreState]);

  return (
    <Card
      className="
      flex
      flex-col
      space-y-3
      px-0
      w-full
      "
    >
      {explorers.map((explore, index) => (
        <div
          key={index}
          onClick={explore.onClick}
          className={`
          cursor-pointer
          relative
          pl-5
          py-1
          font-semibold
          text-sm
          ${explore.isActive ? 'text-[#2F80ED]' : 'text-[#828282]'}
          `}
        >
          {explore.label}

          {/* ActiveMark */}
          {explore.isActive && (
            <div
              className="
              absolute
              left-0
              inset-y-0
              w-1
              h-full
              rounded-r-md
              bg-[#2F80ED]
              "
            />
          )}
        </div>
      ))}
    </Card>
  )
}
