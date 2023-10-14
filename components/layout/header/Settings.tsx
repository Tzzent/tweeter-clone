'use client';

import { toast } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdGroup, MdSettings } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import {
  useMemo,
  Fragment,
  useCallback,
} from "react";
import { Popover, Transition } from "@headlessui/react";
import { User } from "@prisma/client";

import Avatar from "../../Avatar";
import SettingsItem from "./SettingsItem";
import Button from "@/components/buttons/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

interface SettingsProps {
  currentUser: User,
  isLoading: boolean,
}

export default function Settings({
  currentUser,
  isLoading,
}: SettingsProps) {
  const session = useSession();
  const router = useRouter();

  const authModal = useAuthModal();

  const items = useMemo(() => [
    {
      label: 'My Profile',
      icon: BiSolidUserCircle,
      onClick: () => router.push(`/${currentUser?.username}`),
    },
    // {
    //   label: 'Group Chat',
    //   icon: MdGroup,
    //   onClick: () => { },
    // },
    // {
    //   label: 'Settings',
    //   icon: MdSettings,
    //   onClick: () => { },
    // }
  ], [
    currentUser?.username,
    router,
  ]);

  const handleSignOut = useCallback(() => {
    signOut()
      .then((cb) => toast.success('You have signed out!'))
      .catch((err) => toast.error('Something went wrong!'))
  }, []);

  if (session.status === 'unauthenticated') {
    return (
      <Button
        icon={AiOutlineLock}
        label="Sign in"
        onClick={() => authModal.onOpen()}
      />
    )
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Popover className="relative select-none">
        {({ open }) => (
          <>
            <Popover.Button
              className="
              flex
              items-center
              ml-2
              outline-none
              focus:ring-0
              "
            >
              <Avatar src={currentUser?.image} />
              <div
                className="
                ml-4
                items-center
                gap-3
                space-x-2
                font-semibold
                hidden
                sm:flex
                "
              >
                <span className="text-sm">
                  {currentUser?.name}
                </span>
                <BsFillCaretLeftFill
                  size={16}
                  className={`
                  transition
                  duration-200
                  ${open ? '-rotate-90' : 'rotate-0'}       
                  `}
                />
              </div>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="
                bg-white
                absolute
                z-20
                top-14
                right-2
                rounded-xl
                shadow-sm
                py-2
                px-3
                space-y-2
                border
                border-[#E0E0E0]
                "
              >
                {items.map((item, index) => (
                  <Popover.Button
                    as="div"
                    key={index}
                  >
                    <SettingsItem
                      {...item}
                    />
                  </Popover.Button>
                ))}
                <hr />
                <Popover.Button as="div">
                  <SettingsItem
                    icon={RiLogoutBoxRLine}
                    label="Logout"
                    onClick={handleSignOut}
                    className="text-[#EB5757]"
                  />
                </Popover.Button>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}