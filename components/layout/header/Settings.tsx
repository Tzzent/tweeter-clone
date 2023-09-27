'use client';

import { BiSolidUserCircle } from "react-icons/bi";
import { MdGroup, MdSettings } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillCaretLeftFill } from "react-icons/bs";
import {
  useMemo,
  Fragment,
} from "react";
import { Popover, Transition } from "@headlessui/react";

import Avatar from "../../Avatar";
import SettingsItem from "./SettingsItem";

export default function Settings() {

  const items = useMemo(() => [
    {
      label: 'My Profile',
      icon: BiSolidUserCircle,
      onClick: () => { },
    },
    {
      label: 'Group Chat',
      icon: MdGroup,
      onClick: () => { },
    },
    {
      label: 'Settings',
      icon: MdSettings,
      onClick: () => { },
    }
  ], []);

  return (
    <Popover className="relative select-none">
      {({ open }) => (
        <>
          <Popover.Button
            className="
            flex
            items-center
            ml-2
            "
          >
            <Avatar />
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
                Xanthe Neal
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
                <SettingsItem
                  key={index}
                  {...item}
                />
              ))}
              <hr />
              <SettingsItem
                icon={RiLogoutBoxRLine}
                label="Logout"
                onClick={() => { }}
                className="text-[#EB5757]"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}