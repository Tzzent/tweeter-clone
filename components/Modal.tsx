'use client';

import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";
import { Fragment } from "react";

interface ModalProps {
  isOpen?: boolean,
  onClose: () => void,
  title?: string,
  className?: string,
  children: React.ReactNode,
}

export default function Modal({
  isOpen,
  onClose,
  title,
  className,
  children,
}: ModalProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >

      {/* Overlay */}
      <Dialog
        as="div"
        className="relative z-30"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div
          className="
          fixed 
          inset-0 
          overflow-y-auto
          "
        >
          <div
            className="
            flex 
            min-h-full 
            items-center 
            justify-center 
            p-4 
            text-center
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                w-full 
                max-w-md
                md:max-w-2xl
                transform 
                overflow-hidden 
                rounded-2xl 
                bg-white 
                py-6 
                text-left 
                align-middle 
                shadow-xl 
                transition-all
                "
              >

                {/* Title-Head */}
                <Dialog.Title
                  as="div"
                  className="
                  font-bold
                  text-[#333333]
                  mx-6
                  pb-2
                  border-b
                  text-sm
                  flex
                  items-center
                  justify-between
                  space-x-2
                  "
                >
                  <h3>
                    {title}
                  </h3>
                  <GrClose
                    onClick={onClose}
                    color="#4F4F4F"
                    size={16}
                    className="
                    hover:scale-110
                    cursor-pointer
                    "
                  />
                </Dialog.Title>

                {/* Body */}
                <div
                  className={`
                  mt-2
                  px-6
                  scrollbar-thin
                  scrollbar-thumb-rounded-full
                  scrollbar-track-rounded-full
                  scrollbar-thumb-[#2F80ED]
                  scrollbar-track-[#e0e0e0]
                  ${className}
                  `}
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
