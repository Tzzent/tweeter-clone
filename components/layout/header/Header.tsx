'use client';

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { ScaleLoader } from "react-spinners";
import { AiOutlineLock } from "react-icons/ai";

import NavItem from "./NavItem";
import Settings from "./Settings";
import useCurrentUser from "@/hooks/useCurrentUser";
import Button from "@/components/buttons/Button";
import useAuthModal from "@/hooks/useAuthModal";

export default function Header() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const pathname = usePathname();
  const authModal = useAuthModal();

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
      <div>
        {isLoading ? (
          <ScaleLoader color="#2F80ED" />
        ) : (!isLoading && currentUser) ? (
          <Settings currentUser={currentUser} />
        ) : (
          <Button
            icon={AiOutlineLock}
            label="Sign in"
            onClick={() => authModal.onOpen()}
          />
        )}
      </div>
    </div>
  )
}
