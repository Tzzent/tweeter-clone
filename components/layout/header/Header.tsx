'use client';

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Link from "next/link";

import NavItem from "./NavItem";
import Settings from "./Settings";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Header() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const session = useSession();

  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: 'Home',
      href: '/',
      isActive: pathname === '/',
      icon: AiFillHome,
      isAllowed: true,
    },
    {
      label: 'Explore',
      href: '/explore',
      isActive: pathname === '/explore',
      icon: FaCompass,
      isAllowed: true,
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      isActive: pathname === '/bookmarks',
      icon: BsFillBookmarkFill,
      isAllowed: currentUser?.id
    }
  ], [
    pathname,
    currentUser?.id,
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
      <Link
        href="/"
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
          route.isAllowed && (
            <NavItem
              key={index}
              {...route}
            />
          )))}
      </nav>
      <Settings
        isLoading={isLoading}
        currentUser={currentUser!}
      />
    </div>
  )
}
