'use client';

import {
  useMemo,
  Fragment,
  useState,
  useEffect,
} from "react";
import { BiWorld } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import { UseFormSetValue } from "react-hook-form";
import { Visibility } from "@prisma/client";

import { FormTweetRequest } from "./Form";

interface QuestionReplyProps {
  setValue: UseFormSetValue<FormTweetRequest>,
}

export default function QuestionReply({
  setValue,
}: QuestionReplyProps) {
  const [whoFollow, setWhoFollow] = useState<Visibility>('EVERYONE');
  const options = useMemo(() => [
    {
      label: 'Everyone',
      icon: BiWorld,
      onClick: () => setWhoFollow('EVERYONE'),
      isActive: whoFollow === 'EVERYONE',
    },
    {
      label: 'People you follow',
      icon: MdGroup,
      onClick: () => setWhoFollow('FOLLOWING'),
      isActive: whoFollow === 'FOLLOWING',
    }
  ], [whoFollow]);

  useEffect(() => {
    setValue('audience', whoFollow)
  }, [
    whoFollow,
    setValue,
  ]);

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
        {whoFollow === 'EVERYONE' ? (
          <>
            <BiWorld size={20} />
            <p className="ml-2">
              {options[0].label} can reply
            </p>
          </>
        ) : (
          <>
            <MdGroup size={20} />
            <p className="ml-2">
              {options[1].label} can reply
            </p>
          </>
        )}
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
            <Popover.Button
              as="div"
              key={index}
              onClick={option.onClick}
              className={`
              flex
              items-center
              space-x-2
              hover:bg-[#F2F2F2]
              rounded-md
              py-2
              px-3
              cursor-pointer
              ${option.isActive ? 'text-[#2F80ED]' : 'text-[#4F4F4F]'}
              `}
            >
              <option.icon size={24} />
              <p className="truncate">
                {option.label}
              </p>
            </Popover.Button>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}