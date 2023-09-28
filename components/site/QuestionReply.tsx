'use client';

import {
  useMemo,
  Fragment,
} from "react";
import { BiWorld } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";

export default function QuestionReply() {
  const options = useMemo(() => [
    {
      label: 'Everyone',
      icon: BiWorld,
      onClick: () => { },
    },
    {
      label: 'People you follow',
      icon: MdGroup,
      onClick: () => { },
    }
  ], []);

  return (
    <Popover className="relative select-none">
      <Popover.Button
        className="
        flex
        items-center
        ml-2
        outline-none
        focus:ring-0
        "
      >
        <BiWorld size={20} />
        <p className="ml-2">
          Everyone can reply
        </p>
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
          absolute 
          z-10
          bg-white
          top-12
          left-0
          rounded-xl
          shadow-sm
          py-2
          px-3
          space-y-2
          border
          border-[#E0E0E0]
          "
        >
          <div className="cursor-default">
            <h2 className="text-[#4F4F4F] text-xs font-bold">Who can reply?</h2>
            <p className="text-[#828282] text-xs">Choose who can reply this Tweet.</p>
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={option.onClick}
              className="
              flex
              items-center
              space-x-2
              text-[#4F4F4F]
              hover:bg-[#F2F2F2]
              rounded-md
              py-2
              px-3
              cursor-pointer
              "
            >
              <option.icon size={24} />
              <p className="truncate">
                {option.label}
              </p>
            </div>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}