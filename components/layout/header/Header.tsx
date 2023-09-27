'use client';

import Image from "next/image";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";

import NavItem from "./NavItem";
import Settings from "./Settings";

export default function Header() {

  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: 'Home',
      href: '/',
      isActive: pathname === '/',
      icon: AiFillHome,
    },
    {
      label: 'Explore',
      href: '/explore',
      isActive: pathname === '/explore',
      icon: FaCompass,
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      isActive: pathname === '/bookmarks',
      icon: BsFillBookmarkFill,
    }
  ], [
    pathname,
  ]);

  return (
    <div
      className="
      z-20
      bg-white
      flex
      items-center
      justify-between
      px-4
      h-14
      fixed
      top-0
      inset-x-0
      shadow-sm
      "
    >
      {/* Logo */}
      <div
        className="
        bg-logo-small
        bg-no-repeat
        bg-center
        w-12
        h-9
        md:bg-logo
        md:w-32
        "
      />

      <nav
        className="
        bg-white
        flex
        justify-around
        fixed
        space-x-2
        inset-x-0
        bottom-0
        px-2
        z-10
        text-sm
        border-t
        border-[#828282]/10
        sm:border-none
        sm:h-full
        sm:relative
        sm:space-x-10
        "
      >
        {routes.map((route, index) => (
          <NavItem
            key={index}
            {...route}
          />
        ))}
      </nav>
      <Settings />
    </div>
  )
}
