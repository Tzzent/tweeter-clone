'use client';

import { IconType } from "react-icons";
import Link from "next/link";

interface NavItemProps {
  label: string,
  href: string,
  isActive: boolean,
  icon: IconType,
}

export default function NavItem({
  label,
  href,
  isActive,
  icon: Icon,
}: NavItemProps) {
  return (
    <div
      className="
      w-full
      h-full
      relative
      p-2
      sm:px-2
      sm:flex
      sm:justify-center
      sm:items-center
      "
    >
      <Link
        href={href}
        className={`
        w-full
        hover:bg-[#F2F2F2]
        sm:hover:bg-transparent
        sm:hover:text-[#2F80ED]
        flex
        rounded-lg
        justify-center
        items-center
        py-2
        sm:py-0
        ${isActive ? 'text-[#2F80ED]' : 'text-[#828282]'}
        `}
      >
        <Icon
          size={22}
          className="sm:hidden"
        />
        <div className="hidden sm:block font-bold">
          {label}
        </div>

        {/* ActiveLine */}
        {isActive && (
          <div
            className="
          bg-[#2F80ED]
          h-1
          rounded-t-full
          absolute
          bottom-0
          inset-x-0
          "
          />
        )}
      </Link>
    </div>
  )
}
