'use client';

import { AiOutlineSearch } from "react-icons/ai";

import Button from "../buttons/Button";

export default function InputSearch() {
  return (
    <div
      className="
      w-full
      relative
      shadow-sm
      "
    >
      <AiOutlineSearch
        color="#BDBDBD"
        size={22}
        className="
        absolute
        left-2
        inset-y-0
        my-auto
        "
      />
      <input
        type="text"
        placeholder="Search"
        className="
        outline-none
        rounded-lg
        w-full
        py-2
        pl-10
        pr-24
        focus:ring-1
        placeholder:text-[#BDBDBD]
        focus:ring-gray-400
        whitespace-nowrap
        "
      />
      <Button
        label="Search"
        onClick={() => { }}
        className="
        absolute
        right-2
        inset-y-1
        "
      />
    </div>
  )
}
