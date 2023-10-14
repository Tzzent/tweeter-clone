'use client';

import { Transition } from "@headlessui/react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BarLoader } from "react-spinners";

import Button from "../buttons/Button";

interface InputSearchProps {
  isLoading: boolean,
  value: string,
  onSubmit: (value: string) => void,
}

export default function InputSearch({
  value,
  isLoading,
  onSubmit,
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleOnSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();
    const value: string = (ev.target as any)[0].value;

    onSubmit(value);
  }, [onSubmit]);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);

    if (ev.target.value.trim() === '') {
      onSubmit('');
    }
  }, [onSubmit]);

  return (
    <form
      id="input-search"
      onSubmit={handleOnSubmit}
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
        id="search"
        type="text"
        value={inputValue}
        onChange={handleOnChange}
        placeholder="Search"
        autoComplete="off"
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
        type="submit"
        label="Search"
        className="
        absolute
        right-2
        inset-y-1
        "
      />
      <Transition
        as="div"
        show={isLoading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="
        absolute
        -bottom-3
        px-2
        inset-x-0
        "
      >
        <BarLoader
          loading={isLoading}
          color="#2F80ED"
          height={3}
          width="100%"
        />
      </Transition>
    </form>
  )
}
