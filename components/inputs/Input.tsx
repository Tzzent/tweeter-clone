'use client';

import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  name?: string,
  placeholder?: string,
  type: HTMLInputTypeAttribute,
  onChange: (value: string) => void,
}

export default function Input({
  name,
  placeholder,
  type,
  onChange,
}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={(ev) => onChange(ev.target.value)}
      className="
      relative
      transition-all
      ease-in-out
      duration-100
      outline-0
      bg-transparent
      border
      w-full
      p-3
      rounded-lg
      focus:ring-1
      focus:ring-slate-300
      placeholder:select-none
      "
    />
  )
}
